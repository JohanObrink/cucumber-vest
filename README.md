# Is that a Cucumber in your VeST?
### (or are you just happy to see me?)

This is the source code for the demo of the talk ^^

The slides are included as a PDF ...which won't tell you much unless you've seen the talk.
When a video is available (as in: it has been recorded), a link will be added.

## To run the code

* Clone the repo and run `npm install` in `/e2e`, `/idp` and `/web`

### Test the site

* Run `docker-compose up` in `/`
* Run `npm run dev` in `/web` and `/idp`
* Visit `http://localhost:3000`

### Run the tests

* Run `docker-compose up` in `/`
* Run `npm run dev` in `/web` (but not `/idp`)
* Run `npm run dev` in `/e2e`

If you want time enough to actually see what is happening in the browser,
uncomment `await wait(2000)` in `/e2e/step_definitions/auth.steps.js`

## Missing

The idea is to include actual Postgres usage in the demo – that's why it's there.
Also: Running the tests should use the `docker-compose.test.yml` file and use
Test settings for the environments but _not_ require `web` and `idp` to be started.

The presentation is currently in Swedish but will be ported to English and presenters
notes will be added.

## Lastly

![Cucumberbatch](http://sites.uci.edu/cumberbatchwatch/files/2014/04/tumblr_mg52v4rK6K1r0455oo1_500.jpg)

Cucumberbatch