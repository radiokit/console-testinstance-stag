import React from 'react';
import Immutable from 'immutable';
import sprintf from 'tiny-sprintf';
import Moment from 'moment';

import '../../assets/stylesheets/widgets/admin/schedule_daily.scss';

export default React.createClass({
  propTypes: {
    firstHour: React.PropTypes.oneOf([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]).isRequired,
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


  onHourClick: function(hour) {
    this.refs["hour" + hour].classList.toggle("expanded");
  },


  render: function() {
    let hours;

    if(this.props.firstHour > 0) {
      hours = new Immutable.Range(this.props.firstHour, 24).concat(new Immutable.Range(0, this.props.firstHour));
    } else {
      hours = new Immutable.Range(0, 24);
    }

    return (
      <table className="table table-banded table-hover widgets-admin-schedule-daily--container">
        <tbody>
          {hours.map((hour) => {
            let hourStart;
            if(this.props.firstHour > 0 && hour < this.props.firstHour) {
              hourStart = this.props.now.clone().startOf("day").hour(hour).add(1, "day");
            } else {
              hourStart = this.props.now.clone().startOf("day").hour(hour);
            }
            let hourStop = hourStart.clone().add(1, "hour");

            let hourKlass;
            if(this.props.now.clone().subtract(1, "hour").isAfter(hourStart)) {
              hourKlass = "past";
            } else if(this.props.now.isBetween(hourStart, hourStop)) {
              hourKlass = "current";
            } else {
              hourKlass = null;
            }

            return (
              <tr key={hour} ref={"hour" + hour} className={hourKlass}>
                <td className="text-right" className="expand-toggle">
                  <a className="btn btn-icon-toggle toggle-on" onClick={this.onHourClick.bind(this, hour)}><i className="mdi mdi-plus" /></a>
                  <a className="btn btn-icon-toggle toggle-off" onClick={this.onHourClick.bind(this, hour)}><i className="mdi mdi-minus" /></a>
                </td>

                <td className="text-right" className="hour">
                  {sprintf("%02s:00", hour)}
                </td>

                <td className="items">
                  {this.props.items.filter((item) => {
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
          })}
        </tbody>
      </table>
    );
  }
});
