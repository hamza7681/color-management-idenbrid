import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { api, baseURL } from "../axios/config";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedToner, setSelectedToner] = useState([]);
  const [qty, setQty] = useState(1);
  const price = 1000;
  const dispatch = useDispatch();
  const toast = useRef(null);
  const { cartProducts } = useSelector((s) => s.cart);

  const handleData = useCallback(() => {
    const getProduct = async () => {
      try {
        const res = await api.get(`/product/${id}`);
        setProduct(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);
  useEffect(() => {
    handleData();
  }, [handleData]);

  const selectColor = (val) => {
    setSelectedColors((prev) => [...prev, val]);
    if (selectedColors?.map((x) => x.color).includes(val.color)) {
      const filteredArr = selectedColors.filter((x) => {
        return x.color !== val.color;
      });
      setSelectedColors(filteredArr);
    }
  };

  const selectToner = (val, color) => {
    let obj = {
      color: color,
      toner: val.toner,
      shadePic: val.shadePic,
    };
    setSelectedToner((prev) => [...prev, obj]);
    if (selectedToner?.map((x) => x.shadePic).includes(val.shadePic)) {
      const filteredArr = selectedToner.filter((x) => {
        return x.shadePic !== val.shadePic;
      });
      setSelectedToner(filteredArr);
    }
  };

  const addToCart = () => {
    let finalObj = {
      _id: product._id,
      title: product.title,
      qty: qty,
      price: price,
    };
    let newArray = [];
    for (let i = 0; i < selectedColors.length; i++) {
      let newShadesArray = selectedToner
        .filter((x) => {
          return selectedColors[i].color === x.color;
        })
        .map((y) => {
          return { toner: y.toner, shadePic: y.shadePic };
        });
      let obj = {
        color: selectedColors[i].color,
        shades: newShadesArray,
      };
      newArray.push(obj);
    }
    finalObj = { ...finalObj, palletes: newArray };
    if (selectedColors.length <= 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please select color and shades",
      });
    } else {
      dispatch({ type: "ADD", payload: finalObj });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="w-full flex p-5">
        <div className="w-2/3 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-black text-[20px]">Select Colors</p>
            <div className="flex flex-row items-center gap-3">
              {product &&
                product.palletes.map((val, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => selectColor(val)}
                      className={`flex items-center cursor-pointer justify-start gap-2   rounded ${
                        selectedColors?.map((x) => x.color).includes(val.color)
                          ? "bg-teal-500 text-white w-[70px] py-2 pl-1"
                          : "text-black bg-gray-100 w-[70px] py-2 pl-1"
                      }`}
                    >
                      <span>{val.color}</span>
                      {selectedColors
                        ?.map((x) => x.color)
                        .includes(val.color) && (
                        <span>
                          <FaTimes />
                        </span>
                      )}
                    </div>
                  );
                })}
            </div>
            <div className="flex flex-col gap-3">
              {selectedColors &&
                selectedColors.map((item, index) => {
                  return (
                    <div key={index}>
                      <p>{item.color}</p>
                      <div className="flex justify-start gap-4">
                        {item?.shades?.map((val, i) => {
                          return (
                            <div
                              key={i}
                              onClick={() => selectToner(val, item.color)}
                              className={`cursor-pointer ${
                                selectedToner
                                  ?.map((x) => x.shadePic)
                                  .includes(val.shadePic)
                                  ? "bg-teal-500 text-white py-2 pl-1"
                                  : "text-black bg-gray-100 py-2 pl-1"
                              }`}
                            >
                              <img
                                src={`${baseURL}/${val.shadePic}`}
                                className="w-[200px] h-[300px]"
                                alt="s"
                              />
                              <p>Toner: {val.toner}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="w-1/3 flex flex-col gap-3">
          <p className="text-[24px]">{product && product.title}</p>
          <p className="text-[18px]">{product && product.description}</p>
          <p className="text-[18px]">{price} Rs</p>
          <p className="text-[18px]">Quantity</p>
          <div>
            <button
              className="w-fit "
              onClick={() => setQty((prev) => prev + 1)}
            >
              <FaPlus />
            </button>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="pl-2 w-[35px] focus:outline-none"
            />
            <button
              className="w-fit "
              onClick={() => {
                if (qty > 1) {
                  setQty((prev) => prev - 1);
                }
              }}
            >
              <FaMinus />
            </button>
          </div>

          <button
            onClick={addToCart}
            disabled={cartProducts.find((x) => x._id === id)}
            className={` px-4 py-2 text-white rounded flex justify-center items-center w-[180px] ${
              cartProducts.find((x) => x._id === id)
                ? "bg-green-200 cursor-not-allowed"
                : "bg-green-500 cursor-pointer"
            }`}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
