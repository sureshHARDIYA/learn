const {override} = require('customize-cra');
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

const cspConfigPolicy = {
    'default-src': "'self'",
    'base-uri': "'self'",
    'object-src': "'self'",
    'img-src': ["'self'"],
    'font-src': ["'self'"],
    'script-src': ["'unsafe-inline'", "'self'"],
    'style-src': ["'unsafe-inline'", "'self'"]
};

function addCspHtmlWebpackPlugin(config) {
    if(process.env.NODE_ENV === 'production') {
        config.plugins.push(new cspHtmlWebpackPlugin(cspConfigPolicy));
    }

    return config;
}

module.exports = {
    webpack: override(addCspHtmlWebpackPlugin),
};