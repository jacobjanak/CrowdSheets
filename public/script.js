$(document).ready(() => {

  $('#get-started').on('click', function() {
    const originalText = $(this).text().trim();
    $(this).text('Loading...')

    const link = $('#code-link').val();
    const name = link.substring(link.lastIndexOf('/') + 1);

    $('#view-css').hide()
    $('#view-javascript').hide()
    $('#css-instructions').hide()
    $('#javascript-instructions').hide()

    $.get(`/${name}.css`, (data, err) => {
      $('.code-name').text(name)
      $('#view-css').attr('href', `/${name}.css`);
      $('#view-css').show()
      $('#css-instructions').show()

      $('#get-started-modal').modal('show')
      $(this).text(originalText)
    })

    $.get(`/${name}.js`, (data, err) => {
      console.log(data)
      console.log(err)
      $('.code-name').text(name)
      $('#view-javascript').attr('href', `/${name}.js`);
      $('#view-javascript').show()
      $('#javascript-instructions').show()

      $('#get-started-modal').modal('show')
      $(this).text(originalText)
    })
  })

})
