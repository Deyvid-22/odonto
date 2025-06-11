import { Header } from "../_components/header";
import { Professionals as Professional } from "../_components/professional";
import { getProfessionals } from "../_data-acess/get-professional";
export default async function HomePage() {
  const professionals = await getProfessionals();

  return (
    <>
      <Header />
      <main className="bg-white text-gray-800 mt-20">
        <Professional professionals={professionals} />

        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Quem somos</h2>
            <p className="text-gray-600 text-lg">
              Somos uma startup apaixonada por tecnologia e saúde. Criamos
              soluções que ajudam clínicas a se organizarem, crescerem e
              oferecerem uma experiência digital de qualidade aos seus
              pacientes.
            </p>
            <p className="text-gray-600">
              Nosso objetivo é facilitar a vida dos profissionais da saúde com
              uma ferramenta intuitiva, segura e acessível.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
