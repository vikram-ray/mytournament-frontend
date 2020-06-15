import React, {useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import {BrowserRouter} from 'react-router-dom';
import Layout from './components/UI/Layout/Layout'
import BaseRouter from './Routes'
import {useDispatch, useSelector} from 'react-redux';
import * as actions from './store/actions/Auth/Auth'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  autoClose: 2500,
  position: toast.POSITION.BOTTOM_RIGHT,
});

Axios.interceptors.request.use((config)=>{
  const token = localStorage.getItem('token');
  if(token){
    config.headers.Authorization = `Token ${token}`;
    config.baseURL = process.env.REACT_APP_BASE_URL;
  }
  return {
    ...config,
    baseURL: process.env.REACT_APP_BASE_URL,
  }
},(error)=>{
  console.log(error);
});
export default function App() {
  const dispatch = useDispatch();
  const token = useSelector(state=>state.auth.token);
  const isAuthenticated = token !==null ;

  useEffect(()=>{
    dispatch(actions.authCheckState());
  },[]);
    return (
      <div className="App">
        <BrowserRouter >
          <Layout isAuthenticated={isAuthenticated} >
            <BaseRouter />
          </Layout>
        </BrowserRouter>
      </div>
    )
}
