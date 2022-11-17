import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    creatSeasonInputs: {
        padding: "5px",
        border: "none",
        background: "transparent",
        border: "solid gray 1px",
        outline: "none",
        borderRadius: "5px",
        width: "300px",
        margin: "10px"
    },
    addCatogeryBtn: {
        border: "none",
        background: "transparent",
        outline: "none",
        borderRadius: "5px",
        background: "#007CFF",
        width: "20%",
        margin: "10px",
        color: "white",
        fontWeight: "700"
    },
    saveCatogriesBtn: {
        border: "none",
        borderRadius: "5px",
        background: "blue",
        color: "white",
        fontWeight: "700",
        padding: "10px 40px",
        margin: "10px",
        cursor: "pointer"
    }
})

export default useStyles;