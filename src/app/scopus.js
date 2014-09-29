function ScopusParser() {};

ScopusParser.prototype.parse = function(url, callback)
{
    var iframe = document.createElement("iframe");
    $(iframe).hide();
    document.body.appendChild(iframe);
    iframe.src = url;
    $(iframe).load(function()
    {
        var articles = [];
        var ibody = $(iframe).contents()[0];

        var select_pages = $(ibody.getElementsByName("resultsPerPage").item(0));
        if(select_pages.val() != 200) {
            select_pages.val(200);
            select_pages.change();
        }

        $(ibody).find(".resultItemLists li").each(function(index, li)
        {
            var article = {};

            $(li).find(".docTitle a").each(function(index, tag) {
                article['url'] = tag.href;
                article['title'] = $(tag).text();
            });

            $(li).find("a[href*='citedby']").each(function(index, tag) {
                article['citations_url'] = tag.href;
                article['n_citations'] = parseInt($(tag).text());
            });
            
            $(li).find('.hidden-label').each(function(index, tag) {
                if($(tag).text().indexOf("Year") == 0)
                    article['year'] = parseInt($.trim($(tag).next().text()));

                if($(tag).text().indexOf("Authors") == 0)
                    article['authors'] = $.trim($(tag).next().text());

                if($(tag).text().indexOf("Source") == 0)
                    article['source'] = $.trim($(tag).next().text());
            });

            if(!('n_citations' in article)) {
                article['citations_url'] = undefined;
                article['n_citations'] = 0;
            }
            
            article['id'] = $.md5(article['title'] + article['authors']);

            articles.push(article);
        });

        callback(articles);
        document.body.removeChild(iframe);
    });
}
