import React, { PropTypes } from 'react';
import sprintf from 'tiny-sprintf';
import classNames from 'classnames';
import {
  range,
} from 'lodash';

const hourType = PropTypes.oneOf(range(0, 24));

const CalendarRow = React.createClass({
  propTypes: {
    firstHour: hourType.isRequired,
    hour: hourType.isRequired,
    items: PropTypes.object.isRequired,
    now: PropTypes.object.isRequired,
    expanded: PropTypes.boolean,
    onChangeExpansionState: PropTypes.func.isRequired,
    activeItem: PropTypes.object,
    onActiveItemChange: PropTypes.func.isRequired,
  },

  shouldComponentUpdate(nextProp) {
    return !(
      this.props.firstHour === nextProp.firstHour &&
      this.props.hour === nextProp.hour &&
      this.props.items === nextProp.items &&
      this.props.now === nextProp.now &&
      this.props.expanded === nextProp.expanded &&
      this.props.activeItem === nextProp.activeItem
    );
  },

  onCollapse() {
    this.props.onChangeExpansionState(this.props.hour, false);
  },

  onExpand() {
    this.props.onChangeExpansionState(this.props.hour, true);
  },

  getClassName(item) {
    let className = 'ScheduleDailyWidget-CalendarRow-item';
    if (this.props.activeItem && this.props.activeItem.get('id') === item.get('id')) {
      className += '-active';
    }
    return className;
  },

  markAsActive(item) {
    if (this.props.activeItem && item.get('id') === this.props.activeItem.get('id')) {
      this.props.onActiveItemChange(null);
    } else {
      this.props.onActiveItemChange(item);
    }
  },

  render() {
    const { hour, firstHour, items, now, expanded } = this.props;
    let hourStart;
    if (firstHour > 0 && hour < firstHour) {
      hourStart = now.clone().startOf('day').hour(hour).add(1, 'day');
    } else {
      hourStart = now.clone().startOf('day').hour(hour);
    }
    const hourStop = hourStart.clone().add(1, 'hour');

    let rowTiming;
    let hourMarker;
    if (now.clone().subtract(1, 'hour').isAfter(hourStart)) {
      rowTiming = 'ScheduleDailyWidget-CalendarRow--past';
    } else if (now.isBetween(hourStart, hourStop)) {
      rowTiming = 'ScheduleDailyWidget-CalendarRow--current';
      hourMarker = (
        <hr
          className="ScheduleDailyWidget-CalendarRow-currentTime"
          style={{ top: `${(now.minutes() / 60) * 100}%` }}
        />
      );
    } else {
      rowTiming = null;
    }

    return (
      <tr className={classNames(
          'ScheduleDailyWidget-CalendarRow',
          rowTiming,
          { 'ScheduleDailyWidget-CalendarRow--expanded': expanded }
        )}
      >
        <td className="ScheduleDailyWidget-CalendarRow-expandToggle">
          <button
            className="btn btn-icon-toggle"
            onClick={expanded ? this.onCollapse : this.onExpand}
          >
            <i className={classNames('mdi', { 'mdi-plus': !expanded, 'mdi-minus': expanded })} />
          </button>
        </td>

        <td className="ScheduleDailyWidget-CalendarRow-hour">
          {sprintf('%02s:00', hour)}
        </td>

        <td className="ScheduleDailyWidget-CalendarRow-items">
          {hourMarker}
          {items.filter((item) => {
            const start = item.get('start_at');
            return start.isBefore(hourStop) && !hourStart.isAfter(start);
          }).map((item) => {
            if (item.get('stop_at').isAfter(item.get('start_at').clone().endOf('hour'))) {
              return (
                <div
                  key={item.get('id')}
                  className={this.getClassName(item)}
                  style={{
                    top: `${item.get('start_at').minutes() / 60 * 100}%`,
                    bottom: '0',
                  }}
                  onClick={() => this.markAsActive(item)}
                >
                  <header>
                    {item.get('id')}
                    / {item.get('start_at').format()}
                    / {item.get('stop_at').format()}

                  </header>
                </div>
              );
            }
            return (
              <div
                key={item.get('id')}
                className={this.getClassName(item)}
                style={{
                  top: `${item.get('start_at').minutes() / 60 * 100}%`,
                  bottom: `${100 - item.get('stop_at').minutes() / 60 * 100}%`,
                }}
                onClick={() => this.markAsActive(item)}
              >
                <header>
                  {item.get('id')}
                  / {item.get('start_at').format()}
                  / {item.get('stop_at').format()}
                </header>
              </div>
            );
          })}


          {this.props.items
            .filter((item) => (
            item.get('start_at').isBefore(hourStart) &&
            item.get('stop_at').isAfter(hourStop)
            ))
            .map((item) => (
              <div
                key={item.get('id')}
                className={this.getClassName(item)}
                style={{ bottom: '0', top: '-1px' }}
                onClick={() => this.markAsActive(item)}
              />
            ))}


          {this.props.items
            .filter((item) => (
              item.get('start_at').isBefore(hourStart) &&
              item.get('stop_at').isBetween(hourStart, hourStop)
            ))
            .map((item) => (
              <div
                key={item.get('id')}
                className={this.getClassName(item)}
                style={{
                  bottom: `${100 - item.get('stop_at').minutes() / 60 * 100}%`,
                  top: '-1px',
                }}
                onClick={() => this.markAsActive(item)}
              />
            ))}
        </td>
      </tr>
    );
  },
});
export default CalendarRow;
