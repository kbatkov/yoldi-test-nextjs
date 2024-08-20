import { LoginForm } from "./ui";

import s from "./LoginSection.module.scss";

export const LoginSection: React.FC = () => {
  return (
    <section className={s.section}>
      <div className={`container ${s.container}`}>
        <LoginForm />
      </div>
    </section>
  );
};
