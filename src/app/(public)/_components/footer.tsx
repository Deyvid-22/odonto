import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-6 text-center text-gray-500 md:text-base">
      <p>
        Todos os direitos preservados do {new Date().getFullYear()}
        <Link
          href="https://portifolio-27ie.vercel.app"
          className="hover:underline hover:text-gray-800"
        >
          {""} @Deyvid Silva
        </Link>
      </p>
    </footer>
  );
}
