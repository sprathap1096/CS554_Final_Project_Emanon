import { SubmitHandler, useForm } from "react-hook-form";

import useAuthContext from "@App/lib/auth/AuthContext";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

import LoginIcon from "@mui/icons-material/Login";
import useLogin from "@App/lib/auth/useLogin";
import { Box, Button, TextField } from "@mui/material";
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
  const { currentUser } = useAuthContext();
  const { mutate: login, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors: formError },
  } = useForm<IEmailAuthVariables>({
    mode: "onSubmit",
    resolver: yupResolver(inputValidationSchema),
  });

  const onSubmit: SubmitHandler<IEmailAuthVariables> = (data) => {
    const { email, password } = data;
    login({ email, password });
  };

  return (
    <UnAuthGuard>
      <Box>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <>
              <div>
                <h1>Digital Coach</h1>
              </div>
              <h2>Login</h2>
              {error && <p>error</p>}
              <h3>Email</h3>
              <TextField type="email" placeholder="" {...register("email")} />
              {formError.email && <span>{formError.email.message}</span>}
              <h3>Password</h3>
              <TextField
                type="password"
                autoComplete="on"
                placeholder=""
                {...register("password")}
              />
              {formError.password && <span>{formError.password.message}</span>}

              <Button type="submit">
                <LoginIcon />
                Login
              </Button>
              <Link href="/auth/signup">
                <a>New user? sign up</a>
              </Link>
            </>
          </form>
        </div>
      </Box>
    </UnAuthGuard>
  );
}
