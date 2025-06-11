import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Professionals as Professional } from "./_components/professional";
import { getProfessionals } from "./_data-acess/get-professional";

export const revalidate = 0;

export default async function Home() {
  const professionals = await getProfessionals();
  console.log(professionals);
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div>
        <Hero />

        <Professional professionals={professionals} />

        <Footer />
      </div>
    </main>
  );
}
