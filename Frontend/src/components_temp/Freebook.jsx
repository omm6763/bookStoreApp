import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Cards from "./Cards";

function Freebook() {
  const [book, setBook] = useState([]);
  
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book`);
        // Filter for Free books
        const data = res.data.filter((data) => data.category === "Free");
        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 my-16">
      <div className="mb-10">
        <h1 className="font-bold text-2xl pb-2">Free Offered Courses</h1>
        <p className="text-gray-500">
          Grab these timeless classics for free and start reading immediately.
        </p>
      </div>

      <div className="slider-container">
        <Slider {...settings}>
          {book.map((item) => (
            <Cards item={item} key={item._id} /> 
          ))}
        </Slider>
      </div>
    </div>
  );
}
export default Freebook;