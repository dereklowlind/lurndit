import React, {useState} from 'react'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import {Button, Drawer, TextField, Hidden} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';
import '../css/drawer.scss'
import { useHistory } from 'react-router-dom';
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
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 600,
      textTransform: "none",
      color: "black"
    }
}));



function DrawerMenu(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const history = useHistory();

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
                        <Link className={classes.homeButton} to="/">
                          <HomeIcon style={{marginLeft: '-10px', marginRight: '10px'}}/>
                          Home
                        </Link>
                      </div>
                      <div>
                        <div>Favourite List</div>
                        {props.favList.map((c, index) => (
                          <div key={c.courseId}>
                            <Link to={`/course/${c.courseId}`}>
                                {c.courseTitle}
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