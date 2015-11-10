# RadioKit Console

User interface for controlling various RadioKit systems

# Running

## Development

### Auth

The app assumes that you have an instance of radiokit-auth running, refer to its docs to see how to launch it.

### Console

* Clone repo
* In case of Linux, type 'sudo apt-get install build-essential'
* Type `npm install`
* Start local webserver & bundler and whatever else is needed: `npm run dev`
* Open the site at http://localhost:8080
* Enjoy


## Staging

You must have an access to appropriate repository on github.

### Auth

The app assumes that you have an instance of radiokit-auth running under URL specified in `dist/stag/env.js`, refer to its docs to see how to launch it.

### Console

* Clone repo
* Type `npm install`
* Type `./release.sh stag`

## Production

You must have an access to appropriate repository on github.

### Auth

The app assumes that you have an instance of radiokit-auth running under URL specified in `dist/prod/env.js`, refer to its docs to see how to launch it.

### Console

* Clone repo
* Type `npm install`
* Type `./release.sh prod`

# Authors

Marcin Lewandowski, Łukasz Odziewa
