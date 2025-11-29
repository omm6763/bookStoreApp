import { useCart } from "../context/CartProvider";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const token = localStorage.getItem("Token");
    if (!token) {
        toast.error("Please login to purchase");
        return;
    }

    const formattedItems = cart.map((item) => ({
        product: item._id,   
        name: item.name,
        qty: 1,              
        image: item.image,
        price: item.price,
        category: item.category 
    }));

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/order`,
        {
          orderItems: formattedItems, 
          totalPrice: cartTotal,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Order Successful! You can now read these books.");
      clearCart();
      navigate("/orders");
      
    } catch (error) {
      console.log(error);
      if(error.response){
          toast.error("Error: " + error.response.data.message);
      } else {
          toast.error("Checkout failed");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-28 px-4 max-w-screen-2xl container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center text-xl mt-20">
            <p>Your cart is empty.</p>
            <button onClick={() => navigate("/course")} className="btn btn-secondary mt-4">Browse Books</button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {/* Cart Items */}
            <div className="md:w-2/3">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between items-center border p-4 mb-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-slate-800 dark:border-slate-700">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-28 object-cover rounded shadow-sm" />
                    <div>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-gray-500 text-sm">{item.category}</p>
                      <p className="text-pink-500 font-semibold mt-1">${item.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="btn btn-sm btn-circle btn-outline btn-error"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Checkout Summary */}
            <div className="md:w-1/3 border p-6 rounded-lg h-fit shadow-lg bg-base-100 dark:bg-slate-800 dark:border-slate-700">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Items:</span>
                <span>{cart.length}</span>
              </div>
              <div className="flex justify-between text-xl font-bold mb-6 text-pink-500">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full btn btn-primary text-white"
              >
                Checkout & Get Access
              </button>
              <button
                onClick={clearCart}
                className="w-full btn btn-ghost mt-2"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;