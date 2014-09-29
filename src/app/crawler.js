function ScholarCrawler(parser, node_ids, nodes, edges)
{
	this.stack = [];

	this.node_ids = node_ids;
	this.parser = parser;
	this.nodes = nodes;
	this.edges = edges;

	this.delay = 1000;
	this.max_depth = 2;
	this.minimum_citations = 0;
};

ScholarCrawler.prototype.formatArticle = function(node)
{
	node.label = '';
	node.shape = "dot";
	node.original_title = node.title;
	node.title =
		"<span class='node_tooltip'>" + node.authors +
		"<emph> " + node.title + ".</emph> " +
		node.source + ", " + node.year + ".</span>";
	node.mass = node.n_citations/2 + 1;
	node.radius = 3*Math.pow(node.n_citations, 0.8) + 3;
	return node;
};

ScholarCrawler.prototype.process = function(url, parent_node)
{
	var crawler = this;

	this.parser.parse(url, function(children)
	{
		for(i=0; i<children.length; i++)
		{
			var child = crawler.formatArticle(children[i]);

			if(parent_node == null)
			{
				child['depth'] = 0;
			}
			else
			{
				child['depth'] = parent_node['depth'] + 1;
				crawler.edges.add({"from": child['id'], "to": parent_node['id']});
			}

			if(child['n_citations'] < crawler.minimum_citations)
				continue;

			if(crawler.node_ids.indexOf(child['id']) == -1)
			{
				crawler.node_ids.push(child['id']);
				crawler.nodes.add(child);

				if(child['depth'] < crawler.max_depth) {
					crawler.push(child['citations_url'], child);
				}
			}
		}
	});
};

ScholarCrawler.prototype.push = function(url, parent_node)
{
	this.stack.push([url, parent_node]);
};

ScholarCrawler.prototype.start = function()
{
	if(this.stack.length > 0)
	{
		var args = this.stack.pop();
		this.process.apply(this, args);
	}

	var crawler = this;
	setTimeout(function() { crawler.start() }, this.delay);
};
