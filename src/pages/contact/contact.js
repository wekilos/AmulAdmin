import { Popconfirm, Table, Button, message, Drawer } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { axiosInstance, BASE_URL } from "../../utils/axiosIntance";
import file from "../../img/file.png";
import { useHistory } from "react-router-dom";
import { SebedimContext } from "../../context/sebedim";
import { useSizeComponents } from "../../components/sizeComponent";

const Orders = () => {
  const history = useHistory();
  const { dil } = useContext(SebedimContext);
  const [widths, height] = useSizeComponents();
  const [data, setData] = useState([]);
  const [openChange, setOpenChange] = useState(false);
  const [order, setOrder] = useState({});
  const [files, setFiles] = useState([]);
  const [active, setActive] = useState(false);
  const [jogap, setJogap] = useState(false);
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const [messageId, setMessageId] = useState();

  useEffect(() => {
    // getData();
  }, []);

  const getData = () => {
    axiosInstance
      .get("/api/contact/all?came=true")
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
      title: dil === "tm" ? "Tema" : dil === "ru" ? "Тема" : "Theme",
      dataIndex: "subject",
    },
    {
      title: dil === "tm" ? "Tekst" : dil === "ru" ? "Текст" : "Text",
      dataIndex: "text",
    },
    {
      title: dil === "tm" ? "Ady" : dil === "ru" ? "Имя" : "Name",
      dataIndex: "name",
    },
    {
      title: dil === "tm" ? "E-pocta" : dil === "ru" ? "Эл. адрес" : "Email",
      dataIndex: "email",
    },

    {
      title: dil === "tm" ? "Hereket" : dil === "ru" ? "Действие" : "Action",
      render: (text, record) => (
        <div className="flex">
          {/* <Popconfirm placement="top" title={"Are you sure"} onConfirm={handleConfirm} okText="Yes" cancelText="No">  */}
          <Button
            onClick={() => {
              setOpenChange(true);
              setOrder(record);
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
          {/* </Popconfirm> */}
          {/* <Popconfirm placement="top" title={"Are you sure"} onConfirm={()=>Reject(record.id)} okText="Yes" cancelText="No">  */}
          <Button
            onClick={() => {
              setJogap(true);
              setMessageId(record.id);
            }}
            type="primary"
            style={{ borderRadius: "7px", marginLeft: "10px" }}
          >
            {dil === "tm" ? "Jogap" : dil === "ru" ? "Отвечать" : "Answer"}
          </Button>
          {/* </Popconfirm> */}
        </div>
      ),
    },
  ];

  const Reject = (id) => {
    axiosInstance
      .patch("/api/user/disActive/" + id)
      .then((data) => {
        message.success("Dis Aktiwe Edildi!");
        getData();
      })
      .catch((err) => {
        console.log(err);
        message.warn("Gaytadan Barlan!");
      });
  };

  const SendResponse = () => {
    console.log(messageId, subject, text);
    if (subject.length > 0 && text.length > 0) {
      axiosInstance
        .post("/api/contact/response", {
          subject: subject,
          text: text,
          messageId: messageId,
        })
        .then((data) => {
          message.success("Jogap berildi!");
          setJogap(false);
        })
        .catch((err) => {
          console.log(err);
          message.warn("Gaytadan Barlan!");
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
        onClose={() => setOpenChange(false)}
        visible={openChange}
      >
        <div>
          <h2 className="mb-0 font-[700]">
            {dil === "tm"
              ? "Maglumat"
              : dil === "ru"
              ? "Информация"
              : "Information"}
            :
          </h2>
          <p className="mb-0 mt-0">
            {dil === "tm" ? "Wagty" : dil === "ru" ? "Время" : "Time"}:{" "}
            {order?.createdAt}
          </p>
          <p className="mb-0 mt-0">
            {dil === "tm" ? "Tema" : dil === "ru" ? "Тема" : "Theme"}:{" "}
            {order?.subject}
          </p>
          <p className="mt-0 mb-0">
            {dil === "tm" ? "Tekst" : dil === "ru" ? "Текст" : "Text"}:{" "}
            {order?.text}
          </p>
          <p className="mt-0 ">
            {dil === "tm" ? "Ady" : dil === "ru" ? "Имя" : "Name"}:{" "}
            {order?.name}
          </p>
          <p className="mt-0 mb-0">
            {dil === "tm"
              ? "Ulanyjy Ady"
              : dil === "ru"
              ? "Пользователь Имя"
              : "User Name"}
            : {order?.User?.fname}
          </p>
          <p className="mt-0 mb-0">
            {dil === "tm" ? "E-pocta" : dil === "ru" ? "Эл. адрес" : "Email"}:{" "}
            {order?.email}
          </p>
          <p className="mt-0 mb-0">
            {dil === "tm" ? "Telefon" : dil === "ru" ? "Телефон" : "Phone"}:{" "}
            {order?.User?.phoneNumber}
          </p>
          <p className="mt-0 mb-0">
            {dil === "tm"
              ? "Edara Ady"
              : dil === "ru"
              ? "Название организации"
              : "Company name"}
            : {order?.User?.companyName}
          </p>
        </div>
      </Drawer>
      <Drawer
        width={widths > 500 ? 500 : 350}
        placement="right"
        closable={true}
        mask={true}
        maskClosable={true}
        onClose={() => setJogap(false)}
        visible={jogap}
      >
        <div className="w-full">
          <div className="flex justify-start flex-wrap mt-[20px]">
            <span className="font-sans md:text-[16px] text-[14px] font-bold mb-[10px] text-[#272D3E] w-full text-left">
              {dil === "tm" ? "Tema" : dil === "ru" ? "Тема" : "Theme"}
            </span>
            <br />
            <input
              onClick={(e) => setSubject(e.target.value)}
              className="font-sans border-[1px] border-[#E3E7EE] text-[16px] text-[#999999] pl-[15px] bg-[#F2F6FF] rounded-[6px] h-[50px] md:w-[90%] w-full text-left"
              type="text"
              name="name"
              placeholder={
                dil === "tm" ? "Tema" : dil === "ru" ? "Тема" : "Theme"
              }
            />
          </div>
          <div className="flex justify-start flex-wrap mt-[20px]">
            <span className="font-sans md:text-[16px] text-[14px] font-bold mb-[10px] text-[#272D3E] w-full text-left">
              {dil === "tm" ? "Habar" : dil === "ru" ? "Сообщение" : "Message"}
            </span>{" "}
            <br />
            <textarea
              onClick={(e) => setText(e.target.value)}
              rows={10}
              cols={50}
              className="font-sans border-[1px] border-[#E3E7EE] text-[16px] text-[#999999] pl-[15px] bg-[#F2F6FF] rounded-[6px] pt-[10px] h-[150px] md:w-[90%] w-full text-left"
              type="text"
              name="name"
              placeholder={
                dil === "tm" ? "Habar" : dil === "ru" ? "Сообщение" : "Message"
              }
            />
          </div>
          <div className="flex justify-start   mt-[20px]">
            <button
              onClick={() => SendResponse()}
              className="font-sans md:text-[18px] text-[16px] h-[50px] md:w-[90%] w-full bg-blue text-[#fff] rounded-[5px]"
            >
              {dil === "tm" ? "Ugrat" : dil === "ru" ? "Отправить" : "Send"}
            </button>
          </div>
        </div>
      </Drawer>
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

export default Orders;
