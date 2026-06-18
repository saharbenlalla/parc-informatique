import { useEffect, useState } from "react";
import axios from "axios";


export default function TechnicienDashboard() {


  const API_URL =
    "http://localhost:8000/api/technicien/equipements";


  const [equipements, setEquipements] = useState([]);


  const [editId, setEditId] = useState(null);


  const [form, setForm] = useState({
    etat: "bon",
    dateReparation: "",
  });



  // =========================
  // GET EQUIPEMENTS EN PANNE
  // =========================

  useEffect(() => {

    fetchEquipements();

  }, []);



  const fetchEquipements = async () => {

    try {

      const response = await axios.get(API_URL);

      setEquipements(response.data);


    } catch(error){

      console.error(
        "Erreur chargement équipements :",
        error
      );

    }

  };




  // =========================
  // FORM CHANGE
  // =========================

  const handleChange = (e)=>{

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };





  // =========================
  // UPDATE REPARATION
  // =========================

  const handleUpdate = async(id)=>{


    try{


      await axios.put(
        `${API_URL}/${id}`,
        {
          etat: form.etat,
          dateReparation: form.dateReparation
        }
      );



      // Actualiser la liste

      fetchEquipements();



      setEditId(null);


      setForm({
        etat:"bon",
        dateReparation:""
      });



    }catch(error){

      console.error(
        "Erreur réparation :",
        error
      );

    }


  };





  return (

    <div className="
      min-h-screen 
      pt-24 
      px-6 
      bg-gradient-to-br 
      from-purple-100 
      via-indigo-100 
      to-purple-200
    ">



      {/* HEADER */}

      <div className="
        mb-10 
        text-center
      ">


        <h1 className="
          text-4xl 
          md:text-5xl 
          font-bold 
          text-gray-800
        ">

          🔧 Espace Technicien

        </h1>


        <p className="
          text-gray-600 
          mt-2
        ">

          Gestion des équipements en panne et réparations

        </p>


      </div>






      {/* GRID */}


      <div className="
        grid 
        md:grid-cols-2 
        lg:grid-cols-3 
        gap-6
      ">



      {equipements.map((e,i)=>(


        <div

          key={e.id}

          className="
            bg-white/70
            backdrop-blur-xl
            border
            border-white
            shadow-xl
            rounded-2xl
            p-6
            hover:scale-[1.03]
            hover:shadow-2xl
            transition
          "

          style={{
            animation:
            `fadeIn .4s ease ${i*0.1}s both`
          }}

        >



          {/* TITLE */}

          <h2 className="
            text-xl
            font-bold
            text-gray-800
          ">

            {e.nom}

          </h2>



          <p className="
            text-sm
            text-gray-500
          ">

            {e.type}

          </p>






          {/* ETAT */}

          <div className="mt-3">


            <span className="
              px-3
              py-1
              text-xs
              rounded-full
              bg-red-500
              text-white
              shadow
            ">


              🔴 {e.etat}


            </span>


          </div>







          {/* DETAILS */}


          <div className="
            mt-4
            space-y-2
            text-sm
            text-gray-700
          ">


            <p>

              <span className="font-semibold">

                ⚠️ Panne :

              </span>


              {" "}

              {e.panne}


            </p>





            <p>

              <span className="font-semibold">

                📅 Date panne :

              </span>


              {" "}

              {e.datePanne}


            </p>





            {e.dateReparation && (

              <p>

                <span className="
                  font-semibold 
                  text-green-600
                ">

                  🔧 Réparé le :

                </span>


                {" "}

                {e.dateReparation}


              </p>


            )}



          </div>









          {/* ACTION */}


          <div className="mt-5">


          {editId === e.id ? (


            <div className="space-y-3">



              <select

                name="etat"

                value={form.etat}

                onChange={handleChange}

                className="
                  w-full
                  p-2
                  rounded-lg
                  border
                "

              >


                <option value="bon">

                  🟢 Réparé

                </option>



                <option value="maintenance">

                  🟡 Maintenance

                </option>



                <option value="panne">

                  🔴 Panne

                </option>



              </select>






              <input

                type="date"

                name="dateReparation"

                value={form.dateReparation}

                onChange={handleChange}

                className="
                  w-full
                  p-2
                  rounded-lg
                  border
                "

              />







              <button

                onClick={()=>handleUpdate(e.id)}

                className="
                  w-full
                  bg-gradient-to-r
                  from-purple-600
                  to-indigo-600
                  text-white
                  py-2
                  rounded-lg
                "

              >

                Valider réparation

              </button>



            </div>



          ):(



            <button

              onClick={()=>setEditId(e.id)}

              className="
                w-full
                bg-gradient-to-r
                from-indigo-500
                to-purple-600
                text-white
                py-2
                rounded-lg
              "

            >

              🔧 Marquer réparé

            </button>



          )}



          </div>



        </div>


      ))}



      </div>





      <style>{`

        @keyframes fadeIn {

          from{

            opacity:0;

            transform:translateY(15px);

          }


          to{

            opacity:1;

            transform:translateY(0);

          }

        }

      `}</style>



    </div>


  );

}