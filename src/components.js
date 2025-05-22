const imgs = [
    {
        id: "dbg",
        url: "public/bg_template.png",
        tint1: {r: 0, g: 0, b: 0},
        tint2: {r: 0, g: 0, b: 0}
    },
    {
        id: "bg",
        url: "public/back_template.png",
        tint1: {r: 50, g: 50, b: 50},
        tint2: {r: 50, g: 50, b: 50}
    },
    {
        id: "pokeball",
        url: "public/pokeball_template.png",
        tint1: {r: 100, g: 100, b: 100},
        tint2: {r: 100, g: 100, b: 100}
    },
    {
        id: "header",
        url: "public/header_template.png",
        tint1: {r: 100, g: 100, b: 100},
        tint2: {r: 100, g: 100, b: 100}
    },
    {
        id: "subheader",
        url: "public/subheader_template.png",
        tint1: {r: 100, g: 100, b: 100},
        tint2: {r: 100, g: 100, b: 100}
    },
    {
        id: "slots",
        url: "public/slot_template.png",
        tint1: {r: 100, g: 100, b: 100},
        tint2: {r: 100, g: 100, b: 100}
    },
]


function resetLimbRotations(playerModel) {
    // Children indices:
    // 0: body/head (main group)
    // 1: head
    // 2: right arm
    // 3: left arm
    // 4: right leg
    // 5: left leg

    for (let i = 0; i < playerModel.children.length; i++) {
        if (playerModel.children[i].rotation) {
            playerModel.children[i].rotation.x = 0;
            playerModel.children[i].rotation.y = 0;
            playerModel.children[i].rotation.z = 0;
        }
    }
    if (playerModel.rotation) {
        playerModel.rotation.x = 0;
        playerModel.rotation.y = 0;
        playerModel.rotation.z = 0;
    }
}

const poses = {
    walk: function(e, animate, startTime) {
        resetLimbRotations(e.detail.playerModel);

        if (animate) {
            var t = (Date.now() - startTime) / 1000;

            e.detail.playerModel.children[2].rotation.x = Math.sin(t ) / 2;
            e.detail.playerModel.children[3].rotation.x = -Math.sin(t) / 2;
            e.detail.playerModel.children[4].rotation.x = Math.sin(t) / 2;
            e.detail.playerModel.children[5].rotation.x = -Math.sin(t ) / 2;
        }
    },
    dab: function(e, animate, startTime) {
            resetLimbRotations(e.detail.playerModel);

            e.detail.playerModel.children[0].rotation.x = Math.PI/6;
            e.detail.playerModel.children[2].rotation.x = -Math.PI / 1.6;
            e.detail.playerModel.children[2].rotation.z = Math.PI / 4;
            e.detail.playerModel.children[3].rotation.z = Math.PI / 3;
            e.detail.playerModel.children[3].rotation.x = -Math.PI / 1.5;
            e.detail.playerModel.children[4].rotation.x = 0;
            e.detail.playerModel.children[5].rotation.x = 0;

            e.detail.playerModel.children[5].rotation.z = Math.PI/16;
            e.detail.playerModel.children[4].rotation.z = -Math.PI/16;

            if (animate) {
                var t = (Date.now() - startTime) / 1000;
                const swayIntensity = 0.2;
                const swaySpeed = 1.5;

                e.detail.playerModel.children[2].rotation.x += Math.sin(t * swaySpeed * 1.2) * swayIntensity * 0.2;
                e.detail.playerModel.children[3].rotation.x += Math.cos(t * swaySpeed * 1.3) * swayIntensity * 0.2;

                e.detail.playerModel.children[4].rotation.x += Math.sin(t * swaySpeed * 0.8) * swayIntensity * 0.5;
                e.detail.playerModel.children[5].rotation.x += -Math.sin(t * swaySpeed * 0.8) * swayIntensity * 0.5;
            }
        },
        stand: function(e, animate, startTime) {
            resetLimbRotations(e.detail.playerModel);
        },
        leon: function(e, animate, startTime) {
          resetLimbRotations(e.detail.playerModel);

          e.detail.playerModel.children[0].rotation.x = Math.PI/4
          e.detail.playerModel.children[0].rotation.z = -Math.PI/16;


          e.detail.playerModel.children[4].rotation.z = -Math.PI / 8;
          e.detail.playerModel.children[5].rotation.z = Math.PI / 8;
          e.detail.playerModel.children[5].rotation.x = -Math.PI / 16;
          e.detail.playerModel.children[4].rotation.x = -Math.PI / 16;

          e.detail.playerModel.children[2].rotation.x = -Math.PI + Math.PI/8;
          e.detail.playerModel.children[2].rotation.y = -Math.PI / 12;
          e.detail.playerModel.children[2].rotation.z = -Math.PI/16;

          e.detail.playerModel.children[3].rotation.x = -Math.PI / 10;
          e.detail.playerModel.children[3].rotation.y = -Math.PI / 12;
          e.detail.playerModel.children[3].rotation.z = Math.PI / 12;



          // Ambient movement (only if animate is true)
          if (animate) {
              var t = (Date.now() - startTime) / 1000;
              const swayIntensity = 0.2;
              const swaySpeed = 0.8;

              e.detail.playerModel.children[0].rotation.x += Math.sin(t * swaySpeed) * swayIntensity * 0.05;

              e.detail.playerModel.children[2].rotation.x += Math.sin(t * swaySpeed * 1.1) * swayIntensity * 0.05;
              e.detail.playerModel.children[3].rotation.x += Math.cos(t * swaySpeed * 1.2) * swayIntensity * 0.1;

              e.detail.playerModel.children[4].rotation.z += Math.sin(t * swaySpeed * 0.9) * swayIntensity * 0.05;
              e.detail.playerModel.children[5].rotation.z += -Math.sin(t * swaySpeed * 0.9) * swayIntensity * 0.05;

              if (e.detail.playerModel.children[1]) {
                   e.detail.playerModel.children[1].rotation.x += Math.sin(t * swaySpeed * 1.5) * swayIntensity * 0.05;
              }
          }
    }
};
