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

  //listener of IMU data
  var values = new ROSLIB.Topic({
    ros : ros,
    name : "imu/data",
    messageType: 'sensor_msgs/Imu'
  });

  //listner for "robot pose"
  var pose = new ROSLIB.Topic({
    ros : ros,
    name : "geometry",
    messageType: "geometry_msgs/Twist"
  });

  //listner for magnetometer
  var magnetometer = new ROSLIB.Topic({
    ros : ros,
    name : "imu/mag",
    messageType: 'sensor_msgs/MagneticField'
  });

  //listner for Battery Health
  var Battery = new ROSLIB.Topic({
    ros : ros,
    name : "sensor_msgs/BatteryState",
    messageType: 'sensor_msgs/BatteryState'
  });

  // subscribers for IMU data
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

  //subscriber for robot pose
  pose.subscribe(function(message) {
    console.log();
    document.getElementById("rbt_pose").innerHTML = message.data;
  });

  //subscribers for magnetometer in x,y and z
  magnetometer.subscribe(function(message) {
    console.log();
    document.getElementById("magnetx").innerHTML = message.magnetic_field.x;
  });

  magnetometer.subscribe(function(message) {
    console.log();
    document.getElementById("magnety").innerHTML = message.magnetic_field.y;
  })

  magnetometer.subscribe(function(message) {
    console.log();
    document.getElementById("magnetz").innerHTML = message.magnetic_field.z;
  })

  //subscriber for Battery Health
  Battery.subscribe(function(message) {
    console.log();
    document.getElementById("present").innerHTML = message.present;
  })

  Battery.subscribe(function(message) {
    console.log();
    document.getElementById("voltage").innerHTML = message.voltage;
  })

  Battery.subscribe(function(message) {
    console.log();
    document.getElementById("current").innerHTML = message.current;
  })

  Battery.subscribe(function(message) {
    console.log();
    document.getElementById("charge").innerHTML = message.charge;
  })

  Battery.subscribe(function(message) {
    console.log();
    document.getElementById("capacity").innerHTML = message.capacity;
  })
export class VehicleHealth extends Component {
  constructor(props) {
    super(props);
    this.state = {
        latitude: 0,
    };
  }

  render() {
    return (
		<div style={{height:'10vh'}}>
            <h4 style={{paddingLeft: "12px"}}>Vehicle Health</h4>
            <center>
                <table>
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
                        <td>Robot Pose</td>
                        <td><span id="rbt_pose"></span></td>
                    </tr>
                    <tr>
                        <td>Magnetometer-x: <p></p>Magnetometer-y: <p></p>Magnetometer-z: </td>
                        <td>
                          <span id="magnetx"></span>
                          <p></p>
                          <span id="magnety"></span>
                          <p></p>
                          <span id="magnetz"></span>
                        </td>
                    </tr>
                    <tr>
                        <td>Battery stats <p></p>Is Battery Present: <p></p>Voltage: <p></p>Current: <p></p>Charge: <p></p>Capacity: </td>
                        <td>
                          <p></p>
                          <span id="present"></span>
                          <p></p>
                          <span id="voltage"></span>
                          <p></p>
                          <span id="current"></span>
                          <p></p>
                          <span id="charge"></span>
                          <p></p>
                          <span id="capacity"></span>
                          <p></p>
                        </td>
                    </tr>
                </table>
            </center>
        </div>
    );
  }
}
