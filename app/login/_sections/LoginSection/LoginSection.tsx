import { LoginForm } from "./ui";

import s from "./LoginSection.module.scss";

export const LoginSection: React.FC = () => {
  return (
    <section className={s.section}>
      <div className={`${s.form} form`}>
        <LoginForm />
      </div>
    </section>
  );
};
