(this.webpackJsonpcookingsousviv=this.webpackJsonpcookingsousviv||[]).push([[0],{19:function(e,t,a){e.exports=a(48)},46:function(e,t,a){e.exports=a.p+"static/media/heart.5365673f.png"},47:function(e,t,a){},48:function(e,t,a){"use strict";a.r(t);var o=a(0),n=a.n(o),s=a(13),l=a.n(s),i=a(14),c=a(15),r=a(2),d=a(18),h=a(17),m=a(16),u=a.n(m),p=(a(40),function(e){Object(d.a)(o,e);var t=Object(h.a)(o);function o(e){var a;return Object(i.a)(this,o),(a=t.call(this,e)).state={all_photos:[],displayed_photos:[],additional_photos:!0,num_photos_displayed:32},a.server_url="https://cookingsousviv-backend.herokuapp.com",a.getPhotos(),a.getPhotos=a.getPhotos.bind(Object(r.a)(a)),a.handleShowMore=a.handleShowMore.bind(Object(r.a)(a)),a}return Object(c.a)(o,[{key:"componentDidMount",value:function(){window.addEventListener("scroll",this.handleShowMore)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("scroll",this.handleShowMore)}},{key:"getPhotos",value:function(){var e=this;u.a.get("".concat(this.server_url,"/instaPhotos")).then((function(t){e.setState({all_photos:t.data,displayed_photos:Object.values(t.data).slice(0,e.state.num_photos_displayed),num_photos_displayed:e.state.num_photos_displayed+o.number_of_new_photos_to_display}),e.checkForAdditionalPhotos()})).catch((function(e){console.log(e)}))}},{key:"checkForAdditionalPhotos",value:function(){this.state.num_photos_displayed<this.state.all_photos.length?this.setState({additional_photos:!0}):this.setState({additional_photos:!1})}},{key:"handleShowMore",value:function(){window.innerHeight+document.documentElement.scrollTop+1>=document.scrollingElement.scrollHeight&&(this.setState({displayed_photos:Object.values(this.state.all_photos).slice(0,this.state.num_photos_displayed),num_photos_displayed:this.state.num_photos_displayed+o.number_of_new_photos_to_display}),this.checkForAdditionalPhotos())}},{key:"render",value:function(){return n.a.createElement("div",{id:"instafeed"},this.state.displayed_photos.map((function(e,t){return n.a.createElement("div",{className:"col-xs-12 col-sm-6 col-md-4 col-lg-3",key:e.timestamp},n.a.createElement("a",{href:e.permalink},n.a.createElement("div",{className:"photo-box"},n.a.createElement("div",{className:"image-wrap"},n.a.createElement("img",{src:"VIDEO"===e.media_type?e.thumbnail_url:e.media_url,alt:e.caption})),n.a.createElement("div",{className:"likes"},n.a.createElement("img",{src:a(46),alt:"heart"})))))})))}}]),o}(n.a.Component));p.number_of_new_photos_to_display=32;var _=p;var v=function(){return n.a.createElement("div",{id:"homepage"},n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-xs-12"},n.a.createElement("div",{className:"instagram-content"},n.a.createElement("h3",null,"Latest Creations"),n.a.createElement("div",{className:"row photos-wrap"},n.a.createElement(_,null)))))))};a(47);var E=function(){return n.a.createElement("div",null,n.a.createElement(v,null))};l.a.render(n.a.createElement(E,null),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.6d4ed681.chunk.js.map