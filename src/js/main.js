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
