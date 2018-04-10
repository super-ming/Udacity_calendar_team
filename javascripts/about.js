$(document).ready(function(){
  
  let yukaMullenModal = $('#Yuka-Mullen-modal');
  let jinjinGeModal = $('#Jinjin-Ge-modal');
  let alexTranModal = $('#Alex-Tran-modal');
  let jacobOlsonModal = $('#Jacob-Olson-modal');
  
  // let person = $('name').text();

  $('.profile').on('click', function () {
    let person = $(this).find('.name').text();
    if (person === 'Jinjin Ge') {
    jinjinGeModal.css('display', 'block');
    } else if (person === 'Yuka Mullen') {
    yukaMullenModal.css('display', 'block');
    } else if (person === 'Jacob Olson') {
    jacobOlsonModal.css('display', 'block');
    } else if (person === 'Alex Tran') {
    alexTranModal.css('display', 'block');
    } else {
    let thisRow = $(this).parent().attr('id');
    if (thisRow === 'roster-row-1') {
      $(this).css({'transform' : 'rotate(350deg)'});
      return $(this);
      } else if (thisRow === 'roster-row-2') {
      $(this).css({'transform' : 'rotate(12deg)'});
      } else if (thisRow === 'roster-row-3') {
      $(this).css({'transform' : 'rotate(342deg)'});
      };
    }
  });

  $('.about-close').on('click', function () {
    $('.modal').css('display', 'none');
  });

});
