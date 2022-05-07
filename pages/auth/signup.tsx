import { SubmitHandler, useForm } from "react-hook-form";

import useAuthContext from "@App/lib/auth/AuthContext";
import styles from "@App/styles/LoginPage.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Link from "next/link";
import UnAuthGuard from "@App/lib/auth/UnAuthGuard";

import HowToRegIcon from "@mui/icons-material/HowToReg";
import useSignUp from "@App/lib/auth/useSignUp";
import { IEmailAuthVariables } from "@App/lib/auth/types";
import { Box, Button, TextField } from "@mui/material";

interface LoginFormInputs extends IEmailAuthVariables {
  passwordConfirm: string;
}

const inputValidationSchema = yup
  .object({
    email: yup
      .string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: yup.string().min(7).max(255).required("Password is required"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

export default function SignUpPage() {
  const { currentUser } = useAuthContext();
  const { mutate: signup, error } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors: formError },
  } = useForm<LoginFormInputs>({
    mode: "onSubmit",
    resolver: yupResolver(inputValidationSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    const { passwordConfirm, ...emailAuthVariables } = data;
    signup(emailAuthVariables);
  };

  return (
    <UnAuthGuard>
      <Box>
        <div className={styles.loginBox}>
          <h1>{currentUser?.id}</h1>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.logo}>
              <h1>Digital Coach</h1>
            </div>
            <h2>Register an Account</h2>
            <h3>Email</h3>
            <TextField type="email" placeholder="" {...register("email")} />
            {formError.email && (
              <p className={styles.issue}>{formError.email.message}</p>
            )}
            <h3>Password</h3>
            <TextField
              type="password"
              autoComplete="on"
              placeholder=""
              {...register("password")}
            />
            {formError.password && (
              <p className={styles.issue}>{formError.password.message}</p>
            )}
            <h3>Confirm Password</h3>

            <TextField
              type="password"
              autoComplete="on"
              placeholder=""
              {...register("passwordConfirm")}
            />
            {formError.passwordConfirm && (
              <p className={styles.issue}>
                {formError.passwordConfirm.message}
              </p>
            )}

            <Button type="submit">
              <HowToRegIcon />
              Register
            </Button>
            <Link href="/auth/login">
              <a>Have an account? log in</a>
            </Link>
          </form>
        </div>
      </Box>
    </UnAuthGuard>
  );
}
