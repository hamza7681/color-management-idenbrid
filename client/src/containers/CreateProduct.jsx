import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import { FaPlus, FaTrash } from "react-icons/fa";
import { api } from "../axios/config";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const toast = useRef(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [colors, setColors] = useState(0);
  const [colorsFields, setColorFields] = useState([]);
  const [shades, setShades] = useState([]);
  const navigate = useNavigate();

  const handleColors = (e) => {
    let value = e.value;
    if (value === null) {
      setColors(0);
      setShades([]);
    } else if (value > 4) {
      setColors(4);
      setColorFields(Array(4).fill(""));
      if (shades.length < 1) {
        let obj = {
          toner: "",
          shadesFile: [],
        };
        setShades((prev) => [...prev, obj]);
      }
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "You can only add 4 colors for now.",
      });
    } else {
      const newNum = parseInt(e.value, 10);
      setColors(newNum);
      setColorFields(Array(newNum).fill(""));
      if (shades.length < 1) {
        let obj = {
          toner: "",
          shadesFile: [],
        };
        setShades((prev) => [...prev, obj]);
      }
    }
  };

  const handleInputChange = (index, value) => {
    const newInputValues = [...colorsFields];
    newInputValues[index] = value;
    setColorFields(newInputValues);
  };

  const handleShadesChange = (index, e) => {
    const file = e.target.files[0];
    const newInputValues = [...shades];
    newInputValues[index].shadesFile.push(file);
    setShades(newInputValues);
  };

  const handleToner = (index, value) => {
    const newInputValues = [...shades];
    newInputValues[index].toner = value;
    setShades(newInputValues);
  };

  const addMoreRow = () => {
    let obj = {
      toner: "",
      shadesFile: [],
    };
    setShades((prev) => [...prev, obj]);
  };

  const deleteRow = (i) => {
    let filterArr = shades.filter((_, index) => i !== index);
    setShades(filterArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let obj = {
      title,
      description: desc,
      totalColors: colors,
    };
    let newArray = [];
    for (var i = 0; i < colorsFields.length; i++) {
      let shadesArr = [];
      for (var j = 0; j < shades.length; j++) {
        let shadeObj = {
          toner: shades[j].toner,
          shadePic: shades[j].shadesFile[i]?.name,
        };
        shadesArr.push(shadeObj);
      }
      let newObj = {
        color: colorsFields[i],
        shades: shadesArr,
      };
      newArray.push(newObj);
    }
    obj = { ...obj, palletes: newArray };
    let fileArr = shades.map((x) => {
      return x.shadesFile;
    });
    let finalFileArr = [];
    fileArr.forEach((x) => {
      x.forEach((y) => {
        finalFileArr.push(y);
      });
    });
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(obj));
      for (var k = 0; k < finalFileArr.length; k++) {
        if (k < finalFileArr.length) {
          formData.append("image", finalFileArr[k]);
        }
      }
      const res = await api.post("/product", formData);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: res.data.msg,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response.data.msg,
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="flex flex-col gap-3 p-5">
        <div className="flex flex-col gap-2">
          <p className="text-black text-sm font-semibold">Title</p>
          <InputText
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-black text-sm font-semibold">Description</p>
          <InputText
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter Description..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-black text-sm font-semibold">Total Colors</p>
          <InputNumber
            value={colors}
            onChange={handleColors}
            placeholder="Enter Colors Number..."
            max={4}
          />
        </div>
        {colorsFields.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-black text-sm font-semibold">Colors Details</p>
            <div className="flex items-center gap-2">
              {Array.from({ length: colors }).map((_, index) => (
                <InputText
                  key={index}
                  type="text"
                  value={colorsFields[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              ))}
            </div>
          </div>
        )}
        {shades.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-black text-sm font-semibold">Shades Details</p>
            {shades.map((item, i) => {
              return (
                <div key={i} className="flex flex-row gap-3 items-center">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: colors }).map((_, index) => (
                      <input
                        key={index}
                        type="file"
                        onChange={(e) => handleShadesChange(i, e)}
                        className="w-[207px] border-[1px] border-gray-200"
                      />
                    ))}
                  </div>
                  <InputNumber
                    value={item?.toner}
                    placeholder="Toner..."
                    onChange={(e) => handleToner(i, e.value)}
                  />
                  <button
                    onClick={addMoreRow}
                    className="flex justify-center items-center gap-2 px-2 py-2 rounded bg-gray-950 text-white"
                  >
                    Add More <FaPlus />
                  </button>
                  <button
                    onClick={() => deleteRow(i)}
                    className="flex justify-center items-center gap-2 p-2 rounded bg-red-500 text-white"
                  >
                    <FaTrash />
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <button
          type="submit"
          className="w-fit bg-green-500 px-4 py-2 rounded text-white"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default CreateProduct;
