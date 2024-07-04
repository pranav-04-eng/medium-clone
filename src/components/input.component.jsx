import React, { useState } from "react";

export default function InputBox({ name, type, id, value, icon, placeholder }) {
  const [passwordvisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative w-[100%] mb-4">
      <input
        name={name}
        type={
          type === "password" ? (passwordvisible ? "text" : "password") : type
        }
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className="input-box"
      />
      <i className={`fi ${icon} input-icon`}></i>

      {type === "password" ? (
        <i
          className={
            passwordvisible
              ? "fi fi-rr-eye input-icon left-[auto] right-4"
              : "fi fi-rr-eye-crossed input-icon left-[auto] right-4"
          }
          onClick={() => setPasswordVisible(!passwordvisible)}
        ></i>
      ) : (
        ""
      )}
    </div>
  );
}
