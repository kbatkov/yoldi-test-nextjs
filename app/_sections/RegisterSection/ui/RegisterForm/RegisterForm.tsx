"use client";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { EmailIcon, LockIcon, UserIcon } from "@/_src/components/icons";
import { Button, Input } from "@/_src/components/items";

import s from "./RegisterForm.module.scss";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "слишком короткое имя")
    .max(11, "слишком длинное имя")
    .required("обязательно к заполнению"),
  email: Yup.string().email("Введите корректный email").required("обязательно к заполнению"),
  password: Yup.string()
    .required("пароль не указан")
    .min(8, "Пароль слишком короткий")
    .matches(
      /^(?=.*[a-zA-Zа-яА-Я])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/,
      "должен содержать буквы, цифры и символы",
    ),
});

export const RegisterForm: React.FC = () => {
  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <h1 className={s.title}>Регистрация в Yoldi Agency</h1>
            <Input
              className={s.input}
              error={errors.username && touched.username ? errors.username : null}
              name="username"
              type="text"
              placeholder="Имя"
            >
              <UserIcon />
            </Input>
            <Input
              className={s.input}
              error={errors.email && touched.email ? errors.email : null}
              name="email"
              type="email"
              placeholder="E-mail"
            >
              <EmailIcon />
            </Input>
            <Input
              className={s.input}
              error={errors.password && touched.password ? errors.password : null}
              name="password"
              type="password"
              placeholder="Пароль"
            >
              <LockIcon />
            </Input>
            <Button
              className={s.btn}
              type="submit"
              disabled={!values.username.length || !values.email.length || !values.password.length}
            >
              Создать аккаунт
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
