var gui = require('nw.gui');
var win = gui.Window.get();

win.maximize();

var view = new MainMenuView();
view.render(document.getElementById("main"));
