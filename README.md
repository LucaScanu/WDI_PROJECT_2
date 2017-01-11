# WDI_PROJECT_2

Wireframes available at https://generalassembly.mybalsamiq.com/projects/wdi-ldn-24/Surfing%20spots

A site showcasing 25 of the best surfing spots around the world pinpointed in a world map. Every pin showing info for local weather and the location itself. The site will have an authentication page for registering and login.
I will keep client and server side functions in one app.

I begin building the server side of my authentication app

First of all I have created a new repository in Github and cloned it from my terminal into the Development folder.

run npm init

touch server.js

run atom .

touch gulpfile.js

Install all packgages needed:

npm i express morgan cors body-parser mongoose bcrypt express-jwt validator jsonwebtoken request request-promise --save

npm i gulp browser-sync gulp-babel gulp-imagemin gulp-sass gulp-clean-css gulp-uglify gulp-nodemon babel-cli babel-preset-es2015 --save-dev

run nodemon

set up express application
and installed packages

touch index.html

mkdir config

touch config/config.js

touch config/apiRoutes.js

touch config/webRoutes.js

export mongodb connection to the PORT inside the file config.js

require the config file into the app.js file

require express and router into the apiRoutes and webRoutes file export router module

set up to use the middleware into app.js file (morgan, body-parser, cors)

mkdir controllers

touch controllers/authentications.js && users.js && statics.js

mkdir models

touch models/user.js

require mongoose, validator and bcrypt in user.js

create a model for the user with a required and unique username, email and a required password.

export the mongoose model
connect mongoose in our app.js (mongoose.connect)

The model is set up to hash the password with some basic validation.

userSchema .virtual and .set for password and passwordConfirmation and .path, .validate for passwordHash

define validation functions in the user model

we also set up a black listing function to avoid showing undesired info in the json file. we could instead use a white listing function to show the info we want to see, like so // userSchema.set('toJSON', { // transform: function(doc, ret) { // const returnJSON = { // id: ret.id, // username: ret.username // }; // return returnJSON; // } // });

link up authentications controller to the user model and define function for the registration method and login method returning an encrypted token for each registration and login

link up the apiRoutes to the authentications controllers and to the users controllers
link up the webRoutes to the statics controllers

require webRoutes and apiRoutes in app.js and set them up

set expressJWT and omit urls for 'api/register and api/login'

set up jwtErrorHandler

define functions for the users/controllers

Test the app with insomnia

mkdir public && mkdir public/css && mkdir public/js

touch public/css/style.css

touch public/js/app.js

mkdir src && mkdir src/scss && mkdir src/js

touch src/scss/style.scss && touch src/js/app.js

Set up gulpfile and required all packages installed in dev mode

run gulp and test connection is ok

Client side app:

we build our site with object oriented jQuery in our src/js/app.js

Link index.html to bootstrap and our stylesheet.css

Link index.html to js script for bootstrap, jQuery library and our app.js

start building navigational bar from a bootstrap component

Build function App.init

on App.init we set up an event listener to the register link once we add a class '.register' to the a tag and we pass it a callback function that we call App.register

with the function App.register we add a registration form every time we click on the register link.

Once the form is created we need to add another event listener to listen to the submission of the form

Once we get a token on submitting the form we want to store the token on localStorage so we can access it

define function setToken to store token on local storage

Now that we have a token we can access our users index data and we can define the function to access this data.

To use our stored token we also need a getToken function
We can now access the users data and we can show it in our page

drying up some code.
We can name the setRequestHeader function and pass it into our usersIndex function

We can also group the ajax requests we are using in our handleForm and usersIndex functions into one function and pass it over to our handleForm and usersIndex functions

Similarly to the register function we set up the login function adding one login form to our html via jquery

define two functions (loggedInState and loggedOutState) to determine whether we are loggedIn or loggedOut.
Via these two functions we can also manipulate our DOM to show different links whether we logged in or out.

Define logout function

define removeToken function

finalised front end app
