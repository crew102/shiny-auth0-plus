# Auth0 + Shiny proxy

Adapted from https://github.com/auth0/shiny-auth0-plus to accommodate use of docker secrets

.env file must contain the following envvars:

````bash
AUTH0_DOMAIN
AUTH0_CALLBACK_URL
SHINY_HOST
SHINY_PORT
PORT
SHINY_ADMIN_PORT
AUTH0_AUDIENCE
````

App will read secrets:

/run/secrets/auth0-client-secret
/run/secrets/auth0-client-id
/run/secrets/cookie-secret

...Which are mapped into docker container by docker secrets
