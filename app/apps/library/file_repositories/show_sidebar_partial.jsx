import React from 'react';

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

  onTagSelected: function(tag){
    this.props.onFilterUpdate(tag);
    console.log("clicked " + tag);
  },
  onRestoreDefaults: function(){
    this.props.onFilterUpdate("*");
  },

  render: function() {

    return (
      <div>
        <ul className="nav nav-pills nav-stacked">
          <li key={"all"} onClick={this.onRestoreDefaults} className="nav-item">
            <a href="#">
              ALL
            </a>
          </li>
          {
            this.props.tags.map((tag) => {

              let onTagClickedLister = this.onTagSelected.bind(this, tag);
              return (
                <li key={tag} onClick={onTagClickedLister} className="nav-item">
                  <a className="nav-link active" href="#">{tag}</a>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
});
