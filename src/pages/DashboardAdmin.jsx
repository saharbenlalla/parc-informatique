import { useEffect, useState } from "react";
import axios from "axios";

import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function AdminDashboard() {


  const [stats, setStats] = useState({
    total: 0,
    working: 0,
    broken: 0,
  });


  const [loading, setLoading] = useState(true);


  // ================= API =================

  useEffect(() => {

    getStats();

  }, []);



  const getStats = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8000/api/dashboard/stats"
      );


      setStats(response.data);


    } catch (error) {

      console.error(
        "Erreur récupération statistiques :",
        error
      );

    } finally {

      setLoading(false);

    }

  };




  const chartData = {

    labels: [
      "Total",
      "En bon état",
      "En panne"
    ],


    datasets: [

      {

        label: "Équipements",

        data: [
          stats.total,
          stats.working,
          stats.broken
        ],


        borderColor: "#8b5cf6",

        backgroundColor:
          "rgba(139,92,246,0.2)",


        tension: 0.4,

        fill: true,

      }

    ]

  };





  const chartOptions = {

    responsive: true,


    plugins: {

      legend: {

        position: "top",

      },


      title: {

        display: true,

        text:
          "Statistiques des équipements"

      }

    }

  };






  return (

    <div className="min-h-screen bg-gray-100 p-6">


      <h1 className="text-3xl font-bold mb-6">

        Dashboard Administrateur

      </h1>





      {loading ? (

        <div className="text-center text-gray-500">

          Chargement...

        </div>


      ) : (


      <>


      {/* CARDS */}

      <div className="
        grid 
        grid-cols-1 
        md:grid-cols-3 
        gap-6 
        mb-10
      ">



        {/* TOTAL */}

        <div className="
          bg-white
          p-6
          rounded-xl
          shadow
        ">

          <h2 className="text-gray-500">

            Total équipements

          </h2>


          <p className="
            text-3xl 
            font-bold
          ">

            {stats.total}

          </p>


        </div>






        {/* BON ETAT */}

        <div className="
          bg-green-100
          p-6
          rounded-xl
          shadow
        ">


          <h2 className="text-gray-600">

            En bon état

          </h2>


          <p className="
            text-3xl
            font-bold
            text-green-600
          ">

            {stats.working}

          </p>


        </div>







        {/* PANNE */}

        <div className="
          bg-red-100
          p-6
          rounded-xl
          shadow
        ">


          <h2 className="text-gray-600">

            En panne

          </h2>


          <p className="
            text-3xl
            font-bold
            text-red-600
          ">

            {stats.broken}

          </p>


        </div>



      </div>








      {/* CHART */}


      <div className="
        bg-white
        p-6
        rounded-xl
        shadow
      ">


        <h2 className="
          text-xl
          font-semibold
          mb-4
        ">

          État des équipements

        </h2>
        <Line
          data={chartData}
          options={chartOptions}
        />
      </div>
      </>
      )}
    </div>

  );

}