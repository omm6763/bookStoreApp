import { Link } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import PropTypes from "prop-types";

function Cards({ item }) {
  const { addToCart } = useCart();

  return (
    <div className="mt-4 my-3 p-3 h-full">
      <div className="card w-92 bg-white dark:bg-slate-800 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden h-full flex flex-col">
        <Link to={`/book/${item._id}`}>
          <figure className="relative group cursor-pointer overflow-hidden h-64 bg-gray-100 dark:bg-slate-700">
            <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute top-3 right-3 badge badge-secondary bg-pink-500 border-none text-white shadow-md font-medium">
                {item.category}
            </div>
          </figure>
        </Link>
        <div className="card-body p-5 flex flex-col flex-grow">
          <div className="flex-grow">
            <h2 className="card-title text-lg font-bold text-slate-800 dark:text-white mb-2 leading-tight">
                {item.name}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                {item.title}
            </p>
          </div>
          <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <div className="text-xl font-bold text-pink-500">
                ${item.price === 0 ? "Free" : item.price}
            </div>
            <button
              onClick={() => addToCart(item)}
              className="px-4 py-2 rounded-full text-sm font-semibold text-pink-500 border border-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-200"
            >
              {item.price === 0 ? "Read Now" : "Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Cards.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Cards;