import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  // toolbar: theme.mixins.toolbar,
  layout: {
    padding: '0rem 7rem',
    marginTop: "5%",
    width: "auto",
    // marginLeft: theme.spacing(2),
    marginLeft: '2px',
    // marginRight: theme.spacing(2),
    marginRight: '2px',
    // [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
    //   width: 600,
    //   marginLeft: "auto",
    //   marginRight: "auto",
    // },
  },
  paper: {
    marginTop: '3px',
    marginBottom: '3px',
    padding: '2px',
    // marginTop: theme.spacing(3),
    // marginBottom: theme.spacing(3),
    // padding: theme.spacing(2),
    // [theme.breakpoints.down("xs")]: {
    //   width: "100%",
    //   marginTop: 60,
    // },
    // [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
    //   marginTop: theme.spacing(6),
    //   marginBottom: theme.spacing(6),
    //   padding: theme.spacing(3),
    // },
  },
  stepper: {
    // padding: theme.spacing(3, 0, 5),
    padding: '1rem',
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: '3px',
    marginLeft: '1px',
    // marginTop: theme.spacing(3),
    // marginLeft: theme.spacing(1),
  },
  divider: {
    margin: "20px 0",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
