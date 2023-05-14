import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { Schema, string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { createResetRequest } from "../../axiosRequest/api/reset";
import Link from "../../utils/Link";
import FormTextField from "../LoginForm/FormTextField";
import { useState } from "react";
import ErrorAlert from "../LoginForm/ErrorAlert";

interface IFormEmail {
  email: string;
}

const formSchema: Schema<IFormEmail> = object({
  email: string().email().required(),
});

const ResetRequest = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);

  const methods = useForm<IFormEmail>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<IFormEmail> = async (data) => {
    try {
      // Send POST request to api/reset/resetRequest
      await createResetRequest(data);

      router.push("/reset/email-sent");
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {errorMessage && <ErrorAlert error={errorMessage} />}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <FormProvider {...methods}>
          <Box
            component="form"
            sx={{ mt: 3 }}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormTextField
                  name="email"
                  label="Email Address"
                  id="email"
                  autoComplete="email"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Verification
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <p>
                  Please click the link in the email to verify your identity
                </p>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  Need to login? Click here
                </Link>
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default ResetRequest;
