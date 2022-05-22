import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Navbar from "./Pages/Shared/Navbar/Navbar";
import MyPortfolio from "./Pages/MyPortfolio/MyPortfolio";
import Blogs from "./Pages/Blogs/Blogs";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "./Authentication/RequireAuth";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import AOS from "aos";
import "aos/dist/aos.css";
import MyProfile from "./Pages/Dashboard/MyProfile";
import MyOrders from "./Pages/Dashboard/MyOrders";
import AddReview from "./Pages/Dashboard/AddReview";
import MakeAdmin from "./Pages/Dashboard/MakeAdmin";

function App() {
  AOS.init();
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/blogs" element={<Blogs></Blogs>}></Route>
        <Route path="/portfolio" element={<MyPortfolio></MyPortfolio>}></Route>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }
        >
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path="myOrders" element={<MyOrders></MyOrders>}></Route>
          <Route path="addReview" element={<AddReview></AddReview>}></Route>
          <Route path="makeAdmin" element={<MakeAdmin></MakeAdmin>}></Route>
        </Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
