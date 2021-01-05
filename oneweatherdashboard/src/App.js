import React from "react";
import './App.css';
import Header from './components/header';
import Mainview from './components/mainview';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <Mainview/>
      <Footer/>
    </div>
  );
}

export default App;
