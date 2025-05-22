const container = document.getElementById("skinContainer");


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



var startTime = Date.now();
container.addEventListener("skinRender", function (e) {
    if (animate) {
        var t = (Date.now() - startTime) / 1000;

        e.detail.playerModel.children[2].rotation.x = Math.sin(t * 2.5) / 2;
        e.detail.playerModel.children[3].rotation.x = -Math.sin(t * 2.5) / 2;
        e.detail.playerModel.children[4].rotation.x = Math.sin(t * 2.5) / 2;
        e.detail.playerModel.children[5].rotation.x = -Math.sin(t * 2.5) / 2;

        /*
          DAB

          e.detail.playerModel.children[0].rotation.x = Math.PI/6
          e.detail.playerModel.children[2].rotation.x = -Math.PI / 1.6;
          e.detail.playerModel.children[2].rotation.z = Math.PI / 4;
          e.detail.playerModel.children[3].rotation.z = Math.PI / 3;
          e.detail.playerModel.children[3].rotation.x = -Math.PI / 1.5;
          e.detail.playerModel.children[4].rotation.x = Math.PI/6;
          e.detail.playerModel.children[5].rotation.x = -Math.PI/6;

        */
    }
})

setTimeout(() => {
  window.dispatchEvent(new Event('resize'));
}, 2000);
