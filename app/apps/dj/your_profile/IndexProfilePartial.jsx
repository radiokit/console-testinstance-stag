
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
      aboutMetadataId: null,
      facebookMetadataId: null,
      twitterkMetadataId: null,


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
        let aboutMetadataId;
        let facebookMetadataId;
        let twitterMetadataId;

        let aboutFound = data.find((item) => item.get("metadata_schema").get("key") === "about");
        if(aboutFound) {
          about = aboutFound.get("value_text");
          aboutMetadataId = aboutFound.get("id");
        }

        let facebookFound = data.find((item) => item.get("metadata_schema").get("key") === "facebook_url");
        if(facebookFound) {
          facebook = facebookFound.get("value_url");
          facebookMetadataId = facebookFound.get("id");
        }

        let twitterFound = data.find((item) => item.get("metadata_schema").get("key") === "twitter_url");
        if(twitterFound) {
          twitter = twitterFound.get("value_url");
          twitterMetadataId = twitterFound.get("id");
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
          aboutMetadataId: aboutMetadataId,
          facebookMetadataId: facebookMetadataId,
          twitterMetadataId: twitterMetadataId,
          // cover: cover,
        });
    })
    .fetch();
  },

  buildForm() {
    return {
      about: {
        type: 'string',
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
      //   value: this.state.cover,
      // }
    };
  },

  onFormSubmit(data) {
    const about = data.about;
    const facebook = data.facebook;
    const twitter = data.twitter;
    RadioKit
    .record('vault', 'Data.Metadata.Item', this.state.aboutMetadataId)
    .update({value_url: about});


    RadioKit
      .record('vault', 'Data.Metadata.Item', this.state.facebookMetadataId)
      .update({value_url: facebook});


    RadioKit
    .record('vault', 'Data.Metadata.Item', this.state.twitterMetadataId)
    .update({value_url: twitter});

  },





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
