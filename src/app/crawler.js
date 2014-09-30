function ScholarCrawler(parser, nodes, edges)
{
  this.stack = [];

  this.nodes = nodes;
  this.edges = edges;
  this.parser = parser;

  this.delay = 1000;
  this.minimum_citations = 0;
};

ScholarCrawler.prototype.article_to_node = function(article)
{
  return {
    id: article._id,
    _id: article._id,
    article: article,
    group: 'standard',
    label: '',
    shape: 'dot',
    mass: article.n_citations/2 + 1,
    radius: 3*Math.pow(article.n_citations, 0.8) + 3,
    title: "<span class='node_tooltip'>" + article.authors +
      "<a href='' onclick='return open_external(\"" + article.url + "\")' target='_blank'> "
      + article.title + ".</a> " + article.source + ", " + article.year + ".</span>"
  };
};

ScholarCrawler.prototype.add_citations = function(parent_node, levels)
{
  assert(levels >= 0, "levels should be non-negative");

  var crawler = this;

  if(parent_node.is_dummy) 
    return this._add_citations_from_scopus(parent_node, levels);

  articles_db.findOne({_id: parent_node._id}, function(err, parent_article_db)
  {
    if(parent_article_db === null || !parent_article_db.is_cached)
      crawler._add_citations_from_scopus(parent_node, levels);
    else
      crawler._add_citations_from_db(crawler.article_to_node(parent_node.article), levels);
  });
}

ScholarCrawler.prototype._add_citations_from_db = function(parent_node, levels)
{
  assert(levels >= 0, "levels should be non-negative");

  var crawler = this;
  citations_db.find({to: parent_node.article._id}, function(err, citations)
  {
    citations.forEach(function(citation)
    {
      articles_db.findOne({_id: citation.from}, function(err, child_article)
      {
        crawler._add_child_article(child_article, parent_node, levels);
      });
    });

    parent_node.group = "standard";
    crawler.nodes.update(parent_node);
  });
}

ScholarCrawler.prototype._add_citations_from_scopus = function(parent_node, levels)
{
  assert(levels >= 0, "levels should be non-negative");

  var crawler = this;
  this.parser.parse(parent_node.article.citations_url, function(child_articles)
  {
    child_articles.forEach(function(child_article)
    {
      articles_db.findOne({_id:child_article._id}, function(err, child_article_db)
      {
        if(child_article_db === null)
        {
          child_article.is_cached = false;
          articles_db.insert(child_article);
          crawler._add_child_article(child_article, parent_node, levels);
        }
        else
        {
          crawler._add_child_article(child_article_db, parent_node, levels);
        }
      });
    });

    if(!parent_node.is_dummy)
    {
      parent_node.group = "standard";
      crawler.nodes.update(parent_node);

      parent_node.article.is_cached = true;
      articles_db.update({_id: parent_node.article._id}, parent_node.article, {});
    }
  });
}

ScholarCrawler.prototype._add_child_article = function(child_article, parent_node, levels)
{
  assert(levels >= 0, "levels should be non-negative");

  var child_node = this.article_to_node(child_article);

  if(child_article.n_citations < this.minimum_citations)
    return;

  if(!parent_node.is_dummy)
  {
    edge = {
      id: $.md5(child_node._id + parent_node._id),
      from: child_node._id,
      to: parent_node._id
    };

    edge._id = edge.id;

    if(this.edges.getIds().indexOf(edge._id) < 0)
    {
      this.edges.add(edge);
      citations_db.insert(edge);
    }
  }

  if(child_node.article.n_citations == 0)
    child_node.group = "standard";
  else if(levels == 0)
    child_node.group = "leaf";
  else
    this.push(child_node, levels-1);

  if(this.nodes.getIds().indexOf(child_node._id) < 0)
  {
    this.nodes.add(child_node);
  }
  else
  {
    this.nodes.update(child_node);
  }
}

ScholarCrawler.prototype.push = function(parent_node, levels)
{
  assert(levels >= 0, "levels should be non-negative");

  this.stack.push([parent_node, levels]);
  if(!parent_node.is_dummy)
  {
    parent_node.group = "processing";
    if(this.nodes.getIds().indexOf(parent_node._id) >= 0)
    {
      this.nodes.update(parent_node);
    }
  }
};

ScholarCrawler.prototype.start = function()
{
  if(this.stack.length > 0)
  {
    var args = this.stack.pop();
    this.add_citations(args[0], args[1]);
  }

  var crawler = this;
  setTimeout(function() { crawler.start() }, 1000);
};
