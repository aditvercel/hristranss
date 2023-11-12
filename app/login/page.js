"use client";

import React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@/components/Button";
import { useSession, signIn, signOut } from "next-auth/react";

export default function page() {
  const [showPassword, setShowPassword] = useState(false);
  const { data: session } = useSession();
  const [typing, setTyping] = useState();
  console.log(typing);
  console.log("session", session);

  const handleClickShowPassword = () =>
    setShowPassword((prev) => {
      return !prev;
    });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTyping((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <div className=" mt-20 md:mt-0 grid md:flex gap-5 p-2 min-h-screen">
      <div className="md:w-[50%] p-2 grid items-center justify-center shadow-md shadow-black">
        <div className="relative top-[-50px]">
          <div className="flex justify-center align-middle motion-safe:animate-bounce"></div>
          <div className="text-start text-4xl font-sans font-medium">
            HRIS TRANS
          </div>
          <div>your HRIS apps partner</div>
        </div>
      </div>

      <div className="md:w-[50%] p-2 flex items-center justify-center">
        <div className="grid">
          <div className="text-center text-4xl font-medium">
            Sign in to HRIS TRANS
          </div>

          <div className="grid mt-5">
            <TextField
              id="standard-basic"
              label="Username"
              name="UserName"
              variant="standard"
              onChange={handleChange}
            />
          </div>
          <div className="grid mt-5">
            <TextField
              id="standard-basic"
              label="Password"
              name="Password"
              variant="standard"
              type="password"
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end mt-5">
            {session ? (
              <Button
                text={"LOGOUT"}
                type={"NO"}
                onClick={() => {
                  signOut();
                }}
              />
            ) : (
              <Button
                onClick={() => {
                  signIn("Google");
                }}
                text={"LOGIN"}
                type={"YES"}
              ></Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
