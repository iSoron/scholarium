function ShowMapView(seed_url) {
  this.seed_url = seed_url;
};

ShowMapView.prototype.render = function(container)
{
  var edges = new vis.DataSet();
  var nodes = new vis.DataSet();

  var parser = new ScopusParser();
  var crawler = new ScholarCrawler(parser, nodes, edges);
  crawler.push({ is_dummy: true, article: { citations_url: this.seed_url } }, 2);
  crawler.next();

  document.crawler = crawler;

  var network_div = document.createElement('div');
  $(network_div).addClass("mynetwork");
  $(container).empty();
  container.appendChild(network_div)

  var data = { nodes: nodes, edges: edges };
  var network = new vis.Network(network_div, data, visjs_options);

  network.on('doubleClick', function(params) {
    if(params.nodes.length > 0)
      crawler.push(nodes.get(params.nodes[0]), 1);
  });

  network.on("resize", function(params) {
    var height = $(window).height();
    var width = $(window).width();
    $(".mynetwork").css("width", width);
    $(".mynetwork").css("height", height);
  });
};
