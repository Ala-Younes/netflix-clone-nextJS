"use client";
import Input from "@/components/Input";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useCallback, useState } from "react";
import UserCredentials from "../models/user";

type AuthVariant = "login" | "register";

const Auth = () => {
  const [user, setUser] = useState<UserCredentials>({
    email: "",
    name: "",
    password: "",
  });

  const [variant, setVariant] = useState<AuthVariant>("login");

  const handleChange = (field: keyof UserCredentials, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const register = useCallback(async () => {
    try {
      axios
        .post("/api/register", user)
        .then((response) => {
          console.log(response.status);
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              console.log({
                error: {
                  response: error.response.data,
                },
                status: error.response.status,
              });
            }
          } else {
            console.log("Non-Axios Error", error.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="lg:bg-black/50 w-full h-full">
        <nav className="px-12 py-5">
          <Image
            src={"/images/logo.png"}
            alt="Logo"
            width={150}
            height={12}
            className="h-12"
          />
        </nav>
        <div className="flex justify-center m-12">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-3/5 lg:max-w-lg rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign In" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id={"name"}
                  type="text"
                  onChange={(e) => handleChange("name", e.target.value)}
                  value={user.name}
                  label={"Username"}
                />
              )}
              <Input
                id={"email"}
                type="email"
                onChange={(e) => handleChange("email", e.target.value)}
                value={user.email}
                label={"Email"}
              />
              <Input
                id={"password"}
                type="password"
                onChange={(e) => handleChange("password", e.target.value)}
                value={user.password}
                label={"Password"}
              />
              <button
                onClick={register}
                className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              >
                {variant === "login" ? "Login" : "Sign Up"}
              </button>
              <p className="flex justify-around text-neutral-500 mt-12">
                {variant === "login"
                  ? "First Time Using Netflix?"
                  : "Already have an account"}
                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
                  {variant === "login" ? "Create An Account" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
