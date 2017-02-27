Christopher Chen 2017 Feb 27,2017 
# NYTimes Link Preview for Mixmax
An upgrade to Mixmax's current link resolver for NYTimes and other websites that offer large Twitter summary cards.

I liked how Twitter created their summary cards as thought
Mixmax could use that style of embedding. I reverse engineered
Twitter's summary card and scraped websites for their
Twitter summary card fields to use in Mixmax.


## Running locally

1. Install using `npm install`
2. Run using `npm start`

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
curl -k https://localhost:9146/resolver?url=https://www.nytimes.com/2017/02/26/us/politics/trump-budget.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=first-column-region&region=top-news&WT.nav=top-news
```

Or just navigate to the url:
```
https://localhost:9146/resolver?url=https://www.nytimes.com/2017/02/26/us/politics/trump-budget.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=first-column-region&region=top-news&WT.nav=top-news
```

#Using in Mixmax:
This resolver currently gets overridden by the resolver for websites with Ograph tags.
Otherwise you would use
https://nytimes.com/
as your regex.

And https://localhost:9146/ as your server.
