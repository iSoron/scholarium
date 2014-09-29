var visjs_options = {
  nodes: {
    borderWidth: 3,
    borderWidthSelected: 3,
    color: {
      border: '#fff',
      background: '#fff',
      highlight: {
        border: '#fff',
        background: '#dd3'
      },
      hover: {
        border: '#2B7CE9',
        background: '#D2E5FF'
      }
    },
  },

  edges: {
    color: {
      color:'rgba(255, 255, 255, 0.15)',
      highlight:'#dd3',
      hover: '#0000FF'
    },
    style: "arrow",
    width: 1.5,
    arrowScaleFactor: 0.25
  },

  tooltip: {
    delay: 300,
    fontColor: "#fff",
    fontSize: 14, // px
    fontFace: "verdana",
    color: {
      border: "#000",
      background: "rgba(0,0,0,0.5)"
    }
  },

  physics: {
    barnesHut: {
        enabled: true,
        gravitationalConstant: -2000,
        centralGravity: 0.2,
        springLength: 95,
        springConstant: 0.04,
        damping: 0.15
    }
  }
};

var node_queued_color = jQuery.extend({},visjs_options.nodes.color);
node_queued_color.background = '#da2d2f';
