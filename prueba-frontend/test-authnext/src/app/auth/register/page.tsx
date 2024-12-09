"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Esquema de validación con zod
const registerSchema = z.object({
  username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  firstName: z.string().nonempty("El nombre es obligatorio"),
  lastName: z.string().nonempty("El apellido es obligatorio"),
  country: z.string().nonempty("El país es obligatorio"),
  phone: z.string().nonempty("El teléfono es obligatorio"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/auth/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          first_name: data.firstName,
          last_name: data.lastName,
          country: data.country,
          phone: data.phone,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error en el registro");
      }

      const responseData = await res.json();
      // Redirige al login después de un registro exitoso
      router.push("/auth/login");
    } catch (error: any) {
      setError(error.message || "Error inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Registro</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            Nombre de Usuario
          </label>
          <input
            id="username"
            type="text"
            {...register("username")}
            className="mt-1 p-2 w-full border rounded"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="mt-1 p-2 w-full border rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium">
            Nombre
          </label>
          <input
            id="firstName"
            type="text"
            {...register("firstName")}
            className="mt-1 p-2 w-full border rounded"
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium">
            Apellido
          </label>
          <input
            id="lastName"
            type="text"
            {...register("lastName")}
            className="mt-1 p-2 w-full border rounded"
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium">
            País
          </label>
          <input
            id="country"
            type="text"
            {...register("country")}
            className="mt-1 p-2 w-full border rounded"
          />
          {errors.country && <p className="text-red-500">{errors.country.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Teléfono
          </label>
          <input
            id="phone"
            type="text"
            {...register("phone")}
            className="mt-1 p-2 w-full border rounded"
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
