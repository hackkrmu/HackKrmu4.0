import React, { useState } from "react";

import { loadModels } from "./helpers/faceApi";
import { createFaLibrary } from "./helpers/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Switch from "react-switch";
import Camera from "./components/Camera/Camera";
import Navigation from "./components/Navigation";

import "./App.css";
createFaLibrary();
loadModels();
function App() {
  const mode = true;
  return (
    <div>
      <Navigation />
      <div className="App">
        <header>
          <div className="App__header">
            
            <div className="App__switcher"></div>
          </div>
        </header>
        <Camera photoMode={mode} />
       
      </div>
    </div>
  );
}

export default App;
