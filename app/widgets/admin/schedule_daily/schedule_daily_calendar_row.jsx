import React, { PropTypes } from 'react';
import sprintf from 'tiny-sprintf';
import classNames from 'classnames';
import { shouldComponentUpdate } from '../../../helpers/immutable_component';
import ShortenedRow from './schedule_daily_shortened_row.jsx';
import ExpandedRow from './schedule_daily_expanded_row.jsx';

const MILLISECONDS_IN_HOUR = 1000 * 60 * 60;

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
    const canBeExpanded = items && items.size;
    const isExpanded = canBeExpanded && this.state.expanded;

    const toggleButton = canBeExpanded
      ? (
        <button
          className="btn btn-icon-toggle"
          onClick={this.toggleExpansion}
        >
          <i className={classNames('mdi', {
            'mdi-plus': !isExpanded,
            'mdi-minus': isExpanded,
          })}
          />
        </button>
      )
      : null
    ;

    const hourMarker = (
      offsetStart <= now &&
      offsetStart + MILLISECONDS_IN_HOUR > now &&
      !isExpanded
    )
      ? (
        <hr
          key="HR"
          className="ScheduleDailyWidget-CalendarRow-currentTime"
          style={{ top: `${((now - offsetStart) / 6000000) * 100}%` }}
        />
      )
      : null;

    const rowContent = (isExpanded)
      ? (
        <ExpandedRow
          offsetStart={offsetStart}
          items={items}
          activeItem={activeItem}
          markAsActive={this.markAsActive}
        />
      )
      : [
        hourMarker,
        <ShortenedRow
          key="ROW"
          items={items}
          className="ScheduleDailyWidget-CalendarRow-item-ellipsed"
        />,
      ];

    const rowClasses = classNames(
      'ScheduleDailyWidget-CalendarRow',
      {
        'ScheduleDailyWidget-CalendarRow--past': (offsetStart + MILLISECONDS_IN_HOUR < now),
        'ScheduleDailyWidget-CalendarRow--current': (
          offsetStart <= now &&
          offsetStart + MILLISECONDS_IN_HOUR > now &&
          !isExpanded
        ),
        'ScheduleDailyWidget-CalendarRow--expanded': isExpanded,
      }
    );

    return (
      <tr className={rowClasses}>
        <td className={classNames(
              'ScheduleDailyWidget-CalendarRow-expandToggle',
              { 'ScheduleDailyWidget-CalendarRow--expanded-cell': isExpanded }
            )}
        >
          {toggleButton}
        </td>

        <td className={classNames(
            'ScheduleDailyWidget-CalendarRow-hour',
            { 'ScheduleDailyWidget-CalendarRow--expanded-cell': isExpanded }
          )}
        >
          {sprintf('%02s:00', new Date(offsetStart).getHours())}
        </td>
        <td className={classNames(
            'ScheduleDailyWidget-CalendarRow-items',
            { 'ScheduleDailyWidget-CalendarRow--expanded-cell': isExpanded }
          )}
        >
          {rowContent}
        </td>
      </tr>
    );
  },
});

export default CalendarRow;
