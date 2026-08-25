import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import { useDispatch } from "react-redux";
import api from "./configs/api";
import { Toaster } from "react-hot-toast";
import { login, setLoading } from "./app/features/authSlice";
import Login from "./pages/Login";


const App = () => {
  const dispatch = useDispatch();

  console.log("APP IS RUNNING");

  const getUserData = async () => {

    console.log("GET USER DATA RUNNING");
    const token = localStorage.getItem("token");
    console.log("TOKEN:", token);

    try {
      if (token) {
        const { data } = await api.get("/api/users/data", {
          headers: {
            Authorization: token,
          },
        });

        if (data.user) {
          dispatch(
            login({
              token,
              user: data.user,
            })
          );
        }
      }
    } catch (error) {
      console.log("User data error:", error);
      localStorage.removeItem("token");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    console.log("USE EFFECT RUNNING");
    getUserData();
  }, []);

  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="builder/:resumeId"
            element={<ResumeBuilder />}
          />
        </Route>

        <Route
          path="/view/:resumeId"
          element={<Preview />}
        />
      </Routes>
    </>
  );
};

export default App;