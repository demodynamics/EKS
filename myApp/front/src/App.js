import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/header/Header';
import Router from './routing/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/footer/Footer';
import { useNavigate } from 'react-router';

function App() {
  let initialBasketCount = 0;
  if (JSON.parse(localStorage.getItem('basket'))) {
    initialBasketCount = JSON.parse(localStorage.getItem('basket')).length;
  }

  const [basketCount, setBasketCount] = useState(initialBasketCount);
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState(null);

  return (
    <>
      <Header basketCount={basketCount} 
        setBasketCount={setBasketCount}
        scrollToAccordion={
          (index) => {
            navigate('/')
            setActiveKey(index.toString())
            
          }} />
      <Router setBasketCount={setBasketCount}  activeKey={activeKey} setActiveKey={setActiveKey} />
      <ToastContainer
        position="top-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Footer/>
    </>
  );
}

export default App;
