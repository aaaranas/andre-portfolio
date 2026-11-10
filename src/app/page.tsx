import Desktop from "@/components/os/Desktop";
import Cursor from "@/components/Cursor";
import { getSummary } from "@/lib/summary";

export default function Home() {
  // Computed here, on the server, so the client shell never has to import the
  // data modules just to count what is in them.
  const summary = getSummary();
  return (
    <>
      <Cursor />
      <Desktop summary={summary} />
    </>
  );
}
