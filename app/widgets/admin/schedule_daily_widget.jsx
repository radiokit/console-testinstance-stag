import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import sprintf from 'tiny-sprintf';
import Moment from 'moment';
import classnames from 'classnames';

import './schedule_daily_widget.scss';

const hourType = PropTypes.oneOf([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]);

function CalendarEntry({}) {

}

const CalendarRow = React.createClass({
  propTypes: {
    firstHour: hourType.isRequired,
    hour: hourType.isRequired,
    items: PropTypes.object.isRequired,
    now: PropTypes.object.isRequired,
    expanded: PropTypes.boolean,
    onChangeExpansionState: PropTypes.func.isRequired,
  },
  onCollapse(e) {
    this.props.onChangeExpansionState(this.props.hour, false)
  },
  onExpand(e) {
    this.props.onChangeExpansionState(this.props.hour, true)
  },
  shouldComponentUpdate(nextProp, nextState) {
    return !(
      this.props.firstHour === nextProp.firstHour &&
      this.props.hour === nextProp.hour &&
      this.props.items === nextProp.items &&
      this.props.now === nextProp.now &&
      this.props.expanded === nextProp.expanded
    );
  },
  render() {

    const {hour, firstHour, items, now, expanded} = this.props;
    let hourStart;
    if(firstHour > 0 && hour < firstHour) {
      hourStart = now.clone().startOf("day").hour(hour).add(1, "day");
    } else {
      hourStart = now.clone().startOf("day").hour(hour);
    }
    let hourStop = hourStart.clone().add(1, "hour");

    let hourKlass;
    if(now.clone().subtract(1, "hour").isAfter(hourStart)) {
      hourKlass = "past";
    } else if(now.isBetween(hourStart, hourStop)) {
      hourKlass = "current";
    } else {
      hourKlass = null;
    }

    return (
      <tr className={classnames("ScheduleDailyWidget-CalendarRow", hourKlass, {'ScheduleDailyWidget-CalendarRow--expanded': expanded})}>
        <td className="ScheduleDailyWidget-CalendarRow-expandToggle">
          <button className="btn btn-icon-toggle " onClick={expanded?this.onCollapse:this.onExpand}>
            <i className={classnames('mdi', {'mdi-plus':!expanded,'mdi-minus':expanded})}  />
          </button>
        </td>

        <td className="ScheduleDailyWidget-CalendarRow-hour">
          {sprintf("%02s:00", hour)}
        </td>

        <td className="ScheduleDailyWidget-CalendarRow-items">
          {items.filter((item) => {
            return item.get("start_at").isBetween(hourStart, hourStop);

          }).map((item) => {
            if(item.get("stop_at").isAfter(item.get("start_at").clone().endOf("hour"))) {
              return (
                <div key={item.get("id")} className="item item-start" style={{top: (item.get("start_at").minutes() / 59 * 100) + "%", bottom: "0" }}>
                  <header>
                    {item.get("id")}
                    / {item.get("start_at").format()}
                    / {item.get("stop_at").format()}

                  </header>
                </div>
              );

            } else {
              return (
                <div key={item.get("id")} className="item item-overflow" style={{top: (item.get("start_at").minutes() / 59 * 100) + "%", bottom: (100 - item.get("stop_at").minutes() / 59 * 100) + "%" }}>
                  <header>
                    {item.get("id")}
                    / {item.get("start_at").format()}
                    / {item.get("stop_at").format()}
                  </header>
                </div>
              );
            }
          })}


          {this.props.items.filter((item) => {
            return item.get("start_at").isBefore(hourStart)
                   && item.get("stop_at").isAfter(hourStop);

          }).map((item) => {
            return (
              <div key={item.get("id")} className="item item-stop" style={{bottom: "0", top: "-1px" }} />
            );
          })}


          {this.props.items.filter((item) => {
            return item.get("start_at").isBefore(hourStart)
                   && item.get("stop_at").isBetween(hourStart, hourStop);

          }).map((item) => {
            return (
              <div key={item.get("id")} className="item item-stop" style={{bottom: (100 - item.get("stop_at").minutes() / 59 * 100) + "%", top: "-1px" }} />
            );
          })}

        </td>
      </tr>
    );
  }
});




export default React.createClass({
  propTypes: {
    firstHour: hourType.isRequired,
    items: React.PropTypes.object.isRequired,
    now: React.PropTypes.object.isRequired,
  },


  getDefaultProps: function() {
    return {
      firstHour: 5,
      items: new Immutable.Seq().toIndexedSeq(),
      now: Moment.utc(),
    }
  },

  getInitialState: function() {
    return {
      expansionState: {}
    }
  },

  onChangeExpansionState(hour, value) {
    this.setState({expansionState: {...this.state.expansionState, [hour]: value}});
  },

  render() {
    let hours;

    if(this.props.firstHour > 0) {
      hours = new Immutable.Range(this.props.firstHour, 24).concat(new Immutable.Range(0, this.props.firstHour));
    } else {
      hours = new Immutable.Range(0, 24);
    }

    return (
      <table className="ScheduleDailyWidget table table-banded table-hover ">
        <tbody>
          {hours.map((hour)=> {
            return (
              <CalendarRow
                key={hour}
                hour={hour}
                firstHour={this.props.firstHour}
                now={this.props.now}
                items={this.props.items}
                onChangeExpansionState={this.onChangeExpansionState}
                expanded={this.state.expansionState[hour]}/>
            );
          })}
        </tbody>
      </table>
    );
  }
});
