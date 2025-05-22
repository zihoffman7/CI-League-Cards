const container = document.getElementById("skinContainer");
let pose = "walk";

var skinRender = new SkinRender({
  autoResize: true,
  render: {
      taa: true
  }
}, container);
skinRender.render({
  username: location.hash ? location.hash.substring(1) : "ztard7",
  optifine: true,
});

if (location.hash) $("#nameInput").val(location.hash.substring(1));
$("#nameInput").on("change", function () {
  skinRender.clearScene();
  var skin = $("#nameInput").val();
  var options = {};
  if (skin.indexOf("http") === 0) {
    options.url = skin;
  } else {
    options.username = skin;
    location.hash = skin;
  }
  skinRender.render(options);
})

$(".partToggle").on("change", function () {
  skinRender.getModelByName($(this).attr("id")).visible = $(this).is(":checked");
});

var animate = true;
$("#animate").on("change", function () {
  animate = !($(this).is(":checked"));
});

$(".poseToggle").on("change", function () {
  if ($(this).is(":checked")) {
    pose = $(this).prop('id');
  }
});

const startTime = Date.now();
container.addEventListener("skinRender", function(e) {
  if (poses[pose]) {
    poses[pose](e, animate, startTime);
  }
});

setTimeout(() => {
  window.dispatchEvent(new Event('resize'));
}, 2000);
