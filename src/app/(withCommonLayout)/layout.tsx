import Container from "@/components/UI/Container";
import Footer from "@/components/UI/Footer";
import { Navbar } from "@/components/UI/Navber";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <Container>
        {children}
        <Footer />
      </Container>
    </div>
  );
}
