function WebOfScienceParser()
{
};

WebOfScienceParser.prototype._parse_results_page = function(url, callback)
{
	console.log("parsing");
    var iframe = document.createElement("iframe");
    $(iframe).hide();
    document.body.appendChild(iframe);
    iframe.src = url;

    $(iframe).load(function()
    {
        var articles = [];
        var ibody = $(iframe).contents()[0];

        var select_pages = $(ibody.getElementsByName("pageSize").item(0));
        if(select_pages.val() != 50) {
            select_pages.val(50);
            select_pages.change();
            return;
        }

        $(ibody).find(".search-results-content").each(function(index, li)
        {
            var article = {};

            $(li).find("a[href^='/full_record']").each(function(index, tag) {
                article.url = tag.href;
                article.title = $.trim($(tag).text());
            });

            $(li).next().find("a[href^='/CitingArticles']").each(function(index, tag) {
                article.citations_url = tag.href;
                article.n_citations = parseInt($(tag).text());
            });
            
            $(li).find('span.label').each(function(index, tag) {
                //if($(tag).text().indexOf("By:") == 0)
                //    article.year = parseInt($.trim($(tag).next().text()));

                if($(tag).text().indexOf("By:") == 0) {
                    article.authors = $.trim($(tag).parent().text()).replace(/^By: /,"");
					var source_year = $.trim($(tag).parent().next().text());
                    article.source = source_year.replace(/Published.*/, "").replace(/\s\s+/g, ", ").replace(/, $/, "");
                    article.year = parseInt(source_year.substr(source_year.length-4));
				}
            });

            if(!('n_citations' in article)) {
                article.citations_url = undefined;
                article.n_citations = 0;
            }
            
            article._id = $.md5(article.title + article.authors);

            articles.push(article);

			console.log(article);
        });

        callback(articles);
        document.body.removeChild(iframe);
    });
}

WebOfScienceParser.prototype.parse = function(url, callback)
{
    if(!url) return;
    this._parse_results_page(url, callback);
}
