"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Si la sesión está cargando, evita que el código se ejecute
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const handleDashboardClick = () => {
    // Verificamos si la sesión está disponible y no ha expirado
    if (session && new Date(session.expires) > new Date()) {
      router.push("/dashboard");
    } else {
      alert("Debes iniciar sesión para acceder al dashboard.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500 p-6">
      <h1 className="text-3xl font-bold mb-6">Página de Inicio - Registro, Login y Acceso Condicional al Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Botón de registro */}
        <button
          onClick={() => router.push("/auth/register")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Registro
        </button>

        {/* Botón de login/logout */}
        {!session ? (
          <button
            onClick={() => signIn()}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
          >
            Login
          </button>
        ) : (
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        )}

        {/* Botón de dashboard */}
        <button
          onClick={handleDashboardClick}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
        >
          Dashboard
        </button>
      </div>

      {/* Mensaje de bienvenida */}
      {session ? (
        <p className="mt-4 text-lg">
          Bienvenido, <strong>{session.user?.username || session.user?.email}</strong>
        </p>
      ) : (
        <p className="mt-4 text-lg">No estás autenticado.</p>
      )}
    </div>
  );
}
