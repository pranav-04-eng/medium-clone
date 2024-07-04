import React, { useContext, useRef } from "react";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link, Navigate } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import axios from "axios";
import {toast,Toaster} from 'react-hot-toast';
import { storeInSession } from "../common/session";
import { UserContext } from "../App";
import { authWithGoogle } from "../common/firebase";


export default function UserAuthForm({ type }) {
  let {userAuth:{access_token},setuserAuth}=useContext(UserContext)
  
  const userAuthThroughServer=(serverRoute,formdata)=>{
    
    console.log(import.meta.env.VITE_SERVER_DOMAIN+serverRoute)
    axios.post(import.meta.env.VITE_SERVER_DOMAIN+serverRoute,formdata)
    .then(({data})=>{
      storeInSession("user",JSON.stringify(data))
      setuserAuth(data)
    })
    .catch(({response})=>toast.error(response.data.error))
  }
  const handlesubmit = (e) => {
    console.log(type)
    const serverRoute=(type==="signup")?"/signup":"/signin"
    e.preventDefault();
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    let form = new FormData(formElement);
    let formdata = {};
    for (let [key, value] of form.entries()) {
      formdata[key] = value;
    }
    let { fullname, email, password } = formdata;
    if (fullname) {
      if (fullname.length < 3) {
        return toast.error( "Full name must be at least 3 letters long");
      }
    } 
    if (!email.length) {
      return toast.error("Enter the email address");
    }
    if (!emailRegex.test(email)) {
      return toast.error("Invalid email address");
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
          "Password should be 6 to 20 characters long with a numeric digit, 1 lowercase letter, and 1 uppercase letter"
      );
    }
    userAuthThroughServer(serverRoute,formdata)
  };

  const handleGoogleAuth=(e)=>{
    e.preventDefault();
    authWithGoogle().then(user=>{
      let serverRoute="/google-auth"
      let formData={
        access_token:user.accessToken}
      
      userAuthThroughServer(serverRoute,formData)
      
    })}
  return (
    access_token ? <Navigate to='/'/>:
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex justify-center items-center">
      <Toaster />
        <form id="formElement" className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type == "sign-in" ? "Welcome Back!" : "Join Us Today"}
          </h1>
          {type != "sign-in" ? (
            <InputBox
              name="fullname"
              type="text"
              placeholder="Full Name"
              icon="fi-rr-user"
            />
          ) : (
            ""
          )}
          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            icon="fi-rr-envelope"
          />
          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-key"
          />
          <button
            className="btn-dark center mt-14"
            type="submit"
            onClick={handlesubmit}
          >
            {type.replace("-", " ")}
          </button>
          <div
            className="relative w-full flex items-center gap-2
            my-10 opacity-10 uppercase text-black font-bold"
          >
            <hr className="w-1/2 ☐ border-black" />
            <p>OR</p>
            <hr className="w-1/2 border-black" />
          </div>
          <button
            className="btn-dark flex items-center
            justify-center gap-4 w-[98%] center"
            onClick={handleGoogleAuth}
          >
            <img src={googleIcon} className="w-5" />
            continue with google
          </button>

          {type === "sign-in" ? (
            <p className="mt-6 □text-dark-grey text-xl text-center">
              Don't have an account?
              <Link to="/signup" className="underline text-black text-x1 ml-1">
                Join us Today
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already a member?
              <Link to="/signin" className="underline text-black text-xl ml-1">
                Sign in here
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
}
