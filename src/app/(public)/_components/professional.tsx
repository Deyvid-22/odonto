import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import fotoImg from "../../../../public/foto1.png";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { User } from "@prisma/client";

interface ProfessionalProps {
  professionals: User[];
}

export function Professional({ professionals }: ProfessionalProps) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-12">
          Clinicas disponiveis
        </h1>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {professionals.map((clinic) => (
            <Card className="overflow-hidden p-0" key={clinic.id}>
              <CardContent className="p-0 hover:shadow-lg">
                <div>
                  <div className="relative h-48">
                    <Image
                      src={clinic.image || fotoImg}
                      alt="Foto do clinico"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-4 min-h-[120px] flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="line-clamp-2 text-sm text-gray-500">
                          {clinic.name}
                        </h3>
                        <p>{clinic.address ?? "Sem Endereço não informado"}</p>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/clinic/${clinic.id}`}
                    className="w-full flex justify-center  bg-green-500 hover:bg-green-400 text-white  py-2 px-4 rounded-md text-sm md:text-base font-medium"
                  >
                    Agendar horário
                    <ArrowRight className="ml-2" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </section>
  );
}
