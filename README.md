# wpIonic

*Completely rewritten and updated for Ionic 3.9.2 Feb 2018*

A demo mobile app that uses the Ionic Framework, and integrates with WordPress through the WP-API.

Features:

- Gets posts through WP-API v2
- WordPress login - needs SB App Integration plugin https://github.com/scottopolis/sb-app-integration
- WooCommerce REST API v2 integration
- Stripe payments
- Pull to refresh
- Infinite scroll
- Lots more

## Demo

<p align="center">
 <img width="400" src="https://github.com/scottopolis/wpIonic/blob/master/wpionic-demo.gif">
</p>

## How to setup

Blog post and tutorial here: http://scottbolinger.com/ionic-wordpress-app/

- Install Ionic CLI tools https://ionicframework.com/docs/cli/
- Clone this repository, and run npm install
- Open providers/configure/configure.ts and enter your WordPress site url
- If using WooCommerce, enter your auth key in configure.ts as described
- To use Stripe payments, add your publishable key in app.module.ts
- Install the SB App Integration plugin https://github.com/scottopolis/sb-app-integration
- run ionic serve to see it in your browser

## WooCommerce

This app uses basic authentication over SSL to pull products from the WooCommerce REST API.

To use the WooCommerce module, you must create a REST API key in WooCommerce: http://woocommerce.github.io/woocommerce-rest-api-docs/#authentication

In the app, go to providers/configure/configure.ts and change the Authorization header. This is a base64 encoded string of your consumer key and secret. You can generate these using btoa(key:secret), but keep in mind these are discoverable in your app files even in a signed native app package.

<strong>Example getting your auth header</strong>

consumer key: ck_7af7efdb4ef8708b5f8d5ccdacbd1d8e8ce0f8d5
consumer secret: cs_8777f8b0de8435162162daf22f7e6944ab2bec40

Visit <a href="https://www.base64encode.org/" target="_blank">an online base64 encoder</a> and enter your key and secret separated by a semi-colon:

ck_7af7efdb4ef8708b5f8d5ccdacbd1d8e8ce0f8d5:cs_8777f8b0de8435162162daf22f7e6944ab2bec40

Click encode. Copy the encoded string that looks like this:

Y2tfN2FmN2VmZGI0ZWY4NzA4YjVmOGQ1Y2NkYWNiZDFkOGU4Y2UwZjhkNTpjc184Nzc3ZjhiMGRlODQzNTE2MjE2MmRhZjIyZjdlNjk0NGFiMmJlYzQw

Visit providers/configure/configure.ts and change the return string in getAuth to:

return 'Basic Y2tfN2FmN2VmZGI0ZWY4NzA4YjVmOGQ1Y2NkYWNiZDFkOGU4Y2UwZjhkNTpjc184Nzc3ZjhiMGRlODQzNTE2MjE2MmRhZjIyZjdlNjk0NGFiMmJlYzQw';

Included features:

- WP-API v2 and WooCommerce REST API v2 integration
- Product list
- Single product pages
- Add to cart
- Cart modal
- Basic multi-step checkout
- Stripe payments