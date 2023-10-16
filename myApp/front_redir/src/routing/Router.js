import { Routes, Route } from "react-router-dom";
import Main from "../components/main/Main";
import Basket from "../components/basket/Basket";
import Admin from "../components/admin/Admin";
import AdminCategory from "../components/admin/AdminCategory";
import AdminCatalog from "../components/admin/AdminCatalog";
import Contact from "../components/contact/Contact";
import AddProduct from "../components/admin/AddProduct";


function Router({ setBasketCount, activeKey, setActiveKey }) {


  return (
    <Routes>
      <Route path="/" element={<Main setBasketCount={setBasketCount} activeKey={activeKey} setActiveKey={setActiveKey}/>} />
      <Route path="/:id" element={<Main setBasketCount={setBasketCount} activeKey={activeKey} setActiveKey={setActiveKey}/>} />
      <Route path="/basket" element={<Basket setBasketCount={setBasketCount} />} />
      <Route path="/nimda" element={<Admin />} />
      <Route path="/nimda/category" element={<AdminCategory />} />
      <Route path="/nimda/category/:name" element={<AdminCatalog />} />
      <Route path="/nimda/category/add/:name" element={<AddProduct />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default Router;