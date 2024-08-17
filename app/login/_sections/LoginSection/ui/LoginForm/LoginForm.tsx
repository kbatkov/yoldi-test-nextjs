"use client";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { EmailIcon, LockIcon } from "@/_src/components/icons";
import { Button, Input } from "@/_src/components/items";

import s from "./LoginForm.module.scss";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Введите корректный email").required("обязательно к заполнению"),
});

export const LoginForm: React.FC = () => {
  return (
    <div>
      <Formik
        initialValues={{
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
            <h1 className={s.title}>Вход в Yoldi Agency</h1>
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
            <Button className={s.btn} type="submit" disabled={!values.email.length || !values.password.length}>
              Войти
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
