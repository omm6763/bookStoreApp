import React from "react";
import list from "../../public/List.json";
import Cards from "./Cards";
import {Link} from "react-router-dom";
function Course() {
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-0 items-center justify-center text-center  ">
          <h1 className="text-2xl  md:text-4xl ">
            We are delighted to have you{" "}
            <span className="text-pink-500">Here!:)</span>
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
          {list.map((item) => {
            return <Cards key={item.id} item={item} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Course;
