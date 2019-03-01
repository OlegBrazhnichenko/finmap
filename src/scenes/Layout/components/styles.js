export const styles = theme => ({
  container: {
    margin: "0 auto",
    [theme.breakpoints.between('sm','md')]: {
      width: "600px",
    },
    [theme.breakpoints.up('md')]: {
      width: "960px",
    },

  }
});
