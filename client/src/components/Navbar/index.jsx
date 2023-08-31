import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const { cartProducts } = useSelector((s) => s.cart);
  const routes = [
    { name: "Home", path: "/" },
    { name: "Create", path: "/create" },
  ];
  return (
    <div className="w-full h-[70px] bg-teal-700 flex justify-between items-center px-8">
      <h1 className="text-white text-[28px] italic font-bold">
        Color Management
      </h1>
      <div className="w-[400px] flex justify-center items-center">
        <ul className="flex gap-5 items-center">
          {routes.map((val, i) => {
            return (
              <li
                key={i}
                className={`${
                  pathname === val.path
                    ? "text-teal-500 bg-white"
                    : "text-white"
                } px-4 py-2 font-semibold rounded-[4px]`}
              >
                <Link to={val.path}>{val.name}</Link>
              </li>
            );
          })}
          <li
            className={`${
              pathname === "/cart" ? "text-teal-500 bg-white" : "text-white"
            } px-4 py-2 font-semibold rounded-[4px] relative`}
          >
            <Link to="/cart">
              <FaShoppingCart />
            </Link>
            <div
              className={`absolute right-[5px] top-0 ${
                pathname === "/cart"
                  ? "bg-teal-500 text-white"
                  : "bg-white text-teal-500"
              } flex justify-center items-center w-[15px] h-[15px] rounded-full text-[10px]`}
            >
              {cartProducts.length}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
