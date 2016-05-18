import React from 'react';

const FormInput = React.createClass({

  propTypes: {
    className: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool,
    value: React.PropTypes.string,
    disabled: React.PropTypes.bool,
  },

  getInitialState() {
    return {
      value: this.props.value,
    };
  },

  componentWillReceiveProps() {
    this.value = this.props.value;
    this.setState({
      value: this.props.value,
    });
  },


  onFieldChange(e) {
    this.value = e.target.value;
    this.setState({
      value: e.target.value,
    });
  },

  render() {
    return (
      <input
        {...this.props}
        value={ this.state.value || '' }
        onChange={ this.onFieldChange }
      />
    );
  },
});

export default FormInput;
