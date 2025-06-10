import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import  Login  from "../screens/Login";
import { Home } from "../screens/Home";
import { Home_1 } from "../screens/Home_1";
import { Home_2 } from "../screens/Home_2";
import { PrivateRoute } from "./privateRoute";
import { Register } from "../screens/Register";
import Gerenciamento from "../screens/Gerenciamento";

export const RoutesApp = () => {
//   const levelAccess = useSelector((state) => state.user.userData?.data?.acesso);

  return (
    <BrowserRouter>
      <Fragment>
        <Routes>

          <Route path="/Login" element={<Login />} />

          <Route element={<PrivateRoute/>}>
            <Route path="/Home" element={<Home/>} />
          </Route>
          <Route element={<PrivateRoute requiredLevels={["0","1","4","6","7"]}/>}>
            <Route path="/spin&go&fish" element={<Home_1 />} />
          </Route>
          <Route element={<PrivateRoute requiredLevels={["0","2","4","5","7"]}/>}>
            <Route path="/spin&go&reg" element={<Home_2/>} />
          </Route>
          <Route element={<PrivateRoute requiredLevels={["0"]}/>}>
            <Route path="/gerenciamento" element={<Gerenciamento />} />
            <Route path="/register" element={<Register/>} />
          </Route>
          
          <Route path="*" element={<Login />} />

        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};
