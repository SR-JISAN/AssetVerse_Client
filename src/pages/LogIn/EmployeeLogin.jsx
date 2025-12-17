import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router';



const EmployeeLogin = () => {
    const { register , handleSubmit}= useForm()
    const { signInUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();




    const handleEmployeeLogin=(data)=>{
      const email = data.email
      const pass = data.password
      signInUser(email, pass)
        .then((result) => {
          if (result.user) {
            Swal.fire({
              title: "Welcome Back ",
              icon: "success",
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            navigate(location.state || "/home");
          }
        })
        .catch((err) => {
          if (err) {
            Swal.fire("Something Went Wrong");
          }
        });
    }

    return (
      <div className="mw">
        <div className="  min-h-screen">
          <div className="flex flex-col items-center justify-center">
            <div className="my-9">
              <h1 className="text-5xl text-blue-900 font-bold text-center italic">
                Login as Employee!
              </h1>
            </div>
            <div className="card flex-1 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                {/* ----------form submit-------------- */}
                <form onSubmit={handleSubmit(handleEmployeeLogin)}>
                  <fieldset className="fieldset">
                    <label className="label font-bold text-blue-950">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                      })}
                      className="input"
                      placeholder="Email"
                    />
                    <label className="label font-bold text-blue-950">
                      Password
                    </label>
                    <input
                      {...register("password", {
                        required: true,
                        maxLength: 10,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/,
                        min: 6,
                      })}
                      type="password"
                      className="input"
                      placeholder="Password"
                    />
                    <div>
                      <a className="link link-hover hover:text-blue-800">
                        Forgot password?
                      </a>
                    </div>
                    <div>
                      <Link to="/register" className="link link-hover">
                        New as Employee?{" "}
                        <span className="hover:text-blue-800 font-bold">
                          Register.
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

export default EmployeeLogin;