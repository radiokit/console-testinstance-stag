import React from 'react';
import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolbarButton from '../../../widgets/admin/toolbar_button_widget.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';
import AddCategoryModal from './add_category_modal.jsx';
import Loading from '../../../widgets/general/loading_widget.jsx';

export default React.createClass({

  propTypes: {
    app: React.PropTypes.string.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
  },

  getInitialState: function(){
    return {
      categories:[]
    }
  },
  componentDidMount: function(){
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
  },
  renderCategoryTags: function(category){

    if(this.state.loaded === false) {
      return <Loading />;
    } else {
      return(
        <div>
          <ul className="list">
            {console.log("category: " + category.name + " has " + category.tag_items.length + " tags")}
            {console.log(category.tag_items)}

            {category.tag_items.map((tag) =>{
              console.log("rendering tag");
              return (
                <li key={tag.id} className ="">
                  <div className="card-head card-head-sm">
                      <header>{tag.name}</header>
                    <div className="tools">
                      <a className="btn btn-flat ink-reaction btn-default">
                        <i className="mdi mdi-delete"/>
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>);
      }
    },

    render: function() {
      return (
        <div>
          <ToolbarGroup>
            <ToolbarButtonModal icon="plus" labelTextKey={this.props.contentPrefix+".actions.add_category"} modalElement={AddCategoryModal} modalProps={{contentPrefix: this.props.contentPrefix+".tagSchema"}}/>
          </ToolbarGroup>

          {this.state.categories.size > 0 && this.state.categories.toJS().map((category) =>{
            return (
              <div id={category.name}>
                <div className="expanded">
                  <div className="card-head" data-toggle="collapse" data-parent={"#"+category.name} data-target={"#"+ category.name+"-tagList"} aria-expanded="true">
                    <a className="btn btn-flat ink-reaction btn-icon-toggle">
                      <i className="mdi mdi-chevron-right fa fa-angle-down"/>
                    </a>
                    <header>{category.name}</header>
                    <div className="tools">
                      <a className="btn btn-icon"><i className="mdi mdi-delete"></i></a>
                    </div>
                  </div>
                  <div id={category.name+"-tagList"} className="collapse in" aria-expanded="true">
                    {this.renderCategoryTags(category)}
                  </div>
                </div>
              </div>
            )
          })}

        </div>
      );
    }
  });
