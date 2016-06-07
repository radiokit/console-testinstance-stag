import React, { PropTypes } from 'react';
import sprintf from 'tiny-sprintf';
import classNames from 'classnames';
import { shouldComponentUpdate } from '../../../helpers/immutable_component';
import ShortenedRow from './schedule_daily_shortened_row.jsx';
import ExpandedRow from './schedule_daily_expanded_row.jsx';

const milisecondsInHour = 1000 * 60 * 60;

const CalendarRow = React.createClass({
  propTypes: {
    offsetStart: React.PropTypes.number,
    items: PropTypes.object.isRequired,
    activeItem: PropTypes.object,
    onActiveItemChange: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      expanded: false,
    };
  },

  shouldComponentUpdate,

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
    const {
      offsetStart,
      items,
      activeItem,
    } = this.props;
    const now = Date.now();

    let rowTiming;
    let hourMarker;
    if (offsetStart + milisecondsInHour < now) {
      rowTiming = 'ScheduleDailyWidget-CalendarRow--past';
    } else if (
      offsetStart <= now &&
      offsetStart + milisecondsInHour > now &&
      !this.state.expanded
    ) {
      rowTiming = 'ScheduleDailyWidget-CalendarRow--current';
      hourMarker = (
        <hr
          key="HR"
          className="ScheduleDailyWidget-CalendarRow-currentTime"
          style={{ top: `${((now - offsetStart) / 6000000) * 100}%` }}
        />
      );
    } else {
      rowTiming = null;
    }

    let rowContent;
    if (this.state.expanded) {
      rowContent = (
        <ExpandedRow
          offsetStart={offsetStart}
          items={items}
          activeItem={activeItem}
          markAsActive={this.markAsActive}
        />
      );
    } else {
      rowContent = [
        hourMarker,
        <ShortenedRow
          key="ROW"
          items={items}
          className="ScheduleDailyWidget-CalendarRow-item-ellipsed"
        />,
      ];
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
          {sprintf('%02s:00', new Date(offsetStart).getHours())}
        </td>
        <td className={classNames(
            'ScheduleDailyWidget-CalendarRow-items',
            { 'ScheduleDailyWidget-CalendarRow--expanded-cell': this.state.expanded }
          )}
        >
          {rowContent}
        </td>
      </tr>
    );
  },
});
export default CalendarRow;
