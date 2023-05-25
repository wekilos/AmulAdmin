import React, { useContext, useState } from "react";
import {
  MailFilled,
  LockFilled,
  EyeFilled,
  EyeInvisibleFilled,
} from "@ant-design/icons";
import { message } from "antd";
import "antd/dist/antd.css";
import "./login.css";
import { axiosInstance } from "../../utils/axiosIntance";
import { useHistory } from "react-router-dom";
import { SebedimContext } from "../../context/sebedim";

const Login = () => {
  const { dil } = useContext(SebedimContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const CheckPassword = () => {
    if (email === "admin" && password === "admin") {
      history.push({ pathname: "/ActiveProducts" });
    } else {
      message.warn("Error!");
    }
    // axiosInstance
    //     .post("/api/admin/login", {
    //         email: email,
    //         password: password,
    //     })
    //     .then((data) => {
    //         console.log(data.data);
    //         if (data.data.login === false) {
    //             message.warn(data.data.msg);
    //         } else {
    //             message.success("Ustunlikli!");
    //             localStorage.setItem("TDYAdmin", JSON.stringify(data.data));
    //             history.push({
    //                 pathname: "/requests",
    //             });
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         message.warn(err.msg);
    //     });
  };
  return (
    <div className="body">
      {/* <h2 className='logo' >Logo</h2> */}
      <div className="login-container mt-10 rounded-[8px]">
        <h2 className="h2">
          {dil === "tm"
            ? "Gaýtadan hoş geldiňiz"
            : dil === "ru"
            ? "Добро пожаловать"
            : "Welcome Back"}
        </h2>
        <p className="p">
          {dil === "tm"
            ? "Girmek üçin şahsyýet maglumatlaryňyzy giriziň!"
            : dil === "ru"
            ? "Введите свои учетные данные для доступа!"
            : "Enter your credentials to access!"}
        </p>

        <div className="input-container">
          <MailFilled className="icon" />
          <input
            className="input"
            value={email}
            type="email"
            style={{ width: "395px" }}
            placeholder={
              dil === "tm"
                ? "Email girizin"
                : dil === "ru"
                ? "Электронная почта"
                : "Enter email address"
            }
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <LockFilled className="icon-lock" />
          <input
            className="input"
            type={type}
            placeholder={
              dil === "tm"
                ? "Parol girizin"
                : dil === "ru"
                ? "Введите свой пароль"
                : "Enter your password"
            }
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {type == "password" ? (
            <EyeFilled
              className="icon"
              style={!password ? { color: "white" } : { color: "#267fff" }}
              onClick={() => setType("text")}
            />
          ) : (
            <EyeInvisibleFilled
              className="icon"
              onClick={() => setType("password")}
            />
          )}
        </div>

        <button className="button" onClick={() => CheckPassword()}>
          {dil === "tm" ? "Giriň" : dil === "ru" ? "Войти" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
