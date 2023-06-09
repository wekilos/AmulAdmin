import { Popconfirm, Table, Button, message, Drawer } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { axiosInstance, BASE_URL } from "../../utils/axiosIntance";
import { useHistory } from "react-router-dom";
import { SebedimContext } from "../../context/sebedim";

import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useSizeComponents } from "../../components/sizeComponent";
const Category = () => {
  const { dil } = useContext(SebedimContext);
  const history = useHistory();
  const [widths, height] = useSizeComponents();
  const [data, setData] = useState([]);
  const [order, setCategoryEdit] = useState({});
  const [edit, setEdit] = useState(false);
  const [gosh, setGosh] = useState(false);
  const [category, setCategory] = useState({ name_en: "", name_ru: "" });
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosInstance
      .get("/api/category/all")
      .then((data) => {
        console.log(data.data);
        setData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      title: dil === "tm" ? "Ady en" : dil === "ru" ? "Имя en" : "Name en",
      dataIndex: "name_en",
    },
    {
      title: dil === "tm" ? "Ady ru" : dil === "ru" ? "Имя ru" : "Name ru",
      dataIndex: "name_ru",
    },

    {
      title: dil === "tm" ? "Hereket" : dil === "ru" ? "Действие" : "Action",
      render: (text, record) => (
        <div className="flex">
          {widths > 500 ? (
            <Button
              onClick={() => {
                setEdit(true);
                setCategoryEdit(record);
              }}
              type="primary"
              style={{ borderRadius: "7px" }}
            >
              {dil === "tm"
                ? "Maglumat"
                : dil === "ru"
                ? "Информация"
                : "Information"}
            </Button>
          ) : (
            <Button
              onClick={() => {
                setEdit(true);
                setCategoryEdit(record);
              }}
              type="primary"
              style={{ borderRadius: "7px" }}
            >
              <InfoCircleOutlined />
            </Button>
          )}

          <Popconfirm
            placement="top"
            title={"Are you sure"}
            onConfirm={() => DeleteCategory(record.id)}
            okText="Yes"
            cancelText="No"
          >
            {widths > 500 ? (
              <Button
                type="danger"
                style={{ borderRadius: "7px", marginLeft: "10px" }}
              >
                {dil === "tm" ? "Öçürmek" : dil === "ru" ? "Удалит" : "Delete"}
              </Button>
            ) : (
              <Button
                type="danger"
                style={{ borderRadius: "7px", marginLeft: "10px" }}
              >
                <DeleteOutlined />
              </Button>
            )}
          </Popconfirm>
        </div>
      ),
    },
  ];

  const DeleteCategory = (id) => {
    axiosInstance
      .delete("/api/category/destroy/" + id)
      .then((data) => {
        message.success("Öçürildi!");
        getData();
      })
      .catch((err) => {
        console.log(err);
        message.warn("Gaytadan Barlan!");
      });
  };

  const editData = () => {
    axiosInstance
      .patch("/api/category/update", order)
      .then((data) => {
        message.success("Maglumatlar Uytgedildi!");
        getData();
        setCategoryEdit();
        setEdit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CreateCategory = () => {
    if (category.name_ru && category.name_en) {
      axiosInstance
        .post("/api/category/create", category)
        .then((data) => {
          message.success("Maglumatlar döredildi!");
          getData();
          setCategory({ name_en: "", name_ru: "" });
          setGosh(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      message.warn("Maglumatlary doly Girizin!");
    }
  };

  return (
    <>
      <Drawer
        width={widths > 500 ? 500 : 350}
        placement="right"
        closable={true}
        mask={true}
        maskClosable={true}
        onClose={() => {
          setEdit(false);
        }}
        visible={edit}
      >
        <div style={{ width: "100%" }}>
          <input
            value={order?.name_ru}
            onChange={(e) =>
              setCategoryEdit({ ...order, name_ru: e.target.value })
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm" ? "Ady ru" : dil === "ru" ? "Имя ру" : "Name ru"
            }
          />
          <input
            value={order?.name_en}
            onChange={(e) =>
              setCategoryEdit({ ...order, name_en: e.target.value })
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm" ? "Ady en" : dil === "ru" ? "Имя ен" : "Name en"
            }
          />

          <button
            onClick={() => {
              editData();
            }}
            className={`${"!bg-blue !text-white "} bg-[#DEE6F9] h-[50px] rounded-[5px] w-full mt-4 text-[18px] font-sans text-blue`}
          >
            {dil === "tm" ? "Üýtgetmek" : dil === "ru" ? "Изменять" : "Change"}
          </button>
        </div>
      </Drawer>

      <Drawer
        width={widths > 500 ? 500 : 350}
        placement="right"
        closable={true}
        mask={true}
        maskClosable={true}
        onClose={() => setGosh(false)}
        visible={gosh}
      >
        <input
          value={category.name_ru}
          onChange={(e) =>
            setCategory({ ...category, name_ru: e.target.value })
          }
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm" ? "Ady ru" : dil === "ru" ? "Имя ру" : "Name ru"
          }
        />
        <input
          value={category.name_en}
          onChange={(e) =>
            setCategory({ ...category, name_en: e.target.value })
          }
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm" ? "Ady en" : dil === "ru" ? "Имя ен" : "Name en"
          }
        />

        <button
          onClick={() => {
            CreateCategory();
          }}
          className={`${"!bg-blue !text-white "} bg-[#DEE6F9] h-[50px] rounded-[5px] w-full mt-4 text-[18px] font-sans text-blue`}
        >
          {dil === "tm" ? "Ugrat" : dil === "ru" ? "Отправлять" : "Send"}
        </button>
      </Drawer>
      <div className="w-full h-[50px] p-0 flex justify-between ">
        <h2 className="leading-[50px] ml-[50px] text-sans text-[24px]">
          {dil === "tm"
            ? "Kategoriýa"
            : dil === "ru"
            ? "Категория"
            : "Category"}
        </h2>
        <Button
          onClick={() => {
            setGosh(true);
          }}
          className="h-[40px] mt-[10px] mr-[50px] !rounded-[12px]"
          type="primary"
        >
          {dil === "tm"
            ? "Kategoriýa Goşmak"
            : dil === "ru"
            ? "Добавить Категория"
            : "Add Category"}
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 50,
        }}
        scroll={{
          y: "72vh",
        }}
      />
    </>
  );
};

export default Category;
