import { getUser } from "@/_src/actions/server-fetchers";

import { ProfileSection } from "./_sections/ProfileSection/ProfileSection";
import { Background } from "./_ui";

const Account = async ({ params }: { params: { slug: string } }) => {
  const user = await getUser({ slug: params.slug[0] });

  return (
    <>
      <Background cover={user.cover} />
      <ProfileSection user={user} />
    </>
  );
};

export default Account;
