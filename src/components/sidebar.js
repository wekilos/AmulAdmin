import React, { useContext } from "react";
import "./sidebar.css";
import { logout } from "../utils";
// import logo_ from "../../img/logo_.svg";
// import logo from "../../img/logo.svg";
import { Layout, Menu, Tooltip } from "antd";
import { Link } from "react-router-dom";
import {
  NotificationOutlined,
  RiseOutlined,
  SettingOutlined,
  DashboardOutlined,
  LogoutOutlined,
  HeartFilled,
  ScheduleOutlined,
  CarOutlined,
  ToolOutlined,
  FileTextOutlined,
  CalculatorOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import logo from "../img/logo.png";
import { SebedimContext } from "../context/sebedim";
import { useSizeComponents } from "./sizeComponent";

const { SubMenu } = Menu;
const { Sider } = Layout;

const SiderDemo = (props) => {
  const { dil } = useContext(SebedimContext);

  const [width, height] = useSizeComponents();
  return (
    // <div>
    <Sider
      style={{
        overflow: "auto",
        minHeight: "100vh",
        position: "sticky",
        top: "60px",
        left: 0,
      }}
      className="Sider  "
      width={220}
      trigger={null}
    >
      <Menu
        mode="inline"
        defaultOpenKeys={["sub1"]}
        className="sidebar-left mt-[60px]"
      >
        {/* <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <span className="menuitem ">
                                {dil === "tm"
                                    ? "Kategoriýa"
                                    : dil === "ru"
                                    ? "Категория"
                                    : "Category"}
                            </span>
                        </span>
                    }
                >
                    <Menu.Item className="menuitem menuitem2" key="63">
                        <Link to="/category">
                            {dil === "tm"
                                ? "Kategoriýa"
                                : dil === "ru"
                                ? "Категория"
                                : "Category"}
                        </Link>
                    </Menu.Item>
                    <Menu.Item className="menuitem menuitem2" key="63">
                        <Link to="/requests">
                            {dil === "tm"
                                ? "Ini"
                                : dil === "ru"
                                ? "Ширина"
                                : "Width"}
                        </Link>
                    </Menu.Item>
                    <Menu.Item className="menuitem menuitem2" key="1">
                        <Link to="/orders">
                            {dil === "tm"
                                ? "Uzynlygy"
                                : dil === "ru"
                                ? "Длина"
                                : "Orders"}
                        </Link>
                    </Menu.Item>
                    <Menu.Item className="menuitem menuitem2" key="2">
                        <Link to="/canceledRequests">
                            {dil === "tm"
                                ? "Material"
                                : dil === "ru"
                                ? "Материал"
                                : "Material"}
                        </Link>
                    </Menu.Item>
                    <Menu.Item className="menuitem menuitem2" key="3">
                        <Link to="/archive">
                            {dil === "tm"
                                ? "Reňk"
                                : dil === "ru"
                                ? "Цвет"
                                : "Color"}
                        </Link>
                    </Menu.Item>
                </SubMenu> */}

        <SubMenu
          key="sub6"
          title={
            <span className="menuitem">
              <span>
                {dil === "tm"
                  ? "Kategoriýa"
                  : dil === "ru"
                  ? "Категория"
                  : "Category"}
              </span>
            </span>
          }
        >
          <Menu.Item className="menuitem menuitem2" key="">
            <Link to="/category">
              {dil === "tm"
                ? "Kategoriýa"
                : dil === "ru"
                ? "Категория"
                : "Category"}
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="mesure"
          title={
            <span className="menuitem">
              <span>
                {dil === "tm"
                  ? "Olceg"
                  : dil === "ru"
                  ? "Размер и Цвет"
                  : "Mesure and Color"}
              </span>
            </span>
          }
        >
          <Menu.Item className="menuitem menuitem2" key="width">
            <Link to="/width">
              {dil === "tm" ? "Kategoriýa" : dil === "ru" ? "Шрина" : "Width"}
            </Link>
          </Menu.Item>

          <Menu.Item className="menuitem menuitem2" key="length">
            <Link to="/length">
              {dil === "tm" ? "Kategoriýa" : dil === "ru" ? "Длина" : "Length"}
            </Link>
          </Menu.Item>

          <Menu.Item className="menuitem menuitem2" key="material">
            <Link to="/material">
              {dil === "tm"
                ? "Kategoriýa"
                : dil === "ru"
                ? "Материал"
                : "Material"}
            </Link>
          </Menu.Item>

          <Menu.Item className="menuitem menuitem2" key="color">
            <Link to="/color">
              {dil === "tm" ? "Kategoriýa" : dil === "ru" ? "Цвет" : "Color"}
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="sub8"
          title={
            <span className="menuitem">
              <span>
                {dil === "tm" ? "Önüm" : dil === "ru" ? "Продукт" : "Product"}
              </span>
            </span>
          }
        >
          <Menu.Item className="menuitem menuitem2" key="117">
            <Link to="/ActiveProducts">
              {dil === "tm"
                ? "önümler"
                : dil === "ru"
                ? " продукты"
                : " products"}
            </Link>
          </Menu.Item>
          {/* <Menu.Item className="menuitem menuitem2" key="217">
                        <Link to="/DisActiveProducts">
                            {dil === "tm"
                                ? "Disactive önümler"
                                : dil === "ru"
                                ? "Неактивные продукты"
                                : "Disactive products"}
                        </Link>
                    </Menu.Item> */}
        </SubMenu>

        <SubMenu
          key="sub10"
          title={
            <span className="menuitem">
              <span>
                {dil === "tm"
                  ? "Baner we carusel"
                  : dil === "ru"
                  ? "Банер и Карусел"
                  : "Baner and carusel"}
              </span>
            </span>
          }
        >
          <Menu.Item className="menuitem menuitem2" key="Baner">
            <Link to="/baner">
              {dil === "tm" ? "Baner" : dil === "ru" ? "Банер" : "Baner"}
            </Link>
          </Menu.Item>
          <Menu.Item className="menuitem menuitem2" key="12">
            <Link to="/carusel">
              {dil === "tm" ? "Karusel" : dil === "ru" ? "Карусел" : "Carusel"}
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="sub9"
          title={
            <span className="menuitem">
              {/* <HomeOutlined /> */}
              <span>
                {dil === "tm"
                  ? "Habarlar"
                  : dil === "ru"
                  ? "Сообщения"
                  : "Messages"}
              </span>
            </span>
          }
        >
          {/* <Menu.Item className="menuitem menuitem2" key="19">
            <Link to="/posts">
              {dil === "tm"
                ? "Gelen Habarlar"
                : dil === "ru"
                ? "Полученные сообщения"
                : "Recived messages"}
            </Link>
          </Menu.Item> */}
          <Menu.Item className="menuitem menuitem2" key="20">
            <Link to="/sendPost">
              {dil === "tm"
                ? "Ugradylan Habarlar"
                : dil === "ru"
                ? "Отправка сообщений"
                : "Send messages"}
            </Link>
          </Menu.Item>
        </SubMenu>

        {/* <SubMenu
                    key="sub7"
                    title={
                        <span>
                            <span className="menuitem">
                                {dil === "tm"
                                    ? "Ulanyjylar"
                                    : dil === "ru"
                                    ? "Пользователи"
                                    : "Users"}
                            </span>
                        </span>
                    }
                >
                    <Menu.Item className="menuitem menuitem2" key="13">
                        <Link to="/ActiveUsers">
                            {dil === "tm"
                                ? "Ulanyjylar"
                                : dil === "ru"
                                ? "Пользователи"
                                : "Users"}
                        </Link>
                    </Menu.Item>
                    <Menu.Item className="menuitem menuitem2" key="14">
                        <Link to="/DisActiveUsers">
                            {dil === "tm"
                                ? "Aktiw dal ulanyjylar"
                                : dil === "ru"
                                ? "Неактивные Пользователи"
                                : "Disactive Users"}
                        </Link>
                    </Menu.Item>
                </SubMenu>  */}
      </Menu>

      <div className="admin-footer">
        <center
          style={{
            fontSize: 12,
            color: "#C0C0C0",
            fontWeight: 600,
          }}
        >
          Developed by: <br />a programmer WB
        </center>
      </div>
    </Sider>
  );
};

export default SiderDemo;
