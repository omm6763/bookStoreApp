import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const [ setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        userInfo
      );

      if (res.data) {
        toast.success("Logged in Successfully");
        document.getElementById("my_modal_3").close();
        
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        localStorage.setItem("Token", res.data.token); 
        setAuthUser(res.data.user);
      }
    } catch (err) {
      if (err.response) {
        console.error(err);
        toast.error("Error: " + err.response.data.message);
      }
    }
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal backdrop-blur-sm">
        <div className="modal-box bg-slate-900 text-white shadow-2xl border border-slate-700 rounded-2xl p-8 max-w-[450px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Close Button */}
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 hover:bg-slate-800 transition-colors"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </Link>

            <h3 className="font-bold text-2xl text-center mb-8 text-pink-500">Welcome Back</h3>

            <div className="space-y-5">
              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full bg-slate-800 border-slate-600 focus:border-pink-500 focus:outline-none transition-colors"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-xs text-red-500 mt-1">Email is required</span>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full bg-slate-800 border-slate-600 focus:border-pink-500 focus:outline-none transition-colors"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-xs text-red-500 mt-1">Password is required</span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <button
                type="submit"
                className="btn bg-pink-500 hover:bg-pink-600 text-white border-none w-full"
              >
                Login
              </button>
              <p className="text-center text-sm text-slate-400">
                Not registered?{" "}
                <Link
                  to="/signup"
                  className="text-pink-500 hover:underline font-medium cursor-pointer ml-1"
                  onClick={() => document.getElementById("my_modal_3").close()}
                >
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
export default Login;