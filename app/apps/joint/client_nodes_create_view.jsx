import React from 'react';
import Grid from '../../widgets/admin/grid_widget.jsx';
import Card from '../../widgets/admin/card_widget.jsx';
import CardBody from '../../widgets/admin/card_body_widget.jsx';
import CardActionBar from '../../widgets/admin/card_actionbar_widget.jsx';
import Form from '../../widgets/admin/form_widget.jsx';
import TextInput from '../../widgets/admin/text_input_widget.jsx';
import SubmitButton from '../../widgets/admin/submit_button_widget.jsx';
import Section from '../../widgets/admin/section_widget.jsx';

export default React.createClass({
  propTypes: {
    currentAccount: React.PropTypes.object.isRequired
  },


  onSubmit: function() {
    console.log(":)");
  },


  render: function() {
    return (
      <Section>
        <Grid size="medium">
          <Card header={true} headerTextKey="apps.joint.client_nodes.create.header">
            <Form onSubmit={this.onSubmit}>
              <CardBody>
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
  }
});