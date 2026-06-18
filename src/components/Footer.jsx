export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* Logo + description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            IT Park
          </h2>
          <p className="text-gray-400">
            Solution moderne pour gérer votre parc informatique, équipements et utilisateurs efficacement.
          </p>
        </div>

        {/* Liens */}
        <div>
          <h3 className="text-white font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2">
            <li><a href="/">Accueil</a></li>
            <li><a href="/equipments">Équipements</a></li>
            <li><a href="/users">Utilisateurs</a></li>
            <li><a href="/tickets">Tickets</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            <li>Gestion des équipements</li>
            <li>Suivi des pannes</li>
            <li>Sécurité informatique</li>
            <li>Support technique</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <p>Email: support@itpark.com</p>
          <p>Tél: +216 00 000 000</p>

          {/* Réseaux sociaux */}
          <div className="flex gap-4 mt-4">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-purple-600 cursor-pointer">
              f
            </div>
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-purple-600 cursor-pointer">
              in
            </div>
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-purple-600 cursor-pointer">
              t
            </div>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
        © {new Date().getFullYear()} IT Park — Tous droits réservés
      </div>
    </footer>
  );
}