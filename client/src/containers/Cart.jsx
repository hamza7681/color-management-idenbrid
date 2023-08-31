import React, { useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "primereact/dialog";
import { baseURL } from "../axios/config";

const Cart = () => {
  const { cartProducts, totalPrice } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const deleteCart = (val) => {
    dispatch({ type: "REMOVE", payload: val });
  };
  const openDetails = () => {
    setVisible(true);
  };
  return (
    <>
      <div className="flex flex-col p-6">
        <div className="flex w-full items-center gap-3 py-3">
          <div className="text-[22px] w-1/4 font-semibold">Title</div>
          <div className="text-[22px] w-1/4 font-semibold">Quantity</div>
          <div className="text-[22px] w-1/4 font-semibold">Price</div>
          <div className="text-[22px] w-1/4 font-semibold">Action</div>
        </div>
        <div className="flex flex-col w-full items-center gap-3">
          {cartProducts.length > 0 ? (
            <>
              {cartProducts.map((val, i) => {
                return (
                  <div key={i} className="flex w-full items-center gap-3">
                    <div className="text-[22px] w-1/4 font-semibold">
                      {val.title}
                    </div>
                    <div className="text-[22px] w-1/4 font-semibold">
                      {val.qty}
                    </div>
                    <div className="text-[22px] w-1/4 font-semibold">
                      {val.price * val.qty}
                    </div>
                    <div className=" w-1/4 flex items-center gap-4 font-semibold">
                      <FaEye
                        className=" text-green-500 text-[22px] cursor-pointer"
                        onClick={() => openDetails(val)}
                      />
                      <FaTrash
                        className=" text-red-500 text-[22px] cursor-pointer"
                        onClick={() => deleteCart(val)}
                      />
                      <Dialog
                        header="Header"
                        visible={visible}
                        style={{ width: "50vw" }}
                        onHide={() => setVisible(false)}
                        draggable={false}
                      >
                        <div className="flex flex-col gap-3">
                          <p className="text-black text-[20px]">
                            Name: {val.title}
                          </p>
                          <p className="text-black text-[20px]">
                            Price: {val.price * val.qty} Rs
                          </p>
                          <p className="text-black text-[20px]">
                            Quantity: {val.qty}
                          </p>
                          <div>
                            <p className="text-teal-500 text-[20px]">
                              Palletes
                            </p>
                            {val.palletes.map((item, index) => {
                              return (
                                <div key={index}>
                                  <p className="text-black text-[18px]">
                                    Color: {item.color}
                                  </p>
                                  <div className="w-full flex flex-wrap items-center">
                                    {item.shades.map((x, ind) => {
                                      return (
                                        <div
                                          key={ind}
                                          className="cursor-pointer w-[200px] text-black bg-gray-100 py-2 pl-1"
                                        >
                                          <img
                                            src={`${baseURL}/${x.shadePic}`}
                                            className="w-[200px] h-[300px]"
                                            alt="s"
                                          />
                                          <p>Toner: {x.toner}</p>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </Dialog>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <p>No Items in cart</p>
          )}
        </div>
        <div className="pt-10">
          <div className="flex w-full justify-between items-center">
            <p>Total Price</p>
            <p>{totalPrice}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
