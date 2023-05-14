import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Link from "../../utils/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../../components/Copyright";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema, string, object } from "yup";
import FormTextField from "../../components/LoginForm/FormTextField";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import ErrorAlert from "../../components/LoginForm/ErrorAlert";
import LoginButton from "../../components/LoginForm/LoginButton";
import { adminLogin } from "../../store/auth/authAciton";
import { motion, AnimatePresence } from "framer-motion";
import { CssBaseline } from "@mui/material";

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
export default function AdminSignIn() {
  const router = useRouter();
  const { loginStatus, error, isAuthenticated } = useSelector(
    (state: RootState) => state.adminSlice
  );
  const dispatch = useDispatch<AppDispatch>();

  // Use the useForm hook to create a form controller
  const methods = useForm<IFormInput>({
    resolver: yupResolver(formSchema),
  });
  // Define a submit handler for the form
  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    dispatch(adminLogin(data));
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin-manager");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 1 }}
            >
              <Container component="main" maxWidth="xs">
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
                    Admin Sign In
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
                            Forgot Password?
                          </Link>
                        </Grid>

                        {/* Don't have an account? Sign Up */}
                        <Grid item>
                          <Link href="/" variant="body2">
                            {"Go to Home Page"}
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </FormProvider>
                </Box>
              </Container>
            </motion.div>
          </AnimatePresence>
        </Box>
        <Copyright />
      </Box>
    </>
  );
}
