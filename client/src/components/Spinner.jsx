import { CircularProgress, Box } from "@mui/material";

const Spinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "3rem",
      }}
    >
      <CircularProgress style={{ color: "#854BFF" }} />
    </Box>
  );
};

export default Spinner;
