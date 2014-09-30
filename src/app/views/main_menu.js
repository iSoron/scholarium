function MainMenuView() {};

MainMenuView.prototype.render = function(container)
{
  var main_menu_div = document.createElement("div");
  $(main_menu_div).addClass("main_menu");

  $(main_menu_div).load("app/templates/main_menu.html", function()
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
            a.onclick = function() {
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
