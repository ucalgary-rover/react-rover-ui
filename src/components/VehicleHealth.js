import "../style/VehicleHealth.css"
import React, { Component } from 'react';
import ROSLIB from 'roslib';

<script type="text/javascript" src="http://static.robotwebtools.org/roslibjs/current/roslib.min.js"></script>

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
  
  // example listener
  var listener = new ROSLIB.Topic({
    ros : ros,
    name : 'chatter',
    messageType: 'std_msgs/String'
  });

  //listener of linear accelearation
  var values = new ROSLIB.Topic({
    ros : ros,
    name : "imu/data",
    messageType: 'sensor_msgs/Imu'
  });
  
  // example subscriber
  listener.subscribe(function(message) {
    console.log();
    document.getElementById("msg").innerHTML = message.data;
  });

  // subscriber for linear acceleration
  values.subscribe(function(message) {
    console.log();
    document.getElementById("orienx").innerHTML = message.orientation.x;
  });

  values.subscribe(function(message) {
    console.log();
    document.getElementById("orieny").innerHTML = message.orientation.y;
  });

  values.subscribe(function(message) {
    console.log();
    document.getElementById("orienz").innerHTML =  message.orientation.z;
  });

  values.subscribe(function(message) {
    console.log();
    document.getElementById("linearx").innerHTML = message.linear_acceleration.x;
  });

  values.subscribe(function(message) {
    console.log();
    document.getElementById("lineary").innerHTML = message.linear_acceleration.y;
  });

  values.subscribe(function(message) {
    console.log();
    document.getElementById("linearz").innerHTML = message.linear_acceleration.z;
  });

  values.subscribe(function(message) {
    console.log();
    document.getElementById("angularx").innerHTML = message.angular_velocity.x;
  });

  values.subscribe(function(message) {
    console.log();
    document.getElementById("angulary").innerHTML = message.angular_velocity.y;
  });

  values.subscribe(function(message) {
    console.log();
    document.getElementById("angularz").innerHTML = message.angular_velocity.z;
  });

export class VehicleHealth extends Component {
  constructor(props) {
    super(props);
    this.state = {
        latitude: 0,
    };
  }

  render() {
    return (
		<div>
            <h4 style={{paddingLeft: "12px"}}>Vehicle Health</h4>
            <center>
                <table>
                    <tr>
                        <th>Field</th>
                        <th>Type</th>
                    </tr>
                    <tr>
                        <td>Latitude</td>
                        <td>{this.latitude}</td>
                    </tr>
                    <tr>
                        <td>Last /txt_msg received:</td>
                        <td><span id="msg"></span></td>
                    
                    </tr>
                    <tr>
                        <td>Orientation-x: <p></p>Orientation-y: <p></p>Orientation-z: </td>
                        <td>
                          <span id="orienx"></span>
                          <p></p>
                          <span id="orieny"></span>
                          <p></p>
                          <span id="orienz"></span>
                        </td>
                    </tr>
                    <tr>
                        <td>Linear Acceleration-x: <p></p>Linear Accelerationn-y: <p></p>Linear Acceleration-z: </td>
                        <td>
                          <span id="linearx"></span>
                          <p></p>
                          <span id="lineary"></span>
                          <p></p>
                          <span id="linearz"></span>
                        </td>
                    </tr>
                    <tr>
                        <td>Angular Velocity-x: <p></p>Angular Velocity-y: <p></p>Angular Velocity-z: </td>
                        <td>
                          <span id="angularx"></span>
                          <p></p>
                          <span id="angulary"></span>
                          <p></p>
                          <span id="angularz"></span>
                        </td>
                    </tr>
                    <tr>
                        <td>field g</td>
                        <td>9999</td>
                    </tr>
                </table>
            </center>
        </div>
    );
  }
}
