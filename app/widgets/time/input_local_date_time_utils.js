import padLeft from '../../helpers/pad_left';
import moment from 'moment-timezone';

export {
  appendTimezoneToDateParts,
  getDatePartsInDifferentTimezone,
  dateToDateParts,
  datePartsToDate,
  datePartsToISOString,
  formatHM,
  formatDisplayDate,
};

/**
 * @typedef {Object} DateParts
 * @property {number} year
 * @property {number} month
 * @property {number} day
 * @property {number} hour
 * @property {number} minute
 * @property {number} second
 */

/**
 * @typedef {Object} DatePartWithTimezone
 * @property {number} year
 * @property {number} month
 * @property {number} day
 * @property {number} hour
 * @property {number} minute
 * @property {number} second
 * @property {String} tz
 */

/**
 * Appends Timezone to DateParts tuple
 * @param {DateParts} dateParts
 * @param {String} tz
 * @returns {DatePartWithTimezone}
 */
function appendTimezoneToDateParts(dateParts, tz) {
  return {
    year: dateParts.year,
    month: dateParts.month,
    day: dateParts.day,
    hour: dateParts.hour,
    minute: dateParts.minute,
    second: dateParts.second,
    tz,
  };
}

/**
 * Gets Date compounds after converting it to different timezone
 * @param {Date} date
 * @param {String} tz
 * @returns {DatePartWithTimezone}
 */
function getDatePartsInDifferentTimezone(date, tz) {
  const timeInTimezone = moment.tz(date.valueOf(), tz);
  return {
    year: timeInTimezone.year(),
    month: timeInTimezone.month() + 1,
    day: timeInTimezone.date(),
    hour: timeInTimezone.hour(),
    minute: timeInTimezone.minute(),
    second: timeInTimezone.second(),
    tz,
  };
}

/**
 * Gets date parts of Date instance
 * @param {Date} date
 * @returns {DateParts}
 */
function dateToDateParts(date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
}

/**
 * Converts DateParts tuple to Date instance
 * WARNING: DateParts does not contain timezone!
 * @param {DateParts} dateParts
 * @returns {Date}
 */
function datePartsToDate(dateParts) {
  return new Date(
    dateParts.year,
    dateParts.month - 1,
    dateParts.day,
    dateParts.hour,
    dateParts.minute,
    dateParts.second
  );
}

/**
 * Formats DateParts tuple into ISO 8601 date time String
 * @param {DatePartWithTimezone} dateParts
 * @returns {String}
 */
function datePartsToISOString(dateParts) {
  const { year, month, day, hour, minute, second, tz } = dateParts;
  return moment.tz([year, month - 1, day, hour, minute, second], tz).toISOString();
}

/**
 * @param {DateParts} date
 * @returns {String}
 */
function formatHM(date) {
  return `${
    padLeft(date.hour.toString(), 2, '0')
    }:${
    padLeft(date.minute.toString(), 2, '0')
    }`;
}

/**
 * @param {Date} dateObject
 * @returns {String}
 */
function formatDisplayDate(dateObject) {
  if (!dateObject) {
    return '';
  }
  // moment is used to get date format based on moment locale
  return moment(dateObject).format('L');
}
