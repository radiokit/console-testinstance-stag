import React from 'react';
import ReactTranslate from 'react-translate-component';
import translate from 'counterpart';
import { Link } from 'react-router';
import moment from 'moment';
import momentTz from 'moment-timezone';

export default React.createClass({

  oldFirstDayOfWeek: null,

  componentWillMount: function() {
    var days = [];
    var days_translations = translate("apps.music_scheduler.calendar.days");

    for(var key in days_translations) {
      days.push(days_translations[key].toLowerCase());
    };
    this.days = days;

    this.setOldFirstDayOfWeek(this.transformFirstDayOfWeekToInt("monday"));

    window.data
      .query("horn-gw", "ChannelSchedulingRegion")
      .select("time_start", "time_stop", "name", "color")
      // .where("channel_id", "eq", AccountHelper.getCurrentAccountIdFromContext(this))
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          })
        }
      }).on("update", (_, query) => {
        if(this.isMounted()) {
          this.setState({
            scheduling_regions: query.getData()
          });
          this.forceUpdate();
          $(this.refs.calendarContainer.getDOMNode()).fullCalendar( 'unselect' );
        }
      }).fetch();
  },

  componentDidUpdate: function() {
    var self = this;
    var fetchedEvents = this.prepareEventsArray();

    this.renderCalendar();

    var renderedEvents = $(this.refs.calendarContainer.getDOMNode()).fullCalendar( 'clientEvents' );

    var fetchedEventsIds = $.map(fetchedEvents, function(fetchedEvent, index) {
      return fetchedEvent.id + fetchedEvent.day;
    });
    var renderedEventsIds = $.map(renderedEvents, function(renderedEvent, index) {
      return renderedEvent.id + renderedEvent.day;
    });

    var eventsToAdd = [];
    $.each(fetchedEvents, function(index, fetchedEvent) {
      key = fetchedEvent.id+fetchedEvent.day;

      if($.inArray(key, renderedEventsIds) == -1) {
        eventsToAdd.push(fetchedEvent);
      };
    });

    var eventsToRemove = [];
    $.each(renderedEvents, function(index, renderedEvent) {
      key = renderedEvent.id+renderedEvent.day;

      if($.inArray(key, fetchedEventsIds) == -1) {
        eventsToRemove.push([renderedEvent, key]);
      };
    });

    var eventsToUpdate = [];
    $.each(fetchedEvents, function(index, fetchedEvent) {
      key = fetchedEvent.id+fetchedEvent.day;

      if($.inArray(key, renderedEventsIds) != -1) {
        renderedEvent = $.grep(renderedEvents, function(e){ return e.id + e.day == key; })[0];
        data_attributes_to_compare = [
          "time_start",
          "time_stop",
          "title",
          "color"
        ];

        $.each(data_attributes_to_compare, function(index, attribute) {
          if(fetchedEvent[attribute] != renderedEvent[attribute]) {
            if(attribute == "title" || attribute == "color" ) {
              renderedEvent[attribute] = fetchedEvent[attribute];
              $(React.findDOMNode(self.refs.calendarContainer)).fullCalendar( 'rerenderEvents' );
            } else {
              $(React.findDOMNode(self.refs.calendarContainer)).fullCalendar( 'removeEvents', fetchedEvent.id )
              $(React.findDOMNode(self.refs.calendarContainer)).fullCalendar( 'renderEvent', fetchedEvent )
            };
          };
        });
      };
    });

    if(eventsToRemove.length != 0 || eventsToAdd.length != 0 || eventsToUpdate.length != 0) {
      this.updateCalendar(eventsToRemove, eventsToAdd, eventsToUpdate);
    };
  },

  prepareEventsArray: function() {
    var self = this;
    var week_hash = this.prepareCorrectWeekHash();
    var events = [];

    if (this.state.scheduling_regions == null) return [];

    this.state.scheduling_regions.map(function(item) {
      var days_to_include = []

      $.each(self.days, function(index, day) {
        var attr_name = "on_" + day
        if(item[attr_name]) {
          days_to_include.push(day);
        };
      });

      time_start           = moment.parseZone(item.get("time_start"));
      time_stop            = moment.parseZone(item.get("time_stop"));
      time_title_formatted = time_start.format("HH:mm") + " - " + time_stop.add(1, "s").format("HH:mm")
      title =
        item.name ? item.name + " (" + time_title_formatted + ")" : time_title_formatted;

      $.each(days_to_include, function(index, day) {
        event_attributes = {
          id         : item.get("id"),
          title      : title,
          time_start : time_start.format("HH:mm:ss"),
          time_stop  : time_stop.format("HH:mm:ss"),
          start      : week_hash[day] + "T" + moment.parseZone(item.time_start).format("HH:mm:ss"),
          end        : week_hash[day] + "T" + moment.parseZone(item.time_stop).format("HH:mm:ss"),
          day        : day,
          color      : item.get("color")
        };

        $.each(self.days, function(index, day) {
          day_attribute = "on_" + day;
          event_attributes[day_attribute] = item[day_attribute];
        });

        events.push(event_attributes);
      })
    });
    return events;
  },

  prepareCorrectWeekHash: function() {
    var week_hash = {};
    var tds       = $(this.refs.calendarCardBody.getDOMNode().getElementsByClassName("fc-day"))

    $.each(tds, function(index, td) {
      momentDate = moment($(td).data("date"));
      day        = momentDate.format("dddd").toLowerCase();
      date       = momentDate.format("YYYY-MM-DD");
      week_hash[day] = date;
    });
    return week_hash;
  },

  renderCalendar: function() {
    var self = this;
    var firstDayOfWeek = this.transformFirstDayOfWeekToInt("monday");

    if(this.oldFirstDayOfWeek != firstDayOfWeek){
      $(this.refs.calendarContainer.getDOMNode()).fullCalendar("destroy");
    };

    $(this.refs.calendarContainer.getDOMNode()).fullCalendar({
      defaultView: 'agendaWeek',
      columnFormat: 'dddd',
      firstDay: firstDayOfWeek,
      defaultDate: '2000-01-01',
      header: false,
      allDaySlot: false,
      height: "auto",
      selectable: true,
      eventOverlap: false,
      slotEventOverlap: false,
      editable: true,
      axisFormat: "HH:mm",

      eventResize: function( event, delta, revertFunc, jsEvent, ui, view ) {
        var update_attributes = {};

        updated_end = event.end.subtract(1, "s");
        if(moment(event.start).day() != moment(event.end).day()){
          updated_end = event.end.endOf('day');
        };

        update_attributes["time_stop"] = updated_end.format("HH:mm:ss");

        self.updateSchedulingRegion(event.id, update_attributes, revertFunc);
      },

      eventDrop: function( event, delta, revertFunc, jsEvent, ui, view ) {
        var update_attributes = {};
        var updated_start = event.start;
        var updated_end   = event.end;

        update_attributes["time_start"] = updated_start.format("HH:mm:ss");
        update_attributes["time_stop"] = updated_end.format("HH:mm:ss");

        new_event_day = updated_start.format("dddd").toLowerCase();

        $.each(this.days, function(index, day){
          day_attribute = "on_" + day;

          if(day == new_event_day) {
            update_attributes[day_attribute] = true;
          } else {
            update_attributes[day_attribute] = false;
          }
        });

        self.updateSchedulingRegion(event.id, update_attributes, revertFunc);
      },

      select: function(start, end, jsEvent, view) {
        if(moment(start).day() != moment(end).day()){
          end = moment(start).endOf('day');
        };

        self.createSchedulingRegion(start, end, jsEvent);
      },

      eventClick: function( event, jsEvent, view ) {
        self.transitionTo('channelMusicAutomationRegionsShow', {channelAlias: self.getParams().channelAlias, showRegionId: event.id});
      },
      selectHelper: true
    });

    this.setOldFirstDayOfWeek(firstDayOfWeek);
  },

  transformFirstDayOfWeekToInt: function(day_name) {
    switch(day_name) {
      case "sunday":    var firstDayOfWeekInt = 0; break;
      case "monday":    var firstDayOfWeekInt = 1; break;
      case "tuesday":   var firstDayOfWeekInt = 2; break;
      case "wednesday": var firstDayOfWeekInt = 3; break;
      case "thursday":  var firstDayOfWeekInt = 4; break;
      case "friday":    var firstDayOfWeekInt = 5; break;
      case "saturday":  var firstDayOfWeekInt = 6; break;
    };
    return firstDayOfWeekInt;
  },

  setOldFirstDayOfWeek: function(day) {
    this.oldFirstDayOfWeek = day;
  },

  createSchedulingRegion: function(start, end, jsEvent) {
    var self      = this;
    var end_value = end.subtract(1, "s").format("HH:mm:ss");

    if(end_value == "23:59:58") {
      var adjusted_time_stop = "23:59:59";
    } else {
      var adjusted_time_stop = end_value;
    };

    var create_attributes = {
      time_start: start.format("HH:mm:ss"),
      time_stop: adjusted_time_stop,
      //channel_id: self.props.currentChannel.id
    };

    var day = moment(start).format("dddd").toLowerCase();
    var day_attribute = "on_" + day;
    create_attributes[day_attribute] = true

    window.data
    .record("horn-gw","SchedulingRegion")
    .on("warning", function(eventName, record) {
      element = $(jsEvent.target).parent()
      element.css({
        "background": "#f40000",
        "border-color": "#9f0800"
      });
      element.fadeOut();
    }).create(create_attributes);
  },

  updateCalendar: function(eventsToRemove, eventsToAdd, eventsToUpdate) {
    var self = this;
    $.each(eventsToRemove, function(index, event) {
      $(self.refs.calendarContainer.getDOMNode()).fullCalendar( 'removeEvents', function(evt) {
        return evt.id + evt.day == event[1];
      });
    });
    $.each(eventsToAdd, function(index, event) {
      $(self.refs.calendarContainer.getDOMNode()).fullCalendar( 'renderEvent', event )
    });
  },

  updateSchedulingRegion: function(id, update_attributes, revertFunc) {
    window.data
    .record("horn-gw","SchedulingRegion", id)
    .on("warning", function(eventName, record) {
      revertFunc();
    }).update(update_attributes);
  },

  deleteSchedulingRegion: function(id) {
    window.data
    .record("horn-gw","SchedulingRegion", id)
    .destroy();
  },

  render: function() {
    return (
      <section>
        <div className="section-body">
          <div className="row">
            <div className="col-sm-12">
              <div className="card style-default-light">
                <div ref="calendarCardBody" className="card-body style-default-bright">
                  <div ref="calendarContainer" className="calendar-container"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
});