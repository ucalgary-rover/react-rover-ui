import React, { useState, useEffect } from 'react';
import ROSLIB from 'roslib';
import { CSVLink } from "react-csv";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import roverIcon from "../img/rover2.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 40],
  shadowAnchor: [12, 40],
});

let RoverIcon = L.icon({
  iconUrl: roverIcon,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

L.Marker.prototype.options.icon = DefaultIcon;

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

// var listener = new ROSLIB.Topic({
// ros : ros,
// name : 'rover/gps_report',
// messageType: 'rover/GpsCoords'
// });

var listener = new ROSLIB.Topic({
ros : ros,
name : 'test',
messageType: 'std_msgs/String'
});

//adds waypoints to the map if in edit mode
function ClickHandler(props) {
  useMapEvent({
    click(e) {
      if (props.mapInteraction.userMode === "view") {
        return;
      }
      
      props.addWaypoint(e.latlng);
    },
  });
  return null;
}

//Draws the paths between waypoints
//sends the waypoints into a csv file to save waypoints for future use
function drawPaths(waypoints) {
    let newPaths = [];
    if (waypoints.length < 2) {
      return [];
    }
    for (var i = 1; i < waypoints.length; i++) {
      let pathToAdd = [waypoints[i], waypoints[i - 1]];
      newPaths.push(pathToAdd);
    }
    return newPaths;
  }

  //most of the waypoints functionality
export function MapView(props){
  const [roverPosition, setRoverPosition] = useState(L.latLng(51.076672, -114.137474));
  const [waypoints, setWaypoints] = useState([]);
  const [paths, setPaths] = useState([]);
  let index = -1; 
  // const [breakOrJoin, setBreakOrJoin] = useState([])

  const popupButtonVisibility = props.mapInteraction.userMode === "edit" ? "visible": "hidden";

  listener.subscribe(function(message){
    //setRoverPosition(L.latLng(message.latitude, message.longitude));
    
    console.log("TESTING");

    // console.log for testing purposes
    console.log(message.latitude);
    console.log(message.longitude);
  });

  //adds a waypoint to the list of waypoints
  //if insert button is pressed, next way point is inserted after the waypoint associated with the insert button
  //when inserting, creates temp waypoint lists for before the index waypoint and after. new waypoints are concated to the before list and then after is concated. 
  function addWaypoint(position) {

    let indexOfMarker = index;

    if(index < 0){
      let newWaypoints = waypoints.concat(position);
      props.changeWaypoints(newWaypoints);
      setWaypoints(newWaypoints);
      setPaths(drawPaths(newWaypoints));
    }

    else{
      let newWaypointsBefore = waypoints.filter((position, idx) =>{ 
        if(idx > indexOfMarker)
          return false;

        return true;
      });

      let newWaypointsAfter = waypoints.filter((position, idx) =>{
        if(idx <= indexOfMarker)
          return false;

        return true;
      });

      let insertedWaypoint = newWaypointsBefore.concat(position);

      let newWaypoints = insertedWaypoint.concat(newWaypointsAfter);

      index = -1;

      props.changeWaypoints(newWaypoints);
      setWaypoints(newWaypoints);
      setPaths(drawPaths(newWaypoints));
    }

  }

  //sets the index when inserting waypoints
  function setIndex(markerIndex){
    index = markerIndex;
  }
  
  //removes current waypoint and connects next and previous waypoints
  function removeAndJoin(markersPosition){
    let newWaypoints = waypoints.filter(position => position != markersPosition);
    props.changeWaypoints(newWaypoints);
    setWaypoints(newWaypoints);
    setPaths(drawPaths(newWaypoints));
  }

  //removes all waypoints after selected waypoint
  function removeAllAfter(markersPosition){
    let indexOfMarker = waypoints.length;

    let newWaypoints = waypoints.filter((position, idx) =>{ 
      if (position === markersPosition)
        indexOfMarker = idx;

      if(idx > indexOfMarker)
        return false;

      return true;
    });
    props.changeWaypoints(newWaypoints)
    setWaypoints(newWaypoints);
    setPaths(drawPaths(newWaypoints));
  }

  useEffect(() => {
    if(props.coordinateValues.lat !== null && props.coordinateValues.lng !== null && props.mapInteraction.userMode === "edit"){
      addWaypoint(L.latLng(props.coordinateValues.lat, props.coordinateValues.long));
    }
      
  }, [props.coordinateValues]);

  //CSVLink is a button that downloads the current waypoints as a csv. can be clicked from any waypoint. 

   return (
      <MapContainer
        center={props.defaultCenter}
        zoom={17}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", display: "inline-block" }}
      >
        <ClickHandler
          addWaypoint={addWaypoint}
          mapInteraction={props.mapInteraction}
        />
        <TileLayer url={props.mapTileDirectory} />

        {waypoints.map((position, idx) => (
          <Marker key={`waypoint-${idx}`} position={position}>
            <Popup>
              <span>
                Waypoint {idx + 1}
                <br />
                Lat: {position.lat}
                <br />
                Lng: {position.lng}
              </span>
              <br/>
              <button style={{visibility: popupButtonVisibility}} onClick={() => removeAndJoin(position)}>Remove & Join</button>
              <button style={{visibility: popupButtonVisibility}} onClick={() => removeAllAfter(position)}>Remove All After</button>
              <button style={{visibility: popupButtonVisibility}} onClick={() => setIndex(idx)}>Insert After</button>
              
              <CSVLink data={waypoints} filename="waypoints.csv" onClick={() => {
                console.log("you click the link");
              }}>
              download waypoints</CSVLink>
            </Popup>
          </Marker>
          ))}

        {paths.map((positions, idx) => (
          <Polyline
            key={`path-${idx}`}
            pathOptions={{ color: "lightBlue" }}
            positions={positions}
          />
        ))}

          
        <Marker position = {roverPosition} icon = {RoverIcon}>
            <Popup>
              Rover
              <br />
              Lat: {roverPosition.lat}
              <br />
              Lng: {roverPosition.lng}
            </Popup>
        </Marker>


      </MapContainer>
    );
}