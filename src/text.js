$(document).ready(function () {
  $('#textForm .textfield').each(function () {
    const $card = $(this)

    const updateText = function () {
      const $parentCard = $(this).closest('.textfield')
      const id = $parentCard.data('id') 
      const $target = $(`#${id} .text`)

      const text = $parentCard.find('input[name="text"]').val()
      $target.text($target.hasClass('toUpper') ? text.toUpperCase() : text)

      if (id === "text4") {
        adjustFontSize($('#text4 .text'), "26px")
      }

      if (id === "text5") {
        adjustFontSize($('#text5 .text'), "16px")
      }

    }

    $card.find('input[name="text"]').on('input change', updateText)
    $card.find('input[name="text"]').trigger('input')


  })
})


function adjustFontSize($element, defaultsize) {
  if (!$element || $element.length === 0 || !$element[0]) {
    console.warn("adjustFontSize: Invalid or empty jQuery element passed. Cannot adjust font size.");
    return;
  }

  $element.css({
    'white-space': 'nowrap',
    'overflow': 'hidden'
  });

  const containerWidth = $element.parent().width();

  if (containerWidth <= 0) {
    console.warn(`adjustFontSize: Parent container of element (ID: ${$element.attr('id') || 'N/A'}) has zero or negative width. Cannot adjust font size effectively.`);
    return;
  }

  $element.css('font-size', defaultsize);

  let currentFontSize = parseFloat($element.css('font-size'));


  while ($element[0].scrollWidth > containerWidth && currentFontSize > 1) {
    currentFontSize -= 1;
    $element.css('font-size', currentFontSize + 'px');
  }

  if ($element[0].scrollWidth > containerWidth) {
    while ($element[0].scrollWidth > containerWidth && currentFontSize > 0.1) {
      currentFontSize -= 0.1;
      $element.css('font-size', currentFontSize + 'px');
    }
  }

  const defaultSizeNum = parseFloat(defaultsize);

  if (currentFontSize < defaultSizeNum && $element[0].scrollWidth < containerWidth) {
      $element.css('font-size', defaultsize);
      if ($element[0].scrollWidth <= containerWidth) {
          currentFontSize = defaultSizeNum;
      }
  }


  const elementIdOrText = $element.attr('id') ? '#' + $element.attr('id') : $element.text().substring(0, 20) + '...';
}
