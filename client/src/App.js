import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateProductPage from "./pages/CreateProductPage";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ViewProductPage from "./pages/ViewProductPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateProductPage />} />
        <Route path="/product/:id" element={<ViewProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;
