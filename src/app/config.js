var visjs_options = {
  nodes: {
    color: {
        border: '#bbb',
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

var seed_url = 'http://www.scopus.com/results/results.url?sort=plf-f&src=s&st1=urea+permeation+immobilized&sid=B0FE19FE3CFF4CCF86DD857756E90636.FZg2ODcJC9ArCe8WOZPvA%3a1400&sot=b&sdt=b&sl=34&s=TITLE%28urea+permeation+immobilized%29&origin=searchbasic&txGid=B0FE19FE3CFF4CCF86DD857756E90636.FZg2ODcJC9ArCe8WOZPvA%3a140';

