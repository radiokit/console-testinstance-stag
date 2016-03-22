import React from 'react';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';
import Translate from 'react-translate-component';


export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    selectedTag: React.PropTypes.string,
    onFilterUpdate: React.PropTypes.func.isRequired,
  },

  getInitialState: function () {

    return {
      categories: []
    };
  },

  componentDidMount: function () {
    this.queryTagCategories();
  },

  queryTagCategories: function () {

    window.data
      .query("vault", "Data.Tag.Category")
      .select("id", "name", "tag_items")
      .joins("tag_items")
      .where("record_repository_id", "eq", this.props.record.get("id"))
      .on("fetch", (_eventName, _record, data) => {

        if (this.isMounted()) {

          console.log(JSON.stringify(data));
          this.setState({
            categories: data,
            loaded: true,
          });
        }
      })
      .on("error", () => {

        if (this.isMounted()) {
          this.setState({
            loaded: true,
            error: true,
          });
        }
      })
      .fetch();

  //   window.data
  // .record("vault", "Vault.Data.Tag.Item")
  // .on("error", () => {
  //
  //   if(this.isMounted()) {
  //     this.setState({
  //       createError: true
  //     });
  //   }
  // })
  // .on("loaded", () => {
  //   if(this.isMounted()) {
  //     this.setState({
  //       createSuccess: true
  //     });
  //   }
  // })
  // .create({
  //   "tag_category": "5ca8cf4d-dac4-4708-b056-10b571b871b7",
  //   "name":"pies"
  // });
  },

  onTagCategorySelected: function (tag) {
    this.props.onTagFilterUpdate(tag);
  },

  onRestoreDefaults: function () {
    this.props.onTagFilterUpdate(null);
  },

  render: function () {

    let categories = this.state.categories;

    return (
      <div>
        <ul className="nav nav-pills nav-stacked">
          <li key={"all"} onClick={this.onRestoreDefaults} className="nav-item">
            <Translate component="a" content={this.props.contentPrefix + ".actions.tags.allTags"}/>
          </li>
          {
            categories.size > 0 && categories.toJS().map((tagCategory) => {
              let onCategoryLister = this.onTagCategorySelected;
              return (
                <li key={tagCategory.name} onClick={onCategoryLister} className="nav-item">
                  <a className="nav-link active" href="#">{tagCategory.name}</a>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
});
