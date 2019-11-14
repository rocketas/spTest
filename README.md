# On-Site Drapery

A tweet-sized (280 characters max) summary of why the project exists.

# Getting started
### Running the Server

This server is created with Express.js

#### Installing:

1. Clone the repository `git clone`
2. Install dependencies `npm install`

#### Running express server:

1) run `npm run start` 

Messages should appear on the console with confirmations that your server is up and running.

### Running the React App

#### Installing: 
1. Navigate into client `cd onSiteDrpaery/client`
  
2. Install dependencies `npm install`

#### Warranty: 

Navigate to "http://localhost:3000" to view the React and Express application.

Last tested on a macOS Mojave system on November 13, 2019 by Elise Dixon.

# Testing

In order to run the test, install Jest. This is a testing framework that will execute .test.js files and yield the corresponding test results.
1) npm i jest superagent supertest
2) add the following script to package.json
    {"test: "jest"}
* if you want to watch jest to watch for changes, put {"test":"jest --watch"} instead.
3) run
    {npm run test}
* if you want to get a full test coverage report, put the following script in your package.json {"testCoverge": "jest --coverage"} and run {npm run testCoverage} in your terminal.

Jest can cover both unit and integration tests, simply putting them in separate files for structure will suffice.

Remember that in order for this to work, the test files have to be written according the jest api.

# Deployment

Where does the production system live? How would a new developer get access to it?
Are there any staging or pre-production environments that developers can use?
What are the various pieces that the fully deployed software uses? For example, with Heroku, what addons does the app use?
Is continuous integration or continuous deployment enabled? If so, where does it live?

# Technologies used
This application is built using a React frontend with a Node server and Express backend. The database is built using PostgresQL and it, as well as the rest of the application, is hosted using Heroku.

#### React
The React app is stored within the `/client` folder
#### Node.js and Express
This can be found within the `index.js` file
#### PostgresQL and Heroku
Heroku is used for hosting the web application and the PostgresQL database.

# Contributing

The only thing necessary to contribute is access to this Github repository. Please note that all Javascript is written using ES6. For more information about the project, see the project website: [COMP 523 R Team](http://comp523teamr.web.unc.edu/)

# Authors
Tian Liu - Front-end and Design Lead

Elise Dixon - Full-stack Developer

Arturo Schmidt - Project Manager, Back-end Lead

# License
### WTFPL

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE

Version 2, December 2004

Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

Everyone is permitted to copy and distribute verbatim or modified copies of this license document, and changing it is allowed as long as the name is changed.

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

0. You just DO WHAT THE FUCK YOU WANT TO.

# Acknowledgements

Is there anybody else you'd like to thank, or any resources that have been especially helpful?
