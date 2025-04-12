// listedfood. js
import React, { useState } from "react";
import {
  query,
  addDoc,
  collection,
  getDocs,
  updateDoc,
  where,
  doc,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebaseFile/firebase";
import { useAuth } from "../firebaseFile/AuthProvider";
import './ngo.css';

export const ListedFood = () => {
  const [foods, setFoods] = useState([]);
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const { currentUser } = useAuth();

  async function fetchData() {
    const foodsData = [];
    const querySnapshot1 = collection(db, "userDonorids");
    const val = await getDocs(querySnapshot1);
  
    for (const doc of val.docs) {
      const x = doc.data().Userid;
      const eventcoll = query(
        collection(db, "userDonor/" + x + "/Events"),
        where("servings", "!=", ""),
        orderBy("date")
      );
      const eve = await getDocs(eventcoll);
      const addcoll = query(
        collection(db, "userFeeder/" + currentUser.uid + "/AddedFood")
      );
      const add = await getDocs(addcoll);

      eve.forEach(async (dd) => {
        var fg = false;
        add.forEach((cc) => {
          if (cc.data().eventKey === dd.id) {
            fg = cc.data().flag;
          }
        });

       
        
        foodsData.push({
          eventKey: dd.id,
          userKey: doc.data().Userid,
          name: dd.data().name,
          address: dd.data().address,
          date: dd.data().date,
          servings: dd.data().servings,
          flag: fg,
          value: 0,
        });
      });
    }

    setFoods(foodsData);
  }

  const handleAddFood = async (idx, eventKey, userKey) => {
    if (contact === "" || name === "" || foods[idx].value === "") {
      alert("feel all details");
      return;
    }

    let need = foods[idx].value;
    const querySnapshot = await getDoc(
     
      doc(db, "userDonor/" + userKey + "/Events/" + eventKey)
    );

    let y = querySnapshot.data().servings - need;

    try {
      const eventDoc = doc(db, "userDonor/" + userKey + "/Events", eventKey);
      await updateDoc(eventDoc, { servings: y });
    } catch (error) {
      console.error("Error updating document: ", error);
    }

    try {
      await addDoc(
        collection(db, "userFeeder/" + currentUser.uid + "/AddedFood"),
        {
          userKey,
          eventKey,
          need,
          name,
          contact,
          flag: true,
        }
      );

      setFoods((prevFoods) => {
        const newFoods = [...prevFoods];
        newFoods[idx].flag = true;
        return newFoods;
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="added-food-container" >
      <h2>Listed Food From All Donors</h2>
      <button onClick={fetchData}>Show List</button>
      <table border="2px">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Date</th>
            <th>No. Of Servings</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Needed Serving</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food, index) => (
            <tr key={index}>
              <td>{food.name}</td>
              <td>{food.address}</td>
              <td>{food.date}</td>
              <td>{food.servings}</td>
              <td>
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Contact No"
                  onChange={(e) => setContact(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Serving Needed"
                  max={food.servings}
                  value={foods[index].value}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value > food.servings) {
                      setFoods((prevFoods) => {
                        const newFoods = [...prevFoods];
                        newFoods[index].value = food.servings;
                        return newFoods;
                      });
                    } else if(value < 0){
                      setFoods((prevFoods) => {
                        const newFoods = [...prevFoods];
                        newFoods[index].value =0;
                        return newFoods;
                      });
                    }else {
                      setFoods((prevFoods) => {
                        const newFoods = [...prevFoods];
                        newFoods[index].value = value;
                        return newFoods;
                      });
                    }
                  }}
                />
              </td>
              <td>
                <button
                  onClick={() => handleAddFood(index, food.eventKey, food.userKey)}
                  disabled={food.flag}
                >
                  {" "}
                  {food.flag ? "Added" : "Add Food"}{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};