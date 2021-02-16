/*
=================================================
-------------------- Global ---------------------
=================================================
*/
// Make script links
var scriptLoader = function (path, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = path;
  script.referrerpolicy = "strict-origin";
  script.onload = function () {
    if (typeof callback == "function") {
      callback();
    } else {
      return false;
    }
  };
  try {
    var scriptOne = document.getElementsByTagName("script")[0];
    if (!scriptOne) {
      return false;
    } else {
      scriptOne.parentNode.insertBefore(script, scriptOne);
    }
  } catch (e) {
    document.getElementsByTagName("head")[0].appendChild(script);
  }
};
scriptLoader("https://code.jquery.com/jquery-3.4.1.min.js")
scriptLoader(
  "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"
);
scriptLoader(
  "https://cdn.jsdelivr.net/gh/jordojordo/cadmium-pardot-template/js/mdb.min.js",
  function () {
    $(document).ready(function () {
      $(".mdb-select").materialSelect();
    });
  }
);
scriptLoader("https://kit.fontawesome.com/cd347917e9.js");
