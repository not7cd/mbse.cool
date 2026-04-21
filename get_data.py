import sparql

# TODO: find better library or write your own
wikidata = sparql.Service("https://query.wikidata.org/bigdata/namespace/wdq/sparql", "utf-8", "GET")

# check in https://query.wikidata.org/

query_language = """
SELECT ?item ?itemLabel
WHERE
{
  ?item wdt:P31 wd:Q1941921 ; wdt:P366 wd:Q3750474. # modeling language, that has use in system design
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],mul,en". } # Helps get the label in your language, if not, then default for all languages, then en language
}
"""

query_tool = """
SELECT ?program ?programLabel
WHERE {
  hint:Query hint:optimizer "None" .      
  ?program wdt:P366 wd:Q15188241 ; #has use in model driven architecture
           wdt:P31 wd:Q7397 . #is instance of software
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],mul,en". } 
}
"""

result = wikidata.query(query_language)

for row in result:
    print(row)

