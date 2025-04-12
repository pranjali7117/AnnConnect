import React, { useState } from "react";
import { db } from "../firebaseFile/firebase";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { useAuth } from "../firebaseFile/AuthProvider";

export const AddEventForm = () => {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const querySnapshot = await getDoc(
        doc(db, "userDonor/" + currentUser.uid)
      );

      setOrganizationName(querySnapshot.data().organizationName);
      await addDoc(collection(db, "userDonor/" + currentUser.uid + "/Events"), {
        date,
        name,
        address,
        contact,
        organizationName,
      });

      setDate("");
      setName("");
      setAddress("");
      setContact("");
      setOrganizationName("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="added-food-container">
      <form onSubmit={handleSubmit}>
        <table border="2px">
          <thead>
            <th>Date</th>
            <th>Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Add</th>
          </thead>
          <tbody>
            <td>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </td>
            <td>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
            </td>
            <td>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                required
              />
            </td>

            <td>
              <input
                type="tel"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Contact"
                required
              />
            </td>

            <td>
              <button type="submit">Add</button>
            </td>
          </tbody>
        </table>
      </form>
    </div>
  );
};
