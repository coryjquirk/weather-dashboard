import React from "react";
import {Container, Row, Col} from "react-bootstrap"
import './App.css';
import Header from './components/header';
import Mainview from './components/mainview';
import Footer from './components/footer';

function App() {
  return (
    <Container className="App">
      <Header/>
      <Mainview/>
      <Footer/>
    </Container>
  );
}

export default App;
