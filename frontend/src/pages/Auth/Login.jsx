import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email")
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Minimum 8 characters")
        .matches(/[A-Z]/, "At least one uppercase letter required")
        .matches(/[a-z]/, "At least one lowercase letter required")
        .matches(/[0-9]/, "At least one number required")
        .matches(/[@$!%*?&]/, "At least one special character required"),
});

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },reset
    } = useForm({
        resolver: yupResolver(schema),
    });

    const registerData = async (data) => {
        console.log("login Data:", data);
        // Yahan baad mein backend API connect karna hai.

        reset()
    };

    return (
        <div className="register-page d-flex align-items-center justify-content-center py-3 px-3">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
                        <div className="register-card p-3 p-md-5 rounded-4 shadow-lg">
                            <h2 className="text-center fw-bold mb-1">
                                LOGIN HEARE
                            </h2>

                            <p className="text-center text-light mb-3">
                                Create your account
                            </p>

                            <form onSubmit={handleSubmit(registerData)} noValidate>

                                {/* Email */}
                                <div className="mb-3">
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Enter Your Email"
                                        className={`form-control text-light ${errors.email ? "is-invalid" : ""
                                            }`}
                                        {...register("email")}
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">
                                            {errors.email.message}
                                        </div>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="mb-4">

                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Create a strong password"
                                        className={`form-control text-light ${errors.password ? "is-invalid" : ""
                                            }`}
                                        {...register("password")}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">
                                            {errors.password.message}
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="btn register-btn w-100 py-2 fw-semibold text-light"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Registering..." : "Login"}
                                </button>
                            </form>

                            <p className="text-center mt-4 mb-0 text-light">
                                No account?{" "}
                                <Link to="/register" className="login-link fw-semibold">
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

