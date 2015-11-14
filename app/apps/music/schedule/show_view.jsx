import React from 'react';
import Translate from 'react-translate-component';
import counterpart from 'counterpart';
import { Link } from 'react-router';
import moment from 'moment';
import momentTz from 'moment-timezone';

import LoadingWidget from '../../../widgets/general/loading_widget.jsx';
import AutoUpdateTextFieldWidget from '../../../widgets/admin/auto_update_text_field_widget.jsx';
import DeleteButtonWidget from '../../../widgets/admin/delete_button_widget.jsx'
import Section from '../../../widgets/admin/section_widget.jsx';
import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Alert from '../../../widgets/admin/alert_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import CardBody from '../../../widgets/admin/card_body_widget.jsx';
import CardHeader from '../../../widgets/admin/card_header_widget.jsx';
import CardToolBar from '../../../widgets/admin/card_tool_bar_widget.jsx';
import CardToolBarCreate from '../../../widgets/admin/card_tool_bar_create_widget.jsx';
import Loading from '../../../widgets/general/loading_widget.jsx';
import RoutingHelper from '../../../helpers/routing_helper.js';
import AccountHelper from '../../../helpers/account_helper.js';

export default React.createClass({

  itemQuery: null,

  getInitialState: function() {
    return {
      currentSchedulingItem: null,
      categories: [],
      loadingError: false,
      everythingLoaded: false,
      loadingError: false
    };
  },

  componentWillMount: function() {
    var days = []
    var days_translations = counterpart.translate("apps.music.calendar.days");
    for(var key in days_translations) {
      days.push(days_translations[key].toLowerCase());
    };
    this.days = days;
    this.callSchedulingItemQuery();
  },

  componentWillUnmount: function() {
    this.itemQuery.teardown();
  },

  componentDidMount: function() {

  },

  componentDidUpdate: function() {
    this.state.categories.forEach(function(category) {
      category.get("tag_items").forEach(function(item) {
        $("#slider-" + item.get("id")).slider({range: "min", value: 50, min: 0, max: 100});
      });
    });
    this.setSelect2();
    /*this.setSliders();*/
    this.setRegionColor();
    this.setDonutChart();
    this.setColorPicker();
  },

  callSchedulingItemQuery: function() {
    this.itemQuery = window.data
      .query('agenda', "Schedule.Weekly.Item")
      .select("id", "time_start", "time_stop", "name", "extra" ,"on_monday", "on_tuesday", "on_wednesday", "on_thursday", "on_friday", "on_saturday", "on_sunday")
      .where("id", "eq", this.props.params.schedulingItemId)
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          })
        }
      }).on("update", (_, query) => {
        if(this.isMounted()) {
          this.setState({
            currentSchedulingItem: query.getData().first(),
          });
        }
      })
      .fetch();
    window.data
      .query("vault", "Record.Repository")
      .select("id")
      .where("references", "deq", "user_account_id", AccountHelper.getCurrentAccountIdFromContext(this))
      .where("references", "deq", "role", "music")
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
              recordRepository: query.getData().first()
            });

            window.data
              .query("vault", "Tag.Category")
              .select("id", "name", "tag_items")
              .where("record_repository_id", "eq", query.getData().first().get("id"))
              .joins("tag_items")
              .on("error", () => {
                if(this.isMounted()) {
                    this.setState({
                      loadingError: true
                    })
                  }
              }).on("update", (_, query) => {
                if(this.isMounted()) {
                  this.setState({
                    categories: query.getData(),
                    everythingLoaded: true
                  })
                }
              }).fetch();
          } else {
            this.setState({
              loadingError: true
            })
          }
        }
      }).fetch();
  },

/*  onDataSchedulingRegionFetch: function(records) {
    this.Snapshot.map(function(item) {
      associatied_items =
        item.scheduling_music_shuffle_track_tags.concat(item.scheduling_music_shuffle_track_artists).concat(item.scheduling_music_shuffle_track_albums)
    });
    console.log(records);
    this.setState({ currentRegion: records[0], associatedItems: associatied_items });
    this.forceUpdate();
  }, */

  renderGeneralForm: function() {
    return (
      <div className="form">
        <form className="form">
          <AutoUpdateTextFieldWidget labelContent="apps.music.scheduling_region.forms.general.name"
                                     repo="agenda"
                                     model="Schedule.Weekly.Item"
                                     recordId={this.state.currentSchedulingItem.get("id")}
                                     attribute="name"
                                     fieldType="text"
                                     defaultValue={this.state.currentSchedulingItem.get("name")}
                                     helpBlockContent="optional" />
          <span className="color-picker" ref="color_picker">
            <AutoUpdateTextFieldWidget labelContent="apps.music.scheduling_region.forms.general.color"
                                       repo="agenda"
                                       model="Schedule.Weekly.Item"
                                       recordId={this.state.currentSchedulingItem.get("id")}
                                       attribute="color"
                                       fieldType="text"
                                       defaultValue={this.state.currentSchedulingItem.get("color")}
                                       helpBlockContent="optional" />
          </span>
        </form>
      </div>
    )
  },

  setSelect2: function() {
    var self = this;

    var select = $(this.refs.associations_select);
    if(select != undefined && select.data('select2') == undefined) {
      select.select2({ placeholder: counterpart.translate("apps.music.scheduling_region.select.associations.placeholder")})
      .on("select2-selecting", function(e) {
        self.createAssociation(e.choice);
      });
    };
  },

  createAssociation: function(choice) {
    var self = this;
    var type = $(choice.element[0]).data("type");
    var resourceName   = "Scheduling::Music::Shuffle::Track" + type + "RegionAssociation";
    var resourceIdAttr = "track_" + type.toLowerCase() + "_id";
    var create_attributes = {
      channel_scheduling_region_id: this.state.currentSchedulingItem.get("id"),
      weight: 1
    };

    create_attributes[resourceIdAttr] = choice.id;

    window.data.record('horn-gw', resourceName)
    .on("loaded", function(eventName, record){
      self.resetSelect();
    }).on("error", function(eventName, record){
      self.resetSelect();
    }).create(create_attributes);
  },

  resetSelect: function() {
    var select = $(this.refs.associations_select);
    $(select).select2("val", "");
  },

  setSliders: function() {
    var self = this;

    var sliders = $(this.refs.association_slider);
    $.each(sliders, function(index, slider_element) {
      if($(slider_element).attr("data-slide") == "false") {
        var weight = $(slider_element).attr("data-weight");

        $(slider_element).slider({
          animate: "fast",
          value: weight,
          min: 0,
          max: 100,
          start: function( event, ui ) {
            $(slider_element).attr("data-slide", "true")
          },
          stop: function( event, ui ) {
            $(slider_element).attr("data-weight", ui.value);
            self.updateAssociation(event, ui);
          }
        });
      }
    });
  },

  setRegionColor: function() {
    if(this.state.currentSchedulingItem != undefined) {
      var regionColor = this.state.currentSchedulingItem.get("color") || "#46bdb6";
    } else {
      var regionColor = "#46bdb6";
    };
    $('head').append('<style>.scheduling-region-card:before{background:' + regionColor + '!important;}</style>');
  },

  setDonutChart: function() {
    var self = this;

    var chart_element = $(this.refs.associations_chart);
    var chartData = this.prepareChartData();

    if(chartData.length > 0 && $(chart_element).length == 1 && $(chart_element).children().length == 0) {
      chart = Morris.Donut({
        element: 'associations-chart',
        data: chartData,
        formatter: function (y, data) { return y.toFixed(2) + "%" },
      });

      this.setState({ chart: chart });
    } else {
      if(this.state.chart) {
        var oldDataValues = this.state.chart.data.map(function(item){
          return item.value
        }).join(",");

        var newDataValues = chartData.map(function(item){
          return item.value
        }).join(",");

        if(newDataValues != oldDataValues) {
          this.state.chart.setData(chartData);
        };
      };
    };
  },

  prepareChartData: function() {
    var self = this;
    var associations = []
    var data = [];
    var total = 0;
    var weights = associations.map(function(a) {return a[1].weight} )

    $.each(weights ,function() {
      total += parseInt(this, 10);
    });

    associations.sort(function(a, b){
      var aWeight = a[1].weight;
      var bWeight = b[1].weight;
      return ((aWeight < bWeight) ? -1 : ((aWeight > bWeight) ? 1 : 0));
    })

    associations.map(function(item) {
      associated_item = item[0];
      association     = item[1];

      data.push({label: associated_item.name, value: (association.weight/total)*100, color: self.setColor(associated_item.type)})
    });

    return data;
  },

  setColor: function(item_type) {

    switch(item_type) {
      case "Tag":    var color = "#671f7d"; break;
      case "Album":  var color = "#2b98f0"; break;
      case "Artist": var color = "#50ae54"; break;
    };
    return color;
  },

  setAllDayCheckboxButton: function() {
    var time_start = moment.parseZone("2015-11-12T" + this.state.currentSchedulingItem.get("time_start") + "Z").format("HHmm");
    var time_stop  = moment.parseZone("2015-11-12T" + this.state.currentSchedulingItem.get("time_stop") + "Z").add(1, "s").format("HHmm");
    var active     = time_start == "0000" && time_stop == "0000" ? "active" : "";
    var className  = "all-day-checkbox-btn btn ink-reaction btn-primary " + active;
    var label      = counterpart.translate("apps.music.scheduling_region.forms.time_settings.all_day_checkbox_label");

    return (
      <label className={className} onClick={this.onAllDayCheckboxChanged}>
        <input type="checkbox">
          {label}
        </input>
      </label>
    );
  },

  onAllDayCheckboxChanged: function(event) {
    var target     = event.target;
    var time_start = moment.parseZone("2015-11-12T" + this.state.currentSchedulingItem.get("time_start") + "Z").format("HHmm");
    var time_stop  = moment.parseZone("2015-11-12T" + this.state.currentSchedulingItem.get("time_stop") + "Z").add(1, "s").format("HHmm");
    var update_attributes = {};

    if(time_start == "0000" && time_stop == "0000") {
      var update_attributes = {
        time_start: "00:00",
        time_stop: "23:59:58"
      };
    } else {
      var update_attributes = {
        time_start: "00:00",
        time_stop: "23:59:59"
      };
    };

    window.data.record('horn-gw', "ChannelSchedulingRegion", this.state.currentSchedulingItem.get("id"))
    .on("warning", function(eventName, record) {
      $(target).toggleClass("active");
    }).update(update_attributes);
  },

  prepareSortedDays: function() {
    var channel_days = [];

    var starting_day = "monday";
    channel_days = this.days.slice(this.days.indexOf(starting_day), this.days.length)
    var rest_of_days = this.days.slice(0, this.days.indexOf(starting_day))
    $.each(rest_of_days, function(postion, day) {
      channel_days.push(day)
    });

    return channel_days;
  },

  toggleDay: function(event) {
    var target            = event.target;
    var day_attribute     = "on_" + target.id;
    var update_attributes = {};

    update_attributes[day_attribute] = !this.state.currentSchedulingItem.get(day_attribute);
    window.data.record('agenda', "Schedule.Weekly.Item", this.state.currentSchedulingItem.get("id"))
    .on("warning", function(eventName, record) {
      $(target).toggleClass("active");
    }).update(update_attributes);
  },

  appendDayCheckboxes: function() {
    var self = this;
    var day_checkboxes = [];
    var sorted_days = this.prepareSortedDays();

    sorted_days.map(function(day) {
      var day_attribute = "on_" + day
      var active        = self.state.currentSchedulingItem.get(day_attribute) == true ? "active" : ""
      var className     = "day btn ink-reaction btn-primary " + active

      day_checkboxes.push(<label key={'SchedulingItem.Associations.Row.' + day} id={day} className={className} onClick={self.toggleDay}>
        <input type="checkbox">
          {day}
        </input>
      </label>)
    });

    return day_checkboxes;
  },

  renderTimeSettingsForm: function() {
    var time_start = moment.parseZone("2015-11-12T" + this.state.currentSchedulingItem.get("time_start") + "Z").format("HH:mm");
    var time_stop = moment.parseZone("2015-11-12T" + this.state.currentSchedulingItem.get("time_stop") + "Z").add(1, "s").format("HH:mm");

    return (
      <div className="form">
        <div className="col-sm-5">
          <AutoUpdateTextFieldWidget labelContent="apps.music.scheduling_region.forms.time_settings.time_start"
                                     repo="agenda"
                                     model="ChannelSchedulingRegion"
                                     recordId={this.state.currentSchedulingItem.get("id")}
                                     attribute="time_start"
                                     fieldType="text"
                                     defaultValue={time_start} />
        </div>
        <div className="col-sm-5">
          <AutoUpdateTextFieldWidget labelContent="apps.music.scheduling_region.forms.time_settings.time_stop"
                                     repo="agenda"
                                     model="ChannelSchedulingRegion"
                                     recordId={this.state.currentSchedulingItem.get("id")}
                                     attribute="time_stop"
                                     fieldType="text"
                                     defaultValue={time_stop} />
        </div>
        <div className="col-sm-2">
          <div className="btn-group" data-toggle="buttons">
            {this.setAllDayCheckboxButton()}
          </div>
        </div>

        <div className="col-sm-12">
          <div className="btn-group days" data-toggle="buttons">
            <div className="form-group" style={{padding: 0}}>
              <label style={{position: "relative", top: "10px"}}>
                <Translate content="apps.music.scheduling_region.forms.time_settings.days.label" />
              </label>
            </div>
            {this.appendDayCheckboxes()}
          </div>
        </div>
      </div>
    )
  },

  setColorPicker: function() {
    var self = this;
    var color_picker_span    = $(this.refs.color_picker);
    var color_picker_element = $(color_picker_span).children().find("input");
    $(color_picker_element).colorpicker().on('changeColor.colorpicker', function(event){
      self.setUpdateTimeout();
    });
  },

  setUpdateTimeout: function() {
    this.clearUpdateTimeout();
    this.updateObserverTimeout = setTimeout(this.updateRegionColor, 500);
  },

  clearUpdateTimeout: function() {
    if(this.updateObserverTimeout != null) {
      clearTimeout(this.updateObserverTimeout);
      this.updateObserverTimeout = null;
    }
  },

  updateRegionColor: function() {
    var color_picker_span    = $(this.refs.color_picker);
    var color_picker_element = $(color_picker_span).children().find("input");
    window.data.record('horn-gw', "ChannelSchedulingRegion", this.state.currentSchedulingItem.get("id"))
    .update({
      color: $(color_picker_element).val()
    });
  },

  findAssociation: function(item_id, item_type) {
    var collection   = "scheduling_music_shuffle_track_" + item_type.toLowerCase() + "_region_associations"
    var associations = this.state.currentSchedulingItem.get(collection)
    var association  = $.grep(associations, function(e){ return e["track_" + item_type.toLowerCase() + "_id"] == item_id; })[0];
    return association;
  },

  updateAssociation: function(event, ui) {
    var item_id      = $(event.target).data("item-id");
    var item_type    = $(event.target).data("item-type");
    var association  = this.findAssociation(item_id, item_type);
    var resourceName = "Scheduling::Music::Shuffle::Track" + item_type + "RegionAssociation"
    var update_attributes = {
      weight: ui.value
    };
    window.data.record('horn-gw', resourceName, association.id)
    .on("loaded", function(eventName, record) {
      $(event.target).attr("data-slide", "false");
    }).on("warning", function(eventName, record) {
      $(event.target).attr("data-slide", "false");
    }).update(update_attributes);
  },

  renderTypeBadge: function(association) {
    return(<span className="badge badge-primary" style={{background: this.setColor(association.type)}}>{association.type}</span>);
  },

  createOptGroup: function(type) {
    var associations    = "SchedulingRegionShowLayout_track" + type;
    // FIMXE: DB structure for this is to be changed
    // var optionsToSelect = this.createSelectOptions(this.props.dataInterface.getSnapshot()[associations], type);
    var optionsToSelect = [];
    var items = [];

    if(Object.keys(optionsToSelect).length > 0) {
      items.push(
      <optgroup key={'SchedulingRegionShowLayout.Associations.OptGroup' + type} label={type}>
        {optionsToSelect}
      </optgroup>)
    };

    return items;
  },

  createSelectOptions: function(options, type) {
    var select_options = [];
    var self = this;
    var alreadyAssociatedIds = this.state.currentSchedulingItem.get("scheduling_music_shuffle_track_" + type.toLowerCase()).map(function(association) {
      return association.i
    });

    options.map(function(item) {
      if(type == "Albums"){
        var item_name = item.name + " (" + item.track_artist_name + ")"
      } else {
        var item_name = item.name
      }

      if($.inArray(item.id, alreadyAssociatedIds) == -1){
        select_options.push(
        <option key={'SchedulingRegionShowLayout.AssociationsSelect.Option' + item.id} value={item.id} data-type={item.type}>
          {item_name}
        </option>)
      };
    });

    return select_options;
  },

  onRegionDeleted: function() {
    this.props.history.pushState(null, RoutingHelper.apps.music.schedule.index(this));
  },

  renderSliderForms: function() {
    if (this.state.categories.size > 0) {
      var forms = [];
      console.log("categories: ", this.state.categories);
      this.state.categories.forEach( (category)  =>
        forms.push(
          <div>
            <div className="col-sm-9">
              <div clasName="table-responsive">
                {this.renderSliderForm(category)}
              </div>
            </div>
          </div>)
      );
      return forms;
    } else {
      return (<div></div>);
    }
  },

  renderSliderForm: function(category) {
    var categoryName = category.get("name");
    return (
      <div>
        <div><b>Category: {categoryName}</b></div>
        <div className="form" style={{width: '100%'}}>
          <div className="form-group">
            {this.renderSliderRows(category.get("tag_items"))}
          </div>
        </div>
      </div>
    );
  },

  renderSliderRows: function(tag_items) {
    console.log("tag_items: ", tag_items);
    var rows = [];
    return tag_items.map((item) => {
      return (
        <div key={item.get("id")} className="input-group" style={{width: '100%', padding: '5px'}}>
          <div style={{width: '20%', display: 'inline-block'}}>{item.get("name")}</div>
          <div className="input-group-content form-control-static" style={{width: '75%', display: 'inline-block'}}>
            <div className="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" id={"slider-" + item.get("id")} key={'CategoryItem.Row.' + item.get("id")}>
              <div style={{width: '50%'}} className="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min"/>
              <span style={{left: '50%'}} className="ui-slider-handle ui-state-default ui-corner-all" tabIndex="0"></span>
            </div>
          </div>
          <br/>
        </div>)
    }
    );
  },

  getRegionName: function() {
    var item = this.state.currentSchedulingItem;

    if(item.get("name") && item.get("name") != "") {
      var itemName = item.get("name");
    } else {
      var timeStart   = moment.parseZone("2015-11-12T" + item.time_start + "Z").format("HH:mm");
      var timeStop    = moment.parseZone("2015-11-12T" + item.time_stop + "Z").add(1, "s").format("HH:mm");
      if(timeStart == "00:00" && timeStop == "00:00") {
        var timeStartTimeStop = "All day";
      } else {
        var timeStartTimeStop = timeStart + " - " + timeStop;
      };
      var sorted_days = this.prepareSortedDays();
      var activeDays  = [];
      sorted_days.map(function(day) {
        var day_attribute = "on_" + day
        if(item.get(day_attribute) == true) {
          activeDays.push(day);
        }
      });
      var itemName = timeStartTimeStop + " (" + activeDays.join(", ") + ")";
    };
    return itemName;
  },

  render: function() {
    if(this.state.loadingError) {
      return (<Alert type="error" fullscreen={true} infoTextKey="general.errors.communication.general" />);
    } else {
      if(this.state.everythingLoaded == false) {
        return (<Loading info={true} infoTextKey="apps.music.scheduling_region.loading"/>);
      } else {
        return (
          <Section>
            <GridRow>
              <GridCell size="medium" center={true}>
                <Card cardTabs={["general", "timesettings", "associations", "delete"]} contentPrefix="apps.music.scheduling_region">
                  <CardHeader headerText={this.state.currentSchedulingItem.get("name")}>
                    <CardToolBar>
                    </CardToolBar>
                  </CardHeader>
                  <CardBody>
                    <div> {this.renderGeneralForm()} </div>
                    <div> {this.renderTimeSettingsForm()} </div>
                    <div> {this.renderSliderForms()} </div>
                    <div> <DeleteButtonWidget repo="agenda"
                                              model="Schedule.Weekly.Item"
                                              recordId={this.state.currentSchedulingItem.get("id")}
                                              onSuccessFunction={this.onRegionDeleted} />
                    </div>
                  </CardBody>
                </Card>
              </GridCell>
            </GridRow>
          </Section>
        );
      }
    }
  }
});
