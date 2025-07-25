import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../components/budgetDashboard.css";

export default function Connected() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState("€");
  const [username, setUsername] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    type: "expense",
    date: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) setUsername(storedUsername);
      const userId = localStorage.getItem("userId");
      if (!token || !userId) {
        console.warn("Missing token or userId");
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:5000/users/${userId}/incomes-expenses`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Fetch failed");

        const result = await res.json();
        const combined = [
          ...result.expenses.map((e) => ({ ...e, type: "expense" })),
          ...result.incomes.map((i) => ({ ...i, type: "income" })),
        ];

        combined.sort((a, b) => new Date(b.date) - new Date(a.date));
        setData(combined);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Fetch error:", err);
        setIsAuthenticated(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      description: "",
      type: "expense",
      date: "",
    });
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      alert("You are not authenticated");
      return;
    }

    const url = `http://localhost:5000/${formData.type}s/${userId}`;
    const body = {
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: formData.date || new Date().toISOString(),
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to save");

      const savedItem = await res.json();

      setData((prev) =>
        [...prev, { ...savedItem, type: formData.type }].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
      );

      resetForm();
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    }
  };

  const handleDelete = async (entry) => {
    if (!window.confirm("Delete this entry?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Not authenticated");
      return;
    }

    const url = `http://localhost:5000/${entry.type}s/${entry.id}`;

    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      setData((prev) => prev.filter((item) => item.id !== entry.id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  return (
    <div>
      <h2>
        {username ? `Recent transactions` : "Unknown User Financial Data"}
      </h2>
      <div className="form-component-box">
        <button
          className={showForm ? "red-button" : "green-button"}
          onClick={() => setShowForm((show) => !show)}
        >
          {showForm ? "x" : "+"}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit}>
            <div className="form-container">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="type">Type:</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
              <button type="submit" className="button-submit">
                Add
              </button>
            </div>
          </form>
        )}
      </div>

      {!data.length ? (
        <p>No data</p>
      ) : (
        <div className="div-budget-table">
          <div>
            <label htmlFor="currency">Currency: </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="$">$ USD</option>
              <option value="€">€ EUR</option>
            </select>
          </div>
          <table className="table-budget">
            <thead>
              <tr>
                <th className="td-amount">Amount</th>
                <th className="td-desct">Description</th>
                <th className="td-date">Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => (
                <tr
                  key={`${entry.type}-${entry.id}`}
                  className={
                    entry.type === "income" ? "income-text" : "expense-text"
                  }
                >
                  <td className="td-amount">
                    {entry.amount} {currency}
                  </td>
                  <td className="td-desc">{entry.description}</td>
                  <td className="td-date">
                    {new Date(entry.date).toLocaleDateString()}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(entry)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../App.css";
// import "../components/budgetDashboard.css";

// export default function Connected() {
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(true);
//   const [data, setData] = useState([]);
//   const [currency, setCurrency] = useState("€");
//   const [username, setUsername] = useState("");
//   const [description, setDescription] = useState("");
//   const [amount, setAmount] = useState("");
//   const [type, setType] = useState("expense");
//   const [date, setDate] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     id: null,
//     amount: "",
//     description: "",
//     type: "expense",
//     date: "",
//   });
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem("token");
//       const storedUsername = localStorage.getItem("username");
//       if (storedUsername) setUsername(storedUsername);
//       const userId = localStorage.getItem("userId");
//       if (!token || !userId) {
//         console.warn("Missing token or userId");
//         return;
//       }
//       const res = await fetch(
//         `http://localhost:5000/users/${userId}/incomes-expenses`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (res.headers.get("content-type")?.includes("application/json")) {
//         if (res.ok) {
//           const result = await res.json();
//           console.log("dataResult:", result);
//           const combined = [
//             ...result.expenses.map((e) => ({ ...e, type: "expense" })),
//             ...result.incomes.map((i) => ({ ...i, type: "income" })),
//           ];

//           const sorted = combined.sort(
//             (a, b) => new Date(b.date) - new Date(a.date)
//           );
//           setData(sorted);
//           setIsAuthenticated(true);
//         } else {
//           const text = await res.text();
//           console.error("Fetch error:", text);
//         }
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((f) => ({ ...f, [name]: value }));
//   };
//   const resetForm = () => {
//     setFormData({
//       id: null,
//       amount: "",
//       description: "",
//       type: "expense",
//       date: "",
//     });
//     setShowForm(false);
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");
//     const userId = localStorage.getItem("userId");
//     if (!token || !userId) {
//       alert("You are not authenticated");
//       return;
//     }
//   const handleAddEntry = async (formData) => {
//   const userId = localStorage.getItem("userId");
//   const url = `http://localhost:5000/${formData.type}s/${userId}`;

//   const res = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//     body: JSON.stringify(formData),
//   });

//     const method =  "POST";

//     const body = {
//       amount: parseFloat(formData.amount),
//       description: formData.description,
//       date: formData.date || new Date().toISOString(),
//     };

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(body),
//       });

//       if (!res.ok) throw new Error("Failed to save");

//       const savedItem = await res.json();

//       if (method === "POST") {
//         setData((prev) =>
//           [...prev, { ...savedItem, type: formData.type }].sort(
//             (a, b) => new Date(b.date) - new Date(a.date)
//           )
//         );
//       } else {
//         setData((prev) =>
//           prev
//             .map((item) =>
//               item.id === savedItem.id && item.type === formData.type
//                 ? { ...savedItem, type: formData.type }
//                 : item
//             )
//             .sort((a, b) => new Date(b.date) - new Date(a.date))
//         );
//       }

//       resetForm();
//     } catch (err) {
//       console.error(err);
//       alert("Error saving data");
//     }
//   };

//   const handleDelete = async (entry) => {
//     if (!window.confirm("Delete this entry?")) return;

//     const token = localStorage.getItem("token");
//     const userId = localStorage.getItem("userId");
// const url = `http://localhost:5000/${type}s/${id}`;

//   const res = await fetch(url, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });

//       if (!res.ok) throw new Error("Delete failed");

//       setData((prev) => prev.filter((item) => item.id !== entry.id));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete");
//     }
//   };

//   return (
//     <div>
//       <h2>
//         {username ? `Recent transactions` : "Unknown User Financial Data"}
//       </h2>
//       <div className="form-component-box">
//         <button
//           className={`"adding-button ${
//             showForm ? "red-button" : "green-button"
//           }`}
//           onClick={() => setShowForm(!showForm)}
//         >
//           {showForm ? "x" : "+"}
//         </button>
//         {showForm && (
//           <form onSubmit={handleSubmit}>
//             <div className="form-container">
//               <label htmlFor="amount">Amount:</label>
//               <input
//                 type="number"
//                 id="amount"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 required
//               />
//               <label htmlFor="Description">Description:</label>
//               <input
//                 type="text"
//                 id="description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 required
//               />
//               <label htmlFor="type">Type:</label>
//               <select
//                 id="type"
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}
//                 required
//               >
//                 <option value="income">Income</option>
//                 <option value="expense">Expense</option>
//               </select>
//               <label htmlFor="date">Date:</label>
//               <input
//                 type="date"
//                 id="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 required
//               />
//               <button type="submit" className="button-submit">
//                 Add
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//       {!data.length ? (
//         <p>No data</p>
//       ) : (
//         <div>
//           <div className="div-budget-table">
//             <div>
//               <label htmlFor="currency">Currency: </label>
//               <select
//                 id="currency"
//                 value={currency}
//                 onChange={(e) => setCurrency(e.target.value)}
//               >
//                 <option value="$">$ USD</option>
//                 <option value="€">€ EUR</option>
//               </select>
//             </div>
//             <table className="table-budget">
//               <thead>
//                 <tr>
//                   <th className="td-amount">Amount</th>
//                   <th className="td-desct">Description</th>
//                   <th className="td-date">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((entry, index) => (
//                   <tr
//                     key={`${entry.type}-${entry.id}`}
//                     className={
//                       entry.type === "income" ? "income-text" : "expense-text"
//                     }
//                   >
//                     <td className="td-amount">
//                       {entry.amount} {currency}
//                     </td>
//                     <td className="td-desc">{entry.description}</td>
//                     <td className="td-date">
//                       {new Date(entry.date).toLocaleDateString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
