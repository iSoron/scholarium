function MainMenuView() {};

MainMenuView.prototype.render = function(container)
{
  var main_menu_div = document.createElement("div");
  $(main_menu_div).addClass("main_menu");

  $(main_menu_div).load("app/templates/main_menu.html", function() {
    document.forms[0].onsubmit = function() {
      var seed_url = $("input[name=url]").val();
      var view = new ShowMapView(seed_url);
      view.render(container);
      return false;
    };
  });

  $(container).empty();
  $(container).removeClass();
  container.appendChild(main_menu_div);
}
