/* Copyright (C) 2014 Alinson Xavier
 *
 * This file is part of Scholarium.
 *
 * Scholarium is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 * 
 * This software is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this software. If not, see <http://www.gnu.org/licenses/>.
 */

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
        background: '#fff',
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
