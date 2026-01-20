import C4Simulator from "@/components/C4Simulator";

export default function Home() {
  return (
    <div className="min-h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 font-sans">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <C4Simulator />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-stone-500 text-sm">
        <p>CS 1.6 C4 Simulator - For Recreation Only</p>
      </footer>
    </div>
  );
}
