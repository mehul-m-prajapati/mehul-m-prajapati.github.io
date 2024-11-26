import Hero from "@/components/hero";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full h-full rounded-2xl sm:border flex flex-wrap justify-between lg:divide-x">
            <div className="w-full lg:w-2/5 p-2 md:p-8 lg:h-full lg:overflow-y-scroll">
                <Hero />
            </div>
            <div
            id="tab-section"
            className="relative w-full mt-3 max-w-4xl mx-auto lg:mt-0 lg:h-full lg:w-3/5 p-2 md:p-8 lg:overflow-y-scroll"
            >
                <Navbar />
            </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
