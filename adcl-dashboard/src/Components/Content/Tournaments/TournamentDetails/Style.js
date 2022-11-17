import { makeStyles } from "@material-ui/core";

const useState = makeStyles({
    tournamentDetailsRoot: {
        background: "white",
        width: "100%",
    },
    TournamentDetailsTeamsGroup: {
        display: "flex", flexDirection: "column", width: "100%"
    },
    TournamentDetailsTeams: {
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        "&:hover": { background: "lightGray" }
    },
    singleSponser: {
        border: "solid #BA6A27 1px", fontWeight: "600",
        margin: "5px", padding: "5px 20px", color: "gray",
        borderRadius: "3px",
        "&:hover": {
            background: "#BA6A27",
            color: "white",
            cursor: "pointer",
        }
    },
    singleMatch: {
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "green",
            color: "white"
        }
    },
    TournamentDetailsSponsers: {
        margin: "50px 20px",
    }
})

export default useState;