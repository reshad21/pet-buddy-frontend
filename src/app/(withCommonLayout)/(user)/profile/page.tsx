import ProfileIntro from "@/components/modules/Profile/ProfileIntro";
import ProfilePost from "@/components/modules/Profile/ProfilePost";

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4">
      <ProfileIntro />
      <ProfilePost />
    </div>
  );
}
