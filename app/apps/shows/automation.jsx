import React from 'react';
import translate from 'counterpart';
import { Link } from 'react-router';

import RoutingHelper from '../../helpers/routing_helper.js';
import AccountHelper from '../../helpers/account_helper.js';
import Section from '../../widgets/admin/section_widget.jsx';
import GridRow from '../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../widgets/admin/grid_cell_widget.jsx';
import Alert from '../../widgets/admin/alert_widget.jsx';
import Card from '../../widgets/admin/card_widget.jsx';
import CardBody from '../../widgets/admin/card_body_widget.jsx';
import CardHeader from '../../widgets/admin/card_header_widget.jsx';
import CardToolBar from '../../widgets/admin/card_tool_bar_widget.jsx';
import CardToolBarCreate from '../../widgets/admin/card_tool_bar_create_widget.jsx';
import Loading from '../../widgets/general/loading_widget.jsx';

export default React.createClass({

  itemsQuery: null,

  getInitialState: function() {
    return {
      loadingError: false,
      scheduling_items: null,
      schedule_weekly_plan: null
    };
  },

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
      .query("agenda", "Schedule.Weekly.Plan")
      .select("id")
      .where("references", "deq", "user_account_id", AccountHelper.getCurrentAccountIdFromContext(this))
      .where("references", "deq", "role", "shows")
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          })
        }
      }).on("update", (_, query) => {
        if(this.isMounted()) {
          if(query.getData().count() != 0) {
            this.setState({
              schedule_weekly_plan: query.getData().first()
            });

            this.itemsQuery = window.data
              .query("agenda", "Schedule.Weekly.Item")
              .select("id", "time_start", "time_stop", "name", "extra" ,"on_monday", "on_tuesday", "on_wednesday", "on_thursday", "on_friday", "on_saturday", "on_sunday")
              .where("schedule_weekly_plan_id", "eq", query.getData().first().get("id"))
              .on("error", () => {
                if(this.isMounted()) {
                  this.setState({
                    loadingError: true
                  })
                }
              }).on("update", (_, query) => {
                if(this.isMounted()) {
                  this.setState({
                    scheduling_items: query.getData(),
                  })
                  //this.forceUpdate();
                  $(this.refs.calendarContainer).fullCalendar( 'unselect' );
                }
              })
              .enableAutoUpdate();
          } else {
            this.setState({
              loadingError: true
            })
          }
        }
      }).fetch();
  },

  componentWillUnmount: function() {
    this.itemsQuery.teardown();
  },

  componentDidUpdate: function() {
    if(!this.state.loadingError) {
      var self = this;
      var fetchedEvents = this.prepareEventsArray();

      this.renderCalendar();

      var renderedEvents = $(this.refs.calendarContainer).fullCalendar( 'clientEvents' );
      var fetchedEventsIds = $.map(fetchedEvents, function(fetchedEvent, index) {
        return fetchedEvent.id + fetchedEvent.day;
      });
      var renderedEventsIds = $.map(renderedEvents, function(renderedEvent, index) {
        return renderedEvent.id + renderedEvent.day;
      });

      var eventsToAdd = [];
      $.each(fetchedEvents, function(index, fetchedEvent) {
        var key = fetchedEvent.id+fetchedEvent.day;

        if($.inArray(key, renderedEventsIds) == -1) {
          eventsToAdd.push(fetchedEvent);
        };
      });

      var eventsToRemove = [];
      $.each(renderedEvents, function(index, renderedEvent) {
        var key = renderedEvent.id+renderedEvent.day;

        if($.inArray(key, fetchedEventsIds) == -1) {
          eventsToRemove.push([renderedEvent, key]);
        };
      });

      var eventsToUpdate = [];
      $.each(fetchedEvents, function(index, fetchedEvent) {
        var key = fetchedEvent.id+fetchedEvent.day;

        if($.inArray(key, renderedEventsIds) != -1) {
          var renderedEvent = $.grep(renderedEvents, function(e){ return e.id + e.day == key; })[0];
          var data_attributes_to_compare = [
            "time_start",
            "time_stop",
            "title"
          ];

          $.each(data_attributes_to_compare, function(index, attribute) {
            if(fetchedEvent[attribute] != renderedEvent[attribute]) {
              if(attribute == "title" || attribute == "color" ) {
                renderedEvent[attribute] = fetchedEvent[attribute];
                $(self.refs.calendarContainer).fullCalendar( 'rerenderEvents' );
              } else {
                $(self.refs.calendarContainer).fullCalendar( 'removeEvents', fetchedEvent.id )
                $(self.refs.calendarContainer).fullCalendar( 'renderEvent', fetchedEvent )
              };
            };
          });
        };
      });

      if(eventsToRemove.length != 0 || eventsToAdd.length != 0 || eventsToUpdate.length != 0) {
        this.updateCalendar(eventsToRemove, eventsToAdd, eventsToUpdate);
      };
    }
  },

  prepareEventsArray: function() {
    var self = this;
    var week_hash = this.prepareCorrectWeekHash();
    var events = [];

    if (this.state.scheduling_items == null) return [];

    this.state.scheduling_items.forEach(function(item) {
      var days_to_include = []

      $.each(self.days, function(index, day) {
        var attr_name = "on_" + day
        if(item.get(attr_name)) {
          days_to_include.push(day);
        };
      });

      var time_start           = moment.parseZone("2015-11-12T" + item.get("time_start") + "Z");
      var time_stop            = moment.parseZone("2015-11-12T" + item.get("time_stop") + "Z");
      var time_title_formatted = time_start.format("HH:mm") + " - " + time_stop.add(1, "s").format("HH:mm")
      var title =
        item.get("name") ? item.get("name") + " (" + time_title_formatted + ")" : time_title_formatted;

      $.each(days_to_include, function(index, day) {
        var event_attributes = {
          id         : item.get("id"),
          title      : title,
          time_start : time_start.format("HH:mm:ss"),
          time_stop  : time_stop.format("HH:mm:ss"),
          start      : week_hash[day] + "T" + moment.parseZone("2015-11-12T" + item.get("time_start") +"Z").format("HH:mm:ss"),
          end        : week_hash[day] + "T" + moment.parseZone("2015-11-12T" + item.get("time_stop") + "Z").format("HH:mm:ss"),
          day        : day,
          color      : "#0076ff"
        };

        $.each(self.days, function(index, day) {
          var day_attribute = "on_" + day;
          event_attributes[day_attribute] = item.get(day_attribute);
        });

        events.push(event_attributes);
      })
    });
    return events;
  },

  prepareCorrectWeekHash: function() {
    var week_hash = {};
    var tds       = $(this.refs.calendarCardBody.getElementsByClassName("fc-day"))

    $.each(tds, function(index, td) {
      var momentDate = moment($(td).data("date"));
      var day        = momentDate.format("dddd").toLowerCase();
      var date       = momentDate.format("YYYY-MM-DD");
      week_hash[day] = date;
    });
    return week_hash;
  },

  renderCalendar: function() {
    var self = this;
    var firstDayOfWeek = this.transformFirstDayOfWeekToInt("monday");

    if(this.oldFirstDayOfWeek != firstDayOfWeek){
      $(this.refs.calendarContainer).fullCalendar("destroy");
    };

    $(this.refs.calendarContainer).fullCalendar({
      defaultView: 'agendaWeek',
      columnFormat: 'dddd',
      firstDay: firstDayOfWeek,
      defaultDate: '2015-11-01',
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
        self.props.history.pushState(null, RoutingHelper.apps.shows.files.automation_item_show(self, event.id));
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
      schedule_weekly_plan_id: self.state.schedule_weekly_plan.get("id")
    };

    var day = moment(start).format("dddd").toLowerCase();
    var day_attribute = "on_" + day;
    create_attributes[day_attribute] = true

    window.data
    .record("agenda","Schedule.Weekly.Item")
    .on("error", function(eventName, record) {
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
      $(self.refs.calendarContainer).fullCalendar( 'removeEvents', function(evt) {
        return evt.id + evt.day == event[1];
      });
    });
    $.each(eventsToAdd, function(index, event) {
      $(self.refs.calendarContainer).fullCalendar( 'renderEvent', event )
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
    if(this.state.loadingError) {
      return (<Alert type="error" fullscreen={true} infoTextKey="general.errors.communication.general" />);
    } else {
      var that = this;
      return (
        <Section>
          <GridRow>
            <GridCell size="large" center={true}>
              <Card contentPrefix="apps.music_scheduler">
                <CardHeader>
                  <CardToolBar/>
                </CardHeader>
                <CardBody>
                  <div ref="calendarCardBody" className="card-body style-default-bright">
                    <div ref="calendarContainer" className="calendar-container"/>
                  </div>
                </CardBody>
              </Card>
            </GridCell>
          </GridRow>
        </Section>
      );
    }
  }
});