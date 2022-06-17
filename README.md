# Introduction

This code has been forked from tslaats/SEA2021 and has been adapted into a teaching tool to create and solve exercises, which are based on the Javascript DCR Graphs modelling and simulation tool.

# How to run

## Production

To run the minified production build of the project do the following

1. Download and install node.js from https://nodejs.org (if you don't already have it)

2. Unzip the provided build.zip file

3. In a bash or command prompt navigate to the build directory

4. Run `npx serve -s` to start a static webserver in the directory

5. In a browser navigate to localhost:3000

## For development

If you already have npm installed, you can run the source code as follows in bash or the command prompt from the root folder (where you have put your copy of the code):

$ npm start

This will automatically start a browser on localhost:3000.

If you don�t have npm already, you will need to do the following steps before doing �npm start� the first time:

1. Download and install node.js from https://nodejs.org

2. Delete the package-lock.json file in the cloned source code, then install npm as follows in bash or command prompt from the root folder:

$ npm install

3. Load jquery and modal modules, if necessary, as follows in bash or command prompt from the root folder:

$ npm i jquery �save

$ npm i react-dynamic-modal �save

