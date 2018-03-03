# wpIonic

*Completely rewritten and updated for Ionic 3.9.2 Feb 2018*

A demo mobile app that uses the Ionic Framework, and integrates with WordPress through the WP-API.

Features:

- Gets posts through WP-API
- Pull to refresh
- Infinite scroll
- WordPress login - needs SB App Integration plugin https://github.com/scottopolis/sb-app-integration
- More coming soon

## Demo

https://github.com/scottopolis/wpIonic/blob/master/wpionic-demo.gif

## How to setup

Blog post and tutorial here: http://scottbolinger.com/ionic-wordpress-app/

- Install Ionic CLI tools https://ionicframework.com/docs/cli/
- Clone this repository, and run npm install
- Open pages/post-list/post-list.ts and providers/login/login.ts and change the urls
- Install the SB App Integration plugin https://github.com/scottopolis/sb-app-integration
- run ionic serve to see it in your browser

## WooCommerce

This app uses basic authentication over SSL to pull products from the WooCommerce REST API.

To use the WooCommerce module, you must create a REST API key in WooCommerce: http://woocommerce.github.io/woocommerce-rest-api-docs/#authentication

In the app, go to providers/woo/woo.ts and change the Authorization header. This is a base64 encoded string of your consumer key and secret. You can generate these using btoa(key:secret), but keep in mind these are discoverable in your app files even in a signed native app package.

Included features:

- Product list
- Single product pages
- Add to cart
- Cart modal
- Basic multi-step checkout

TODO:

- Better UI for variable products
- Payment functionality on checkout
- General UI/UX improvements