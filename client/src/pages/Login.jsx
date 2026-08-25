import React from "react";
import { Lock, Mail, User2Icon } from "lucide-react";
import api from "../configs/api";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";

const Login = () => {
const dispatch = useDispatch();
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");

  const [state, setState] = React.useState(urlState || "login");

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const {data} = await api.post(`/api/users/${state}`,formData)
        dispatch(login(data))
        localStorage.setItem('token',data.token)
        toast.success(data.message)
    } catch (error) {

        toast(error?.response?.data?.message || error.message)
        
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <style>{`
        input:focus,
        input:active,
        input:focus-visible {
          outline: none !important;
          box-shadow: none !important;
          border: none !important;
        }

        input {
          outline: none !important;
          box-shadow: none !important;
          border: none !important;
        }
      `}</style>

      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
        >
          <h1 className="text-gray-900 text-3xl mt-10 font-medium">
            {state === "login" ? "Login" : "Sign up"}
          </h1>

          <p className="text-gray-500 text-sm mt-2">
            Please {state} to continue
          </p>

          {state !== "login" && (
            <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <User2Icon size={16} color="orange" />

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0"
              />
            </div>
          )}

          <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <Mail size={13} color="orange" />

            <input
              type="email"
              name="email"
              placeholder="Email id"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0"
            />
          </div>

          <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <Lock size={13} color="orange" />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0"
            />
          </div>

          <div className="mt-4 text-left text-orange-500">
            <button className="text-sm" type="reset">
              Forget password?
            </button>
          </div>

          <button
            type="submit"
            className="mt-2 w-full h-11 rounded-full text-white bg-orange-500 hover:bg-orange-600 transition-opacity"
          >
            {state === "login" ? "Login" : "Sign up"}
          </button>

          <p
            onClick={() =>
              setState((prev) =>
                prev === "login" ? "register" : "login"
              )
            }
            className="text-gray-500 text-sm mt-3 mb-11 cursor-pointer"
          >
            {state === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <span className="text-orange-500 hover:underline">
              click here
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;