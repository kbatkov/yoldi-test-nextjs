import { List } from "./ui";

import s from "./ListSection.module.scss";

export const ListSection = () => {
  return (
    <section>
      <div className="container">
        <h1 className={s.title}>Список аккаунтов</h1>
        <List />
      </div>
    </section>
  );
};
