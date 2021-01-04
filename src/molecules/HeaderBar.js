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
        <TopSearchBar courseList={props.lists} triggerRender={props.triggerRender}/>
        <div className={classes.authContainer}>
            <Auth />
        </div>
    </div>
    )
}

export default HeaderBar;