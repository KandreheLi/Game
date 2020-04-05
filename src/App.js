import React,{useState} from 'react';
import Game from './Game';
import {Level} from'./Level';
import './App.css';

function App() {
  return (
    <div className="App">
      <Level/>
      <Game delay={10}/>
      <Game delay={10000}/>
      <Game delay={30000}/>  
    </div>
  );
}

export default App;
