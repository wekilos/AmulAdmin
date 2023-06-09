import React, { useContext, useEffect, useState } from "react";
import "./header.css";
import "antd/dist/antd.css";
import { Layout, Menu, Input, Dropdown, Drawer, Modal } from "antd";

import {
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { logout } from "../utils/index";
import { axiosInstance } from "../utils/axiosIntance";
import { useHistory } from "react-router-dom";
// import sound from "../img/sound.wav";
import { SebedimContext } from "../context/sebedim";
import logo from "../img/logo.png";
import { useSizeComponents } from "./sizeComponent";
import SiderDemo from "./sidebar";
const { Search } = Input;

const { Header } = Layout;

const Headers = () => {
  const { dil, ChangeDil } = useContext(SebedimContext);
  const [lang, setLang] = useState(false);

  const [width, height] = useSizeComponents();
  const [menu, setMenu] = useState(false);
  const history = useHistory();
  const Logout = () => {
    logout();
    history.push({ pathname: "/" });
  };
  const profile_menu = (
    <Menu>
      <Menu.Item onClick={Logout}>
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Header
        className="site-layout-background header bg-white"
        style={{ position: "fixed", background: "white" }}
      >
        <div className="flex justify-start pl-[50px]">
          {width < 500 && (
            <div className="mr-5 -ml-6">
              <MenuOutlined
                onClick={() => {
                  setMenu(true);
                }}
                style={{ color: "black" }}
              />
            </div>
          )}
          <div className="bg-white h-[60px] mr-[200px]" align="center">
            <img
              className="object-contain h-[50px] pt-2"
              src={logo}
              alt="logo"
            />
          </div>
        </div>
        <div className="profile">
          <Dropdown overlay={profile_menu}>
            <div className="ant-dropdown-link" onClick={Logout}>
              <UserOutlined style={{ color: "black" }} />
            </div>
          </Dropdown>
        </div>
        <Drawer
          width={250}
          placement="left"
          title="Menu"
          closable={true}
          mask={true}
          maskClosable={true}
          onClose={() => {
            setMenu(false);
          }}
          visible={menu}
        >
          <div>
            <SiderDemo />
          </div>
        </Drawer>
        <div
          style={{ color: "black" }}
          onMouseEnter={() => setLang(true)}
          onMouseOut={() => setLang(false)}
          className="absolute top-0 right-[60px] cursor-pointer h-[50px]"
        >
          {dil === "tm" ? "TM" : dil === "ru" ? "RU" : "EN"}
        </div>
        <div
          onMouseEnter={() => setLang(true)}
          onMouseLeave={() => setLang(false)}
          className={
            (lang === true ? "flex " : " hidden ") +
            "fixed justify-evenly top-[50px] z-10 border-t-[1px] rounded-[4px] border-t-[#efefef] right-[5px] h-[50px] leading-[50px] cursor-pointer bg-white w-[150px] pl-2 pr-2 pt-0 pb-0"
          }
        >
          <div
            onClick={() => ChangeDil("tm")}
            className="hover:text-black"
            style={{ color: "black" }}
          >
            TM
          </div>
          <div
            onClick={() => ChangeDil("ru")}
            className="hover:text-black"
            style={{ color: "black" }}
          >
            RU
          </div>
          <div
            onClick={() => ChangeDil("en")}
            className="hover:text-black"
            style={{ color: "black" }}
          >
            EN
          </div>
        </div>
      </Header>
    </>
  );
};
export default Headers;
