import React, {useState} from 'react'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import {Button, Drawer, TextField, Hidden} from '@material-ui/core'

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
}));

function DrawerMenu() {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    //drawer menu will fetch user settings on load

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
                        <div className="drawerTitle">
                            Lurndit
                        </div>
                    </div>
                    
                    <div>desktop drawer</div>

                </Drawer>
                <div>hello</div>
            </Hidden>
        </nav>
    )
}

export default DrawerMenu