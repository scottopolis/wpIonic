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

<p align="center">
 <img width="400" src="https://github.com/scottopolis/wpIonic/blob/master/demo-video.gif">
</p>

## How to setup

Blog post here: http://scottbolinger.com/ionic-wordpress-app/

1. Install and activate the WP-API v2 plugin on your WordPress website [https://wordpress.org/plugins/rest-api/]
2. Go to www/js/controllers.js and change $rootScope.url to your website
3. Load index.html in Safari, or compile app with Phonegap

**Props to [https://github.com/modemlooper]**
