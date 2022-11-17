import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    profileImage: {
        height: "300px",
        width: "300px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        objectFit: "cover",
        position: "relative",
        margin: "10px"
    },
    changeProfile: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "CENTER",
        alignItems: "center",
        color: "transparent",
        fontWeight: "bolder",
        "&:hover": {
            background: "black",
            color: "white",
            opacity: "50%",
            cursor: "pointer"
        }
    },
    playerDetailsRoot: {
        background: "white",
        width: "100%",
        height: "70vh",
        padding: "20px",
    },
    playerDetailsHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "end",
    },
    playerDetailsHeaderContent: {
        marginLeft: "20px",
    },
    playerImage: {
        height: "300px",
        width: "300px",
        borderRadius: "10px",
        objectFit: "cover",
    },
    playerName: {
        fontSize: "30px",
        fontWeight: "700",
    }
}));


export default useStyles;