import React, { useState } from "react";
import {
  query,
  collection,
  getDocs,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseFile/firebase";
import { useAuth } from "../firebaseFile/AuthProvider";

export const BookedFood = () => {
  const [foods, setFoods] = useState([]);
  const { currentUser } = useAuth();

  async function fetchData() {
    const foodsData = [];
    const querySnapshot1 = collection(db, "userFeederids");
    const val = await getDocs(querySnapshot1);

    for (const docSnap of val.docs) {
      const userKey = docSnap.data().Userid;

      let organizationName = '';
      try {
        const querySnapshot = await getDoc(doc(db, "userFeeder/"+ userKey));
        organizationName = querySnapshot.data().organizationName;
      } catch (error) {
        console.error("Error fetching organization name: ", error);
      }

      
      console.log( "userFeeder/"+ userKey+ "/AddedFood");
      console.log(currentUser.uid);
      const foodcoll = query(
        collection(db, "userFeeder/"+ userKey+ "/AddedFood"),
        where("userKey", "==", currentUser.uid)
      );
      const food = await getDocs(foodcoll);


      for (const dd of food.docs) {
        let date = '';
        try {
          const eventSnapshot = await getDoc(
            doc(db, "userDonor/"+ currentUser.uid+ "/Events/"+ dd.data().eventKey)
          );
          date = eventSnapshot.data().date;
        } catch (error) {
          console.error("Error fetching date: ", error);
        }
        console.log(date);

        foodsData.push({
          id: dd.id,
          name: dd.data().name,
          date: date,
          contact: dd.data().contact,
          servings: dd.data().need,
          organizationName: organizationName,
        });
      }
    }
    setFoods(foodsData);
  }

  return (
    <div className="added-food-container">
      <h2>Booked From All Donors</h2>
      <button onClick={fetchData}>Show List</button>
      <table border="2px">
        <thead>
          <tr>
            <th>Organization Name</th>
            <th>Date</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Reserved Food</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food, index) => (
            <tr key={index}>
              <td>{food.organizationName}</td>
              <td>{food.date}</td>
              <td>{food.name}</td>
              <td>{food.contact}</td>
              <td>{food.servings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
