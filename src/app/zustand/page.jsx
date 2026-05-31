import BearCounter from "@/components/bear-counter.jsx";
import Controls from "@/components/controls.jsx";




export default function App() {
  // Никаких Provider не нужно — стор доступен везде
  return (
    <>
      <BearCounter />
      <Controls />
    </>
  );
}
