import React, { Component } from 'react';
import ROSLIB from 'roslib';

import { MJPEGCANVAS } from '../mjpegcanvas/build/mjpegcanvas.js';

const topicMap = {"front": "/camera/image_raw"};

export class VideoStream extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    var viewer = new MJPEGCANVAS.Viewer({
      divID : 'mjpeg',
      host : 'localhost',
      height : this.refs.child.parentNode.clientHeight,
      width : this.refs.child.parentNode.clientWidth,
      topic : topicMap[this.props.selection]
    });
  }

  render() {
    return (
		<div id='mjpeg' ref="child" />
    );
  }
}
