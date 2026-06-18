import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function Navbar() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);


  useEffect(() => {

    const savedUser = localStorage.getItem("user");

    if(savedUser){
      setUser(JSON.parse(savedUser));
    }

  }, []);





  const logout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);

    navigate("/");

  };





  return (

    <nav className="
      fixed top-0 left-0 w-full
      bg-white/70
      backdrop-blur-xl
      shadow-md
      z-50
    ">


      <div className="
        max-w-7xl mx-auto
        flex justify-between items-center
        px-6 py-4
      ">


        {/* LOGO */}

        <Link
          to="/"
          className="
            text-xl font-bold
            text-purple-700
          "
        >
          Parc Informatique
        </Link>






        {/* LINKS */}

        <div className="
          flex gap-6
          text-sm font-medium
        ">


          {/* VISITEUR */}

          {!user && (

            <Link
              to="/auth"
              className="hover:text-purple-600"
            >
              Login / Register
            </Link>

          )}






          {/* USER */}

          {user?.role === "user" && (

            <Link
              to="/user"
              className="hover:text-purple-600"
            >
              Mon Espace
            </Link>

          )}







          {/* TECHNICIEN */}

          {user?.role === "technician" && (

            <Link
              to="/tech"
              className="hover:text-purple-600"
            >
              Espace Technicien
            </Link>

          )}







          {/* ADMIN */}

          {user?.role === "admin" && (

            <>

              <Link
                to="/espace-admin"
                className="hover:text-purple-600"
              >
                Dashboard
              </Link>



              <Link
                to="/admin"
                className="hover:text-purple-600"
              >
                Equipements
              </Link>



              <Link
                to="/tech"
                className="hover:text-purple-600"
              >
                Technicien
              </Link>



              <Link
                to="/user"
                className="hover:text-purple-600"
              >
                Utilisateurs
              </Link>


            </>

          )}



        </div>







        {/* USER INFO */}

        <div>


          {user ? (

            <div className="
              flex items-center gap-3
            ">


              <span className="
                text-gray-600 text-sm
              ">
                👤 {user.name}
              </span>



              <button
                onClick={logout}
                className="
                  bg-red-500
                  text-white
                  px-3 py-1
                  rounded-lg
                  text-sm
                "
              >
                Logout
              </button>


            </div>


          ) : (

            <span className="
              text-gray-500 text-sm
            ">
              Visiteur
            </span>

          )}



        </div>


      </div>


    </nav>

  );

}