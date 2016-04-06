import React from 'react';

import {
  debounce
} from 'lodash';

let activeMovable = null;

window.addEventListener('mouseup', e => {
  activeMovable && activeMovable.handleMouseUp(e);
});

let lastNotProcessedMoveEvent = null;
window.addEventListener('mousemove', e => {
  if (activeMovable) {
    lastNotProcessedMoveEvent = e;
  }
});
const mouseCheckTick = () => {
  if (activeMovable && lastNotProcessedMoveEvent) {
    activeMovable.handleMouseMove(lastNotProcessedMoveEvent);
    lastNotProcessedMoveEvent = null;
  }
};
const animationFrame = () => {
  mouseCheckTick();
  if (window.requestAnimationFrame) {
    (window.setImmediate || window.setTimeout)(() => window.requestAnimationFrame(animationFrame));
  } else {
    window.setTimeout(animationFrame, 16);
  }
};
animationFrame();

export default class Movable extends React.Component {

  static get propTypes() {
    return {
      onHold: React.PropTypes.func,
      onDrop: React.PropTypes.func,
      onMove: React.PropTypes.func,
      holdClassName: React.PropTypes.string,
      holdStyle: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object,
      ]),
    }
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.firstPosition = null;
    this.lastPosition = null;

    const storeMouse = e => {
      if (e === null) {
        this.firstPosition = null;
        this.lastPosition = null;
        return null;
      } else {
        const position = {
          x: e.clientX,
          y: e.clientY,
        };
        if (this.firstPosition === null) {
          this.firstPosition = position;
        }
        if (this.lastPosition === null) {
          this.lastPosition = position;
        }
        const movement = {
          x: e.clientX - this.lastPosition.x,
          y: e.clientY - this.lastPosition.y,
          totalX: e.clientX - this.firstPosition.x,
          totalY: e.clientY - this.firstPosition.y,
        };
        this.lastPosition = position;
        return movement;
      }
    }

    this.handleMouseDown = e => {
      if (e.button === 0) {
        e.stopPropagation();

        //if it was not - release previously moved component
        activeMovable && activeMovable.handleMouseUp(e);

        //proceed with processing position
        storeMouse(e);

        //mouse down movable alias
        this.props.onHold && this.props.onHold(e);

        //trigger manually cause component uses it
        this.props.onMouseDown && this.props.onMouseDown(e);

        //redraw component with new style if there is one
        if (this.props.holdClassName || this.props.holdStyle) {
          this.setState({isHeld: true});
        }

        // mark time when mouse button has been pressed
        // to check if that was a click later
        this.mouseDownTime = Date.now();
        this.mouseMoved = false;

        //capture move and release of mouse
        activeMovable = this;
      }
    };

    this.handleMouseUp = e => {
      if (this.props.onMove) {
        storeMouse(null);
      }
      if (this.props.holdClassName || this.props.holdStyle) {
        this.setState({isHeld: false});
      }
      if (this.props.onDrop) {
        this.props.onDrop(e);
      }
      if (this.props.onClick) {
        if (
          // if mouseup happened max 300ms after mousedown
        this.mouseDownTime + 300 > Date.now() &&
        // ..and mouse hasn't moved meanwhile
        !this.mouseMoved
        ) {
          this.mouseDownTime = 0;
          this.props.onClick(e);
        }
      }
      activeMovable = null;
      lastNotProcessedMoveEvent = null;
    };

    this.handleMouseMove = e => {
      if (this.props.onMove) {
        this.props.onMove(storeMouse(e));
      }
      this.mouseMoved = true;
    };
  }

  componentWillUnmount() {
    if (this === activeMovable) {
      this.handleMouseUp(lastNotProcessedMoveEvent);
    }
  }

  render() {
    const rootProps = {
      ...this.props,
      onClick: preventDefault,
      onMove: null,
      onDrop: null,
      onHold: null,
      style: this.state.isHeld ? this.props.holdStyle : this.props.style,
      holdStyle: null,
      className: this.state.isHeld ? this.props.holdClassName : this.props.className,
      holdClassName: null,
      onMouseDown: this.handleMouseDown
    };
    return (
      <div {...rootProps} />
    );
  }
}

function preventDefault(e) {
  e.preventDefault();
  e.stopPropagation();
}
