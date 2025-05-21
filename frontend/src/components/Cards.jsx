import React from "react";

function Cards({ item }) {
  return (
    <>
      <div className="mt-4 p-3 ">
        <div className="card bg-base-100 w-92 shadow-xl trasition-transfrom hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure>
            <img src={item.Image} alt="Book" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.Catagory}</div>
            </h2>
            <p>{item.Title}</p>
            <div className="card-actions flex justify-between">
              <div className="badge badge-outline">${item.Price}</div>
              <div className=" cursor-pointer badge badge-outline hover:bg-pink-500 hover:text-white px-2 py-1 duration-200">
                Buy Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
