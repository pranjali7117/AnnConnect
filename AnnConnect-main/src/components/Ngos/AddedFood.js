//addedfood.js
import React, { useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseFile/firebase";
import { useAuth } from "../firebaseFile/AuthProvider";
import './ngo.css';

export const AddedFood = () => {
  const [food, setFoods] = useState([]);
  const { currentUser } = useAuth();

  async function fetchData() {
    const foodsData = [];

    const querySnapshot1 = collection(
      db,
      "userFeeder/" + currentUser.uid + "/AddedFood"
    );
    const val = await getDocs(querySnapshot1);
    for (const docc of val.docs) {
      const userKey = docc.data().userKey;
      const eventKey = docc.data().eventKey;
      const eveDoc = await getDoc(doc(db, "userDonor/" + userKey + "/Events/" + eventKey));
      
      
      const orgDoc = await getDoc(doc(db, "userDonor/" + userKey));
        console.log(userKey);
        console.log(orgDoc.data().organizationName);
      
        
      foodsData.push({
         organizationName: orgDoc.data().organizationName,
        date: eveDoc.data().date,
        name: eveDoc.data().name,
        address: eveDoc.data().address,
        contact: eveDoc.data().contact,
        reserve: docc.data().need,
      });
    }

    setFoods(foodsData);
  }

  return (
    <div className="added-food-container">
    <h2>Confirmed Food</h2>
    <button onClick={fetchData}>Show Confirmed Food</button>
    <table border="2px">
      <thead>
        <tr>
          <th>Organization Name</th>
          <th>Date</th>
          <th>Name</th>
          <th>Address</th>
          <th>Contact</th>
          <th>Reserved Serving</th>
        </tr>
      </thead>
      <tbody>
        {food.map((data, index) => (
          <tr key={index}>
            <td>{data.organizationName}</td>
            <td>{data.date}</td>
            <td>{data.name}</td>
            <td>{data.address}</td>
            <td>{data.contact}</td>
            <td>{data.reserve}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};
