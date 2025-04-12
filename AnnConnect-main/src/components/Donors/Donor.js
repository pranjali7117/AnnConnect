import React, { useEffect, useState } from "react";
import { useAuth } from "../firebaseFile/AuthProvider";
import { AddEventForm } from "./AddEventForm";
import { EventList } from "./EventList";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseFile/firebase";
import { useNavigate } from "react-router-dom";
import { BookedFood } from "./BookedFood";

export default function Donor() {
  const [name, setName] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [organizationName, setOrganizationName] = useState("");


  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDoc(
          doc(db, "userDonor/" + currentUser.uid)
        );
        setName(querySnapshot.data().name);
        setOrganizationName(querySnapshot.data().organizationName)
      } catch (error) {
        navigate("/Ngo");
      }
    }
    fetchData();
  });

  return (
    <div className="added-food-container">
      <h3>Welcome - {name}</h3>
      <h1>Organization Name - {organizationName}  </h1>
      <AddEventForm />
      <EventList />
      <BookedFood/>
    </div>
  );
}
