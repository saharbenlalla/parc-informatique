import { useEffect, useState } from "react";
import axios from "axios";


export default function UserDashboard() {


  const API_URL =
    "http://localhost:8000/api/user/equipements";



  const [equipements, setEquipements] = useState([]);



  const [form, setForm] = useState({
    nom: "",
    type: "",
    dateAchat: "",
  });



  const [panneForm, setPanneForm] = useState({
    id: null,
    panne: "",
    datePanne: "",
  });





  // ============================
  // GET USER EQUIPMENTS
  // ============================

  useEffect(() => {

    fetchEquipements();

  }, []);





  const fetchEquipements = async () => {

    try {


      const response = await axios.get(API_URL);


      setEquipements(response.data);



    } catch(error){

      console.error(
        "Erreur chargement :",
        error
      );

    }

  };







  // ============================
  // INPUT EQUIPMENT
  // ============================

  const handleChange = (e)=>{

    setForm({

      ...form,

      [e.target.name]:
      e.target.value

    });

  };







  // ============================
  // INPUT PANNE
  // ============================


  const handlePanneChange = (e)=>{


    setPanneForm({

      ...panneForm,

      [e.target.name]:
      e.target.value

    });


  };








  // ============================
  // ADD EQUIPMENT
  // ============================


  const addEquipement = async(e)=>{


    e.preventDefault();



    try{


      await axios.post(
        API_URL,
        form
      );



      fetchEquipements();



      setForm({

        nom:"",
        type:"",
        dateAchat:""

      });



    }catch(error){


      console.error(
        "Erreur ajout :",
        error
      );


    }


  };









  // ============================
  // DECLARE PANNE
  // ============================


  const declarePanne = async(id)=>{


    try{


      await axios.put(

        `${API_URL}/${id}/panne`,

        {

          panne:
          panneForm.panne,


          datePanne:
          panneForm.datePanne,


          etat:"panne"

        }

      );



      fetchEquipements();



      setPanneForm({

        id:null,

        panne:"",

        datePanne:""

      });



    }catch(error){


      console.error(
        "Erreur panne :",
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
        text-center 
        mb-10
      ">


        <h1 className="
          text-4xl 
          font-bold 
          text-gray-800
        ">

          👤 Espace Utilisateur

        </h1>


        <p className="
          text-gray-600
        ">

          Gérez vos équipements et signalez les pannes

        </p>


      </div>








      {/* ADD EQUIPMENT */}


      <form

        onSubmit={addEquipement}

        className="
          bg-white/70
          backdrop-blur-xl
          p-5
          rounded-2xl
          shadow-xl
          grid
          md:grid-cols-4
          gap-3
          mb-8
        "

      >


        <input

          name="nom"

          value={form.nom}

          onChange={handleChange}

          placeholder="Nom équipement"

          className="
            p-2
            border
            rounded-lg
          "

          required

        />





        <input

          name="type"

          value={form.type}

          onChange={handleChange}

          placeholder="Type"

          className="
            p-2
            border
            rounded-lg
          "

          required

        />





        <input

          type="date"

          name="dateAchat"

          value={form.dateAchat}

          onChange={handleChange}

          className="
            p-2
            border
            rounded-lg
          "

        />






        <button

          className="
            bg-gradient-to-r
            from-purple-600
            to-indigo-600
            text-white
            rounded-lg
          "

        >

          ➕ Ajouter

        </button>


      </form>









      {/* LIST */}



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
            rounded-2xl
            shadow-xl
            p-5
            hover:scale-[1.03]
            transition
          "

        >





          <h2 className="
            text-xl
            font-bold
          ">

            {e.nom}

          </h2>




          <p className="text-gray-500">

            {e.type}

          </p>







          <div className="
            mt-3
            text-sm
            space-y-1
          ">


            <p>

              📅 Achat :
              {" "}
              {e.dateAchat}

            </p>





            <p>

              📌 Etat :

              {" "}

              <span
                className={
                  e.etat==="panne"
                  ?
                  "text-red-500"
                  :
                  "text-green-600"
                }
              >

                {e.etat}

              </span>


            </p>






            {e.panne && (

              <p>

                ⚠️ Panne :
                {" "}
                {e.panne}

              </p>

            )}






            {e.datePanne && (

              <p>

                📅 Date panne :
                {" "}
                {e.datePanne}

              </p>

            )}



          </div>









          {/* PANNE FORM */}



          <div className="
            mt-4
            space-y-2
          ">


            <input

              placeholder="Description panne"

              name="panne"

              value={panneForm.panne}

              onChange={handlePanneChange}

              className="
                w-full
                p-2
                border
                rounded-lg
              "

            />





            <input

              type="date"

              name="datePanne"

              value={panneForm.datePanne}

              onChange={handlePanneChange}

              className="
                w-full
                p-2
                border
                rounded-lg
              "

            />






            <button

              onClick={()=>declarePanne(e.id)}

              className="
                w-full
                bg-gradient-to-r
                from-red-500
                to-pink-500
                text-white
                py-2
                rounded-lg
              "

            >

              🚨 Déclarer panne

            </button>



          </div>



        </div>



      ))}



      </div>








      <style>{`

        @keyframes fadeIn {

          from {

            opacity:0;

            transform:translateY(15px);

          }


          to {

            opacity:1;

            transform:translateY(0);

          }

        }

      `}</style>



    </div>


  );

}