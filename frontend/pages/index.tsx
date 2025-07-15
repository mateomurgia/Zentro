import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center min-h-screen py-12">
      <div className="bg-white rounded-2xl shadow-lg p-10 border border-[#A5D6A7] flex flex-col items-center w-full">
        <Image
          src="/logo-zentropack.png"
          alt="Zentro Pack Logo"
          width={120}
          height={120}
          className="mb-5"
          priority
        />
        <h1 className="text-4xl font-extrabold text-[#2E7D32] mb-4 text-center">
          Bienvenido a Zentro Fulfillment
        </h1>
        <p className="text-lg text-[#1E293B] mb-8 text-center">
          Soluciones logísticas y de fulfillment que garantizan eficiencia, control y seguridad para tu empresa.
        </p>
        <Link href="/inventory">
          <button className="bg-[#2E7D32] hover:bg-[#256427] text-white font-bold px-6 py-2 rounded-xl shadow transition duration-200">
            Ir al inventario
          </button>
        </Link>
      </div>
      <div className="mt-8 text-gray-500 text-center text-sm">
        &copy; {new Date().getFullYear()} Zentro Fulfillment. Logística profesional, confianza garantizada.
      </div>
    </div>
  );
}
