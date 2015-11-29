import React from 'react';
import Immutable from 'immutable';


export default React.createClass({
  propTypes: {
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    select: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    autoFetch: React.PropTypes.bool,
  },


  contextTypes: {
    data: React.PropTypes.object.isRequired,
  },


  getDefaultProps: function() {
    return {
      autoFetch: false,
    }
  },


  getInitialState: function() {
    return {
      loaded: false,
      error: false,
      records: new Immutable.Seq().toIndexedSeq(),
    }
  },


  componentDidMount: function() {
    this.query = this.context.data
      .query(this.props.app, this.props.model)
      .select.apply(this, this.props.select)
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loaded: true,
            error: true,
          })
        }
      }).on("fetch", (_event, _query, data) => {
        if(this.isMounted()) {
          this.setState({
            loaded: true,
            records: data,
          });
        }
      });


    if(this.props.autoFetch) {
      this.query.enableAutoFetch();
    } else {
      this.query.fetch();
    }
  },


  componentWillUnmount: function() {
    if(this.query) {
      this.query.teardown();
    }
  },


  render: function() {
    if(this.state.loaded === false) {
      return (
        <div>
          LOADING
        </div>
      );

    } else {
      if(this.state.error === true) {
        <div>
          ERROR
        </div>

      } else {
        if(this.props.children) {
          let newProps = {};
          Object.keys(this.props).forEach((prop) => {
            newProps[prop] = this.props[prop];
          });
          newProps.records = this.state.records;

          return (
            <div>
              {React.cloneElement(this.props.children, newProps)}
            </div>
          );

        } else {
          return <div/>;
        }
      }
    }
  }
});
