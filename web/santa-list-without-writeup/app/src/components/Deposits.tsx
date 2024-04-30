import Typography from "@mui/material/Typography";
import Title from "./Title";

export default function Deposits() {
  return (
    <>
      <Title>YTD gift budget</Title>
      <Typography component="p" variant="h4">
        $83,097,110,116.97
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {new Date().toLocaleDateString()}
      </Typography>
    </>
  );
}
