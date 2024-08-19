import { RegisterForm } from "./ui";

import s from "./RegisterSection.module.scss";

export const RegisterSection: React.FC = () => {
  return (
    <section className={s.section}>
      <RegisterForm />
    </section>
  );
};
