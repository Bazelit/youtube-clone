import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Профиль: ...",
};

type ProfilePageProps = {
  params: Promise<{ profileId: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const data = await params;
  const profileId = data.profileId;

  console.log('profileId', profileId);

  return (
    <div>
      ProfilePage: {profileId}
    </div>
  );
}
