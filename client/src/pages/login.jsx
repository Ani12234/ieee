import { useState } from "react";
import { loginFormControls } from "./../components/config/index"; // Form controls for login
import { loginUser } from "../store/auth-slice"; // Action for login
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  // Handle form submission
  function onSubmit(event) {
    event.preventDefault();

    // Dispatch login action
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        alert(data?.payload?.message);
      } else {
        alert(data?.payload?.message);
      }
    });
  }

  return (
    <div className="relative mx-auto w-full max-w-md min-h-screen bg-black">
      <form
        onSubmit={onSubmit}
        className="relative bg-white/20 backdrop-blur-sm border-2 border-white/20 shadow-lg rounded-lg p-8"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-white">
            Sign in to your account
          </h3>
        </div>

        <div className="mt-8 space-y-6">
          {/* Loop over form controls and render inputs dynamically */}
          {loginFormControls.map((control) => (
            <div key={control.name}>
              <label htmlFor={control.name} className="block text-white text-sm font-medium">
                {control.label}
              </label>
              <input
                type={control.type}
                id={control.name}
                name={control.name}
                placeholder={control.placeholder}
                value={formData[control.name] || ""}
                onChange={(e) => setFormData({ ...formData, [control.name]: e.target.value })}
                className="mt-2 w-full px-4 py-3 bg-white/10 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="mt-8 w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default AuthLogin;
