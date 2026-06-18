import { useEffect, useState } from "react";
import axios from "axios";

export default function Stats() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/stats")
      .then((response) => {
        const data = response.data;

        setStats([
          {
            label: "Machines",
            value: `${data.machines}+`,
            icon: "💻",
          },
          {
            label: "Utilisateurs",
            value: `${data.utilisateurs}+`,
            icon: "👤",
          },
          {
            label: "Tickets",
            value: `${data.tickets}+`,
            icon: "🎫",
          },
          {
            label: "Départements",
            value: `${data.departements}+`,
            icon: "🏢",
          },
        ]);
      })
      .catch((error) => {
        console.error("Erreur API :", error);
      });
  }, []);

  return (
    <div className="py-16 bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      <div className="absolute w-80 h-80 bg-purple-300 opacity-20 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-80 h-80 bg-indigo-300 opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            📊 Nos Statistiques
          </h2>
          <p className="text-gray-500 mt-2">
            Une vue globale de votre parc informatique
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-xl border border-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300"
            >
              <div className="text-3xl mb-2">{s.icon}</div>

              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
                {s.value}
              </h2>

              <p className="text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}