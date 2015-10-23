import React from 'react';
import Translate from 'react-translate-component';

import Grid from '../../widgets/admin/grid_widget.jsx';
import Card from '../../widgets/admin/card_widget.jsx';
import Alert from '../../widgets/admin/alert_widget.jsx';
import CardBody from '../../widgets/admin/card_body_widget.jsx';
import CardActionBar from '../../widgets/admin/card_actionbar_widget.jsx';
import Form from '../../widgets/admin/form_widget.jsx';
import TextInput from '../../widgets/admin/text_input_widget.jsx';
import SubmitButton from '../../widgets/admin/submit_button_widget.jsx';
import Section from '../../widgets/admin/section_widget.jsx';
import Loading from '../../widgets/general/loading_widget.jsx';

export default React.createClass({
  propTypes: {
    params: React.PropTypes.object.isRequired
  },

  
  getInitialState: function() {
    return { 
      step: "form", // Workflow is form -> pending -> (form|created)
      pairingKey: null,
      error: false
    }; 
  },


  onSubmit: function() {
    window.data
      .record("plumber", "Resource.Architecture.ClientNode")
      .on("loading", () => {
        if(this.isMounted()) {
          this.setState({ step: "pending" });
        }
      })
      .on("loaded", (eventName, model, recordId, record) => {
        if(this.isMounted()) {
          this.setState({ step: "created", pairingKey: record.get("pairing_key") });
        }
      })
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({ step: "form", error: true });
        }        
      })
      .create({
        "references" : {
          "joint.user_account" : "auth:User.Account#" + this.props.params.userAccountId
        },
        "destroy_in" : 900000 // 15 minutes
      })
  },

  
  renderError: function() {
    if(this.state.error) {
      return (
        <Alert type="error" infoTextKey="general.errors.communication.general" />
      );
    }    
  },


  render: function() {
    switch(this.state.step) {
      case "form": // TODO handle error
        return (
          <Section>
            <Grid size="medium">
              <Card header={true} headerTextKey="apps.joint.client_nodes.create.form.header">
                <Form onSubmit={this.onSubmit}>
                  <CardBody>
                    {this.renderError()}
                    <TextInput size="large" autofocus={true} label={true} labelTextKey="apps.joint.client_nodes.create.form.name.label" hint={true} hintTextKey="apps.joint.client_nodes.create.form.name.hint" />
                  </CardBody>

                  <CardActionBar>
                    <SubmitButton labelTextKey="apps.joint.client_nodes.create.form.submit" />
                  </CardActionBar>
                </Form>
              </Card>
            </Grid>
          </Section>
        );
        break;

      case "pending":
        return (
          <Section>
            <Grid size="medium">
              <Card header={true} headerTextKey="apps.joint.client_nodes.create.pending.header">
                <CardBody>
                  <Loading />
                </CardBody>
              </Card>
            </Grid>
          </Section>
        );
        break;

      case "created":
        return (
          <Section>
            <Grid size="medium">
              <Card header={true} headerTextKey="apps.joint.client_nodes.create.created.header">
                <CardBody>
                  <Translate component="p" className="lead text-center" content="apps.joint.client_nodes.create.created.instructions.header" />
                </CardBody>

                <CardBody>
                  <Translate component="p" className="lead text-center" content="apps.joint.client_nodes.create.created.instructions.code" />

                  <p className="text-xxxl text-center">{this.state.pairingKey}</p>                  
                </CardBody>

                <CardBody>
                  <Translate component="p" className="text-center" content="apps.joint.client_nodes.create.created.instructions.os" />

                  <div className="row style-accent">
                    <div className="col-md-6 text-center">
                      <Translate component="h2" content="apps.joint.client_nodes.create.created.instructions.android.header" />
                      <i className="mdi mdi-android text-xxxxl small-padding"/>
                      <Translate component="p" content="apps.joint.client_nodes.create.created.instructions.android.instructions" />
                      <div className="btn-group btn-group-justified small-padding" role="group">
                        <a className="btn btn-default-bright">
                          <Translate component="span" content="apps.joint.client_nodes.create.created.instructions.android.action_open" />
                        </a>
                      </div>
                    </div>

                    <div className="col-md-6 text-center">
                      <Translate component="h2" content="apps.joint.client_nodes.create.created.instructions.windows.header" />
                      <i className="mdi mdi-windows text-xxxxl small-padding"/>
                      <Translate component="p" content="apps.joint.client_nodes.create.created.instructions.windows.instructions" />
                      <div className="btn-group btn-group-justified small-padding" role="group">
                        <a className="btn btn-default-bright">
                          <Translate component="span" content="apps.joint.client_nodes.create.created.instructions.windows.action_open" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardBody>

              </Card>
            </Grid>
          </Section>
        );
        break;
    }

  }
});