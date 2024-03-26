import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

 export type LoginFormData = {
    email: string;
    password: string;
};



const AdminLoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginFormData>();

    const navigate = useNavigate();
    const mutation = useMutation(apiClient.adminLogin, {
        onSuccess: () => {
             toast.success("Registration successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsLoading(false);
          setTimeout(() => {
          navigate("/admin-dashboard")
        }, 3000);
           
        },
        onError: (error: Error) => {
             toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsLoading(false);
        }
    })
   
    const onSubmit = handleSubmit((data) => {
         setIsLoading(true);
        mutation.mutate(data)
    })
    
  return (
    <div className="flex items-center justify-center h-screen">
      <form className="flex flex-col gap-5 w-96 bg-white p-10 shadow" onSubmit={onSubmit}>
         <ToastContainer />
          <h2 className="text-3xl font-bold">Sign in</h2>
          <div className="flex flex-col gap-5">
              <label className="text-gray-700 text-sm font-bold">
                  Email:
                  <input className="border-b-2 text-black text-xl border-gray-400 focus:outline-none w-full py-1 px-2 font-normal" type="email" {...register("email", {
                                required: "This field is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            })}/>
                        {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
          )}
              </label>
              <label className="text-gray-700 text-sm font-bold">
    Password:
    <input
        className="border-b-2 text-black text-xl border-gray-400 focus:outline-none w-full py-1 px-2 font-normal"
        type="password"
        {...register("password", {
            required: "This field is required",
            pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit",
            },
        })}
    />
    {errors.password && (
        <span className="text-red-500">{errors.password.message}</span>
    )}
</label>

                <span className="flex justify-center items-center">
                        <button type="submit" disabled={isLoading} className={`border-2 bg-black  text-white rounded-3xl w-[50%] bg p-2 font-bold hover:text-black hover:bg-white hover:border-black ${isLoading ? 'opacity-50 cursor-not-allowed': ""}`}>
                            {isLoading ? 'Singing in...' : "Sign in"}
                        </button>
                    </span>
          </div>
          
      </form>
    </div>
  )
}

export default AdminLoginPage;
