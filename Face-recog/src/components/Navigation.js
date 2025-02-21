import React,{ useRef, useState } from "react";
import "./Navigation.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {ClickIt} from "../ClickIt";

function Navigation() {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  // For voice navigation 
  const speech = () => {
    setIsListening(!isListening);
    if (isListening) {
      resetTranscript();
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
      console.log(transcript);
      console.log(document.getElementById(transcript));
      if (document.getElementById(transcript)!=null) {
        
        let speech = new SpeechSynthesisUtterance();
        speech.text = "Going to " + transcript + " page";
        window.speechSynthesis.speak(speech);
        ClickIt(transcript);
      } else{
        let speech = new SpeechSynthesisUtterance();
        speech.text = "No such page found";
        window.speechSynthesis.speak(speech);
      }

      resetTranscript();
    }
  };
  return (
    <header className="nav">
      <img
        onClick={speech}
        className="logo"
        alt="logo"
        src="Eyesight_logo.png"
      />

      <nav>
        <ul>
          <li>
            <a href="http://localhost:3000/">Home</a>
          </li>
          <li id="vision">
            <a  href="http://localhost:3000/Vision">Vision</a>
          </li>
          

          <li>
            <a href="http://localhost:3000/">About Us</a>
          </li>
        </ul>
        <a id="object" href="http://localhost:3000/Vision/Object-recognition"></a>
        <a id="home" href="http://localhost:3000/"></a>
        <a id="face" href="http://localhost:3001/"></a>
        <a id="click"></a>
      </nav>
    </header>
  );
}

export default Navigation;

