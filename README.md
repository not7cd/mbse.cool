# [mbse.cool](https://mbse.cool)

Source code of mbse.cool website.

## Concept

If the website wants to preach about model based systems engineering, it should use models as a basis for its content. It should be, in a way, a view onto some model of data. One such data source is wikidata.org. 

### Hypermedia System

Inspired by book hypermedia.systems, the website shall use hypermedia technologies to the maximum extent. By use of features embedded in the browser the website can be performant, and not be a strain on its data sources. To be decided if the website will become a fully static website updated via scripts or full blown wsgi app. 

### Content

The goal of the website is to map all tools, languages, and methodologies that are present in this domain. A strech goal would be presenting all the tools that use models to perform digital engineering and other supporting activities like documention.

LLM input shall be minimized to minimum if not outright banned. If an image can be used, it should be created by a human. Not only because a respect for arts is a bare minimum, but also for the respect for the reader. There should be some thought put into the content feeding into the website. 

It is really hard to evaluate given item. Especially in the current Internet where search engines give in to sponsored or machine translated content. Tool makers due to bussiness incentives try to move you into their sales, which often don't know their products. The website should refeer to blogs, posts, videos, to help evaluate given item. 

### Technology

Python, as there will be support for RDF-{XML,JSON}, SPARQL, and multitude of data sources that will be mangled into usefull pages with jinja2. Keep it simple.

