import React, { useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from 'axios'
import {useEffect} from "react";
import ToDoList from "../Components/ToDoList";


function HomePage() {
  let[user , setUser] = useState(null);
  const id = localStorage.getItem('userId');


  useEffect(() => {
    const fetchingData = async () => {
      let res = await axios.get(`http://localhost:5000/api/user/${id}`);
      setUser(res.data);
    }

    fetchingData();
  }, [])
  
 

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user}/>
      <main className="flex-grow container mx-auto py-8">
       <ToDoList user={user}></ToDoList>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
