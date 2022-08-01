import React from "react";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Login from "./components/Login";
import UsersList from "./components/UsersList";
import CountryList from "./components/CountryList";
import DashBoardLoader from "./components/DashBoardLoader";
import DashBoard from "./components/DashBoard";
import MenuBar from "./components/MenuBar";
const LazyLoad = React.lazy(() => import('./components/LazyLoading'));

const ListLoading = DashBoardLoader(DashBoard);

const CreateRoutes = () => (
    <Router>
          <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/lazyLoading' element={<LazyLoad/>}></Route>
            <Route path='/dashBoard' element={<ListLoading/>}></Route>
            <Route path='/users' element={<UsersList/>}></Route>
            <Route path='/countries' element={<CountryList/>}></Route>
            <Route path='/menu' element={<MenuBar />}></Route>

          </Routes>
   </Router>
);

export default CreateRoutes;