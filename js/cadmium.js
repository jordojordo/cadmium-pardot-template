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
scriptLoader(
  "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"
);
scriptLoader(
  "https://cdn.jsdelivr.net/gh/jordojordo/cadmium-pardot-template/mdb.min.js",
  function () {
    $(document).ready(function () {
      $(".mdb-select").materialSelect();
    });
  }
);
scriptLoader("https://www.google.com/recaptcha/api.js");
scriptLoader("https://kit.fontawesome.com/cd347917e9.js");
var classAdd = function (hashElement, className) {
  var elementSource = document.getElementById(hashElement);
  if (!elementSource) {
    return false;
  } else {
    elementSource.classList.add(className);
  }
};
window.onload = function () {
  classAdd("7ddf32e17a6ac5ce04a8ecbf782ca509", "d-none");
  classAdd("15bbb9d0bbf25e8d2978de1168c749dc", "d-none");
};
// App overview 'attendee everything platform' section
$(".toggle-section .panel-description").not(".active").hide();
$("body").on("click", ".toggle-links .nav-link", function (i) {
  var $this = $(this),
    id = $this.data("toggle");
  $(".toggle-links .nav-link").removeClass("active");
  $this.addClass("active");
  $(".toggle-section .panel-description, .toggle-section .tab-pane")
    .removeClass("active")
    .hide();
  $(".toggle-section [data-toggleid='" + id + "']")
    .addClass("active")
    .fadeIn();
});

// Request Info AJAX
$(function () {
  $("#contactForm").submit(function () {
    var data = $(this).serialize(),
      action = $(this).attr("action"),
      method = $(this).attr("method");
    $("#submitBtn")
      .html(
        '<span id="submitSpinner" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...'
      )
      .addClass("disabled");
    $.ajax({
      url: action,
      type: method,
      data: data,
      success: function (data) {
        let parsedData = JSON.parse(data);
        if (parsedData.success) {
          $("#contactCard").addClass("request-info__hidden");
          $("#contactMessage").addClass("visible");
          $("#contactMessage").removeClass("request-info__hidden");
        } else {
          $("#submitBtn")
            .html("reCaptcha Failed")
            .addClass("bg-danger")
            .removeClass("bg-success");
          $("#returnMessage").removeClass("request-info__hidden");
          $("#returnMessageExt").removeClass("request-info__hidden");
          $("#returnMessage").addClass("request-info__visible");
          $("#returnMessageExt").addClass("request-info__visible");
          $("#returnMessage").html(
            `Error: ${parsedData["error-codes"][0].replace(/-/g, " ")}`
          );
          $("#returnMessageExt").html(
            "Please refresh your page and try again."
          );
        }
      },
      error: function (data) {
        let parsedData = JSON.parse(data);
        $("#submitBtn").html("Server Error").addClass("bg-danger");
        $("#returnMessage").removeClass("request-info__hidden");
        $("#returnMessage").addClass("request-info__visible");
        $("#returnMessage").html(
          `Error: ${parsedData["error-codes"][0].replace(/-/g, " ")}`
        );
        $("#returnMessageExt").html("Please refresh your page and try again.");
      },
    });
    return false; // don't let the form be submitted
  });
});
