# wpIonic

A mobile app that uses the Ionic Framework, and integrates with WordPress through the WP-API.

Features:

- Gets posts through WP-API
- Pull to refresh
- Infinite scroll
- App intro
- WordPress login (needs custom code on your site to do anything)
- More coming soon

## Demo

https://github.com/scottopolis/wpIonic/blob/master/demo-video.gif

## How to setup

Blog post here: http://scottbolinger.com/ionic-wordpress-app/

1. Install and activate the WP-API v2 plugin on your WordPress website [https://wordpress.org/plugins/rest-api/]
2. Go to www/js/controllers.js and change $rootScope.url to your website
3. Load index.html in Safari, or compile app with Phonegap

**Props to [https://github.com/modemlooper]**

## How to set push notification
High volume, cross platform push notification delivery.
[iOS](https://documentation.onesignal.com/docs/using-onesignal-in-your-ios-app) 
[Android] (https://documentation.onesignal.com/docs/using-onesignal-in-your-android-app)
