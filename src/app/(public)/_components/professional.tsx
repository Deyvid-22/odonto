import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import fotoImg from "../../../../public/foto1.png";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Professional() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-12">
          Clinicas disponiveis
        </h1>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="overflow-hidden p-0">
            <CardContent className="p-0">
              <div>
                <div className="relative h-48">
                  <Image
                    src={fotoImg}
                    alt="Foto do clinico"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm text-gray-500">Clinica centro</h3>
                      <p>Rua x centro, Campo Grande - MS</p>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full  bg-green-500"></div>
                  </div>
                </div>
                <Link
                  href="/clinic"
                  className="w-full flex justify-center  bg-green-500 hover:bg-green-400 text-white  py-2 px-4 rounded-md text-sm md:text-base font-medium"
                >
                  Agendar horário
                  <ArrowRight className="ml-2" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </section>
  );
}
