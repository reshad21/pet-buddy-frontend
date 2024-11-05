import Allpost from "@/components/modules/admin-profile/Allpost";
import ProfileIntro from "@/components/modules/Profile/ProfileIntro";

export default function Adminpage() {
  return (
    <div className="container mx-auto p-4">
      <ProfileIntro />
      <Allpost />
    </div>
  );
}
