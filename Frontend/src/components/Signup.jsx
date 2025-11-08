import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
        userInfo
      );
      if (res.data) {
        toast.success("Signup Successfully");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (err.response) {
        console.error(err);
        toast.error("Error: " + err.response.data.message);
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[600px]">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>

            <h3 className="font-bold text-lg">Signup</h3>

            {/* --- START OF FIX --- */}
            {/* Grid container for inputs */}
            <div className="mt-4 grid grid-cols-[auto_1fr] items-center gap-4">
              {/* Full Name Row */}
              <span className="text-right">Name</span>
              <input
                type="text"
                placeholder="Enter your fullname"
                className="w-full px-3 py-1 border rounded-md outline-none"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && (
                <span className="col-span-2 col-start-2 text-sm text-red-500">
                  This field is required
                </span>
              )}

              {/* Email Row */}
              <span className="text-right">Email</span>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-1 border rounded-md outline-none"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="col-span-2 col-start-2 text-sm text-red-500">
                  This field is required
                </span>
              )}

              {/* Password Row */}
              <span className="text-right">Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-1 border rounded-md outline-none"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="col-span-2 col-start-2 text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            
            {/* Buttons - Changed justify-around to justify-between */}
            <div className="flex justify-between items-center mt-6">
              <button
                type="submit"
                className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
              >
                Signup
              </button>
              <p>
                Have account?{" "}
                <button
                  type="button"
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Login
                </button>
              </p>
            </div>
            {/* --- END OF FIX --- */}

          </form>
          {/* Login component remains outside the <p> tag */}
          <Login />
        </div>
      </div>
    </div>
  );
}

export default Signup;