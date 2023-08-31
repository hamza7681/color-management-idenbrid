import React, { useEffect, useState } from "react";
import { api } from "../axios/config";
import ProductCard from "../components/Home/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const res = await api.get("/product");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="flex flex-col gap-3 p-5">
      <h1 className="text-teal-500 text-[24px] font-semibold">Products</h1>
      <div className="flex flex-row flex-wrap gap-3 w-full">
        {products &&
          products.map((item, i) => <ProductCard key={i} product={item} />)}
      </div>
    </div>
  );
};

export default Home;
