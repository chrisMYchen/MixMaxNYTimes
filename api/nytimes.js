//Christopher Chen 2017
var key = require('../utils/key');
var _ = require('underscore');
var select = require('soupselect').select,
    htmlparser = require("htmlparser")

var rp = require('request-promise');

// The API that returns the in-email representation.
module.exports = function(req, res) {
  var url = req.query.url.trim();
  host = url;
  debugger;
  console.log(req);
  console.log(url);
  var params = {
    url: host,
    jar: true
  }
  var response = rp(params)
    .then(function(body) {
      // parsing the body
      var handler = new htmlparser.DefaultHandler(function(err, dom) {
          if (err) {
              console.debug("Error: " + err);
          } else {
              // soupselect happening here...
              twit_site = select(dom, 'meta[name="twitter:site"]')[0].attribs.value;
              twit_title = select(dom, 'meta[property="twitter:title"]')[0].attribs.content;
              twit_description = select(dom, 'meta[property="twitter:description"]')[0].attribs.content;
              twit_image = select(dom, 'meta[property="twitter:image"]')[0].attribs.content;
              twit_image_alt = select(dom, 'meta[property="twitter:image:alt"]')[0].attribs.content;
              twitCard = makeTwitCardHTML(url, twit_site, twit_title, twit_description, twit_image, twit_image_alt);
              res.json({
                body: twitCard
                  // Add raw:true if you're returning content that you want the user to be able to edit
              });
            }
        });

        var parser = new htmlparser.Parser(handler);
        parser.parseComplete(body);

    })
    .catch(function(err){
        console.log(err);
    });
};

//Christopher Chen 2017
function makeTwitCardHTML(url, twit_site, twit_title, twit_description, twit_image, twit_image_alt){
  html = `<div class="TwitterCard" style="display: block;
      position: relative;
      text-align: left;animation-duration: 150ms;
      animation-name: fadeInTwitterCard;
      animation-timing-function: cubic-bezier(0.9,0,.9,0);background: transparent;
      color: inherit;
      overflow: hidden;color:#292F33; font-size:14px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;">
    <div class="TwitterCardsGrid-col--12 TwitterCardsGrid-col--spacerBottom CardContent" style="margin-bottom: .32333em;    float: left;
      width: 100%;
      clear: both;display: block;">
      <a style="float: left;
      width: 100%;
      clear: both;display: block!important;cursor: pointer;
      outline-offset: -1px;
      transition: background-color .15s ease-in-out,border-color .15s ease-in-out;    border-radius: .42857em;
      border-width: 1px;
      border-style: solid;
      border-color: #E1E8ED;
      box-sizing: border-box;
      color: inherit!important;
      overflow: hidden;text-decoration: none;"
    class="js-openLink u-block TwitterCardsGrid-col--12 TwitterCard-container TwitterCard-container--clickable SummaryCard--large"
    href="${url}"
    rel="noopener">
          <div class="SummaryCard-image TwitterCardsGrid-col--12" style="border-bottom-width: 1px;background-color: #E1E8ED;
            border-style: solid;
            border-color: inherit;
            border-width: 0;">
            <div class="tcu-imageContainer tcu-imageAspect--2to1" style="    position: relative;
            width: 100%;
            overflow: hidden; :before">
          <div class="tcu-imageWrapper" style="opacity: 1;
            background-image: url(${twit_image});
            background-size: cover;" data-style="background-image: url(${twit_image}); background-size: cover;">
            <img class="u-block" style = "border: 0;display: block!important;width: 100%;
            opacity: 0;" src="${twit_image}" alt="${twit_image_alt}">
          </div>
        </div>

          </div>
          <div class="SummaryCard-contentContainer TwitterCardsGrid-col--12" style = "float: left;
            width: 100%;
            clear: both;">
            <div class="SummaryCard-content" style="padding-left: 1em;
              padding-right: 1em;    padding: .75em;
      box-sizing: border-box;
      text-decoration: none;">

                <h2 class="TwitterCard-title js-cardClick tcu-textEllipse--multiline" style="max-height: 1.3em;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;font-size: 1em;
                  margin: 0 0 .15em;
                  font-weight: bold;">${twit_title}</h2>

                <p class="tcu-resetMargin u-block TwitterCardsGrid-col--spacerTop tcu-textEllipse--multiline" style="    max-height: 1.3em;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;">${twit_description}</p>

                <span class="u-block TwitterCardsGrid-col--spacerTop SummaryCard-destination" style="text-transform: lowercase;
                  color: #8899A6;
                  max-height: 1.3em;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;    margin-top: .32333em;">${twit_site}/span>
            </div>
          </div>
      </a>

  </div>
  </div>`;
  return html;

}
