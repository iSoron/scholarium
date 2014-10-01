function GenericParser()
{
    this.scopus_parser = new ScopusParser();
    this.web_of_science_parser = new WebOfScienceParser();
}


GenericParser.prototype.parse = function(url, callback)
{
    if(url.indexOf("scopus.com") >= 0)
        this.scopus_parser.parse(url, callback);
        
    if(url.indexOf("webofknowledge.com") >= 0)
        this.web_of_science_parser.parse(url, callback);
}
