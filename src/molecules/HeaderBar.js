import Auth from './Auth'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}))

function HeaderBar() {
    const classes = useStyles();

    return(
    <div className={classes.headerContainer}>
        <div>Search bar goes here</div>
        <Auth />
    </div>
    )
}

export default HeaderBar;