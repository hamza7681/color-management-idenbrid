import React from "react";
import { baseURL } from "../../axios/config";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2 w-1/3 p-1 border-[1px] border-gray-300 rounded">
      <div className="w-full h-[300px] overflow-hidden rounded">
        <img
          src={`${baseURL}/${product.palletes[0].shades[0].shadePic}`}
          alt="s"
          className="w-full  rounded"
        />
      </div>
      <h1 className="text-teal-700 font-bold text-[20px]">{product.title}</h1>
      <h1 className="text-gray-500  text-[14px]">{product.description}</h1>
      <div className="w-full rounded flex items-center">
        <div
          onClick={() => navigate(`/product/${product._id}`)}
          className="bg-green-500 w-[180px] h-[40px] px-5 cursor-pointer text-white flex gap-3 justify-center items-center"
        >
          View <FaEye />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
