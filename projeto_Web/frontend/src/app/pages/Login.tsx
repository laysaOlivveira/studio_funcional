import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        senha,
      });

      localStorage.setItem("token", response.data.token);

      navigate("/admin");
    } catch (error) {
      alert("Email ou senha inválidos");
    }
  };
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Logo Area */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
              <span className="text-white text-2xl font-bold">SF</span>
            </div>
            <h1 className="text-3xl font-bold text-black mb-2">Studio Funcional</h1>
            <p className="text-muted-foreground">Adriano Oliveira</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-black">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm mb-2 text-black">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Entrar
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-primary hover:underline">
              Esqueceu sua senha?
            </a>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Não tem cadastro?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-primary hover:underline font-medium"
              >
                Cadastre-se aqui
              </button>
            </p>
          </div>
        </div>

        {/* Demo Instructions */}
        <div className="mt-4 p-4 bg-muted rounded-lg text-sm text-muted-foreground text-center">
          <p className="mb-1">
            <strong>Demo:</strong> Use qualquer email
          </p>
          <p>
            Admin: email com "admin" | Aluno: qualquer outro
          </p>
        </div>
      </div>
    </div>
  );
}