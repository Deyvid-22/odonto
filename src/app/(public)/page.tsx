import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Professional } from "./_components/professional";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div>
        <Hero />
        <Professional />
      </div>
    </main>
  );
}
