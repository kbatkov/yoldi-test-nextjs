export interface AuthFormValues {
  name?: string;
  email: string;
  password: string;
}

export enum AuthEndpoint {
  login = "login",
  signUp = "sign-up",
}
