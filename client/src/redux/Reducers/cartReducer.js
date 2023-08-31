const initialState = {
  cartProducts: [],
  totalPrice: 0,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      const product = action.payload;
      return {
        ...state,
        cartProducts: [...state.cartProducts, product],
        totalPrice: state.totalPrice + product.price * product.qty,
      };
    case "REMOVE":
      const val = action.payload;
      const filteredCart = state.cartProducts.filter((x) => x._id !== val._id);
      return {
        ...state,
        cartProducts: filteredCart,
        totalPrice: state.totalPrice - val.price * val.qty,
      };
    default:
      return state;
  }
};

export default productReducer;
