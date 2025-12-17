// import axios from 'axios';
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import useAxiosUrl from "../../hooks/useAxiosUrl";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { createUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState("Employee");
  const axiosPublic = useAxiosUrl();
  
  const handleRegister = (data) => {
    console.log("Email:", data.email, "Password:", data.password);
     const userData = {
       name: data.name,
       email: data.email,
       role: role,
       dateOfBirth: data.dateOfBirth,       
     };
     if (role === "HR-Manager") {
       Object.assign(userData, {
         companyName: data.companyName,
         companyLogo: data.companyLogo,
         packageLimit: 5,
         currentEmployees: 0,
         subscription: "basic",
       });
     }
     

    createUser(data.email, data.password)
      .then((result) => {
        if (result?.user) {
         axiosPublic
           .post("/users", userData)
           .then((res) => {
             console.log(res);
           })
           .catch((err) => {
             console.log(err);
           });
          Swal.fire({
            title: `${role} Account created successfully`,
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });

          navigate(location.state || "/");
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire("Something Went Wrong");
        }
      });
  };

  
  return (
    <div className="mw">
      <div className="  min-h-screen">
        <div className="flex flex-col items-center justify-center">
          <div className="my-9">
            <h1 className="text-5xl text-blue-900 font-bold text-center italic">
              Join as {role === "Employee" ? "Employee" : "HR Manager"}!
            </h1>
          </div>
          <div className="card flex-1 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              {/* ----------form submit-------------- */}
              <form onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset">
                  {/* -------------role selection------ */}
                  <div className="flex  gap-6 my-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        className="radio radio-primary"
                        checked={role === "Employee"}
                        onChange={() => setRole("Employee")}
                      />
                      <span>Employee</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        className="radio radio-primary"
                        checked={role === "HR-Manager"}
                        onChange={() => setRole("HR-Manager")}
                      />
                      <span>HR Manager</span>
                    </label>
                  </div>
                  {/* ---------name field--------- */}
                  <label className="label font-bold text-blue-950">Name</label>
                  <input
                    type="name"
                    {...register("name", { required: true })}
                    className="input w-full"
                    placeholder="Your Name"
                  />

                  {role === "HR-Manager" && (
                    <>
                      <label className="label font-bold text-blue-950">
                        Company Name
                      </label>
                      <input
                        type="name"
                        {...register("companyName", { required: true })}
                        className="input w-full"
                        placeholder="Your Company Name"
                      />

                      <label className="label font-semibold">
                        Company Logo URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://i.ibb.co/example/logo.png"
                        {...register("companyLogo", { required: true })}
                        className="input input-bordered w-full"
                      />
                    </>
                  )}

                  {/* -----------email field----------- */}
                  <label className="label font-bold text-blue-950">Email</label>
                  <input
                    type="email"
                    {...register("email", {
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                    className="input w-full"
                    placeholder="Email"
                  />
                  {/* ----------password field----------- */}
                  <label className="label font-bold text-blue-950">
                    Password
                  </label>
                  <input
                    {...register("password", {
                      required: true,
                      // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/,
                      minLength: 6,
                    })}
                    type="password"
                    className="input w-full"
                    placeholder="Password"
                  />
                  <div>
                    <a className="link link-hover hover:text-blue-800">
                      Forgot password?
                    </a>
                  </div>
                  {/* --date of birth--- */}
                  <label className="label font-bold text-blue-950">
                    Date of Birth
                  </label>
                  <input
                    {...register("dateOfBirth", { required: true })}
                    type="date"
                    className="input input-bordered w-full"
                  />

                  {/* ----------user role-------- */}
                  <label className="label font-bold text-blue-950">
                    Your Role
                  </label>
                  <input
                    {...register("userRole", { required: true })}
                    type="text"
                    value={role}
                    disabled
                    className="input input-bordered w-full bg-gray-100 text-gray-600 cursor-not-allowed"
                  />

                  <div>
                    <Link to="/employee-Login" className="link link-hover">
                      Already have a Employee Account?{" "}
                      <span className="hover:text-blue-800 font-bold">
                        LogIn.
                      </span>
                    </Link>
                  </div>
                  <button className="btn bg-linear-to-r from-blue-900 to-blue-600 text-white mt-4">
                    Login
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;