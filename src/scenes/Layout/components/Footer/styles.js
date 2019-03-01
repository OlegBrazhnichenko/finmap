export const styles = theme =>({
  footer: {
    backgroundColor: "#252525",
    color: "#999999",

  },
  footerContent: {
    margin: "0 auto",
    paddingTop: "50px",
    [theme.breakpoints.between('sm','md')]: {
      width: "600px",
    },
    [theme.breakpoints.up('md')]: {
      width: "960px",
    },
  },
  finMapLogo: {
    fontWeight: 900,
    textTransform: "uppercase",
    lineHeight: 1.2,
    color: "#fff",
  },
  links: {
    paddingTop: "60px",
  }
});
