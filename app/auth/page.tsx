"use client";
import Input from "@/components/Input";
import Image from "next/image";
import { useCallback, useState } from "react";

type AuthVariant = "login" | "register";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState<AuthVariant>("login");

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
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  label={"Username"}
                />
              )}
              <Input
                id={"email"}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                label={"Email"}
              />
              <Input
                id={"password"}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                label={"Password"}
              />
              <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
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
