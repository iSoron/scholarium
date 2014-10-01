var scholarius_options = {
};

var visjs_options = {
  stabilize: false,
  nodes: {
    borderWidth: 2,
    borderWidthSelected: 2
  },
  groups: {
    standard: {
      color: {
        border: '#fff',
        background: '#fff',
        highlight: {
          border: '#fff',
          background: '#dd3'
        },
      },
    },
    processing: {
      color: {
        border: '#fff',
        background: '#da2d2f',
        highlight: {
          border: '#fff',
          background: '#dd3'
        },
      },
    },

    leaf: {
      color: {
        border: '#fff',
        background: '#31ae31',
        highlight: {
          border: '#fff',
          background: '#dd3'
        },
      },
    }
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
    fontSize: 14,
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
