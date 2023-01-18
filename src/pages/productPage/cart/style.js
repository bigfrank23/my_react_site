import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  toolbar: {
    backgroundColor: "#fff",
  },
  title: {
    marginTop: "5%",
  },
  //   padding: theme.spacing(1),
  //   [theme.breakpoints.down("md")]: {
  //     backgroundColor: theme.palette.secondary.main,
  //   },
  emptyButton: {
    minWidth: "150px",
    marginRight: "20px",
    // [theme.breakpoints.down("xs")]: {
    //   marginBottom: "5px",
    // },
    // [theme.breakpoints.up("xs")]: {
    //   marginRight: "20px",
    // },
  },
  checkoutButton: {
    minWidth: "150px",
    color: '#fff !important',
  },
  link: {
    textDecoration: "none",
  },
  cardDetails: {
    display: "flex",
    marginTop: "10%",
    width: "100%",
    justifyContent: "space-between",
  },
}));
