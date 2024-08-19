"use client";

import { Form, Formik } from "formik";
import * as Yup from "yup";

import { EmailIcon, LockIcon, UserIcon } from "@/_src/components/icons";
import { Button, Input } from "@/_src/components/items";
import { useAuth } from "@/_src/hooks";
import { AuthEndpoint, AuthFormValues } from "@/_src/types";

import s from "./RegisterForm.module.scss";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, "слишком короткое имя").max(11, "слишком длинное имя").required("обязательно к заполнению"),
  email: Yup.string().email("Введите корректный email").required("обязательно к заполнению"),
  password: Yup.string().required("пароль не указан"),
});

export const RegisterForm: React.FC = () => {
  const [fetchRegister, { isLoading }] = useAuth({ endpoint: AuthEndpoint.signUp });

  return (
    <div className={`${s.form} form  ${isLoading ? "loading" : ""}`}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values: AuthFormValues) => fetchRegister(values)}
      >
        {({ errors, touched, values }) => (
          <Form>
            <h1 className={s.title}>Регистрация в Yoldi Agency</h1>
            <Input
              className={s.input}
              error={errors.name && touched.name ? errors.name : null}
              name="name"
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
              disabled={!values.name?.length || !values.email.length || !values.password.length}
            >
              Зарегистрироваться
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
