# RadioKit Console

User interface for controlling various RadioKit systems

# Branch management

Console is being developed with Git Flow approach. You can read about it more on [nvie.com](http://nvie.com/posts/a-successful-git-branching-model/)

To allow JIRA to track repository changes - it is encouraged to name feature branches or single commits with a name of JIRA task.

`Master` branch always contains production-ready version, `develop` is for staging environment.

# Running

## Development

### Auth

The app assumes that you have an instance of radiokit-auth running, refer to its docs to see how to launch it.

### Console

* Clone repo
* In case of Linux, type `sudo apt-get install build-essential`
* Make sure you have `node` installed
* Run `npm start` to install all dependencies, start local webserver & bundler and whatever else is needed
* Open the site at http://localhost:8080


## Staging

You must have an access to appropriate repository on github.

### Auth

The app assumes that you have an instance of radiokit-auth running under URL specified in `dist/stag/env.js`, refer to its docs to see how to launch it.

### Console

* Clone repo
* In case of Linux, type `sudo apt-get install build-essential`
* Make sure you have `node` installed
* Type `npm install`
* Type `./release.sh stag`

## Production

You must have an access to appropriate repository on github.

### Auth

The app assumes that you have an instance of radiokit-auth running under URL specified in `dist/prod/env.js`, refer to its docs to see how to launch it.

### Console

* Clone repo
* In case of Linux, type `sudo apt-get install build-essential`
* Make sure you have `node` installed
* Type `npm install`
* Type `./release.sh prod`

# Authors

Marcin Lewandowski, Łukasz Odziewa
