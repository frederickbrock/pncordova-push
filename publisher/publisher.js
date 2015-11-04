

module.exports = (function(){

 var pubnub = require('pubnub').init({
 	publish_key: 'pub-c-04eae731-7d08-4ac5-816d-dcfc9ff862cf'
 	,subscribe_key: 'sub-c-df260c52-9601-11e4-bff9-02ee2ddab7fe'
 	,ssl: false
 })	;

 //pull some diagnostics into your publishing :)
 pubnub.subscribe({
 	channel: 'cordova_push-pndebug'
 	,callback: function(msg,env,time){ //can also be message
 	 console.log('received pndebug: ' + JSON.stringify(msg));
 	}
 });

var currentBadge = 0;

var gcmPayload = {
	data: {
		message: "Someone mentioned you on: "
		,title: "Push Notification from CordovaPush"
	}
	,pn_debug: true
};

var apnsPayload = {
	alert:{ 
			title: "Push Notification from CordovaPush"
			,body:  "Someone mentioned you on:"
	}
	,badge: ++currentBadge,
};

var message = {
	msg: "this is just a regular pubsub message" //this is the regular pubsub
	,pn_apns: apnsPayload //this is the apns/iOS push
	,pn_gcm: gcmPayload //this is the gcm/Android Push
}

pubnub.publish({channel: 'cordova_push',
			 	message: message,
			 	error: function(e){ console.log('error: ' + e);}
			 	,callback: function(e){ console.log(e);}});


})()