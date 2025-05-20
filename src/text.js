$(document).ready(function () {
  $('#textForm .textfield').each(function () {
    const $card = $(this)

    const updateText = function () {
      const $parentCard = $(this).closest('.textfield')
      const id = $parentCard.data('id') // e.g., "text1"
      const $target = $(`#${id} .text`) // selects #text1 .text

      const text = $parentCard.find('input[name="text"]').val()
      $target.text($target.hasClass('toUpper') ? text.toUpperCase() : text)


    }

    $card.find('input[name="text"]').on('input change', updateText)
    $card.find('input[name="text"]').trigger('input')
  })
})
