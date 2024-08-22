"use client";

import { useContext, useEffect } from "react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

import { Button, Input } from "@/_src/components/items";
import { routes } from "@/_src/constants";
import { useGetProfileSWR } from "@/_src/hooks";
import { useEditUser } from "@/_src/hooks/useEditUser";
import { ModalContext } from "@/_src/providers/modal-context";
import { EditProfileFormValues } from "@/_src/types";

import s from "./EditProfileForm.module.scss";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("не может быть пустым").max(11, "слишком длинное имя"),
  slug: Yup.string().required("не может быть пустым").max(11, "слишком длинная ссылка"),
});

export const EditProfileForm: React.FC = () => {
  const { data, mutate } = useGetProfileSWR({});
  const { closeModal } = useContext(ModalContext);
  const [fetchEdit, { data: editData, isLoading }] = useEditUser();
  const router = useRouter();

  useEffect(() => {
    if (editData) {
      closeModal();
      mutate();
      router.push(`${routes.account.path}/${editData.data?.slug}`);
    }
  }, [editData]);

  return (
    <div className={`${s.form} form  ${isLoading ? "loading" : ""}`}>
      <Formik
        initialValues={{
          name: data?.name || "",
          slug: data?.slug || "",
          description: data?.description || "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values: EditProfileFormValues) => {
          fetchEdit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className={s.form_body}>
            <h1 className={s.title}>Редактировать профиль</h1>
            <div className={s.item}>
              <p className={s.label}>Имя</p>
              <Input
                className={s.input}
                error={errors.name && touched.name ? errors.name : null}
                name="name"
                type="text"
              ></Input>
            </div>
            <div className={s.item}>
              <p className={s.label}>Адрес профиля</p>
              <Input
                className={s.input}
                error={errors.slug && touched.slug ? errors.slug : null}
                name="slug"
                type="slug"
              ></Input>
            </div>
            <div className={s.item}>
              <p className={s.label}>Описание</p>
              <Input
                className={s.input}
                error={errors.description && touched.description ? errors.description : null}
                name="description"
                type="text"
                component="textarea"
              ></Input>
            </div>
            <div className={s.buttons}>
              <Button onClick={() => closeModal()} className={s.btn} style="secondary">
                Отмена
              </Button>
              <Button className={s.btn} type="submit">
                Сохранить
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
