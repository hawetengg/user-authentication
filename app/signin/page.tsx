"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // try {
    //   const response = await fetch("https://akil-backend.onrender.com/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: data.email,
    //       password: data.password,
    //     }),
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     console.error("Login failed", errorData);
    //     return;
    //   }

    //   const result = await response.json();
      const authResult = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/dashboard",
      });

      if (authResult?.ok) {
        router.push(authResult.url ||"/dashboard");
      } else {
        console.error("Sign in with next-auth failed", authResult?.error);
      }
    // } catch (error) {
    //   console.error("An unexpected error occurred", error);
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl text-center text-[#25324B] mb-6 font-[700]">
          Welcome Back,
        </h1>

        <button
          className="flex items-center justify-center w-full py-2 mb-6 border border-gray-300 rounded-lg hover:bg-gray-100"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <FcGoogle className="mr-3" size={28} />
          <span className="text-black">Sign In with Google</span>
        </button>

        <div className="flex items-center justify-center my-6">
          <span className="w-1/4 border-b border-gray-300"></span>
          <span className="px-3 text-gray-500">Or Sign In with Email</span>
          <span className="w-1/4 border-b border-gray-300"></span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter email address"
              type="email"
              className="text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              {...register("password", { required: "Password is required" })}
              type="password"
              className="text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#2D298E] text-white py-2 rounded-3xl hover:bg-[#1f1aaa] disabled:opacity-50"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don&#39;t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
