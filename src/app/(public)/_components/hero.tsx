import { Button } from "@/components/ui/button";
import Image from "next/image";
import doctorImg from "../../../../public/doctor-hero.png";

export function Hero() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8">
        <main className="flex items-center justify-center">
          <article className="flex-[2] max-w-3xl space-y-8 flex flex-col justify-center">
            <h1 className="font-bold text-4xl lg:text-5xl max-w-2xl tracking-tight">
              Encontre os melhores profissionais em um único local!
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Nós somos uma plataforma para profissionais de saúde com foco em
              agilizar seu atendimento de forma simples e organizada
            </p>
            <Button className="w-fit px-5 font-bold bg-emerald-500 hover:bg-emerald-400">
              Encontre uma clinica
            </Button>
          </article>

          <div className="hidden lg:block">
            <Image
              src={doctorImg}
              alt="Foto ilustrativa de um profissional de saude"
              width={340}
              height={400}
              objectFit="contain"
              quality={100}
              priority={true}
            />
          </div>
        </main>
      </div>
    </section>
  );
}
