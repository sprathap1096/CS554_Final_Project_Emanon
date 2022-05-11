import { SubmitHandler, useForm } from "react-hook-form";

import useAuthContext from "@App/lib/auth/AuthContext";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

import LoginIcon from "@mui/icons-material/Login";

import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import UnAuthGuard from "@App/lib/auth/UnAuthGuard";
import { IEmailAuthVariables } from "@App/lib/auth/types";

const inputValidationSchema = yup
  .object({
    email: yup
      .string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: yup.string().max(255).required("Password is required"),
  })
  .required();

export default function LoginPage() {
  const { currentUser, login, error } = useAuthContext();
  // const { mutate: login, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors: formError },
  } = useForm<IEmailAuthVariables>({
    mode: "onSubmit",
    resolver: yupResolver(inputValidationSchema),
  });

  const onSubmit: SubmitHandler<IEmailAuthVariables> = ({ password, email }) =>
    login(email, password);

  return (
    <UnAuthGuard>
      <Container>
        <Box
          display="flex"
          width="100%"
          height="95vh"
          justifyContent="center"
          alignItems="center"
        >
          <Paper>
            <Box padding={3} minWidth="400px">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" flexDirection="column" gap={3}>
                  <>
                    <Typography variant="h2">Login</Typography>

                    <TextField
                      type="email"
                      placeholder="Email"
                      {...register("email")}
                    />
                    {formError.email && (
                      <Typography>{formError.email.message}</Typography>
                    )}

                    <TextField
                      type="password"
                      autoComplete="on"
                      placeholder="Password"
                      {...register("password")}
                    />

                    {formError.password && (
                      <Typography>{formError.password.message}</Typography>
                    )}

                    {error && <Typography>error</Typography>}
                    <Button type="submit" variant="outlined">
                      Login
                    </Button>

                    <Link href="/auth/signup">
                      <a>New user? sign up</a>
                    </Link>
                  </>
                </Box>
              </form>
            </Box>
          </Paper>
        </Box>
      </Container>
    </UnAuthGuard>
  );
}
