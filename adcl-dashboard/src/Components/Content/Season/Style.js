import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    tableRoot: {
        width: "100%", margin: "auto",
    },
    tableRow: {
        background: "white", cursor: "pointer",
        margin: "10px",
        borderBottom: "1px solid #ddd",
        textAlign: "center",
        "&:hover": {
            background: "lightgray"
        }
    }
});

export default useStyles;