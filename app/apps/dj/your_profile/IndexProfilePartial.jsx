
import React from 'react';
import Counterpart from 'counterpart';

import RadioKit from '../../../services/RadioKit.js';

import Form from '../../../widgets/admin/form_widget.jsx';
import Button from '../../../widgets/admin/button_widget.jsx';


Counterpart.registerTranslations('en', require('./IndexProfilePartial.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexProfilePartial.locale.pl.js'));


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
  },

  contextTypes: {
    currentTagItemId: React.PropTypes.string.isRequired,
  },


  getInitialState() {
    return {
      loaded: false,
      error: false,
      about: null,
      facebook: null,
      twitter: null,
      cover: null,

    };
  },


  componentDidMount() {
    RadioKit
      .query('vault', 'Data.Metadata.Item')
      .select('id', 'value_string', 'value_image', 'value_text', 'value_url', 'metadata_schema.key')
      .joins('metadata_schema')
      .where('tag_item_id', 'eq', this.context.currentTagItemId)
      .on('fetch', (_a, _b, data) => {
        let about;
        let facebook;
        let twitter;
        let cover;

        let aboutFound = data.find((item) => item.get("metadata_schema").get("key") === "about");
        if(aboutFound) {
          about = aboutFound.get("value_text");
        }

        let facebookFound = data.find((item) => item.get("metadata_schema").get("key") === "facebook_url");
        if(facebookFound) {
          facebook = facebookFound.get("value_url");
        }

        let twitterFound = data.find((item) => item.get("metadata_schema").get("key") === "twitter_url");
        if(twitterFound) {
          twitter = twitterFound.get("value_url");
        }

        // let coverFound = data.find((item) => item.get("metadata_schema").get("key") === "cover");
        // if(coverFound) {
        //   cover = coverFound.get("value_image");
        // }

        // ...

        this.setState({
          loaded: true,
          about: about,
          facebook: facebook,
          twitter: twitter,
          // cover: cover,
        });
    })
    .fetch();
  },

  buildForm() {
    return {
      about: {
        type: 'text',
        validators: {
          presence: true,
        },
        value: this.state.about,
      },
      facebook: {
        type: 'string',
        validators: {
          presence: false,
        },
        value: this.state.facebook,
      },
      twitter: {
        type: 'string',
        validators: {
          presence: false,
        },
        value: this.state.twitter,
      },
      // cover: {
      //   type: 'string',
      //   validators: {
      //     presence: true,
      //   },
      //   value: ["zassane z tagitem"],
      // }
    };
  },


  // onFormSubmit(values) {
  //   window.location.href = `${this.context.apps.vault.baseUrl}/api/royalties/v1.0/report/fetch?channel_id=${encodeURIComponent(this.context.currentBroadcastChannel.get('id'))}&template=${encodeURIComponent(values.template)}&month=${encodeURIComponent(values.month)}&year=${encodeURIComponent(values.year)}`;
  // },




  render() {
    if(this.state.error) {
      return (<div>DUPA</div>); //FIXME
    }

    if(this.state.loaded === false) {
      return (<div>LOŁDING</div>); //FIXME
    }

    return (
      <div>
        <Form ref="form" form={this.buildForm()} contentPrefix={`${this.props.contentPrefix}.form`} onSubmit={this.onFormSubmit} />
        // <Button onClick={() => this.refs.form.submit()} label={Counterpart.translate(`${this.props.contentPrefix}.submit`)} />
      </div>
    );
  }
});
