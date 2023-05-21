import { Popconfirm, Table, Button, message, Drawer } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { axiosInstance, BASE_URL } from "../../utils/axiosIntance";
import file from "../../img/file.png";
import { useHistory } from "react-router-dom";
import { SebedimContext } from "../../context/sebedim";

const Orders = () => {
  const history = useHistory();
  const { dil } = useContext(SebedimContext);
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
    getData();
  }, []);

  const getData = () => {
    axiosInstance
      .get("/api/subscribe/all")
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
      title: dil === "tm" ? "Wagty" : dil === "ru" ? "Время" : "Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <div>
          {record?.createdAt.slice(0, 10) +
            " (" +
            record?.createdAt.slice(11, 16) +
            ")"}
        </div>
      ),
    },

    {
      title: dil === "tm" ? "E-pocta" : dil === "ru" ? "Эл. адрес" : "Email",
      dataIndex: "email",
    },

    {
      title: dil === "tm" ? "Hereket" : dil === "ru" ? "Действие" : "Action",
      render: (text, record) => (
        <>
          <Button
            onClick={() => {
              setOpenChange(true);
              setOrder(record);
            }}
            type="primary"
            style={{ borderRadius: "7px" }}
          >
            {dil === "tm" ? "Ugrat" : dil === "ru" ? "Send" : "Отправлять"}
          </Button>
        </>
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
    if (subject.length > 0 && text.length > 0) {
      axiosInstance
        .post("/api/subscribe/send/one", {
          subject: subject,
          text: text,
          email: order?.email,
        })
        .then((data) => {
          console.log(data.data);
          message.success("Jogap berildi!");
          setOpenChange(false);
          setSubject("");
          setText("");
        })
        .catch((err) => {
          console.log(err);
          message.warn("Gaytadan Barlan!");
        });
    } else {
      message.warn("Maglumatlary doly Girizin!");
    }
  };

  const SendResponseAll = () => {
    if (subject.length > 0 && text.length > 0) {
      axiosInstance
        .post("/api/subscribe/send/all", {
          subject: subject,
          text: text,
        })
        .then((data) => {
          console.log(data.data);
          message.success("Jogap berildi!");
          setJogap(false);
          setSubject("");
          setText("");
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
        width={500}
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
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
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
            </span>
            <br />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
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
              onClick={() => SendResponseAll()}
              className="font-sans md:text-[18px] text-[16px] h-[50px] md:w-[90%] w-full bg-blue text-[#fff] rounded-[5px]"
            >
              {dil === "tm" ? "Ugrat" : dil === "ru" ? "Отправить" : "Send"}
            </button>
          </div>
        </div>
      </Drawer>

      <Drawer
        width={500}
        placement="right"
        closable={true}
        mask={true}
        maskClosable={true}
        onClose={() => setOpenChange(false)}
        visible={openChange}
      >
        <div className="w-full">
          <div className="flex justify-start flex-wrap mt-[20px]">
            <span className="font-sans md:text-[16px] text-[14px] font-bold mb-[10px] text-[#272D3E] w-full text-left">
              {dil === "tm" ? "Tema" : dil === "ru" ? "Тема" : "Theme"}
            </span>
            <br />
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
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
            </span>
            <br />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
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

      <div className="w-full mt-2 h-[50px] bg-white mb-4 flex items-center justify-end">
        <h1></h1>
        <button
          onClick={() => setJogap(true)}
          className="px-4 py-2 rounded-[12px] mr-4 bg-blue text-white font-[900]"
        >
          {dil === "tm" ? "Ugrat" : dil === "ru" ? "Отправить" : "Send"}
        </button>
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

export default Orders;
