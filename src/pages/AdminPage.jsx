import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminEquipementsPro() {
  const API_URL = "http://localhost:8000/api/equipements";

  const [equipements, setEquipements] = useState([]);

  const [form, setForm] = useState({
    nom: "",
    type: "",
    marque: "",
    etat: "bon",
    user_id: "",
    dateAchat: "",
  });

  const [editing, setEditing] = useState(null);

  // ================= LOAD DATA =================
  useEffect(() => {
    fetchEquipements();
  }, []);

  const fetchEquipements = async () => {
    try {
      const response = await axios.get(API_URL);
      setEquipements(response.data);
    } catch (error) {
      console.error("Erreur chargement :", error);
    }
  };

  // ================= FORM =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const reset = () => {
    setForm({
      nom: "",
      type: "",
      marque: "",
      etat: "bon",
      user_id: "",
      dateAchat: "",
    });

    setEditing(null);
  };

  // ================= ADD / UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await axios.put(`${API_URL}/${editing}`, form);
      } else {
        await axios.post(API_URL, form);
      }

      fetchEquipements();
      reset();
    } catch (error) {
      console.error("Erreur sauvegarde :", error);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet équipement ?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEquipements();
    } catch (error) {
      console.error("Erreur suppression :", error);
    }
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setForm({
      nom: item.nom || "",
      type: item.type || "",
      marque: item.marque || "",
      etat: item.etat || "bon",
      user_id: item.user_id || "",
      dateAchat: item.dateAchat || "",
    });

    setEditing(item.id);
  };

  // ================= ASSIGN USER =================
  const assignUser = async (id) => {
    try {
      await axios.patch(`${API_URL}/${id}`, {
        user_id: "USER123",
      });

      fetchEquipements();
    } catch (error) {
      console.error(error);
    }
  };

  // ================= UNASSIGN USER =================
  const unassignUser = async (id) => {
    try {
      await axios.patch(`${API_URL}/${id}`, {
        user_id: null,
      });

      fetchEquipements();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-50 to-indigo-100 p-6">

      {/* HEADER */}
      <div className="mb-6 pt-20">
        <h1 className="text-4xl font-bold text-gray-800">
          🧠 Admin Dashboard
        </h1>

        <p className="text-gray-500">
          Gestion du parc informatique
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-5 grid md:grid-cols-6 gap-3 mb-8 border border-white"
      >
        <input
          name="nom"
          value={form.nom}
          onChange={handleChange}
          placeholder="Nom"
          className="p-2 border rounded-lg"
          required
        />

        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Type"
          className="p-2 border rounded-lg"
          required
        />

        <input
          name="marque"
          value={form.marque}
          onChange={handleChange}
          placeholder="Marque"
          className="p-2 border rounded-lg"
          required
        />

        <select
          name="etat"
          value={form.etat}
          onChange={handleChange}
          className="p-2 border rounded-lg"
        >
          <option value="bon">🟢 Bon</option>
          <option value="panne">🔴 Panne</option>
          <option value="maintenance">🟡 Maintenance</option>
        </select>

        <input
          name="user_id"
          value={form.user_id}
          onChange={handleChange}
          placeholder="User ID"
          className="p-2 border rounded-lg"
        />

        <input
          type="date"
          name="dateAchat"
          value={form.dateAchat}
          onChange={handleChange}
          className="p-2 border rounded-lg"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg py-2"
        >
          {editing ? "Modifier" : "Ajouter"}
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white">
            <tr>
              <th className="p-3">Nom</th>
              <th>Type</th>
              <th>Marque</th>
              <th>État</th>
              <th>Utilisateur</th>
              <th>Date Achat</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {equipements.map((e) => (
              <tr
                key={e.id}
                className="text-center border-b hover:bg-purple-50"
              >
                <td className="p-3">{e.nom}</td>
                <td>{e.type}</td>
                <td>{e.marque}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      e.etat === "bon"
                        ? "bg-green-500"
                        : e.etat === "panne"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {e.etat}
                  </span>
                </td>

                <td>{e.user_id || "—"}</td>

                <td>{e.dateAchat}</td>

                <td className="space-x-1">

                  <button
                    onClick={() => handleEdit(e)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(e.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>

                  {e.user_id ? (
                    <button
                      onClick={() => unassignUser(e.id)}
                      className="bg-gray-600 text-white px-2 py-1 rounded"
                    >
                      Unassign
                    </button>
                  ) : (
                    <button
                      onClick={() => assignUser(e.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Assign
                    </button>
                  )}

                </td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
}