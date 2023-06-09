import { Popconfirm, Table, Button, message, Drawer } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { axiosInstance, BASE_URL } from "../../utils/axiosIntance";
import { useHistory } from "react-router-dom";
import { SebedimContext } from "../../context/sebedim";
import { useSizeComponents } from "../../components/sizeComponent";

import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
const Length = () => {
  const { dil } = useContext(SebedimContext);
  const history = useHistory();
  const [widths, height] = useSizeComponents();
  const [data, setData] = useState([]);
  const [order, setCategoryEdit] = useState({});
  const [edit, setEdit] = useState(false);
  const [gosh, setGosh] = useState(false);
  const [category, setCategory] = useState({ name: "" });
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosInstance
      .get("/api/length/all")
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
      title: dil === "tm" ? "Ady  " : dil === "ru" ? "Имя  " : "Name  ",
      dataIndex: "name",
    },

    {
      title: dil === "tm" ? "Hereket" : dil === "ru" ? "Действие" : "Action",
      render: (text, record) => (
        <div className="flex">
          <Button
            onClick={() => {
              setEdit(true);
              setCategoryEdit(record);
            }}
            type="primary"
            style={{ borderRadius: "7px" }}
          >
            {widths > 500 ? (
              dil === "tm" ? (
                "Maglumat"
              ) : dil === "ru" ? (
                "Информация"
              ) : (
                "Information"
              )
            ) : (
              <InfoCircleOutlined />
            )}
          </Button>

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
              {widths > 500 ? (
                dil === "tm" ? (
                  "Öçürmek"
                ) : dil === "ru" ? (
                  "Удалит"
                ) : (
                  "Delete"
                )
              ) : (
                <DeleteOutlined />
              )}
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const DeleteCategory = (id) => {
    axiosInstance
      .delete("/api/length/destroy/" + id)
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
      .patch("/api/length/update", order)
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
    if (category.name) {
      axiosInstance
        .post("/api/length/create", category)
        .then((data) => {
          message.success("Maglumatlar döredildi!");
          getData();
          setCategory({ name: "" });
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
            value={order?.name}
            onChange={(e) =>
              setCategoryEdit({ ...order, name: e.target.value })
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm" ? "Ady  " : dil === "ru" ? "Имя  " : "Name  "
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
          value={category.name}
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm" ? "Ady  " : dil === "ru" ? "Имя  " : "Name  "
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
          {dil === "tm" ? "Uzynlygy" : dil === "ru" ? "Длина" : "Length"}
        </h2>
        <Button
          onClick={() => {
            setGosh(true);
          }}
          className="h-[40px] mt-[10px] mr-[50px] !rounded-[12px]"
          type="primary"
        >
          {dil === "tm"
            ? "Uzynlyk Goşmak"
            : dil === "ru"
            ? "Добавить Длина"
            : "Add Length"}
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

export default Length;
