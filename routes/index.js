var express = require('express');
var passport = require('passport');
var httpProxy = require('http-proxy');
var fs = require('fs');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

var AUTH0_CLIENT_ID = fs.readFileSync('/run/secrets/auth0-client-id', 'utf8');

var env = {
  AUTH0_CLIENT_ID: AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback',
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/reports/');
});

var ppoptions = {scope: ['openid', 'name', 'email', 'picture'], 'audience': process.env.AUTH0_AUDIENCE,  failureRedirect: '/login'};

router.get('/login',
  passport.authenticate('auth0', ppoptions), function (req, res) {
  res.redirect("/");
});


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

router.get('/callback',
  passport.authenticate('auth0', ppoptions),
  function(req, res){
    res.render('callback', { env: {'returnTo': req.session.returnTo || '/reports/', 'accessToken': req.user.accessToken}});
  });


module.exports = router;
