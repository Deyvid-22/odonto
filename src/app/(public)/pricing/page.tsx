"use client";

import { Button } from "@/components/ui/button";
import { Header } from "../_components/header";
import { signIn } from "next-auth/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="bg-white text-gray-800 mt-20">
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10">
              Planos que cabem no seu bolso
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow p-6 space-y-4 border">
                <h3 className="text-xl font-semibold">Básico</h3>
                <p className="text-gray-600">Teste gratuito</p>
                <p className="text-3xl font-bold">R$ 0</p>
                <ul className="text-left space-y-2 text-sm text-gray-700">
                  <li>✓ 3 dias de teste</li>
                </ul>
                <Dialog>
                  <DialogTrigger className="w-full" asChild>
                    <Button className="w-full">Começar grátis</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Fazer login</DialogTitle>
                      <DialogDescription>
                        Para continuar, faca login ou cadastre-se
                      </DialogDescription>
                    </DialogHeader>
                    <Button
                      onClick={() =>
                        signIn("google", { callbackUrl: "/dashboard" })
                      }
                    >
                      Fazer login
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="bg-white rounded-xl shadow-lg border-2 border-emerald-500 p-6 space-y-4">
                <h3 className="text-xl font-semibold">Profissional</h3>
                <p className="text-gray-600">
                  {" "}
                  Ideal para profissionais autônomos
                </p>
                <p className="text-3xl font-bold">R$ 38,90/mês</p>
                <ul className="text-left space-y-2 text-sm text-gray-700">
                  <li>✓ Até 3 serviços</li>
                  <li>✓ Agendamentos ilimitados</li>
                  <li>✓ Suporte</li>
                </ul>
                <Dialog>
                  <DialogTrigger className="w-full" asChild>
                    <Button className="w-full"> Assinar</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Fazer login</DialogTitle>
                      <DialogDescription>
                        Para continuar, faca login ou cadastre-se
                      </DialogDescription>
                    </DialogHeader>
                    <Button
                      onClick={() =>
                        signIn("google", { callbackUrl: "/dashboard/plans" })
                      }
                    >
                      Fazer login
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="bg-white rounded-xl shadow p-6 space-y-4 border">
                <h3 className="text-xl font-semibold">Premium</h3>
                <p className="text-gray-600">Para grandes clínicas e redes</p>
                <p className="text-3xl font-bold">R$ 98,90/mês</p>
                <ul className="text-left space-y-2 text-sm text-gray-700">
                  <li>✓ Até 8 serviços</li>
                  <li>✓ Agendamentos ilimitados</li>
                  <li>✓ Suporte prioritario</li>
                  <li>✓ relatatorios avançados</li>
                </ul>
                <Dialog>
                  <DialogTrigger className="w-full" asChild>
                    <Button className="w-full"> Assinar</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Fazer login</DialogTitle>
                      <DialogDescription>
                        Para continuar, faca login ou cadastre-se
                      </DialogDescription>
                    </DialogHeader>
                    <Button
                      onClick={() =>
                        signIn("google", { callbackUrl: "/dashboard/plans" })
                      }
                    >
                      Fazer login
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </section>

        {/* QUEM SOMOS */}
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
