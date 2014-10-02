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

function MainMenuView() {};

MainMenuView.prototype.render = function(container)
{
  var main_menu_div = document.createElement("div");
  $(main_menu_div).addClass("main_menu");

  $(main_menu_div).load("app://root/templates/main_menu.html", function()
  {
    document.forms[0].onsubmit = function()
    {
      var seed_url = $("input[name=url]").val();
      var view = new ShowMapView(new ScholarMap(seed_url));
      view.render(container);
      return false;
    };

    maps_db.find({}, function(err, maps)
    {
        maps.forEach(function(map)
        {
            var ul = document.getElementById('saved_maps_container');
            var li = document.createElement("li");
			var a = document.createElement("a");
            a.onclick = function()
            {
                new ShowMapView(map).render(container);
                return false;
            };
			a.href = "";
            $(a).append(map.nodes[0].title);
			li.appendChild(a);
            ul.appendChild(li);
        });
    });
    
  });

  $(container).empty();
  $(container).removeClass();
  container.appendChild(main_menu_div);
}
