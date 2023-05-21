import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import ProductForm from "./pages/Product/ProductForm";
import Hometemplate from "./templates/Hometemplate";
import Product from "./pages/Product/Product";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />}></Route>
      <Route path="" element={<Hometemplate />}>
        <Route path="" element={<Product/>}></Route>
        <Route path="add" element={<ProductForm />}></Route>
        <Route path="edit/:id" element={<ProductForm />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
