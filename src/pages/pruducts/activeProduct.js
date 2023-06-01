import { Popconfirm, Table, Button, message, Drawer } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { axiosInstance, BASE_URL, BASE_URL2 } from "../../utils/axiosIntance";
import file from "../../img/file.png";
import DropFileInput from "./dropFile";
import { useHistory } from "react-router-dom";
import { SebedimContext } from "../../context/sebedim";

const ActiveProducts = () => {
  const { dil } = useContext(SebedimContext);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [openChange, setOpenChange] = useState(false);
  const [order, setOrder] = useState({});
  const [files, setFiles] = useState([]);
  const [active, setActive] = useState(false);
  const [code, setCode] = useState("");
  const [payBefore, setPayBefore] = useState("");
  const [payBeforeType, setPayBeforeType] = useState("");
  const [edit, setEdit] = useState(false);
  const [surat, setSurat] = useState(false);
  const [productEdit, setProductEdit] = useState();
  const [gosh, setGosh] = useState(false);
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [colors, setColors] = useState([]);
  const [length, setLength] = useState([]);
  const [width, setWidth] = useState([]);
  const [product, setProduct] = useState({
    name_en: "",
    name_ru: "",
    code: "",
    description_en: "",
    description_ru: "",
    razmer_en: "",
    razmer_ru: "",
  });
  useEffect(() => {
    getData();
    getCategories();
    getMaterials();
    getColors();
    getWidth();
    getLength();
  }, []);

  const getData = () => {
    axiosInstance
      .get("/api/product/all")
      .then((data) => {
        console.log("product", data.data);
        setData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategories = () => {
    axiosInstance
      .get("/api/category/all")
      .then((data) => {
        setCategories(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getMaterials = () => {
    axiosInstance
      .get("/api/material/all")
      .then((data) => {
        setMaterials(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getColors = () => {
    axiosInstance
      .get("/api/color/all")
      .then((data) => {
        setColors(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getWidth = () => {
    axiosInstance
      .get("/api/width/all")
      .then((data) => {
        setWidth(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getLength = () => {
    axiosInstance
      .get("/api/length/all")
      .then((data) => {
        setLength(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      title: dil === "tm" ? "№" : dil === "ru" ? "№" : "№",
      dataIndex: "code",
    },
    {
      title: dil === "tm" ? "Ady" : dil === "ru" ? "Имя" : "Name",
      dataIndex: "name_ru",
      render: (text, record) => (
        <div>{dil === "ru" ? record?.name_ru : record?.name_en}</div>
      ),
    },
    {
      title:
        dil === "tm" ? "Düşündiriş" : dil === "ru" ? "Описание" : "Description",
      dataIndex: "description_ru",
      render: (text, record) => (
        <div>
          {dil === "ru" ? record.description_ru : record.description_en}
        </div>
      ),
    },

    {
      title: dil === "tm" ? "Surat" : dil === "ru" ? "Картина" : "Picture",
      dataIndex: "uploaded",
      render: (text, record) => (
        <div className="flex overflow-x-auto">
          {record.Imgs?.map((item) => {
            return (
              <img
                className="object-contain mr-2 h-[100px]"
                src={BASE_URL2 + item.img}
                alt="surat"
              />
            );
          })}
        </div>
      ),
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
          <Popconfirm
            placement="top"
            title={"Are you sure"}
            onConfirm={() => Reject(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="danger"
              style={{ borderRadius: "7px", marginLeft: "10px" }}
            >
              {dil === "tm"
                ? "Dis Aktiw et"
                : dil === "ru"
                ? "He Активировать"
                : "Dis Activete"}
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onFileChange = (files) => {
    console.log(files);
    files.length > 0 && setActive(true);
    files.length == 0 && setActive(true);
    setFiles(files);
  };

  const Reject = (id) => {
    axiosInstance
      .delete("/api/product/destroy/" + id)
      .then((data) => {
        message.success("Yatyryldy!");
        getData();
      })
      .catch((err) => {
        console.log(err);
        message.warn("Gaytadan Barlan!");
      });
  };

  const editSurat = () => {
    const formData = new FormData();
    files.map((file) => {
      formData.append("img", file);
    });

    // formData.append("id", order?.id);

    axiosInstance
      .post("/api/product/img/upload/" + order?.id, formData)
      .then((data) => {
        message.success("Surat Tazelendi!");
        getData();
        setSurat(false);
        setOpenChange(false);
      })
      .catch((err) => {
        console.log(err);
        message.warn("Tazeden Barlan!");
      });
  };

  const editData = () => {
    console.log(productEdit);
    axiosInstance.patch("/api/product/update", productEdit).then((data) => {
      message.success("Maglumatlar Uytgedildi!");
      console.log(data.data);
      getData();
      setEdit(false);
      setOpenChange(false);
    });
  };

  const productGosh = () => {
    if (
      product?.name_ru &&
      product?.name_en &&
      product?.description_en &&
      product?.description_ru &&
      product?.razmer_en &&
      product?.razmer_ru
    ) {
      axiosInstance
        .post("/api/product/create", product)
        .then((data) => {
          message.success("Doredildi!");
          getData();
          setGosh(false);
          setProduct({
            name_en: "",
            name_ru: "",
            code: "",
            description_en: "",
            description_ru: "",
            razmer_en: "",
            razmer_ru: "",
          });
        })
        .catch((err) => {
          console.log(err);
          message.warn("Tazeden Barlan!");
        });
    } else {
      message.warn("Maglumatlary doly Girizin!");
    }
  };

  const deletImg = (id) => {
    axiosInstance
      .delete("/api/product/img/destroy/" + id)
      .then((data) => {
        console.log(data.data);
        getData();
        setOpenChange(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Drawer
        width={500}
        placement="right"
        closable={true}
        mask={true}
        maskClosable={true}
        onClose={() => setOpenChange(false)}
        visible={openChange}
      >
        <div>
          <h2>
            {dil === "tm"
              ? "Maglumat"
              : dil === "ru"
              ? "Информация"
              : "Information"}
            :
          </h2>

          <p className="mb-0">
            {dil === "tm"
              ? "Kategoriya:"
              : dil === "ru"
              ? "Категория:"
              : "Category:"}
            :{" "}
            {dil === "en" ? order?.Category?.name_en : order?.Category?.name_ru}
          </p>

          <p className="mb-0">
            {dil === "tm"
              ? "Material:"
              : dil === "ru"
              ? "Материал:"
              : "Material:"}
            :{" "}
            {dil === "en" ? order?.Material?.name_en : order?.Material?.name_ru}
          </p>

          <p className="mb-0">
            {dil === "tm" ? "Renk:" : dil === "ru" ? "Цвет:" : "Color:"}:{" "}
            {dil === "en" ? order?.Color?.name_en : order?.Color?.name_ru}
          </p>

          <p className="mb-0">
            {dil === "tm" ? "Ini:" : dil === "ru" ? "Ширина:" : "Width:"}:{" "}
            {order?.Width?.name}
          </p>

          <p className="mb-0">
            {dil === "tm" ? "Uzynlygy:" : dil === "ru" ? "Длина:" : "Length:"}:{" "}
            {order?.Length?.name}
          </p>

          <br />

          <p className="mb-0">
            {dil === "tm" ? "Ady ru" : dil === "ru" ? "Имя ру" : "Name ru"}:{" "}
            {order?.name_ru}
          </p>
          <p>
            {dil === "ru" ? "Ady en" : dil === "ru" ? "Имя ен" : "Name en"}:{" "}
            {order?.name_en}
          </p>

          <p className="mb-0">
            {dil === "tm"
              ? "Düşündiriş ru"
              : dil === "ru"
              ? "Описание ru"
              : "Decription ru"}
            : {order?.description_ru}
          </p>
          <p>
            {dil === "tm"
              ? "Düşündiriş en"
              : dil === "ru"
              ? "Описание ен"
              : "Decription en"}
            : {order?.description_en}
          </p>

          <p className="mb-0">
            {dil === "tm"
              ? "Razmer ru"
              : dil === "ru"
              ? "Размер ru"
              : "Size ru"}
            : {order?.razmer_ru}
          </p>
          <p>
            {dil === "tm"
              ? "Razmer en"
              : dil === "ru"
              ? "Размер ен"
              : "Size en"}
            : {order?.razmer_en}
          </p>
          <div className="w-full mt-4 flex justify-start">
            <Button
              onClick={() => {
                setEdit(true);
                setProductEdit(order);
              }}
              className="mr-[30px]"
              type="primary"
              style={{ borderRadius: "7px" }}
            >
              {dil === "tm"
                ? "Uytget"
                : dil === "ru"
                ? "Редактировать"
                : "Edit"}
            </Button>
            <Button
              onClick={() => setSurat(true)}
              type="primary"
              style={{ borderRadius: "7px" }}
            >
              {dil === "tm" ? "Surat" : dil === "ru" ? "Картина" : "Picture"}
            </Button>
          </div>
          <p className="my-4">Images:</p>
          <div className="w-full h-auto">
            {order.Imgs?.map((item) => {
              return (
                <div className="w-full mb-2">
                  <div
                    className=" bg-[#ff1616] flex items-center justify-center w-full h-[40px] rounded-[12px] text-white font-[900] "
                    onClick={() => deletImg(item.id)}
                  >
                    Delete
                  </div>
                  <img
                    className="object-contain mb-2 w-full rounded-[12px]"
                    src={BASE_URL2 + item?.img}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Drawer>

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
          <select
            onChange={(e) => {
              setProductEdit({ ...productEdit, CategoryId: e.target.value });
            }}
            // value={productEdit?.CategoryId}
            placeholder={
              dil === "tm"
                ? "Kategory"
                : dil === "ru"
                ? "Категория"
                : "Category"
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          >
            <option value={0} disabled selected>
              {dil === "tm"
                ? "Kategory"
                : dil === "ru"
                ? "Категория"
                : "Category"}
            </option>
            {categories?.map((item, i) => {
              return (
                <option value={item.id} key={"cat" + i}>
                  {dil === "ru" ? item.name_ru : item?.name_en}
                </option>
              );
            })}
          </select>

          <select
            onChange={(e) => {
              setProductEdit({ ...productEdit, MaterialId: e.target.value });
            }}
            // value={productEdit?.MaterialId}
            placeholder={
              dil === "tm"
                ? "Material "
                : dil === "ru"
                ? "Материал "
                : "Material"
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          >
            <option value={0} disabled selected>
              {dil === "tm"
                ? "Material "
                : dil === "ru"
                ? "Материал "
                : "Material "}
            </option>
            {materials?.map((item, i) => {
              return (
                <option value={item.id} key={"material" + i}>
                  {dil === "ru" ? item.name_ru : item?.name_en}
                </option>
              );
            })}
          </select>

          <select
            onChange={(e) => {
              setProductEdit({ ...productEdit, ColorId: e.target.value });
            }}
            // value={productEdit?.ColorId}
            placeholder={
              dil === "tm" ? "Renk " : dil === "ru" ? "Цвет " : "Color"
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          >
            <option value={0} disabled selected>
              {dil === "tm" ? "Renk " : dil === "ru" ? "Цвет " : "Color "}
            </option>
            {colors?.map((item, i) => {
              return (
                <option value={item.id} key={"color" + i}>
                  {dil === "ru" ? item.name_ru : item?.name_en}
                </option>
              );
            })}
          </select>

          <select
            onChange={(e) => {
              setProductEdit({ ...productEdit, WidthId: e.target.value });
            }}
            // value={productEdit?.WidthId}
            placeholder={
              dil === "tm" ? "Ini " : dil === "ru" ? "Ширина " : "Width"
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          >
            <option value={0} disabled selected>
              {dil === "tm" ? "Ini " : dil === "ru" ? "Ширина " : "Width "}
            </option>
            {width?.map((item, i) => {
              return (
                <option value={item.id} key={"ini" + i}>
                  {item.name}
                </option>
              );
            })}
          </select>

          <select
            onChange={(e) => {
              setProductEdit({ ...productEdit, LengthId: e.target.value });
            }}
            // value={productEdit?.LengthId}
            placeholder={
              dil === "tm" ? "Uzynlygy " : dil === "ru" ? "Длина " : "Length"
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          >
            <option value={0} disabled selected>
              {dil === "tm" ? "Uzynlygy " : dil === "ru" ? "Длина " : "Length "}
            </option>
            {length?.map((item, i) => {
              return (
                <option value={item.id} key={"Length" + i}>
                  {item.name}
                </option>
              );
            })}
          </select>

          <input
            value={productEdit?.code}
            onChange={(e) =>
              setProductEdit({ ...productEdit, code: e.target.value })
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={"Code"}
          />

          <input
            value={productEdit?.name_ru}
            onChange={(e) =>
              setProductEdit({ ...productEdit, name_ru: e.target.value })
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm" ? "Ady ru" : dil === "ru" ? "Имя ру" : "Name ru"
            }
          />
          <input
            value={productEdit?.name_en}
            onChange={(e) =>
              setProductEdit({ ...productEdit, name_en: e.target.value })
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm" ? "Ady en" : dil === "ru" ? "Имя ен" : "Name en"
            }
          />
          <input
            value={productEdit?.description_ru}
            onChange={(e) =>
              setProductEdit({ ...productEdit, description_ru: e.target.value })
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm"
                ? "Dushundirish ru"
                : dil === "ru"
                ? "Описание ру"
                : "Description ru"
            }
          />
          <input
            value={productEdit?.description_en}
            onChange={(e) =>
              setProductEdit({ ...productEdit, description_en: e.target.value })
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4 outline-none"
            type="text"
            placeholder={
              dil === "tm"
                ? "Dushundirish en"
                : dil === "ru"
                ? "Описание анг"
                : "Description en"
            }
          />
          <textarea
            rows={5}
            value={productEdit?.razmer_ru}
            onChange={(e) =>
              setProductEdit({ ...productEdit, razmer_ru: e.target.value })
            }
            className="h-[100px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm"
                ? "Razmer ru"
                : dil === "ru"
                ? "Размер ру"
                : "Size ru"
            }
          />
          <textarea
            rows={5}
            value={productEdit?.razmer_en}
            onChange={(e) =>
              setProductEdit({ ...productEdit, razmer_en: e.target.value })
            }
            className="h-[100px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm"
                ? "Razmer en"
                : dil === "ru"
                ? "Размер анг"
                : "Size en"
            }
          />
          <button
            onClick={() => {
              editData();
            }}
            className={`${"!bg-blue !text-white "} bg-[#DEE6F9] h-[50px] rounded-[5px] w-full mt-4 text-[18px] font-sans text-blue`}
          >
            {dil === "tm" ? "Ugrat" : dil === "ru" ? "Отправлять" : "Send"}
          </button>
        </div>
      </Drawer>
      <Drawer
        width={500}
        placement="right"
        closable={true}
        mask={true}
        maskClosable={true}
        onClose={() => setSurat(false)}
        visible={surat}
      >
        <DropFileInput onFileChange={(files) => onFileChange(files)} />
        <button
          onClick={() => {
            editSurat();
          }}
          className={`${
            active && "!bg-blue !text-white "
          } bg-[#DEE6F9] h-[50px] rounded-[5px] w-full mt-4 text-[18px] font-sans text-blue`}
        >
          {dil === "tm" ? "Ugrat" : dil === "ru" ? "Отправлять" : "Send"}
        </button>
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
        <select
          onChange={(e) => {
            setProduct({ ...product, CategoryId: e.target.value });
          }}
          placeholder={
            dil === "tm" ? "Kategory" : dil === "ru" ? "Категория" : "Category"
          }
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
        >
          <option value={0} disabled selected>
            {dil === "tm"
              ? "Kategory"
              : dil === "ru"
              ? "Категория"
              : "Category"}
          </option>
          {categories?.map((item, i) => {
            return (
              <option value={item.id} key={"cat" + i}>
                {dil === "ru" ? item.name_ru : item?.name_en}
              </option>
            );
          })}
        </select>

        <select
          onChange={(e) => {
            setProduct({ ...product, MaterialId: e.target.value });
          }}
          placeholder={
            dil === "tm" ? "Material " : dil === "ru" ? "Материал " : "Material"
          }
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
        >
          <option value={0} disabled selected>
            {dil === "tm"
              ? "Material "
              : dil === "ru"
              ? "Материал "
              : "Material "}
          </option>
          {materials?.map((item, i) => {
            return (
              <option value={item.id} key={"material" + i}>
                {dil === "ru" ? item.name_ru : item?.name_en}
              </option>
            );
          })}
        </select>

        <select
          onChange={(e) => {
            setProduct({ ...product, ColorId: e.target.value });
          }}
          placeholder={
            dil === "tm" ? "Renk " : dil === "ru" ? "Цвет " : "Color"
          }
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
        >
          <option value={0} disabled selected>
            {dil === "tm" ? "Renk " : dil === "ru" ? "Цвет " : "Color "}
          </option>
          {colors?.map((item, i) => {
            return (
              <option value={item.id} key={"color" + i}>
                {dil === "ru" ? item.name_ru : item?.name_en}
              </option>
            );
          })}
        </select>

        <select
          onChange={(e) => {
            setProduct({ ...product, WidthId: e.target.value });
          }}
          placeholder={
            dil === "tm" ? "Ini " : dil === "ru" ? "Ширина " : "Width"
          }
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
        >
          <option value={0} disabled selected>
            {dil === "tm" ? "Ini " : dil === "ru" ? "Ширина " : "Width "}
          </option>
          {width?.map((item, i) => {
            return (
              <option value={item.id} key={"ini" + i}>
                {item.name}
              </option>
            );
          })}
        </select>

        <select
          onChange={(e) => {
            setProduct({ ...product, LengthId: e.target.value });
          }}
          placeholder={
            dil === "tm" ? "Uzynlygy " : dil === "ru" ? "Длина " : "Length"
          }
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
        >
          <option value={0} disabled selected>
            {dil === "tm" ? "Uzynlygy " : dil === "ru" ? "Длина " : "Length "}
          </option>
          {length?.map((item, i) => {
            return (
              <option value={item.id} key={"Length" + i}>
                {item.name}
              </option>
            );
          })}
        </select>

        <input
          value={product?.code}
          onChange={(e) => setProduct({ ...product, code: e.target.value })}
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={"Code"}
        />

        <input
          value={product?.name_ru}
          onChange={(e) => setProduct({ ...product, name_ru: e.target.value })}
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm" ? "Ady ru" : dil === "ru" ? "Имя ру" : "Name ru"
          }
        />
        <input
          value={product?.name_en}
          onChange={(e) => setProduct({ ...product, name_en: e.target.value })}
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm" ? "Ady en" : dil === "ru" ? "Имя ен" : "Name en"
          }
        />
        <input
          value={product?.description_ru}
          onChange={(e) =>
            setProduct({ ...product, description_ru: e.target.value })
          }
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm"
              ? "Dushundirish ru"
              : dil === "ru"
              ? "Описание ру"
              : "Description ru"
          }
        />
        <input
          value={product?.description_en}
          onChange={(e) =>
            setProduct({ ...product, description_en: e.target.value })
          }
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4 outline-none"
          type="text"
          placeholder={
            dil === "tm"
              ? "Dushundirish en"
              : dil === "ru"
              ? "Описание анг"
              : "Description en"
          }
        />
        <textarea
          rows={5}
          value={product?.razmer_ru}
          onChange={(e) =>
            setProduct({ ...product, razmer_ru: e.target.value })
          }
          className="h-[100px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm" ? "Razmer ru" : dil === "ru" ? "Размер ру" : "Size ru"
          }
        />
        <textarea
          rows={5}
          value={product?.razmer_en}
          onChange={(e) =>
            setProduct({ ...product, razmer_en: e.target.value })
          }
          className="h-[100px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm" ? "Razmer en" : dil === "ru" ? "Размер анг" : "Size en"
          }
        />

        {/* <DropFileInput onFileChange={(files) => onFileChange(files)} /> */}
        <button
          onClick={() => {
            productGosh();
          }}
          className={`${"!bg-blue !text-white "} bg-[#DEE6F9] h-[50px] rounded-[5px] w-full mt-4 text-[18px] font-sans text-blue`}
        >
          {dil === "tm" ? "Ugrat" : dil === "ru" ? "Отправлять" : "Send"}
        </button>
      </Drawer>

      <div className="w-full h-[50px] p-0 flex justify-between ">
        <h2 className="leading-[50px] ml-[50px] text-sans text-[24px]">
          {dil === "tm" ? "Onum gosh" : dil === "ru" ? "Продакт" : "Products"}
        </h2>
        <Button
          onClick={() => {
            setGosh(true);
          }}
          className="h-[40px] mt-[10px] mr-[50px] !rounded-[12px]"
          type="primary"
        >
          {dil === "tm"
            ? "Haeyt Gosh"
            : dil === "ru"
            ? "Добавить продакт"
            : "Add products"}
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

export default ActiveProducts;
