import { useState } from "react";
import axios from "axios";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const url = isLogin
        ? "http://localhost:8000/api/login"
        : "http://localhost:8000/api/register";

      const payload = isLogin
        ? {
            email: form.email,
            password: form.password,
          }
        : {
            name: form.name,
            email: form.email,
            phone: form.phone,
            password: form.password,
            role: form.role,
          };

      const response = await axios.post(url, payload);

      console.log(response.data);

      // Sauvegarder le token si Laravel Sanctum/JWT
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      setMessage(
        isLogin
          ? "Connexion réussie ✅"
          : "Inscription réussie ✅"
      );

      // Exemple redirection
      // navigate("/dashboard");

    } catch (error) {
      console.error(error);

      if (error.response) {
        setMessage(
          error.response.data.message ||
            "Une erreur est survenue"
        );
      } else {
        setMessage("Impossible de joindre le serveur");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">

      <div className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      <div className="relative w-[420px]">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">

          {/* Toggle */}
          <div className="flex bg-white/10 rounded-full p-1 mb-6 relative">

            <div
              className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-full shadow-md transition-all duration-300 ${
                isLogin ? "left-1" : "left-1/2"
              }`}
            />

            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`w-1/2 py-2 z-10 text-sm font-semibold ${
                isLogin ? "text-black" : "text-white"
              }`}
            >
              Se connecter
            </button>

            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`w-1/2 py-2 z-10 text-sm font-semibold ${
                !isLogin ? "text-black" : "text-white"
              }`}
            >
              S'inscrire
            </button>

          </div>

          <h2 className="text-white text-2xl font-bold text-center mb-6">
            {isLogin ? "Bienvenue 👋" : "Créer un compte"}
          </h2>

          {message && (
            <div className="mb-4 text-center text-white bg-black/20 p-2 rounded">
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Nom complet"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none"
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none"
            />

            {!isLogin && (
              <input
                type="text"
                name="phone"
                placeholder="Numéro de téléphone"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none"
              />
            )}

            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none"
            />

            {!isLogin && (
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-3 rounded-lg"
              >
                <option value="user">
                  Utilisateur
                </option>

                <option value="admin">
                  Administrateur
                </option>

                <option value="technician">
                  Technicien
                </option>
              </select>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:scale-[1.02] transition"
            >
              {loading
                ? "Chargement..."
                : isLogin
                ? "Se connecter"
                : "S'inscrire"}
            </button>

          </form>

          <p className="text-center text-white/80 text-sm mt-5">
            {isLogin
              ? "Pas de compte ?"
              : "Déjà un compte ?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-white font-bold underline"
            >
              {isLogin
                ? "S'inscrire"
                : "Se connecter"}
            </button>
          </p>

        </div>

      </div>
    </div>
  );
}