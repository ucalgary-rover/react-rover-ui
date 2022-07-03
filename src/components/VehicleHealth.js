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
  
  var listener = new ROSLIB.Topic({
    ros : ros,
    name : 'chatter',
    messageType: 'std_msgs/String'
  });
  
  // message contains the location of the rover currently
  listener.subscribe(function(message) {
    console.log();
    document.getElementById("msg").innerHTML = message.data;
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
                        <td>field d</td>
                        <td>Type</td>
                    </tr>
                    <tr>
                        <td>field e</td>
                        <td>9999</td>
                    </tr>
                    <tr>
                        <td>field f</td>
                        <td>Type</td>
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
