//function ShowMapView(seed_url) {
//  this.seed_url = seed_url;
//};

function ShowMapView(map) {
  this.map = map;
};

ShowMapView.prototype.render = function(container)
{
  this.nodes = new vis.DataSet();
  this.edges = new vis.DataSet();

  this.nodes.add(this.map.nodes);
  this.edges.add(this.map.edges);

  var parser = new ScopusParser();
  var crawler = new ScholarCrawler(parser, this.nodes, this.edges);
  crawler.start();

  document.crawler = crawler;

  if(!this.map.is_initialized)
  {
    crawler.push({ is_dummy: true, article: { citations_url: this.map.seed_url } }, 2);
    this.map.is_initialized = true;
  }

  var network_div = document.createElement('div');
  $(network_div).addClass("mynetwork");
  $(container).empty();
  container.appendChild(network_div)

  var data = { nodes: this.nodes, edges: this.edges };
  this.network = new vis.Network(network_div, data, visjs_options);

  this.network.on('doubleClick', function(params) {
    if(params.nodes.length > 0)
    {
      crawler.push(this.nodes.get(params.nodes[0]), 1);
    }
    else
    {
      console.log("saving map");
      this.network.storePosition();
      this.map.nodes = this.nodes.get();
      this.map.edges = this.edges.get();
      if(!this.map._id)
        maps_db.insert(this.map);
      else
        maps_db.update({_id: this.map._id}, this.map);
    }
  }.bind(this));

  this.network.on("resize", function(params) {
    var height = $(window).height();
    var width = $(window).width();
    $(".mynetwork").css("width", width);
    $(".mynetwork").css("height", height);
  });
};
