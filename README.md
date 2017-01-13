# WDI_PROJECT_2

- Wireframes available at https://generalassembly.mybalsamiq.com/projects/wdi-ldn-24/Surfing%20spots

- A site showcasing 25 of the best surfing spots around the world pinpointed in a world map. Every pin showing info for local weather and the location itself. The site will have an authentication page for registering and login.
- I will keep client and server side functions in one app.

- I begin building the server side of my authentication app

- First of all I have created a new repository in Github and cloned it from my terminal into the Development folder.

run npm init

touch server.js

run atom .

touch gulpfile.js

- Install all packgages needed:

npm i express morgan cors body-parser mongoose bcrypt express-jwt validator jsonwebtoken request request-promise --save

npm i gulp browser-sync gulp-babel gulp-imagemin gulp-sass gulp-clean-css gulp-uglify gulp-nodemon babel-cli babel-preset-es2015 --save-dev

- Require installed packages in server.js and set up middleware

- Create a config folder and corresponding files to handle routes and connect app to the local port:

mkdir config

touch config/config.js

touch config/apiRoutes.js

touch config/webRoutes.js

export mongodb connection to the PORT in the file config.js

require the config file into the app.js file

run nodemon and test the app. At this point we should get the message 'Express has started on port: 3000' in our terminal.

- Require express package in our apiRoutes.js and webRoutes.js files

- Require apiRoutes and webRoutes in our express file

- Create a controllers folder and corresponding files to define functions to handle routes:

mkdir controllers

touch controllers/authentications.js && users.js && statics.js && surfs.js

- Create a models folder and corresponding files to create our database:

- Require mongoose, bcrypt and validator in our user model file and mongoose in our surf model file

- Create the two models for user and surf.

- In our user model we are defining functions to store a clear password and encrypt it(passwordHash) and validate authentication of correctly entered usernames and passwords.

- Define functions for the users and surfs controllers.

- Link users/controllers functions to apiRoutes

- define function for the statics controllers and link it up with the webRoutes file

- Define functions for the authenticationsRegister and authenticationLogin for authentications controllers. IN this file we need to require the user model, the config file and the jsonwebtoken package. this package will create jwt tokens that will encrypt our clear passwords

- Require authentications controllers into the apiRoutes file

touch index.html

- Require express-jwt package into our server.js file and set the middleware that will allows us to check for tokens

- Test app with Insomnia if authenticationLogin and authenticationsRegister are working.

- Create db folder and seeds.js folder. Created two entries and ran node db/seeds. tested it with Insomnia

- Create src folder with js and scss folder and their files

- Set up gulpfile

- Link html file to stylesheets and scripts

- Build a map objet in map.js to show the site's map in the html file

- defined initMap;

- As per documentation we are required to style the map via scss in order for it to show on the page.

Create a function to display a pin to mark our surfs and after that create a function which I will call surfInfo that will add and display some info about our location when the marker is clicked.

Got stuck in visualising the weather data I wanted in my info window and spent some time trying to get my head round it. Tried to use a proxy request to get the proper data but eventually had be helped by Alex.
