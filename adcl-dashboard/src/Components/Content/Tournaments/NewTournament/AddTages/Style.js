import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    addTageRoot: {
        marginTop: "40px",
        margin: "10px"
    },
    addTageRootInput: {
        border: "solid black 1px",
        display: "flex",
        flexWrap: "wrap",
        padding: "10px",
        margin: "auto",
        borderRadius: "5px",
    },
    theRealInput: {
        border: "none",
        outline: "none",
    },
    singleTag: {
        background: "#5830E0",
        color: "white",
        borderRadius: "2px",
        padding: "2px 10px",
        margin: "5px",
        display: "flex",
        flexDirection: "row",
    },
    singleTagClose: {
        marginLeft: "17px",
        fontWeight: "bold"
    }
}))

export default useStyles