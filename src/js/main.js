var assert = require('assert');
var gui  = require('nw.gui');
var nedb = require('nedb');
var path = require('path');
var win = gui.Window.get();

win.maximize();

function createDB(name)
{
  return new nedb({  
    filename : path.join(gui.App.dataPath, name + '.db'),
    autoload: true
  });
}

function open_external(url)
{
  gui.Shell.openExternal(url);
  return false;
}

var articles_db = createDB("articles");
var citations_db = createDB("citations");
var maps_db = createDB("maps");

new MainMenuView().render(document.getElementById("main"));
