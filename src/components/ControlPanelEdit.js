import React, { Component, useState } from 'react';
import EventEmitter2 from 'eventemitter2';
import ROSLIB from 'roslib';

var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
  });
  
  ros.on('connection', function() {
    console.log('Connected to websocket server');
  });
  
  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });
  
  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });
  
  var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/rover/Connections',
    messageType: 'rover/SignalStatus'
  });

  
//function component called Connections
//has four states, bit_rate, link_quality, signal, noise  
export function Connections(props){
  const [bit_rate, setBit] = useState("N/A");
  const [link_quality, setLink] = useState("N/A");
  const [signal, setSignal] = useState("N/A");
  const [noise, setNoise] = useState("N/A");

  // when you a message,message contains the four states that can change
  // the current state
  listener.subscribe(function(message) {
    setBit(message.bit_rate);
    setLink(message.link_quality);
    setSignal(message.signal);
    setNoise(message.noise);
  });

  return (
    <div>
       <h4 style={{paddingLeft: "12px"}}>Connections</h4>
       <p style={{paddingLeft: "12px"}}>Bit rate:  {bit_rate}</p>
       <p style={{paddingLeft: "12px"}}>Link quality:  {link_quality}</p>
       <p style={{paddingLeft: "12px"}}>Signal:  {signal}</p>
       <p style={{paddingLeft: "12px"}}>Noise:   {noise}</p>

     </div>
    
  );
}


