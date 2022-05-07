import { useMutation } from "react-query";
import AuthService from "./AuthService";
import { IEmailAuthVariables } from "./types";

export default function useSignUp() {
  return useMutation<unknown, unknown, IEmailAuthVariables>(
    AuthService.signup,
    {}
  );
}
