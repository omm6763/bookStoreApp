import React from "react";
import { useState, useEffect } from "react";

import Cards from "./Cards";
import { Link } from "react-router-dom";
import axios from "axios";
function Course() {
  const [book, setbook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
       const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4001";
const res = await axios.get(`${BASE_URL}/book`);
        console.log(res.data);
        setbook(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBook();
  }, []);

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mt-20">
        
        <div className="mt-0 items-center justify-center text-center  ">
          <h1 className="text-2xl  md:text-4xl ">
            We are delighted to have you{" "}
            <span className="text-pink-500 ">Here!:)</span>
          </h1>
          <p className="mt-12 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
            accusamus explicabo dolore numquam, facilis fugiat porro voluptatum
            expedita officia commodi saepe neque obcaecati quisquam at quod nemo
            eius eveniet doloribus?
          </p>
          <Link to="/">
            <button className=" mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:text-bg-pink-700 duration-700">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 ">
          {book.map((item) => {
            return <Cards key={item.id} item={item} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Course;
