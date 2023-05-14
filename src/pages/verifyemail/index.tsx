import Link from "next/link";
import { Alert } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Copyright from "../../components/Copyright";

export default function VerifyEmail() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h6">
          Verify Your Email Address
        </Typography>

        <Alert severity="info">
          Before proceeding, please check your email for a validation link. If
          you did not receive the email,
          <Link
            // underline="hover"
            color="inherit"
            href="/signup"
          >
            {"click here to request another."}
          </Link>
        </Alert>

        <Button
          href="/login"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Log In
        </Button>
      </Box>
      <Copyright />
    </Container>
  );
}
