import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebaseFile/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../firebaseFile/AuthProvider";

export const EventList = () => {
  const { currentUser } = useAuth();
  const [serving, setServing] = useState("");
  const [value, loading, error] = useCollection(
    collection(db, "userDonor/" + currentUser.uid + "/Events")
  );

  const handleAddServing = async (id) => {
    try {
      const eventDoc = doc(db, "userDonor/" + currentUser.uid + "/Events", id);
      await updateDoc(eventDoc, { servings: serving });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="added-food-container">
      <h2>Event List</h2>
      <table border="2px">
        <tr>
          <th>Date</th>
          <th>Name</th>
          <th>Address</th>
          <th>Contact</th>
          <th>No. Of serving</th>
          <th>Add</th>
        </tr>

        {value.docs.map((doc) => (
          <tr key={doc.id}>
            <td>{doc.data().date}</td>
            <td>{doc.data().name}</td>
            <td>{doc.data().address}</td>
            <td>{doc.data().contact}</td>
            <td>{doc.data().servings}</td>
            <td>
              <input
                type="number"
                placeholder="No. of Servings"
                onChange={(e) => setServing(e.target.value)}
              />
            </td>
            <td>
              <button onClick={() => handleAddServing(doc.id)}>
                Add Servings
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
