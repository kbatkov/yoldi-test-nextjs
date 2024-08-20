export interface AuthFormValues {
  name?: string;
  email: string;
  password: string;
}

export interface EditProfileFormValues {
  slug: string;
  name: string;
  description: string;
}

export enum AuthEndpoint {
  login = "login",
  signUp = "sign-up",
}

export type Image = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export type Cover = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export type UserType = {
  name: string;
  email: string;
  slug: string;
  image: Image | null;
  cover: Cover | null;
  description: string | null;
};

export enum Modals {
  EditProfileForm = "EditProfileForm",
}
