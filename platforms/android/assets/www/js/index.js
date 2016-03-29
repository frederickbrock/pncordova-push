/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {


    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {



        var options = {
            "android":{
                "senderID": "524367131484"

            },
            "ios": {
                "alert": "true"
                ,"badge": "true"
                ,"sound": "true"
            },
            "windows": {

            }

        };

        console.log('device is: ' + device);
        document.getElementById("devicePlatform").innerHTML = device.platform;
        document.getElementById("deviceName").innerHTML = device.name;
        document.getElementById("deviceFramework").innerHTML = device.cordova ? device.cordov:device.phonegap;


        var push = PushNotification.init(options);
        var registerWithPubNub = function(regID){

            var subscribe_key = "sub-c-df260c52-9601-11e4-bff9-02ee2ddab7fe";
            var channel_name = "cordova_push";

            var registrationType = "apn";
            if((device.platform != undefined) && (device.platform.toLowerCase() === 'android')){
                registrationType = "gcm";
            }



            var url = "http://pubsub.pubnub.com/v1/push/sub-key/" + subscribe_key + "/devices/" + regID + "?add=" + channel_name + "&type=" + registrationType;
            $.get(url, function(data){
                document.getElementById('pubnubRegistrationStatus').innerHTML = "Channel: " + channel_name + ", platform: " + registrationType + ", result: " + data;

            });
        };


        push.on("registration", function(data){
                console.log('registration for IOS');
                document.getElementById('registrationID').innerHTML = "<p>" + data.registrationId + "</p>";
                registerWithPubNub(data.registrationId);

        });


        push.on('notification', function(data) {

            console.log("notification event");
            console.log(JSON.stringify(data));
            var cards = document.getElementById("cards");
            var content = '<div class="row">' +
                  '<div class="col s12 m6">' +
                  '  <div class="card darken-1">' +
                  '    <div class="card-content black-text">' +
                  '      <span class="card-title black-text">' + data.title + '</span>' +
                  '      <p>' + data.message + '</p>' +
                  '    </div>' +
                  '  </div>' +
                  ' </div>' +
                  '</div>';
            cards.innerHTML += content;
        });

        push.on('error', function(e) {
            console.log("push error");
            console.log(e);
        });






    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
