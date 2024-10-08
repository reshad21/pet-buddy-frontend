import { Navbar } from "@/components/UI/Navber";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <p>Footer</p>
    </>
  );
}
