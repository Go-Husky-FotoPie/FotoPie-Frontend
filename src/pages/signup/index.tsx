import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import Copyright from "../../components/Copyright";
import FormTextField from "../../components/LoginForm/FormTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema, string, object } from "yup";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar/NavBar";
import { NavBarStyles } from "../../components/NavBar/NavbarBaseline.style";
import { signUp } from "../../axiosRequest/api/user";
import { motion, AnimatePresence } from "framer-motion";
import { CssBaseline } from "@mui/material";

// Define a type with the shape of the form values
interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Define a schema for the form values
const formSchema: Schema<IFormInput> = object({
  firstName: string().max(15).required("First Name is a required."),
  lastName: string().max(15).required("Last Name is a required."),
  email: string().email().required("Email is a required."),
  password: string()
    .min(8)
    .max(20)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
      "Password must contain numbers, upper and lowercase letters"
    )
    .required("Password is required"),
});

// Define a component that renders the form
export default function SignUp() {
  const router = useRouter();
  const methods = useForm<IFormInput>({
    resolver: yupResolver(formSchema),
  });

  // Define a submit handler for the form
  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    try {
      const response = await signUp(data);

      if (response.status === 200) {
        router.push("/verifyemail");
      }
    } catch (error) {
      alert("Email is already been used,please go to the login page.");
    }
  };

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
              <div>
                <NavBar
                  isFixed={false}
                  color="#000000"
                  baseLine={NavBarStyles}
                />
                <Container component="main" maxWidth="xs">
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
                      Sign Up
                    </Typography>
                    <FormProvider {...methods}>
                      <Box
                        component="form"
                        onSubmit={methods.handleSubmit(onSubmit)}
                        sx={{ mt: 3 }}
                      >
                        <FormTextField
                          name="firstName"
                          label="First Name"
                          id="firstName"
                          autoComplete="fistName"
                        />
                        <FormTextField
                          name="lastName"
                          label="Last Name"
                          id="lastName"
                          autoComplete="lastName"
                        />
                        <FormTextField
                          name="email"
                          label="Email Address"
                          id="email"
                          autoComplete="email"
                        />
                        <FormTextField
                          name="password"
                          label="Password"
                          id="password"
                          type="password"
                          autoComplete="current-password"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              value="allowExtraEmails"
                              color="primary"
                            />
                          }
                          label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Sign UP
                          <Link href="verifyemail"></Link>
                        </Button>
                        <Grid container justifyContent="flex-end">
                          <Grid item>
                            <Link href="login" variant="body2">
                              Already have an account? Log in
                            </Link>
                          </Grid>
                        </Grid>
                      </Box>
                    </FormProvider>
                  </Box>
                </Container>
              </div>
            </motion.div>
          </AnimatePresence>
        </Box>
        <Copyright />
      </Box>
    </>
  );
}
