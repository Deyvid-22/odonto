import Link from "next/link";

export function LabelSubscription({ expired }: { expired: boolean }) {
  return (
    <div className="bg-red-500 text-white text-sm md:text-base px-3 py-2 my-4 rounded-md flex flex-col md:flex-row justify-between gap-2">
      <div>
        {expired ? (
          <h3 className="font-semibold">
            Seu plano expirou, ou você não possui um plano
          </h3>
        ) : (
          <h3 className="font-semibold">Você exedeu o limite do seu plano</h3>
        )}
        <p className="text-xs text-gray-200">
          Acesse o seu plano para verificar os detalhes
        </p>
      </div>
      <Link
        href="/dashboard/plans"
        className="bg-zinc-900 text-white px-5 py-2 rounded-md  w-fit"
      >
        Acessar planos
      </Link>
    </div>
  );
}
