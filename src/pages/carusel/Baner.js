import { Popconfirm, Table, Button, message, Drawer } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { axiosInstance, BASE_URL, BASE_URL2 } from "../../utils/axiosIntance";
import { useHistory } from "react-router-dom";
import { SebedimContext } from "../../context/sebedim";
import DropFileInput from "./dropFile";

const Banner = () => {
  const { dil } = useContext(SebedimContext);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [order, setCategoryEdit] = useState({});
  const [edit, setEdit] = useState(false);
  const [gosh, setGosh] = useState(false);
  const [category, setCategory] = useState({ name_en: "", name_ru: "" });
  const [files, setFiles] = useState([]);
  const [active, setActive] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const onFileChange = (files) => {
    console.log(files);
    files.length > 0 && setActive(true);
    files.length == 0 && setActive(false);
    setFiles(files);
  };
  const getData = () => {
    axiosInstance
      .get("/api/banner/all")
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
      title: dil === "tm" ? "No" : dil === "ru" ? "No" : "No",
      dataIndex: "id",
    },
    {
      title: dil === "tm" ? "Banner" : dil === "ru" ? "Баннер" : "Banner",
      dataIndex: "name_ru",
      render: (text, record) => (
        <div>
          <img
            className="w-[200px] object-contain"
            src={BASE_URL2 + record.img}
            alt=""
          />
        </div>
      ),
    },

    {
      title: dil === "tm" ? "Hereket" : dil === "ru" ? "Действие" : "Action",
      render: (text, record) => (
        <div className="flex">
          {/* <Button
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
          </Button> */}

          <Popconfirm
            placement="top"
            title={"Are you sure"}
            onConfirm={() => DeleteCategory(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="danger"
              style={{ borderRadius: "7px", marginLeft: "10px" }}
            >
              {dil === "tm" ? "Öçürmek" : dil === "ru" ? "Удалит" : "Delete"}
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const DeleteCategory = (id) => {
    axiosInstance
      .delete("/api/banner/destroy/" + id)
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
      .patch("/api/banner/update", order)
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
    if (files.length > 0) {
      const formData = new FormData();
      files?.map((item) => {
        formData.append("img", item);
      });
      axiosInstance
        .post("/api/banner/create", formData)
        .then((data) => {
          message.success("Maglumatlar döredildi!");
          getData();
          setFiles([]);
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
        width={500}
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
        width={500}
        placement="right"
        closable={true}
        mask={true}
        maskClosable={true}
        onClose={() => setGosh(false)}
        visible={gosh}
      >
        <DropFileInput
          files={files}
          onFileChange={(files) => onFileChange(files)}
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
          {dil === "tm" ? "Banner" : dil === "ru" ? "Баннер" : "Banner"}
        </h2>
        <Button
          onClick={() => {
            setGosh(true);
          }}
          className="h-[40px] mt-[10px] mr-[50px] !rounded-[12px]"
          type="primary"
        >
          {dil === "tm"
            ? "Banner Goşmak"
            : dil === "ru"
            ? "Добавить Баннер"
            : "Add Banner"}
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

export default Banner;
