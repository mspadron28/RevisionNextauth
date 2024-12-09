import { withAuth } from "next-auth/middleware";
//TOCA SOLUCIONAR
export default withAuth({
  pages: {
    signIn: "/auth/login", // Ruta personalizada para la página de login
  },
});

export const config = {
  matcher: ["/dashboard/:path*"], // Protege todas las rutas bajo /dashboard
};
