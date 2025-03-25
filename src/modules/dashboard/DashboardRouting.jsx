/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardComponent from "./DashboardComponent";
import DashboardIndex from "./pages/DashboardIndex";
import AdminRouting from "modules/admin/AdminRouting";
import TermsRouting from "modules/Terms/TermsRouting";
import ProductRouting from "modules/product/ProductRouting";
import Product_attributesRouting from "modules/product_attributes/Product_attributesRouting";
import NotFound from "components/NotFound";
import OrdersRouting from "modules/orders/OrdersRouting";
import DiscountsRouting from "modules/discounts/DiscountsRouting";
import SettingsRouting from "modules/Settings/SettingsRouting";
import HomeRouting from "modules/home/HomeRouting";
import CitiesRouting from "modules/cities/CitiesRouting";
import CustomersRouting from "modules/customers/CustomersRouting";

const DashboardRouting = () => {
  return (
    <Routes>
      {
        <Route element={<DashboardComponent />}>
          <Route path="/" element={<DashboardIndex />} />
          <Route path="/admin/*" element={<AdminRouting />} />
          <Route path="/terms/*" element={<TermsRouting />} />
          <Route path="/product/*" element={<ProductRouting />} />
          <Route path="/customers/*" element={<CustomersRouting />} />
          <Route path="/orders/*" element={<OrdersRouting />} />
          <Route path="/discounts/*" element={<DiscountsRouting />} />
          {/* // eslint-disable-next-line react/jsx-pascal-case */}
          <Route path="/cities/*" element={<CitiesRouting />} />

          <Route
            path="/products/categories/*"
            // eslint-disable-next-line react/jsx-pascal-case
            element={<Product_attributesRouting />}
          />
          <Route path="/home/*" element={<HomeRouting />} />
          <Route path="/settings/*" element={<SettingsRouting />} />
        </Route>
      }

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default DashboardRouting;
