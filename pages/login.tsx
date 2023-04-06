import { useEffect } from "react";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { Schema, string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "../src/utils/Link";

import Copyright from "../src/components/Copyright";
import FormTextField from "../src/components/LoginForm/FormTextField";
import { AppDispatch, RootState } from "../store/store";
import { login } from "../store/auth/authAciton";
import LoginButton from "../src/components/LoginForm/LoginButton";
import ErrorAlert from "../src/components/LoginForm/ErrorAlert";
import NavBar from "../src/components/NavBar/NavBar";
import { NavBarStyles } from "../src/components/NavBar/NavbarBaseline.style";
import UploadPage from "../src/components/Upload/UploadPage";

// Define a type with the shape of the form values
export interface IFormInput {
  email: string;
  password: string;
}

// Define a schema for the form values
const formSchema: Schema<IFormInput> = object({
  email: string().email().required(),
  password: string().min(2).max(20).required(),
});

// Define a component that renders the form
export default function LogIn() {
  const router = useRouter();
  const { loginStatus, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();

  // Use the useForm hook to create a form controller
  const methods = useForm<IFormInput>({
    resolver: yupResolver(formSchema),
  });
  // Define a submit handler for the form
  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <UploadPage>
      <Container component="main" maxWidth="xs" sx={{ mt: 20,mb:20 }}>
        {/* error handling*/}
        {error && <ErrorAlert error={error}></ErrorAlert>}
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* login icon */}
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          {/* input Form */}
          <FormProvider {...methods}>
            <Box
              component="form"
              onSubmit={methods.handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              {/* Email */}
              <FormTextField
                name="email"
                label="Email Address"
                id="email"
                autoComplete="email"
              />
              {/* Password */}
              <FormTextField
                name="password"
                label="Password"
                id="password"
                type="password"
                autoComplete="current-password"
              />
              {/* TODO: add remember checkbox */}
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              {/* Button */}
              <LoginButton loginStatus={loginStatus}></LoginButton>
              <Grid container>
                {/* Forgot password? */}
                <Grid item xs>
                  <Link href="/reset/reset-request" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                {/* Don't have an account? Sign Up */}
                <Grid item>
                  <Link href="signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </FormProvider>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
        </UploadPage>
    </>
  );
}
