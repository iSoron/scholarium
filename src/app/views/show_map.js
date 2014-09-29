function ShowMapView(seed_url) {
	this.seed_url = seed_url;
};

ShowMapView.prototype.render = function(container)
{
    var node_ids = [];
    var edges = new vis.DataSet();
    var nodes = new vis.DataSet();

    var parser = new ScopusParser();
    var crawler = new ScholarCrawler(parser, node_ids, nodes, edges);
    crawler.push(this.seed_url, null);
    crawler.start();

    var network_div = document.createElement('div');
    $(network_div).addClass("mynetwork");
    $(container).empty();
    container.appendChild(network_div)

    var data = { nodes: nodes, edges: edges };
    var network = new vis.Network(network_div, data, visjs_options);

    network.on('doubleClick', function(params) {
        gui.Shell.openExternal(nodes.get(params.nodes[0]).url)
    });

    network.on("resize", function(params) {
        var height = $(window).height();
        var width = $(window).width();
        $(".mynetwork").css("width", width);
        $(".mynetwork").css("height", height);
    });
};
