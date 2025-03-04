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
import ActivityDetail from "./components/ActivityDetail";
import EditActivity from "./components/EditActivity";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />

      {/* ✅ Public Routes */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* ✅ Protected Routes (Require Login) */}
      <Route element={<AuthLayout />}>
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="dashboard/setting" element={<Setting />} />

        {/* ✅ (OPTIONAL) If you want to see a specific activity */}
        <Route path="dashboard/:id" element={<ActivityDetail />} />
        <Route path="dashboard/edit/:id" element={<EditActivity />} />
      </Route>

      {/* ✅ Nested Concert Routes */}
      <Route path="concerts">
        <Route index element={<ConcertHome />} />
        <Route path=":city" element={<City />} />
        <Route path="trending" element={<Trending />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
