import Container from "@/components/UI/Container";
import Sidebar from "@/components/UI/Sidebar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <div className="my-3 flex flex-col lg:flex-row w-full gap-4">
        <div className="w-full lg:w-1/4">
          <Sidebar />
        </div>
        <div className="w-full lg:w-3/4">{children}</div>
      </div>
    </Container>
  );
}
