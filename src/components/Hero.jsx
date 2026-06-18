import parkImg from "../assets/parkk.jfif";

export default function Hero() {
  return (
    <div className="h-screen flex items-center bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-200 relative overflow-hidden">

      {/* 🔵 background shapes */}
      <div className="absolute w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6 relative z-10">

        {/* TEXT */}
        <div className="space-y-6 animate-fadeIn">

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Gérez votre{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              parc informatique
            </span>{" "}
            facilement
          </h1>

          <p className="text-gray-600 text-lg">
            Suivi des équipements, gestion des utilisateurs et maintenance en temps réel avec une interface moderne et intuitive.
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4">

            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition duration-300">
              🚀 Commencer
            </button>

            <button className="border border-gray-300 px-6 py-3 rounded-full hover:bg-white hover:shadow-md transition">
              En savoir plus
            </button>

          </div>

        </div>

        {/* IMAGE */}
        <div className="relative animate-float">

          <img
            src={parkImg}
            alt="IT management"
            className="w-full rounded-3xl shadow-2xl"
          />

          {/* glass effect overlay */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl"></div>

        </div>

      </div>

      {/* ✨ animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
}