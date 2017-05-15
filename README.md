# MUSIC SEARCH #
#### - Powered by Spotify ####

## META ##
Simple Angular 1.0 based application which uses spotify API to get the
artists and albums and shows a basic details about them.

## Setting Up App

The app uses npm HTTP-SERVER package to create a local server at port 4040
to make the app up and running type.

  ```
  $ npm start
  ```

This will start intiate the npm and install all node package as well as bower package dependencies.

The Process will do the following -

+   Install all NPM dependencies in main folder
+   Install all bower dependencies in docs folder
+   Start Gulp file and minify all resources and put them inside dist folder (JS, Fonts and CSS file)
+   And start the app @ http://localhost:4040. with source from docs folder

Using HTTP SERVER is optional

if you want to do it all manual then

  ```
  $ npm install
  $ bower install
  $ gulp build
  ```

For Developing the app use gulp watch task which will watch the and update the dist folder automatically

  ```
  $ gulp watch
  ```
