import { UserType } from "@/_src/types";

import { ProfileBody } from "../../_ui";

import s from "./ProfileSection.module.scss";

export const ProfileSection = ({ user }: { user: UserType }) => {
  return (
    <section className={s.section}>
      <div className="container">
        <ProfileBody user={user} />
      </div>
    </section>
  );
};
