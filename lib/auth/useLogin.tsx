import { useMutation } from "react-query";
import AuthService from "./AuthService";
import { IEmailAuthVariables } from "./types";

export default function useLogin() {
  return useMutation<unknown, unknown, IEmailAuthVariables>(AuthService.login, {});
}
