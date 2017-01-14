"use strict";var app=app||{},google=google;app.surfInfo=function(e,a){var t=this;google.maps.event.addListener(a,"click",function(){"undefined"!=typeof t.infoWindow&&t.infoWindow.close(),$.get("http://localhost:3000/api/weather/"+e.lat+"/"+e.lng).done(function(a){$(".modal-body").html('\n        <ul class="nav nav-tabs" role="tablist">\n          <li role="presentation" class="active">\n            <a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a>\n          </li>\n          <li role="presentation">\n            <a href="#weather" aria-controls="weather" role="tab" data-toggle="tab">Weather</a>\n          </li>\n          <li role="presentation">\n            <a href="#gallery" aria-controls="gallery" role="tab" data-toggle="tab">Gallery</a>\n          </li>\n          <li role="presentation">\n            <a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a>\n          </li>\n        </ul>\n\n        <!-- Tab panes -->\n        <div class="tab-content">\n          <div role="tabpanel" class="tab-pane active" id="home">\n            '+a.summary+'\n          </div>\n          <div role="tabpanel" class="tab-pane" id="weather">\n            <iframe src="https://embed.windytv.com/?'+e.lat+","+e.lng+',8,in:24,100m,temp,menu,marker,metric.wind.km/h" width="750" height="500" frameborder="0"></iframe>\n          </div>\n          <div role="tabpanel" class="tab-pane" id="gallery">\n          </div>\n          <div role="tabpanel" class="tab-pane" id="settings">\n          </div>\n        </div>'),$(".modal").modal("show")})})},app.marker=function(e){var a=new google.maps.LatLng(e.lat,e.lng),t=new google.maps.Marker({position:a,map:app.map});app.surfInfo(e,t)},app.loopSurfs=function(e){$.each(e.surfs,function(e,a){app.marker(a)})},app.getSurfs=function(){$.get("http://localhost:3000/api/surfs").done(this.loopSurfs)},app.initMap=function(){var e=document.getElementById("map"),a={center:new google.maps.LatLng(13.8302704,17.8480856),zoom:2,mapTypeId:google.maps.MapTypeId.ROADMAP,styles:[{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#444444"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#f2f2f2"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"all",stylers:[{color:"#46bcec"},{visibility:"on"}]}]};this.map=new google.maps.Map(e,a),this.getSurfs()},$(app.initMap.bind(app));