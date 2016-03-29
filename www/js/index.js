<!DOCTYPE html>
<html>
    <head>


        <!--
         <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; connect-src 'self' http://pubsub.pubnub.com">
         -->


        <meta name="format-detection" content="telephone=no">
        <meta name="msapplication-tap-highlight" content="no">
        <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
        <link type="text/css" rel="stylesheet" href="bower_components/Materialize/dist/css/materialize.css"  />

        <link rel="stylesheet" type="text/css" href="css/index.css">
        <title>Push Notifications</title>
    </head>
    <body>
        <nav>
            <div class="nav-wrapper">

            </div>
        </nav>

        <div class="container">
            <div class="row">
                  <div class="col s12 m6">
                  <div class="card darken-1">

                    <div class="card-content black-text">
                        <table>
                            <tr>
                                <td>Platform</td>
                                <td><span id="devicePlatform"></span></td>
                            </tr>
                            <tr>
                                <td>Device Name:</td>
                                <td><span id="deviceName"></td>
                            </tr>
                            <tr>
                                <td>Framework</td>
                                <td><span id="deviceFramework"></td>
                            </tr>

                        </table>
                      </div>
                    </div>

                   </div>
                  </div>


            <div class="row">
                <div class="s6">
                    <p>Device Registration ID:</p>
                </div>
                <div class="s6" id="registrationID">
                </div>

                <div class="s6">
                    <p>Pubnub Registration Status: </p>
                </div>
                <div class="s6" id="pubnubRegistrationStatus">

                </div>

            </div>


            <div class="row">
                <div class="s6">
                    <p>Pubnub realtime</p>
                </div>
                <div class="s6" id="message-container">

                </div>
            </div>


        <div id="cards"></div>
        <script type="text/javascript" src="bower_components/jquery/dist/jquery.js"></script>
        <script type="text/javascript" src="bower_components/Materialize/dist/js/materialize.js"></script>
        <script type="text/javascript" src="cordova.js"></script>
        <script type="text/javascript" charset="utf-8" src="PushNotification.js"></script>
	    <script type="text/javascript" src="bower_components/pubnub/web/pubnub.js"></script>

        <script type="text/javascript">

            var pubnub = PUBNUB.init(
                {subscribe_key: "sub-c-f47793d8-f216-11e5-861b-02ee2ddab7fe"
                 ,publish_key: "pub-c-2e68b2f3-b688-4c3b-a005-5b8dfb9cd416"
                 ,ssl: true

                });

                pubnub.subscribe({
                     channel: 'trackingcentral1',
                        //message, envelope,timetoken
                      callback: function(message,envelope, timetoken){
                                       var messageDiv = document.getElementById('message-container');

                                        var newMessage = document.createElement("div");
                                        newMessage.innerHTML = JSON.stringify(message);
                                        messageDiv.appendChild(newMessage);
                },
                error: function(err){
                    alert('error');
                }
            });


        </script>
        <script type="text/javascript" src="js/index.js"></script>
    </body>
</html>
