import Container from "@/components/UI/Container";
import { Navbar } from "@/components/UI/Navber";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Container>{children}
      <p>Footer</p>
      </Container>
    </>
  );
}
