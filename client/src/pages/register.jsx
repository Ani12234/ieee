// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { registerUser } from "./../store/auth-slice"; // Assume this is defined to handle register actions
// import { registerFormControls } from "./../config"; // Form controls defined in config

// function AuthRegister() {
//   const [formData, setFormData] = useState({});
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Dynamically initialize form data state based on `registerFormControls`
//   const initializeFormData = () => {
//     const initialData = {};
//     registerFormControls.forEach((control) => {
//       initialData[control.name] = ""; // Initialize with empty strings
//     });
//     setFormData(initialData);
//   };

//   useState(() => {
//     initializeFormData();
//   }, []);

//   // Function to validate individual fields
//   const validateField = (name, value) => {
//     if (name === "name" && !/^[A-Za-z]+$/.test(value)) {
//       alert("Name must contain only alphabets.");
//     } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
//       alert("Please enter a valid email address.");
//     } else if (name === "password" && !/^\d+$/.test(value)) {
//       alert("Password must contain only numbers.");
//     }
//   };

//   // Form submit handler
//   const onSubmit = (event) => {
//     event.preventDefault();

//     // Validate all fields before submitting
//     const { name, email, password } = formData;
//     if (!/^[A-Za-z]+$/.test(name) || !/\S+@\S+\.\S+/.test(email) || !/^\d+$/.test(password)) {
//       alert("Please fix the errors before submitting.");
//       return;
//     }

//     dispatch(registerUser(formData)).then((data) => {
//       if (data?.payload?.success) {
//         navigate("/auth");
//       } else {
//         alert("Registration failed. Please try again.");
//       }
//     });
//   };

//   return (
//     <div className="relative mx-auto w-full max-w-md space-y-6 bg-black">
//       <form
//         onSubmit={onSubmit}
//         className="relative bg-white/20 backdrop-blur-sm border-2 border-white/20 shadow-lg rounded-lg py-12 px-8"
//       >
//         <h3 className="text-3xl font-semibold text-center text-white">Sign Up Here</h3>

//         <div className="mt-8 space-y-6">
//           {registerFormControls.map((control) => (
//             <div key={control.name}>
//               <label
//                 htmlFor={control.name}
//                 className="block text-white text-sm font-medium"
//               >
//                 {control.label}
//               </label>
//               <input
//                 type={control.type}
//                 id={control.name}
//                 name={control.name}
//                 placeholder={control.placeholder}
//                 value={formData[control.name] || ""}
//                 onChange={(e) => {
//                   setFormData({ ...formData, [control.name]: e.target.value });
//                   validateField(control.name, e.target.value); // Validate the field on change
//                 }}
//                 className="mt-2 w-full px-4 py-3 bg-white/10 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           ))}
//         </div>

//         <button
//           type="submit"
//           className="mt-8 w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
//         >
//           Sign Up
//         </button>

//         <p className="mt-6 text-sm text-center text-white">
//           Already have an account?{" "}
//           <Link to="/auth" className="text-blue-500 hover:underline font-medium">
//             Log In
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default AuthRegister;
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "./../store/auth-slice"; // Assume this is defined to handle register actions
import { registerFormControls } from "./../../src/components/config/index"; // Form controls defined in config

function AuthRegister() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Dynamically initialize form data state based on `registerFormControls`
  const initializeFormData = () => {
    const initialData = {};
    registerFormControls.forEach((control) => {
      initialData[control.name] = ""; // Initialize with empty strings
    });
    setFormData(initialData);
  };

  useState(() => {
    initializeFormData();
  }, []);

  // Form submit handler
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        navigate("/auth");
      } else {
        alert("Registration failed. Please try again.");
      }
    });
  };

  return (
    <div className="relative mx-auto w-full max-w-md space-y-6 bg-black">
      <form
        onSubmit={onSubmit}
        className="relative bg-white/20 backdrop-blur-sm border-2 border-white/20 shadow-lg rounded-lg py-12 px-8"
      >
        <h3 className="text-3xl font-semibold text-center text-white">Sign Up Here</h3>

        <div className="mt-8 space-y-6">
          {registerFormControls.map((control) => (
            <div key={control.name}>
              <label
                htmlFor={control.name}
                className="block text-white text-sm font-medium"
              >
                {control.label}
              </label>
              <input
                type={control.type}
                id={control.name}
                name={control.name}
                placeholder={control.placeholder}
                value={formData[control.name] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [control.name]: e.target.value })
                }
                className="mt-2 w-full px-4 py-3 bg-white/10 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="mt-8 w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>

        <p className="mt-6 text-sm text-center text-white">
          Already have an account?{" "}
          <Link to="/auth" className="text-blue-500 hover:underline font-medium">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default AuthRegister;