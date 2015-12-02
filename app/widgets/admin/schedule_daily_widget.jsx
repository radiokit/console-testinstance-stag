import React from 'react';
import Immutable from 'immutable';
import sprintf from 'tiny-sprintf';
import Moment from 'moment';

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


  render: function() {
    let hours;

    if(this.props.firstHour > 0) {
      hours = new Immutable.Range(this.props.firstHour, 24).concat(new Immutable.Range(0, this.props.firstHour));
    } else {
      hours = new Immutable.Range(0, 24);
    }

    return (
      <table className="table table-banded table-hover">
        <tbody>
          {hours.map((hour) => {
            return (
              <tr key={hour} ref={"hour" + hour}>
                <td className="text-right" style={{width: "4ex"}}>
                  {sprintf("%02s:00", hour)}
                </td>

                <td style={{position: "relative"}}>
                  {this.props.items.filter((item) => {
                    return item.get("start_at").isBetween(this.props.now.clone().startOf("day").hour(hour), this.props.now.clone().startOf("day").hour(hour+1));

                  }).map((item) => {
                    if(item.get("stop_at").isAfter(item.get("start_at").clone().endOf("hour"))) {
                      return (
                        <div key={item.get("id")} style={{position: "absolute", background: "red", left: "12px", right: "12px", top: (item.get("start_at").minutes() / 59 * 100) + "%", bottom: "0" }}>
                          <header>
                            {item.get("id")}
                            / {item.get("start_at").format()}
                            / {item.get("stop_at").format()}

                          </header>
                        </div>
                      );

                    } else {
                      return (
                        <div key={item.get("id")} style={{position: "absolute", background: "red", left: "12px", right: "12px", top: (item.get("start_at").minutes() / 59 * 100) + "%", bottom: (100 - item.get("stop_at").minutes() / 59 * 100) + "%" }}>
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
                    return item.get("start_at").isBefore(this.props.now.clone().startOf("day").hour(hour))
                           && item.get("stop_at").isAfter(this.props.now.clone().startOf("day").hour(hour+1));

                  }).map((item) => {
                    return (
                      <div key={item.get("id")} style={{position: "absolute", background: "green", left: "12px", right: "12px", bottom: "0", top: "-1px" }} />
                    );
                  })}


                  {this.props.items.filter((item) => {
                    return item.get("start_at").isBefore(this.props.now.clone().startOf("day").hour(hour))
                           && item.get("stop_at").isBetween(this.props.now.clone().startOf("day").hour(hour), this.props.now.clone().startOf("day").hour(hour+1));

                  }).map((item) => {
                    return (
                      <div key={item.get("id")} style={{position: "absolute", background: "blue", left: "12px", right: "12px", bottom: (100 - item.get("stop_at").minutes() / 59 * 100) + "%", top: "-1px" }} />
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
