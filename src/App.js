import React, {useRef} from 'react';
import logo from './logo.svg';
import './App.css';

import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from 'react-webcam';

function App() {
  // Setting p references
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //loading the facemesh
  const runFacemesh = async()=>{
    const net = await facemesh.load({
      inputResolution:{width:640, height:480}, scale:0.8
    });
    setInterval(()=>{
      detect(net)
    }, 100)
  };

  // Detecting Function

  const detect = async (net) =>{
    if(
      typeof webcamRef.current != "undefined" && 
      webcamRef.current !==null &&
      webcamRef.current.video.readyState ===4
    )
    {
      // Getting video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      //Setting video width

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Making detections

      const face = await net.estimateFaces(video);
      console.log(face);


    }
  };

runFacemesh()
  return (
    <div className="App">
      <header className="App-header">

  

      <Webcam ref = {webcamRef} style={

        {
          position:"absolute",
          marginLeft:"auto",
          marginRight:"auto",
          left:0,
          right:0,
          textAlign:"center",
          zIndex:9,
          width:640,
          height:480,

        }
      }
      />

      <canvas 
      ref={canvasRef}
      style={{
        position:"absolute",
        marginLeft:"auto",
        marginRight:"auto",
        left:0,
        right:0,
        textAlign:"center",
        zIndex:9,
        width:640,
        height:480,
      }}
      />
          </header>
    </div>
  );
}

export default App;
