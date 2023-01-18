import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: "100%",
    padding: '5rem 10rem',
    marginTop: '2rem',
  },
  media: {
    height: 0,
    paddingTop: "50%",
    backgroundSize: '300px',
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
