import React from 'react';
import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolbarButton from '../../../widgets/admin/toolbar_button_widget.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';
import DeleteItemModal from './delete_item_modal.jsx';

import Loading from '../../../widgets/general/loading_widget.jsx';
import CreateModal from '../../../widgets/admin/crud/create_modal.jsx';


const ShowTagsSchemaPartial = React.createClass({

  propTypes: {
    app: React.PropTypes.string.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
  },

  getInitialState: function(){
    return {
      categories:[]
    }
  },
  componentDidMount: function(){
    this.queryTagCategories();
    console.log("AAA");
    console.log(this.props.record);
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
  showDeleteModal: function(item){
    this.refs.deleteModal.show();
  },

  buildNewCategoryForm: function() {
    return {
      name: {
        type: "string",
        hint: true,
        validators: {
          presence: true,
        }
      },
      record_repository_id: {
        type: "hidden",
        value: this.props.record.get("id"),
      }
    }
  },

  buildNewTagForm: function(category) {
    return {
      name: {
        type: "string",
        hint: true,
        validators: {
          presence: true,
        }
      },
      tag_category_id: {
        type: "hidden",
        value: category.id,
      }
    }
  },


  renderCategoryTags: function(category){

    if(this.state.loaded === false) {
      return <Loading />;
    } else {
      return(
        <div>
          <ul className="list">
            {category.tag_items.map((tag) =>{
              return (
                <li key={tag.id} className ="">
                  <div className="card-head card-head-sm">
                    <header>{tag.name}</header>
                    <div className="tools">
                      <a className="btn btn-flat ink-reaction btn-default" onClick={this.showDeleteModal}>
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

    showNewTagModal: function(category){

      console.log("show sdsad");
      console.log(category);
      this.refs.newTagModal.form = this.buildNewCategoryForm(category);
      this.refs.newTagModal.show();
    },

    render: function() {
      return (
        <div className="ShowTagsSchemaPartial">

          <CreateModal ref="newTagModal" contentPrefix={this.props.contentPrefix + ".modals.create_tag"} app="vault" model="Data.Tag.Item" form={{}}/>

          <ToolbarGroup>
            <ToolbarButtonModal icon="plus" labelTextKey={this.props.contentPrefix+".actions.add_category"} modalElement={CreateModal} modalProps={{ contentPrefix: this.props.contentPrefix + ".modals.create_category", form: this.buildNewCategoryForm(),  app: "vault", model: "Data.Tag.Category"}}/>

          </ToolbarGroup>

          {this.state.categories.size > 0 && this.state.categories.toJS().map((category) =>{

            let handleNewTagClick = this.showNewTagModal.bind(this, category);
            return (
              <div id={category.name}>
                <div className="expanded">
                  <div className="card-head" data-toggle="collapse" data-parent={"#"+category.name} data-target={"#"+ category.name+"-tagList"} aria-expanded="true">
                    <a className="btn btn-flat ink-reaction btn-icon-toggle">
                      <i className="mdi mdi-chevron-right fa fa-angle-down"/>
                    </a>
                    <header>{category.name}</header>
                    <div className="tools">
                      <a className="btn btn-icon" onClick={handleNewTagClick}>
                        <i className="mdi mdi-library-plus"></i></a>
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

  export default ShowTagsSchemaPartial;
