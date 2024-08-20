import { getList } from "@/_src/actions/server-fetchers";
import { UserCard } from "@/_src/components/cards";

import s from "./List.module.scss";

export const List = async () => {
  const data = await getList();

  return <div className={s.wrapper}>{data && data.map((user, key) => <UserCard key={key} {...user} />)}</div>;
};
