import React, { useState } from "react";
import { useAuth } from "../firebaseFile/AuthProvider";
import { getDatabase, ref, set } from "firebase/database";

export default function Dataf() {
  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const [id, setid] = useState("");
  const { currentUser } = useAuth();

  function writeUserData(uid, name, num) {
    const db = getDatabase();
    set(ref(db, "users/" + uid), {
      username: name,
      number: num,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setid(currentUser.uid);
    try {
      writeUserData(id, name, num);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Registration Form for </h2>
      <p>{currentUser.email}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="mobile"
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
