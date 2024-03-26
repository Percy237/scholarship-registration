import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type RegistrationFormData = {
    fullName: string;
    email: string;
    phoneNumber: string;
};


const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RegistrationFormData>();

    const mutation = useMutation(apiClient.register, {
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
        reset();
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
        },
    });

    const onSubmit = handleSubmit((data) => {
        setIsLoading(true);
        mutation.mutate(data);
    });

    return (
        <div className="flex items-center justify-center h-screen">
            <form className="flex flex-col gap-5 max-w-96 bg-white p-10 shadow" onSubmit={onSubmit}>
                <ToastContainer />
                <h2 className="text-3xl font-bold">Use this form to register</h2>
                <div className="flex flex-col gap-5">
                    <label className="text-gray-400 text-sm font-bold">
                        Full Name:
                        <input
                            className="border-b-2 text-black text-xl border-gray-400 focus:outline-none w-full py-1 px-2 font-normal"
                            type="text"
                            {...register("fullName", { required: "This field is required" })}
                        />
                        {errors.fullName && (
                            <span className="text-red-500">{errors.fullName.message}</span>
                        )}
                    </label>
                    <label className="text-gray-400 text-sm font-bold">
                        Email:
                        <input
                            className="border-b-2 text-black text-xl border-gray-400 focus:outline-none w-full py-1 px-2 font-normal"
                            type="email"
                            {...register("email", {
                                required: "This field is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <span className="text-red-500">{errors.email.message}</span>
                        )}
                    </label>
                    <label className="text-gray-400 text-sm font-bold">
                        Phone Number (Cameroonian):
                        <input
                            className="border-b-2 text-black text-xl border-gray-400 focus:outline-none w-full py-1 px-2 font-normal"
                            type="tel"
                            {...register("phoneNumber", {
                                required: "This field is required",
                                pattern: {
                                    value: /^(?:\+?237|0)\s*(6(?:[0-9]\s*){8})$/,
                                    message: "Invalid Cameroonian phone number",
                                },
                            })}
                        />
                        {errors.phoneNumber && (
                            <span className="text-red-500">{errors.phoneNumber.message}</span>
                        )}
                    </label>
                    <span className="flex justify-center items-center">
                        <button type="submit" disabled={isLoading} className={`border-2 bg-black  text-white rounded-3xl w-[50%] bg p-2 font-bold hover:text-black hover:bg-white hover:border-black ${isLoading ? 'opacity-50 cursor-not-allowed': ""}`}>
                            {isLoading ? 'Submitting...' : "Submit"}
                        </button>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Register;
