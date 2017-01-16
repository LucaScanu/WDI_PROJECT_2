"use strict";var App=App||{},google=google;App.init=function(){this.apiUrl="http://localhost:3000/api",this.$main=$("main"),this.initMap(),$(".register").on("click",this.register.bind(this)),$(".login").on("click",this.login.bind(this)),$(".members").on("click",this.membersIndex.bind(this)),$("main").on("submit","form",this.handleForm)},App.loggedIn=function(){$(".loggedIn").show(),$(".loggedOut").hide()},App.loggedOut=function(){$(".loggedIn").hide(),$(".loggedOut").show()},App.register=function(n){n&&n.preventDefault(),this.$main.html('\n    <h2>Register</h2>\n  <form method="post" action="/register">\n    <div class="form-group">\n      <input class="form-control" type="text" name="user[username]" placeholder="Username">\n    </div>\n    <div class="form-group">\n      <input class="form-control" type="email" name="user[email]" placeholder="Email">\n    </div>\n    <div class="form-group">\n      <input class="form-control" type="password" name="user[password]" placeholder="Password">\n    </div>\n    <div class="form-group">\n      <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">\n    </div>\n    <input class="btn btn-primary" type="submit" value="Register">\n  </form>')},App.login=function(n){n&&n.preventDefault(),this.$main.html('\n    <h2>Login</h2>\n    <form method="post" action="/login">\n      <div class="form-group">\n        <input class="form-control" type="email" name="email" placeholder="Email">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="password" name="password" placeholder="Password">\n      </div>\n      <input class="btn btn-primary" type="submit" value="Login">\n    </form>\n  ')},App.membersIndex=function(n){var e=this;n&&n.preventDefault();var t=this.apiUrl+"/users";return this.ajaxRequest(t,"get",null,function(n){e.$main.html('\n      <div class="card-deck-wrapper">\n        <div class="card-deck">\n        </div>\n      </div>\n    ');var t=e.$main.find(".card-deck");$.each(n.users,function(n,e){t.append('\n        <div class="card col-md-4">\n         <img class="card-img-top" src="#" alt="Card image cap">\n         <div class="card-block">\n           <h4 class="card-title">'+e.username+'</h4>\n           <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>\n           <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>\n         </div>\n       </div>')}).fail(function(n){console.log(n)})})},App.handleForm=function(n){n&&n.preventDefault();var e=""+App.apiUrl+$(this).attr("action");$(this).attr("method"),$(this).serialize();return this.ajaxRequest(e,"get",null,function(n){n.token&&App.setToken(n.token)})},App.ajaxRequest=function(n,e,t,i){return $.ajax({url:n,method:e,data:t,beforeSend:this.setRequestHeader.bind(this)}).done(i).fail(function(n){console.log(n)})},App.setRequestHeader=function(n){return n.setRequestHeader("Authorization","Bearer "+App.getToken())},App.setToken=function(n){return window.localStorage.setItem("token",n)},App.getToken=function(){return window.localStorage.getItem("token")},$(App.init.bind(App));