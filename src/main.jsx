import { BrowserRouter, Route, Routes } from "react-router";
import ReactDOM from "react-dom/client";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthLayout from "./components/AuthLayout";
import City from "./components/City";
import Trending from "./components/Trending";
import About from "./components/About";
import ConcertHome from "./components/ConcertHome";
import DashBoard from "./components/DashBoard";
import Setting from "./components/Setting";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />

      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="setting" element={<Setting />} />

      <Route path="concerts">
        <Route index element={<ConcertHome />} />
        <Route path=":city" element={<City />} />
        <Route path="trending" element={<Trending />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
