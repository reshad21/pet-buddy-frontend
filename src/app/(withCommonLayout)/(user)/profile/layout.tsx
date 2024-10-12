import Container from "@/components/UI/Container";
import Sidebar from "@/components/UI/Sidebar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <div className="my-3 flex flex-col lg:flex-row w-full gap-8">
        <div className="w-full lg:w-2/5">
          <Sidebar />
        </div>
        <div className="w-full lg:w-3/5">{children}</div>
      </div>
    </Container>
  );
}
