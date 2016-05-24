import React, { PropTypes } from 'react';
import sprintf from 'tiny-sprintf';
import classNames from 'classnames';
import {
  range,
} from 'lodash';

import ShortenedRow from './schedule_daily_shortened_row.jsx';
import ExpandedRow from './schedule_daily_expanded_row.jsx';

const hourType = PropTypes.oneOf(range(0, 24));

const CalendarRow = React.createClass({
  propTypes: {
    firstHour: hourType.isRequired,
    hour: hourType.isRequired,
    items: PropTypes.object.isRequired,
    now: PropTypes.object.isRequired,
    activeItem: PropTypes.object,
    onActiveItemChange: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      expanded: false,
    };
  },

  getClassName(item) {
    let className = 'ScheduleDailyWidget-CalendarRow-item';
    if (this.props.activeItem && this.props.activeItem.get('id') === item.get('id')) {
      className += '-active';
    }
    return className;
  },

  toggleExpansion() {
    this.setState({
      expanded: !this.state.expanded,
    });
  },

  markAsActive(item) {
    const { activeItem, onActiveItemChange } = this.props;
    if (activeItem && item.get('id') === activeItem.get('id')) {
      onActiveItemChange(null);
    } else {
      onActiveItemChange(item);
    }
  },


  render() {
    const { hour, firstHour, items, now } = this.props;
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
    } else if (now.isBetween(hourStart, hourStop) && !this.state.expanded) {
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

    let rowContent;
    if (this.state.expanded) {
      rowContent = (
        <ExpandedRow
          items={items}
          getClassName={(item) => this.getClassName(item)}
          markAsActive={(item) => this.markAsActive(item)}
        />
      );
    } else {
      rowContent = (
        <ShortenedRow
          items={items}
          className="ScheduleDailyWidget-CalendarRow-item-ellipsed"
        />
      );
    }

    return (
      <tr className={classNames(
          'ScheduleDailyWidget-CalendarRow',
          rowTiming,
          { 'ScheduleDailyWidget-CalendarRow--expanded': this.state.expanded }
        )}
      >
        <td className={classNames(
            'ScheduleDailyWidget-CalendarRow-expandToggle',
            { 'ScheduleDailyWidget-CalendarRow--expanded-cell': this.state.expanded }
          )}
        >
          <button
            className="btn btn-icon-toggle"
            onClick={this.toggleExpansion}
          >
            <i className={classNames('mdi', {
              'mdi-plus': !this.state.expanded,
              'mdi-minus': this.state.expanded,
            })}
            />
          </button>
        </td>

        <td className={classNames(
            'ScheduleDailyWidget-CalendarRow-hour',
            { 'ScheduleDailyWidget-CalendarRow--expanded-cell': this.state.expanded }
          )}
        >
          {sprintf('%02s:00', hour)}
        </td>
        <td className={classNames(
            'ScheduleDailyWidget-CalendarRow-items',
            { 'ScheduleDailyWidget-CalendarRow--expanded-cell': this.state.expanded }
          )}
        >
          {hourMarker}
          {rowContent}
        </td>
      </tr>
    );
  },
});
export default CalendarRow;
