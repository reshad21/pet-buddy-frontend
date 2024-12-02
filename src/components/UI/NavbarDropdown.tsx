"use client";

import { useUser } from "@/context/user.provider"; // Adjust to your actual context path
import { logout } from "@/services/AuthService"; // Keep your `logout` function intact
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter, useSearchParams } from "next/navigation";

export default function NavbarDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const { user, setUser, setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    userLoading(true);
    try {
      logout(); // Your logout function as is
      setUser(null); // Clear user context
      router.replace(redirect || "/"); // Redirect to home or specified page
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      userLoading(false);
    }
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" src={user?.profilePhoto} />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions">
        <DropdownItem onClick={() => handleNavigation("/profile")}>
          Dashboard
        </DropdownItem>
        <DropdownItem onClick={() => handleNavigation("/profile/settings")}>
          Settings
        </DropdownItem>
        <DropdownItem onClick={() => handleNavigation("/profile/create-post")}>
          Create Post
        </DropdownItem>
        <DropdownItem onClick={() => handleNavigation("/change-password")}>
          Change Password
        </DropdownItem>
        <DropdownItem
          onClick={handleLogout}
          key="logout"
          className="text-danger"
          color="danger"
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
