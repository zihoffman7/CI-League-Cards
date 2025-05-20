$(document).ready(function () {
  $('#pokemonForm .card').each(function () {
    const $card = $(this)

    const updateBackground = function (triggerElem) {
      const $parentCard = triggerElem ? $(triggerElem).closest('.card') : $(this).closest('.card')
      const id = $parentCard.data('id')
      const $target = $(`#${id}`)

      const mon = $parentCard.find('input[name="dexnumber"]').val()
      const isShiny = $parentCard.find('input[name="shiny_enabled"]').is(':checked')
      const height = parseInt($parentCard.find('input[name="height"]').val(), 10)
      const shadow = parseFloat($parentCard.find('input[name="shadow"]').val(), 10)
      const $offsetXInput = $parentCard.find('input[name="offset_x"]')
      const $offsetYInput = $parentCard.find('input[name="offset_y"]')

      let offsetX = parseInt($offsetXInput.val(), 10) || 0
      let offsetY = parseInt($offsetYInput.val(), 10) || 0

      const imagePath = isShiny
        ? `public/pokemon/shiny/${mon}.png`
        : `public/pokemon/regular/${mon}.png`


      const img = new Image()
      img.src = imagePath

      img.onload = () => {
        $target.attr('src', imagePath)
        $target.css({
          width: 'auto',
          height: `${height}px`,
          position: 'absolute'
        })

        requestAnimationFrame(() => {
          const $container = $target.parent()
          const cW = $container.width()
          const cH = $container.height()

          const iW = $target.width()
          const iH = $target.height()

          const centerX = (cW - iW) / 2
          const centerY = (cH - iH) / 2

          const heightChanged = triggerElem && $(triggerElem).attr('name') === 'height'

          $offsetXInput.attr({
            min: -iW / 2,
            max: iW / 2,
            step: 1
          })

          $offsetYInput.attr({
            min: -iH / 2,
            max: iH / 2,
            step: 1
          })

          let offsetX = parseInt($offsetXInput.val(), 10) || 0
          let offsetY = parseInt($offsetYInput.val(), 10) || 0

          if (heightChanged) {
            $offsetXInput.data('touched', false).val(0)
            $offsetYInput.data('touched', false).val(0)
            offsetX = 0
            offsetY = 0
          } else {
            if (!$offsetXInput.data('touched')) {
              offsetX = 0
              $offsetXInput.val(0)
            }
            if (!$offsetYInput.data('touched')) {
              offsetY = 0
              $offsetYInput.val(0)
            }
          }

          const finalX = centerX + offsetX
          const finalY = centerY + offsetY


          $target.css('transform', `translate(${finalX}px, ${finalY}px)`)
          $target.css('filter', `brightness(${1-shadow}) contrast(1) blur(${shadow*4}px)`)
        })
      }






    }

    const $offsetXInput = $card.find('input[name="offset_x"]')
    const $offsetYInput = $card.find('input[name="offset_y"]')
    const $heightInput = $card.find('input[name="height"]')

    $offsetXInput.on('input change', function () {
      $(this).data('touched', true)
      updateBackground(this)
    })
    $offsetYInput.on('input change', function () {
      $(this).data('touched', true)
      updateBackground(this)
    })

    $heightInput.on('input change', function () {
      $offsetXInput.data('touched', false)
      $offsetYInput.data('touched', false)
      $offsetXInput.val(0)
      $offsetYInput.val(0)
      updateBackground(this)
    })

    $card.find('input').not($heightInput).on('input change', function () {
      updateBackground(this)
    })

    $card.find('input[name="shiny_enabled"]').trigger('change')
  })
})
