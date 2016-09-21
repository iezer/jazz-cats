"use strict";define("cats-client/adapters/application",["exports","ember-data/adapters/json-api","cats-client/config/environment"],function(e,t,n){e.default=t.default.extend({host:n.default.APP.API_URL,namespace:"api"})}),define("cats-client/app",["exports","ember","ember-application","cats-client/resolver","ember-load-initializers","cats-client/config/environment"],function(e,t,n,l,a,r){var s=void 0;t.default.MODEL_FACTORY_INJECTIONS=!0,s=n.default.extend({modulePrefix:r.default.modulePrefix,podModulePrefix:r.default.podModulePrefix,Resolver:l.default}),(0,a.default)(s,r.default.modulePrefix),e.default=s}),define("cats-client/components/app-version",["exports","ember-cli-app-version/components/app-version","cats-client/config/environment"],function(e,t,n){var l=n.default.APP.name,a=n.default.APP.version;e.default=t.default.extend({version:a,name:l})}),define("cats-client/components/artist-info",["exports","ember-component","ember-computed","ember-array/utils","moment"],function(e,t,n,l,a){e.default=t.default.extend({classNames:["artist-info"],month:null,hasMonth:(0,n.default)("month",function(){return null!==this.get("month")}),monthString:(0,n.default)("month",function(){var e=this.get("month");return e?(0,a.default)().month(this.get("month")).format("MMMM"):null}),eventsForMonth:(0,n.default)("artist.events.[]","month",function(){var e=this.get("month");return null===e?null:this.get("artist.events").filter(function(t){return t.get("startTime").getMonth()===e})}),bandMatesForMonth:(0,n.default)("eventsForMonth.[]","artist",function(){var e=this.get("eventsForMonth"),t=this.get("artist"),n=(0,l.A)();return e.forEach(function(e){n.pushObjects(e.get("artists").toArray())}),n=n.uniq().removeObject(t)})})}),define("cats-client/components/event-info",["exports","ember-component"],function(e,t){e.default=t.default.extend({classNames:["event-info"]})}),define("cats-client/components/force-graph",["exports","ember-component","d3"],function(e,t,n){e.default=t.default.extend({classNames:["force-graph"],graph:null,selectedArtist:null,didRender:function(){function e(){d.attr("x1",function(e){return e.source.x}).attr("y1",function(e){return e.source.y}).attr("x2",function(e){return e.target.x}).attr("y2",function(e){return e.target.y}),f.attr("transform",function(e){return e.x=Math.max(m,Math.min(s-m,e.x)),e.y=Math.max(m,Math.min(i-m,e.y)),"translate("+e.x+","+e.y+")"})}function t(e){n.default.event.active||u.alphaTarget(.3).restart(),e.fx=e.x,e.fy=e.y}function l(e){e.fx=n.default.event.x,e.fy=n.default.event.y}function a(){n.default.event.active||u.alphaTarget(0)}var r=n.default.select("svg"),s=+r.attr("width"),i=+r.attr("height"),o=this.get("selectedArtist")?-40:-13,u=n.default.forceSimulation().force("link",n.default.forceLink().id(function(e){return e.id})).force("charge",n.default.forceManyBody().strength(function(){return o})).force("center",n.default.forceCenter(s/2,i/2)).velocityDecay(.5);window.simulation=u;var c=this.get("graph"),d=n.default.select("svg g.force-graph__links").selectAll("line").data(c.links),f=n.default.select("svg g.force-graph__nodes").selectAll("g.node").data(c.nodes).call(n.default.drag().on("start",t).on("drag",l).on("end",a));u.nodes(c.nodes).on("tick",e).on("end",function(){u.nodes().forEach(function(e){e.fx=e.x,e.fy=e.y})}),u.force("link").links(c.links);var m=5}})}),define("cats-client/components/stats-column",["exports","ember-component","ember-computed"],function(e,t,n){e.default=t.default.extend({classNames:["stats__column"],sortKey:(0,n.default)("key",function(){var e=this.get("key");return[e+".length:desc"]}),sortedArtists:n.default.sort("artists","sortKey")})}),define("cats-client/controllers/index",["exports","ember-controller","ember-computed","cats-client/utils/create-graph","ember-array/utils","ember-service/inject"],function(e,t,n,l,a,r){e.default=t.default.extend({store:(0,r.default)(),selectedArtist:(0,n.default)("artist",{get:function(){var e=this.get("artist");return e?this.get("store").peekRecord("artist",e):null},set:function(e,t){return this.set("artist",t&&t.get("id")),t}}),sortDef:["startTime:desc"],sortedEvents:n.default.sort("events","sortDef"),includeBandmates:!0,month:null,artist:null,queryParams:["month","includeBandmates","artist"],monthInt:(0,n.default)("month",function(){var e=this.get("month");return null!==e?parseInt(e,10)-1:null}),events:(0,n.default)("monthInt","selectedArtist","includeBandmates",function(){var e=this,t=this.get("monthInt"),n=void 0,l=this.get("selectedArtist");if(l){var r=function(){n=(0,a.A)();var r=function(e){n.pushObjects(e.get("events").filter(function(e){return null===t||e.get("startTime").getMonth()===t}))};return r(l),e.get("includeBandmates")&&!function(){var e=(0,a.A)();n.forEach(function(t){e.pushObjects(t.get("artists").toArray())}),e=e.uniq().removeObject(l),e.forEach(function(e){return r(e)})}(),{v:n.uniq()}}();if("object"==typeof r)return r.v}return null!==t?this.get("model").filter(function(e){return e.get("startTime").getMonth()===t}):this.get("model")}),graph:(0,n.default)("events.[]",function(){var e=this.get("events");return(0,l.default)(e)})})}),define("cats-client/helpers/and",["exports","ember","ember-truth-helpers/helpers/and"],function(e,t,n){var l=null;t.default.Helper?l=t.default.Helper.helper(n.andHelper):t.default.HTMLBars.makeBoundHelper&&(l=t.default.HTMLBars.makeBoundHelper(n.andHelper)),e.default=l}),define("cats-client/helpers/d3-color",["exports","ember-helper","ember-service/inject","d3"],function(e,t,n,l){var a=function(){function e(e,t){var n=[],l=!0,a=!1,r=void 0;try{for(var s,i=e[Symbol.iterator]();!(l=(s=i.next()).done)&&(n.push(s.value),!t||n.length!==t);l=!0);}catch(e){a=!0,r=e}finally{try{!l&&i.return&&i.return()}finally{if(a)throw r}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),r=l.default.scaleOrdinal(l.default.schemeCategory20);e.default=t.default.extend({instruments:(0,n.default)(),compute:function(e){var t=a(e,1),n=t[0],l=this.get("instruments"),s=l.code(n);return r(s)}})}),define("cats-client/helpers/eq",["exports","ember","ember-truth-helpers/helpers/equal"],function(e,t,n){var l=null;t.default.Helper?l=t.default.Helper.helper(n.equalHelper):t.default.HTMLBars.makeBoundHelper&&(l=t.default.HTMLBars.makeBoundHelper(n.equalHelper)),e.default=l}),define("cats-client/helpers/get-length",["exports","ember-helper"],function(e,t){function n(e){var t=l(e,2),n=t[0],a=t[1];return n.get(a+".length")}var l=function(){function e(e,t){var n=[],l=!0,a=!1,r=void 0;try{for(var s,i=e[Symbol.iterator]();!(l=(s=i.next()).done)&&(n.push(s.value),!t||n.length!==t);l=!0);}catch(e){a=!0,r=e}finally{try{!l&&i.return&&i.return()}finally{if(a)throw r}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.getLength=n,e.default=t.default.helper(n)}),define("cats-client/helpers/gt",["exports","ember","ember-truth-helpers/helpers/gt"],function(e,t,n){var l=null;t.default.Helper?l=t.default.Helper.helper(n.gtHelper):t.default.HTMLBars.makeBoundHelper&&(l=t.default.HTMLBars.makeBoundHelper(n.gtHelper)),e.default=l}),define("cats-client/helpers/gte",["exports","ember","ember-truth-helpers/helpers/gte"],function(e,t,n){var l=null;t.default.Helper?l=t.default.Helper.helper(n.gteHelper):t.default.HTMLBars.makeBoundHelper&&(l=t.default.HTMLBars.makeBoundHelper(n.gteHelper)),e.default=l}),define("cats-client/helpers/is-after",["exports","ember","cats-client/config/environment","ember-moment/helpers/is-after"],function(e,t,n,l){e.default=l.default.extend({globalAllowEmpty:!!t.default.get(n.default,"moment.allowEmpty")})}),define("cats-client/helpers/is-array",["exports","ember","ember-truth-helpers/helpers/is-array"],function(e,t,n){var l=null;t.default.Helper?l=t.default.Helper.helper(n.isArrayHelper):t.default.HTMLBars.makeBoundHelper&&(l=t.default.HTMLBars.makeBoundHelper(n.isArrayHelper)),e.default=l}),define("cats-client/helpers/is-before",["exports","ember","cats-client/config/environment","ember-moment/helpers/is-before"],function(e,t,n,l){e.default=l.default.extend({globalAllowEmpty:!!t.default.get(n.default,"moment.allowEmpty")})}),define("cats-client/helpers/is-between",["exports","ember","cats-client/config/environment","ember-moment/helpers/is-between"],function(e,t,n,l){e.default=l.default.extend({globalAllowEmpty:!!t.default.get(n.default,"moment.allowEmpty")})}),define("cats-client/helpers/is-same-or-after",["exports","ember","cats-client/config/environment","ember-moment/helpers/is-same-or-after"],function(e,t,n,l){e.default=l.default.extend({globalAllowEmpty:!!t.default.get(n.default,"moment.allowEmpty")})}),define("cats-client/helpers/is-same-or-before",["exports","ember","cats-client/config/environment","ember-moment/helpers/is-same-or-before"],function(e,t,n,l){e.default=l.default.extend({globalAllowEmpty:!!t.default.get(n.default,"moment.allowEmpty")})}),define("cats-client/helpers/is-same",["exports","ember","cats-client/config/environment","ember-moment/helpers/is-same"],function(e,t,n,l){e.default=l.default.extend({globalAllowEmpty:!!t.default.get(n.default,"moment.allowEmpty")})}),define("cats-client/helpers/lt",["exports","ember","ember-truth-helpers/helpers/lt"],function(e,t,n){var l=null;t.default.Helper?l=t.default.Helper.helper(n.ltHelper):t.default.HTMLBars.makeBoundHelper&&(l=t.default.HTMLBars.makeBoundHelper(n.ltHelper)),e.default=l}),define("cats-client/helpers/lte",["exports","ember","ember-truth-helpers/helpers/lte"],function(e,t,n){var l=null;t.default.Helper?l=t.default.Helper.helper(n.lteHelper):t.default.HTMLBars.makeBoundHelper&&(l=t.default.HTMLBars.makeBoundHelper(n.lteHelper)),e.default=l}),define("cats-client/helpers/moment-calendar",["exports","ember","cats-client/config/environment","ember-moment/helpers/moment-calendar"],function(e,t,n,l){e.default=l.default.extend({globalAllowEmpty:!!t.default.get(n.default,"moment.allowEmpty")})}),define("cats-client/helpers/moment-duration",["exports","ember-moment/helpers/moment-duration"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cats-client/helpers/moment-format",["exports","ember","cats-client/config/environment","ember-moment/helpers/moment-format"],function(e,t,n,l){e.default=l.default.extend({globalAllowEmpty:!!t.default.get(n.default,"moment.allowEmpty")})}),define("cats-client/helpers/moment-from-now",["exports","ember","cats-client/config/environment","ember-moment/helpers/moment-from-now"],function(e,t,n,l){e.default=l.default.extend({globalAllowEmpty:!!t.default.get(n.default,"moment.allowEmpty")})}),define("cats-client/helpers/moment-to-now",["exports","ember","cats-client/config/environment","ember-moment/helpers/moment-to-now"],function(e,t,n,l){e.default=l.default.extend({globalAllowEmpty:!!t.default.get(n.default,"moment.allowEmpty")})}),define("cats-client/helpers/not-eq",["exports","ember","ember-truth-helpers/helpers/not-equal"],function(e,t,n){var l=null;t.default.Helper?l=t.default.Helper.helper(n.notEqualHelper):t.default.HTMLBars.makeBoundHelper&&(l=t.default.HTMLBars.makeBoundHelper(n.notEqualHelper)),e.default=l}),define("cats-client/helpers/not",["exports","ember","ember-truth-helpers/helpers/not"],function(e,t,n){var l=null;t.default.Helper?l=t.default.Helper.helper(n.notHelper):t.default.HTMLBars.makeBoundHelper&&(l=t.default.HTMLBars.makeBoundHelper(n.notHelper)),e.default=l}),define("cats-client/helpers/now",["exports","ember-moment/helpers/now"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cats-client/helpers/or",["exports","ember","ember-truth-helpers/helpers/or"],function(e,t,n){var l=null;t.default.Helper?l=t.default.Helper.helper(n.orHelper):t.default.HTMLBars.makeBoundHelper&&(l=t.default.HTMLBars.makeBoundHelper(n.orHelper)),e.default=l}),define("cats-client/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){e.default=t.default}),define("cats-client/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){e.default=t.default}),define("cats-client/helpers/xor",["exports","ember","ember-truth-helpers/helpers/xor"],function(e,t,n){var l=null;t.default.Helper?l=t.default.Helper.helper(n.xorHelper):t.default.HTMLBars.makeBoundHelper&&(l=t.default.HTMLBars.makeBoundHelper(n.xorHelper)),e.default=l}),define("cats-client/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","cats-client/config/environment"],function(e,t,n){e.default={name:"App Version",initialize:(0,t.default)(n.default.APP.name,n.default.APP.version)}}),define("cats-client/initializers/container-debug-adapter",["exports","ember-resolver/container-debug-adapter"],function(e,t){e.default={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0];e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("cats-client/initializers/data-adapter",["exports","ember"],function(e,t){e.default={name:"data-adapter",before:"store",initialize:t.default.K}}),define("cats-client/initializers/ember-data",["exports","ember-data/setup-container","ember-data/-private/core"],function(e,t,n){e.default={name:"ember-data",initialize:t.default}}),define("cats-client/initializers/export-application-global",["exports","ember","cats-client/config/environment"],function(e,t,n){function l(){var e=arguments[1]||arguments[0];if(n.default.exportApplicationGlobal!==!1){var l,a=n.default.exportApplicationGlobal;l="string"==typeof a?a:t.default.String.classify(n.default.modulePrefix),window[l]||(window[l]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete window[l]}}))}}e.initialize=l,e.default={name:"export-application-global",initialize:l}}),define("cats-client/initializers/injectStore",["exports","ember"],function(e,t){e.default={name:"injectStore",before:"store",initialize:t.default.K}}),define("cats-client/initializers/store",["exports","ember"],function(e,t){e.default={name:"store",after:"ember-data",initialize:t.default.K}}),define("cats-client/initializers/transforms",["exports","ember"],function(e,t){e.default={name:"transforms",before:"store",initialize:t.default.K}}),define("cats-client/initializers/truth-helpers",["exports","ember","ember-truth-helpers/utils/register-helper","ember-truth-helpers/helpers/and","ember-truth-helpers/helpers/or","ember-truth-helpers/helpers/equal","ember-truth-helpers/helpers/not","ember-truth-helpers/helpers/is-array","ember-truth-helpers/helpers/not-equal","ember-truth-helpers/helpers/gt","ember-truth-helpers/helpers/gte","ember-truth-helpers/helpers/lt","ember-truth-helpers/helpers/lte"],function(e,t,n,l,a,r,s,i,o,u,c,d,f){function m(){t.default.Helper||((0,n.registerHelper)("and",l.andHelper),(0,n.registerHelper)("or",a.orHelper),(0,n.registerHelper)("eq",r.equalHelper),(0,n.registerHelper)("not",s.notHelper),(0,n.registerHelper)("is-array",i.isArrayHelper),(0,n.registerHelper)("not-eq",o.notEqualHelper),(0,n.registerHelper)("gt",u.gtHelper),(0,n.registerHelper)("gte",c.gteHelper),(0,n.registerHelper)("lt",d.ltHelper),(0,n.registerHelper)("lte",f.lteHelper))}e.initialize=m,e.default={name:"truth-helpers",initialize:m}}),define("cats-client/instance-initializers/browser/clear-double-boot",["exports"],function(e){e.default={name:"clear-double-boot",initialize:function(e){var t=e.didCreateRootView;e.didCreateRootView=function(){for(var n=document.querySelectorAll(e.rootElement+" .ember-view"),l=0;l<n.length;l++){var a=n[l];a.parentNode.removeChild(a)}t.apply(e,arguments)}}}}),define("cats-client/instance-initializers/ember-data",["exports","ember-data/-private/instance-initializers/initialize-store-service"],function(e,t){e.default={name:"ember-data",initialize:t.default}}),define("cats-client/locations/none",["exports","ember"],function(e,t){var n=t.default.computed,l=t.default.computed.reads,a=t.default.inject.service,r=t.default.get,s=t.default.getOwner;e.default=t.default.NoneLocation.extend({implementation:"fastboot",fastboot:a(),_fastbootHeadersEnabled:n(function(){var e=s(this).resolveRegistration("config:environment");return!!r(e,"fastboot.fastbootHeaders")}),_redirectCode:n(function(){var e=307,t=s(this).resolveRegistration("config:environment");return r(t,"fastboot.redirectCode")||e}),_response:l("fastboot.response"),_request:l("fastboot.request"),setURL:function(e){if(r(this,"fastboot.isFastBoot")){var t=r(this,"path"),n=!t||0===t.length,l=t!==e,a=r(this,"_response");if(l&&!n){var s=r(this,"_request.protocol"),i=r(this,"_request.host"),o=s+"://"+i+e;a.statusCode=this.get("_redirectCode"),a.headers.set("location",o)}r(this,"_fastbootHeadersEnabled")&&a.headers.set("x-fastboot-path",e)}this._super.apply(this,arguments)}})}),define("cats-client/models/artist",["exports","ember-data/model","ember-data/attr","ember-data/relationships","ember-computed","ember-array/utils"],function(e,t,n,l,a,r){e.default=t.default.extend({name:(0,n.default)("string"),instrument:(0,n.default)("string"),events:(0,l.hasMany)("event",{inverse:"artists"}),image:(0,n.default)("string"),bandMates:(0,a.default)("events.@each.artists",function(){var e=(0,r.A)();return this.get("events").forEach(function(t){e.pushObjects(t.get("artists").toArray())}),e.uniq().removeObject(this)}),text:(0,a.default)("name","instrument",function(){return this.get("name")+" ("+this.get("instrument")+")"})})}),define("cats-client/models/event",["exports","ember-data/model","ember-data/attr","ember-data/relationships"],function(e,t,n,l){e.default=t.default.extend({name:(0,n.default)("string"),artists:(0,l.hasMany)("artist",{inverse:"events",async:!1}),startTime:(0,n.default)("date"),endTime:(0,n.default)("date")})}),define("cats-client/resolver",["exports","ember-resolver"],function(e,t){e.default=t.default}),define("cats-client/router",["exports","ember-router","cats-client/config/environment"],function(e,t,n){var l=t.default.extend({location:n.default.locationType});l.map(function(){this.route("stats")}),e.default=l}),define("cats-client/routes/application",["exports","ember-route"],function(e,t){e.default=t.default.extend({beforeModel:function(){return this.store.findAll("artist")},model:function(){return this.store.findAll("event")}})}),define("cats-client/routes/index",["exports","ember-route"],function(e,t){e.default=t.default.extend({model:function(){return this.modelFor("application")}})}),define("cats-client/routes/stats",["exports","ember-route"],function(e,t){e.default=t.default.extend({model:function(){return this.store.peekAll("artist")}})}),define("cats-client/serializers/application",["exports","ember-data/serializers/json-api","ember-string"],function(e,t,n){e.default=t.default.extend({keyForAttribute:function(e){return(0,n.underscore)(e)}})}),define("cats-client/serializers/event",["exports","cats-client/serializers/application","ember-array/utils"],function(e,t,n){e.default=t.default.extend({normalizeResponse:function(e,t,l,a,r){var s=function(e){var t=e.attributes.artist_ids;t&&("string"==typeof t&&(t=t.split(",")),delete e.attributes.artist_ids,e.relationships=e.relationships||{},e.relationships.artists=e.relationships.artists||{data:[]},t.forEach(function(t){e.relationships.artists.data.push({id:t,type:"artist"})}))};return(0,n.isEmberArray)(l.data)?l.data.forEach(s):s(l.data),this._super(e,t,l,a,r)}})}),define("cats-client/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cats-client/services/fastboot",["exports","ember"],function(e,t){var n=t.default.deprecate,l=t.default.computed,a=t.default.get,r=l.deprecatingAlias,s=l.readOnly,i=t.default.Object.extend({init:function(){this._super.apply(this,arguments);var e=this.request;delete this.request,this.cookies=e.cookies,this.headers=e.headers,this.queryParams=e.queryParams,this.path=e.path,this.protocol=e.protocol,this._host=function(){return e.host()}},host:l(function(){return this._host()})}),o=t.default.Object.extend({put:function(e,n){t.default.assert("shoebox.put is only invoked from the FastBoot rendered application",this.get("fastboot.isFastBoot")),t.default.assert("the provided key is a string","string"==typeof e);var l=this.get("fastboot._fastbootInfo");l.shoebox||(l.shoebox={}),l.shoebox[e]=n},retrieve:function(e){if(this.get("fastboot.isFastBoot")){var t=this.get("fastboot._fastbootInfo.shoebox");if(!t)return;return t[e]}var n=this.get(e);if(n)return n;var l=document.querySelector("#shoebox-"+e);if(l){var a=l.textContent;if(a)return n=JSON.parse(a),this.set(e,n),n}}});e.default=t.default.Service.extend({cookies:r("request.cookies",{id:"fastboot.cookies-to-request",until:"0.9.9"}),headers:r("request.headers",{id:"fastboot.headers-to-request",until:"0.9.9"}),init:function(){this._super.apply(this,arguments);var e=o.create({fastboot:this});this.set("shoebox",e)},host:l(function(){return n("Usage of fastboot service's `host` property is deprecated.  Please use `request.host` instead.",!1,{id:"fastboot.host-to-request",until:"0.9.9"}),this._fastbootInfo.request.host()}),response:s("_fastbootInfo.response"),request:l(function(){return a(this,"isFastBoot")?i.create({request:a(this,"_fastbootInfo.request")}):null}),isFastBoot:l(function(){return"undefined"!=typeof FastBoot}),deferRendering:function(e){t.default.assert("deferRendering requires a promise or thennable object","function"==typeof e.then),this._fastbootInfo.deferRendering(e)}})}),define("cats-client/services/instruments",["exports","ember-service"],function(e,t){e.default=t.default.extend({lastCode:1,init:function(){this._super.apply(this,arguments),this.instruments={}},code:function e(t){var n=this.get("instruments"),l=n[t];if(l)return l;var e=this.get("lastCode");return n[t]=e,this.set("lastCode",e+1),e}})}),define("cats-client/services/moment",["exports","ember","cats-client/config/environment","ember-moment/services/moment"],function(e,t,n,l){e.default=l.default.extend({defaultFormat:t.default.get(n.default,"moment.outputFormat")})}),define("cats-client/templates/_nav",["exports"],function(e){e.default=Ember.HTMLBars.template({id:null,block:'{"statements":[["open-element","div",[]],["static-attr","class","nav"],["flush-element"],["text","\\n  "],["block",["link-to"],["stats"],[["class"],["selectable"]],10],["text","\\n  "],["block",["link-to"],["index",["helper",["query-params"],null,[["month"],[null]]]],[["class"],["selectable"]],9],["text","\\n  "],["block",["link-to"],["index",["helper",["query-params"],null,[["month"],[1]]]],[["class"],["selectable"]],8],["text","\\n  "],["block",["link-to"],["index",["helper",["query-params"],null,[["month"],[2]]]],[["class"],["selectable"]],7],["text","\\n  "],["block",["link-to"],["index",["helper",["query-params"],null,[["month"],[3]]]],[["class"],["selectable"]],6],["text","\\n  "],["block",["link-to"],["index",["helper",["query-params"],null,[["month"],[4]]]],[["class"],["selectable"]],5],["text","\\n  "],["block",["link-to"],["index",["helper",["query-params"],null,[["month"],[5]]]],[["class"],["selectable"]],4],["text","\\n  "],["block",["link-to"],["index",["helper",["query-params"],null,[["month"],[6]]]],[["class"],["selectable"]],3],["text","\\n  "],["block",["link-to"],["index",["helper",["query-params"],null,[["month"],[7]]]],[["class"],["selectable"]],2],["text","\\n  "],["block",["link-to"],["index",["helper",["query-params"],null,[["month"],[8]]]],[["class"],["selectable"]],1],["text","\\n  "],["block",["link-to"],["index",["helper",["query-params"],null,[["month"],[9]]]],[["class"],["selectable"]],0],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","September"]],"locals":[]},{"statements":[["text","August"]],"locals":[]},{"statements":[["text","July"]],"locals":[]},{"statements":[["text","June"]],"locals":[]},{"statements":[["text","May"]],"locals":[]},{"statements":[["text","April"]],"locals":[]},{"statements":[["text","March"]],"locals":[]},{"statements":[["text","February"]],"locals":[]},{"statements":[["text","January"]],"locals":[]},{"statements":[["text","All Gigs"]],"locals":[]},{"statements":[["text","Leader Board"]],"locals":[]}]}',meta:{moduleName:"cats-client/templates/_nav.hbs"}})}),define("cats-client/templates/components/artist-info",["exports"],function(e){e.default=Ember.HTMLBars.template({id:null,block:'{"statements":[["open-element","div",[]],["static-attr","class","artist-info__column_image"],["flush-element"],["text","\\n  "],["open-element","img",[]],["dynamic-attr","src",["unknown",["artist","image"]],null],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","artist-info__column"],["flush-element"],["text","\\n  "],["open-element","span",[]],["static-attr","class","artist-info__name"],["flush-element"],["text","\\n    "],["append",["unknown",["artist","name"]],false],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","span",[]],["static-attr","class","artist-info__instrument"],["flush-element"],["text","\\n    "],["append",["unknown",["artist","instrument"]],false],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","artist-info__stat"],["flush-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","artist-info__number"],["flush-element"],["text","\\n      "],["append",["unknown",["artist","bandMates","length"]],false],["text","\\n    "],["close-element"],["text"," - Bandmates\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","artist-info__stat"],["flush-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","artist-info__number"],["flush-element"],["text","\\n      "],["append",["unknown",["artist","events","length"]],false],["text","\\n    "],["close-element"],["text"," - Gigs This Year\\n  "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["hasMonth"]]],null,0],["text","\\n  "],["open-element","span",[]],["flush-element"],["text","\\n    "],["yield","default"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","artist-info__column"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","artist-info__button"],["modifier",["action"],[["get",[""]],["get",["clearArtist"]],null]],["flush-element"],["text","\\n    Clear\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":["default"],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","artist-info__stat"],["flush-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","artist-info__number"],["flush-element"],["text","\\n        "],["append",["unknown",["bandMatesForMonth","length"]],false],["text","\\n      "],["close-element"],["text"," - Bandmates in "],["append",["unknown",["monthString"]],false],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","artist-info__stat"],["flush-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","artist-info__number"],["flush-element"],["text","\\n        "],["append",["unknown",["eventsForMonth","length"]],false],["text","\\n      "],["close-element"],["text"," - Gigs in "],["append",["unknown",["monthString"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}]}',meta:{moduleName:"cats-client/templates/components/artist-info.hbs"}})}),define("cats-client/templates/components/event-info",["exports"],function(e){e.default=Ember.HTMLBars.template({id:null,block:'{"statements":[["open-element","div",[]],["static-attr","class","event-info__name"],["flush-element"],["text","\\n  "],["append",["unknown",["event","name"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","event-info__date"],["flush-element"],["text","\\n  "],["append",["helper",["moment-format"],[["get",["event","startTime"]],"dddd M/D/YYYY"],null],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","event-info__time"],["flush-element"],["text","\\n  "],["append",["helper",["moment-format"],[["get",["event","startTime"]],"LT"],null],false],["text"," - "],["append",["helper",["moment-format"],[["get",["event","endTime"]],"LT"],null],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","event-info__artists"],["flush-element"],["text","\\n"],["block",["each"],[["get",["event","artists"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["event-info__artist selectable ",["helper",["if"],[["helper",["eq"],[["get",["artist","id"]],["get",["selectedArtist","id"]]],null],"selected"],null]]]],["modifier",["action"],[["get",[""]],["get",["selectArtist"]],["helper",["if"],[["helper",["eq"],[["get",["artist","id"]],["get",["selectedArtist","id"]]],null],null,["get",["artist"]]],null]]],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","event-info__artist_name"],["flush-element"],["text","\\n          "],["append",["unknown",["artist","name"]],false],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","event-info__instrument"],["flush-element"],["text","\\n          "],["append",["unknown",["artist","instrument"]],false],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","span",[]],["static-attr","style","clear: both;"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":["artist"]}]}',meta:{moduleName:"cats-client/templates/components/event-info.hbs"}})}),define("cats-client/templates/components/force-graph",["exports"],function(e){e.default=Ember.HTMLBars.template({id:null,block:'{"statements":[["open-element","svg",[]],["static-attr","width","700"],["static-attr","height","700"],["flush-element"],["text","\\n  "],["open-element","g",[]],["static-attr","class","force-graph__links"],["flush-element"],["text","\\n"],["block",["each"],[["get",["graph","links"]]],null,1],["text","\\n    "],["open-element","g",[]],["static-attr","class","force-graph__nodes"],["flush-element"],["text","\\n"],["block",["each"],[["get",["graph","nodes"]]],null,0],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","g",[]],["static-attr","class","node"],["static-attr","width","20"],["static-attr","height","20"],["modifier",["action"],[["get",[""]],["get",["selectArtist"]],["helper",["if"],[["helper",["eq"],[["get",["artist","id"]],["get",["selectedArtist","id"]]],null],null,["get",["artist"]]],null]]],["flush-element"],["text","\\n          "],["open-element","circle",[]],["dynamic-attr","r",["helper",["if"],[["helper",["eq"],[["get",["artist","id"]],["get",["selectedArtist","id"]]],null],15,5],null],null],["dynamic-attr","dd-artist",["unknown",["artist","id"]],null],["dynamic-attr","fill",["helper",["d3-color"],[["get",["artist","instrument"]]],null],null],["flush-element"],["text","\\n          "],["open-element","title",[]],["flush-element"],["append",["unknown",["artist","text"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["artist"]},{"statements":[["text","      "],["open-element","line",[]],["dynamic-attr","stroke-width",["unknown",["link","sqrtValue"]],null],["flush-element"],["close-element"],["text","\\n"]],"locals":["link"]}]}',
meta:{moduleName:"cats-client/templates/components/force-graph.hbs"}})}),define("cats-client/templates/components/stats-column",["exports"],function(e){e.default=Ember.HTMLBars.template({id:null,block:'{"statements":[["open-element","span",[]],["static-attr","class","stats__title"],["flush-element"],["text","\\n  "],["append",["unknown",["title"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["each"],[["get",["sortedArtists"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[""]],["get",["selectArtist"]],["helper",["if"],[["helper",["eq"],[["get",["a","id"]],["get",["selectedArtist","id"]]],null],null,["get",["a"]]],null]],null],null],["dynamic-attr","class",["concat",["stats__line selectable ",["helper",["if"],[["helper",["eq"],[["get",["a","id"]],["get",["selectedArtist","id"]]],null],"selected"],null]]]],["flush-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","stats__number"],["flush-element"],["text","\\n      "],["append",["helper",["get-length"],[["get",["a"]],["get",["key"]]],null],false],["text","\\n    "],["close-element"],["text"," "],["append",["unknown",["a","name"]],false],["text"," - "],["append",["unknown",["a","instrument"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":["a"]}]}',meta:{moduleName:"cats-client/templates/components/stats-column.hbs"}})}),define("cats-client/templates/index",["exports"],function(e){e.default=Ember.HTMLBars.template({id:null,block:'{"statements":[["open-element","div",[]],["static-attr","class","index-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","index-container__column"],["flush-element"],["text","\\n    "],["append",["helper",["partial"],["nav"],null],false],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","index-container__events"],["flush-element"],["text","\\n"],["block",["if"],[["get",["selectedArtist"]]],null,2],["text","\\n"],["block",["each"],[["get",["sortedEvents"]]],null,0],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","index-container__column"],["flush-element"],["text","\\n    "],["append",["helper",["force-graph"],null,[["graph","selectArtist","selectedArtist"],[["get",["graph"]],["helper",["action"],[["get",[""]],["helper",["mut"],[["get",["selectedArtist"]]],null]],null],["get",["selectedArtist"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["helper",["event-info"],null,[["event","selectArtist","selectedArtist"],[["get",["event"]],["helper",["action"],[["get",[""]],["helper",["mut"],[["get",["selectedArtist"]]],null]],null],["get",["selectedArtist"]]]]],false],["text","\\n"]],"locals":["event"]},{"statements":[["text","          "],["append",["helper",["input"],null,[["type","name","checked"],["checkbox","includeBandmates",["get",["includeBandmates"]]]]],false],["text"," Graph Bandmates\' Gigs\\n"]],"locals":[]},{"statements":[["block",["artist-info"],null,[["artist","month","clearArtist"],[["get",["selectedArtist"]],["get",["monthInt"]],["helper",["action"],[["get",[""]],["helper",["mut"],[["get",["selectedArtist"]]],null]],null]]],1]],"locals":[]}]}',meta:{moduleName:"cats-client/templates/index.hbs"}})}),define("cats-client/templates/stats",["exports"],function(e){e.default=Ember.HTMLBars.template({id:null,block:'{"statements":[["append",["helper",["partial"],["nav"],null],false],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","stats"],["flush-element"],["text","\\n  "],["append",["helper",["stats-column"],null,[["artists","key","title","selectedArtist","selectArtist"],[["get",["model"]],"bandMates","Who\'s played with the most people?",["get",["selectedArtist"]],["helper",["action"],[["get",[""]],["helper",["mut"],[["get",["selectedArtist"]]],null]],null]]]],false],["text","\\n\\n  "],["append",["helper",["stats-column"],null,[["artists","key","title","selectedArtist","selectArtist"],[["get",["model"]],"events","Who\'s had the most gigs?",["get",["selectedArtist"]],["helper",["action"],[["get",[""]],["helper",["mut"],[["get",["selectedArtist"]]],null]],null]]]],false],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","stats__column"],["flush-element"],["text","\\n"],["block",["if"],[["get",["selectedArtist"]]],null,2],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          See "],["append",["unknown",["selectedArtist","name"]],false],["text","\'s graph\\n"]],"locals":[]},{"statements":[["text","\\n"],["block",["link-to"],["index",["helper",["query-params"],null,[["artist","month"],[["get",["selectedArtist","id"]],null]]]],null,0]],"locals":[]},{"statements":[["block",["artist-info"],null,[["artist","clearArtist"],[["get",["selectedArtist"]],["helper",["action"],[["get",[""]],["helper",["mut"],[["get",["selectedArtist"]]],null]],null]]],1]],"locals":[]}]}',meta:{moduleName:"cats-client/templates/stats.hbs"}})}),define("cats-client/utils/create-graph",["exports","ember-instrumentation"],function(e,t){e.default=function(e){function n(e){var t=e.get("id"),n=a.find(function(e){return e.id===t});void 0===n&&a.push(e)}function l(e,t){var n=e.get("id"),l=t.get("id"),a=r.find(function(e){return e.source===n&&e.target===l||e.source===l&&e.target===n});void 0===a?r.push({source:n,target:l,value:1,sqrtValue:1}):(a.value++,a.sqrtValue=a.value)}var a=[],r=[];return(0,t.subscribe)("create-graph",{before:function(e,t){return t},after:function(e,t,n,l){var a=Math.round(t-l);console.log("create-graph took "+a+" ms.")}}),(0,t.instrument)("create-graph",function(){e.forEach(function(e){for(var t=e.get("artists"),a=0;a<t.length;a++){var r=t.objectAt(a);n(r);for(var s=a+1;s<t.length;s++){var i=t.objectAt(s);l(r,i)}}})}),{nodes:a,links:r}}}),define("cats-client/config/environment",["ember"],function(e){var t="cats-client";try{var n=t+"/config/environment",l=e.default.$('meta[name="'+n+'"]').attr("content"),a=JSON.parse(unescape(l));return{default:a}}catch(e){throw new Error('Could not read config from meta tag with name "'+n+'".')}}),runningTests||require("cats-client/app").default.create({API_URL:"https://jazz-cats-api.herokuapp.com",name:"cats-client",version:"0.0.0+1e8648a2"}),define("~fastboot/app-factory",["cats-client/app","cats-client/config/environment"],function(e,t){return e=e.default,t=t.default,{default:function(){return e.create(t.APP)}}});