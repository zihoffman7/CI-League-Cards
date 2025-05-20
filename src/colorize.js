function applyGradientSolidColor(src, startColor, endColor, callback) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = src;

  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const width = canvas.width;
    const height = canvas.height;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const t = x / (width - 1);
        const rGradient = startColor.r * (1 - t) + endColor.r * t;
        const gGradient = startColor.g * (1 - t) + endColor.g * t;
        const bGradient = startColor.b * (1 - t) + endColor.b * t;

        const i = (y * width + x) * 4;
        if (data[i + 3] === 0) continue;
        data[i] = Math.round(rGradient);
        data[i + 1] = Math.round(gGradient);
        data[i + 2] = Math.round(bGradient);
      }
    }

    ctx.putImageData(imageData, 0, 0);
    callback(canvas.toDataURL());
  };


  img.onerror = () => {
    console.error("Failed to load image:", src);
    callback(null);
  };
}

function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c+c).join('');
  }
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function updateImgsFromForm() {
  for (const img of imgs) {
    const enabledCheckbox = document.querySelector(`input[name="${img.id}_enabled"]`);
    const startColorInput = document.querySelector(`input[name="${img.id}_start"]`);
    const endColorInput = document.querySelector(`input[name="${img.id}_end"]`);

    if (!startColorInput || !endColorInput || !enabledCheckbox) continue;

    if (enabledCheckbox.checked) {
      img.tint1 = hexToRgb(startColorInput.value);
      img.tint2 = hexToRgb(endColorInput.value);
    } else {
      img.tint1 = hexToRgb(startColorInput.value);
      img.tint2 = hexToRgb(startColorInput.value);
    }
  }
}

function initFormFromImgs() {
  for (const img of imgs) {
    const enabledCheckbox = document.querySelector(`input[name="${img.id}_enabled"]`);
    const startColorInput = document.querySelector(`input[name="${img.id}_start"]`);
    const endColorInput = document.querySelector(`input[name="${img.id}_end"]`);

    if (!startColorInput || !endColorInput || !enabledCheckbox) continue;

    const toHex = ({r, g, b}) =>
      "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');

    startColorInput.value = toHex(img.tint1);
    endColorInput.value = toHex(img.tint2);

    const isGradient =
      img.tint1.r !== img.tint2.r ||
      img.tint1.g !== img.tint2.g ||
      img.tint1.b !== img.tint2.b;

    enabledCheckbox.checked = isGradient;
  }
}

(() => {
  for (let o of imgs) {
      applyGradientSolidColor(o.url, o.tint1, o.tint2, (coloredDataUrl) => {
        if (coloredDataUrl) {
          document.getElementById(o.id).style.backgroundImage = `url(${coloredDataUrl})`;
          window.dispatchEvent(new Event('resize'));

        }
      });
    }

  initFormFromImgs();
})();

document.querySelectorAll('.gradientForm').forEach(form => {
  form.addEventListener('input', () => {
    updateImgsFromForm();

    for (const o of imgs) {
      applyGradientSolidColor(o.url, o.tint1, o.tint2, (coloredDataUrl) => {
        if (coloredDataUrl) {
          document.getElementById(o.id).style.backgroundImage = `url(${coloredDataUrl})`;
          window.dispatchEvent(new Event('resize'));
        }
      });
    }
  });
});


document.getElementById('slotbg').addEventListener('input', () => {
  const form = document.getElementById('slotbg');
  const gradient = form.elements['gradient'].checked;
  const bgStart = form.elements['bg_start'].value;
  const bgEnd = form.elements['bg_end'].value;

  document.querySelectorAll('.slot').forEach(slot => {
    if (gradient) {
      slot.style.background = `linear-gradient(${bgStart}, ${bgEnd})`;
    } else {
      slot.style.background = bgStart;
    }
  });
});

document.getElementById('slotbg').dispatchEvent(new Event('input'));
