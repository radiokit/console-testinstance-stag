import React from 'react';
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';
import Auth from 'radiokit-toolkit-auth';

import TextInputWidget from '../widgets/admin/text_input_widget.jsx';
import ButtonWidget from '../widgets/admin/button_widget.jsx';
import CardWidget from '../widgets/admin/card_widget.jsx';

import '../assets/stylesheets/layouts/admin_layout.scss';
import '../../vendor/assets/stylesheets/materialadmin/materialadmin.css';
import '../../vendor/assets/stylesheets/materialadmin/material-design-iconic-font.css';

Counterpart.registerTranslations('en', require('./LoginLayout.locale.en.js'));
Counterpart.registerTranslations('pl', require('./LoginLayout.locale.pl.js'));

require('./LoginLayout.scss');

export default React.createClass({
  propTypes: {
    onAuthenticated: React.PropTypes.func.isRequired,
    env: React.PropTypes.object.isRequired,
  },


  getInitialState() {
    return {
      email: '',
      emailError: false,
      password: '',
      passwordError: false,
      loading: false,
      error: null,
    };
  },


  onFormSubmit(e) {
    e.preventDefault();

    const isEmailValid = this.state.email.trim() !== '';
    const isPasswordValid = this.state.password.trim() !== '';

    this.setState({
      emailError: !isEmailValid,
      passwordError: !isPasswordValid,
    });

    if(!isEmailValid || !isPasswordValid) {
      return;
    }


    this.setState({
      loading: true,
      emailError: false,
      passwordError: false,
    }, () => {
      let options = {};
      if(this.props.env.env !== 'prod') {
        options['baseUrl'] = 'https://jungle.radiokitapp-stag.org';
      }
      Auth.Session.User.authenticateAsync(this.state.email, this.state.password, options)
        .then((session) => {
          this.props.onAuthenticated(session);
        })
        .catch((reason) => {
          if(reason instanceof Auth.Error.UnauthorizedError) {
            this.setState({
              error: 'unauthorized',
              loading: false,
            });

          } else if(reason instanceof Auth.Error.NetworkError) {
            console.warn(reason);
            this.setState({
              error: 'network',
              loading: false,
            });

          } else {
            throw reason;
          }
        });
    });
  },

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="LoginLayout__logo">
            <img src={require('../assets/images/logo-horizontal.svg')}/>
          </div>

          {() => {
            if(this.state.error) {
              return (
                <Translate
                  content={`layout.login.error.${this.state.error}`}
                  component="div"
                  className="alert alert-callout alert-error"
                  role="alert" />);
            }
          }()}

          <CardWidget headerVisible={false} cardPadding>
            <form className="form" onSubmit={this.onFormSubmit} >
              <TextInputWidget disabled={this.state.loading} error={this.state.emailError} label labelTextKey="layout.login.form.email" type="email" name="email" onChange={(email) => this.setState({email})} />
              <TextInputWidget disabled={this.state.loading} error={this.state.passwordError} label labelTextKey="layout.login.form.password" type="password" name="password" onChange={(password) => this.setState({password})} />
              <Translate disabled={this.state.loading} component="input" type="submit" value={Counterpart.translate("layout.login.form.submit")} className="btn btn-primary" />
            </form>
          </CardWidget>
        </div>
      </div>
    );
  }
});
