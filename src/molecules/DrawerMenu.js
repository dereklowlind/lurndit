import React, {useState} from 'react'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import {Button, Drawer, Hidden} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';
import '../css/drawer.scss'
import { Link } from 'react-router-dom'
const drawerWidth = 260

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#FAFAFA'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    homeButton: {
      fontSize: '22px',
      fontFamily: "'Rubik'",
      fontWeight: 600,
      background:"none",
      textTransform: "none",
      color: "black",
      borderRadius: '16px',
      textDecoration: "none",
      transition:'0.5s',
      border: "none",
          '&:hover': {
            backgroundColor: '#dedede',
            marginLeft:'5px',
            transition:'0.5s',
              },
              '&:focus': {
                outline:'none',
                border:'#e6e6e66e',
              },

    },
    favListButton: {
      fontSize: '20px',
      fontFamily: "'Rubik'",
      fontWeight: 400,
      textTransform: "none",
      color: "#696969",
      marginLeft: "30px",
      textDecoration: "none",
      borderRadius: '16px',
      textDecoration: "none",
      transition:'0.5s',
      border: "none",
          '&:hover': {
            backgroundColor: '#dedede',
            marginLeft:'40px',
            transition:'0.5s',
              },
              '&:focus': {
                outline:'none',
                border:'#e6e6e66e',
              },
      
    },
    favListHeader: {
      fontSize: '22px',
      fontFamily: "'Rubik'",
      fontWeight: 600,
      textTransform: "none",
      color: "black",
      marginTop: '15px',
      textDecoration: "none"
    },
    signInButton: {
      marginTop: "5px",
      marginLeft: "5px"
    }
}));



function DrawerMenu(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    //drawer menu will fetch user settings on load

    // const goHome = () => {
    //   history.push("/")
    // }

    return (
        <nav className={classes.drawer} aria-label="topic-container">
            <Hidden smUp implementation="css">
            <Drawer
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                paper: classes.drawerPaper
                }}
                ModalProps={{
                keepMounted:true,
                }}
            >
                <div>Mobile drawer</div>
            </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                    paper: classes.drawerPaper
                    }}
                    variant="permanent"
                    open
                >
                    <div className="drawerHeader">
                        <Link to="/" className="drawerTitle">
                            Lurndit
                        </Link>
                    </div>
                    
                    <div className="drawerContent">
                      <div className="homeButtons">
                        <div style={{display: 'inline-block'}} >
                        🏠 &nbsp; &nbsp; 
                        <Link className={classes.homeButton} to="/">
                        &nbsp; Home &nbsp;
                        </Link>
                        </div>
                      </div>
                      <div>
                        <div className={classes.favListHeader}>📜 &nbsp; &nbsp; My Lists</div>
                        {!props.isSignedIn &&
                          <Button className={classes.signInButton} variant="outlined" onClick={() => props.setOpenSigninDialog(true)}>Sign in/up</Button>
                        }
                        {props.favList.map((c, index) => (
                          <div key={c.courseId}>
                            <Link className={classes.favListButton} to={`/course/${c.courseId}`}>
                            &nbsp; &nbsp; {c.courseTitle} &nbsp; &nbsp;
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>

                </Drawer>
            </Hidden>
        </nav>
    )
}

export default DrawerMenu