import { makeStyles } from "@material-ui/core";
const useStyle = makeStyles(theme => ({
    creatSeasonInputs: {
        width: "100%",
        padding: "5px",
        border: "none",
        background: "transparent",
        border: "solid gray 1px",
        outline: "none",
        borderRadius: "5px",
    },
    // inputLable: {
    //     fontWeight: "normal"
    // }
    totalPlayers: {
        border: "solid gray 1px",
        height: "500px",
        borderRadius: "15px",
        overflow: "auto",
    },
    singleAvalablePlayer: {
        display: "flex",
        alignItems: "center",
        padding: "8px",

        "&:hover": {
            background: "lightgray",
            cursor: "pointer"
        }
    },
    singleAvalablePlayerAvature: {
        margin: "5px 20px 0 0"
    },
    singleAvalablePlayerName: {
        marginRight: "auto"
    },
    singleAvalablePlayerCheckbox: {
        transform: "scale(2)",
        marginRight: "10PX"
    }
})
)
export default useStyle;