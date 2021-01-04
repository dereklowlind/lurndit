import Auth from './Auth'
import {makeStyles} from '@material-ui/core/styles'
import TopSearchBar from './TopSearchBar'

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    authContainer: {
        marginTop: '16px',
        marginLeft: '10px',
        marginRight: '10px'
    }
}))

function HeaderBar(props) {
    const classes = useStyles();

    return(
    <div className={classes.headerContainer}>
<<<<<<< HEAD
        <TopSearchBar courseList={props.lists} triggerRender={props.triggerRender}/>
        <div className={classes.authContainer}>
            <Auth db={props.db} setFavList={props.setFavList}/>
        </div>
=======
        <div>Search bar goes here</div>
        <Auth db={props.db} setFavList={props.setFavList}/>
>>>>>>> 122c6a987bf0196222f4e5a5de8c03d28dd547c3
    </div>
    )
}

export default HeaderBar;