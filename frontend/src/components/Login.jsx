import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
function Login() {
  const closeModal = () => {
    document.getElementById("my_modal_3").close();
  };
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box  ">
          <Link
            to="/"
            onClick={closeModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
          >
            ✕
          </Link>
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            {/* if there is a button in form, it will close the modal */}

            <h3 className="font-bold text-2xl">Login</h3>
            {/* email */}
            <div className="mt-3 space-y-5">
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-80 px-3  py-1 border rounded-md outline-none"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && <span className="text-sm text-red-500">This field is required</span>}
            </div>
            {/* password */}
            <div className="mt-5 space-y-3">
              <span >Password</span>
              <br />
              <input
                type="password"
                placeholder="Enter Your Password"
                className="w-80 px-3  py-1 border rounded-md outline-none"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && <span className="text-sm text-red-500">This field is required</span>}
            </div>
            {/* button */}
            <div className="flex justify-between mt-4">
              <button className="bg-pink-500 text-white rounded-xl px-4 py-2 hover:bg-pink-700 duration-200 mt-3">
                Login
              </button>

              <p className="mt-5 text-l">
                Not Registered ?{" "}
                <Link
                  to="/signup"
                  className="underline text-blue-500 cursor-pointer"
                >
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default Login;
