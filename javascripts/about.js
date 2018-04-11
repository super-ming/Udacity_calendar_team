$(document).ready(function(){
  
  
  
  let person;
  let thisRow;

  $('.profile').on('click', function () {
    let person = $(this).find('.name').text();
    if (person === 'Jacki Bostow') {
    ;
    } else if (person === 'Jinjin Ge') {
    $('#Jinjin-Ge-modal').css('display', 'block');
    } else if (person === 'Robert Grunau') {
    $('#Robert-Grunau-modal').css('display', 'block');
    } else if (person === 'Ming Ho') {
    $('#Ming-Ho-modal').css('display', 'block');
    } else if (person === 'Yuka Mullen') {
    $('#Yuka-Mullen-modal').css('display', 'block');
    } else if (person === 'Jacob Olson') {
    $('#Jacob-Olson-modal').css('display', 'block');
    } else if (person === 'Alex Tran') {
    $('#Alex-Tran-modal').css('display', 'block');
    } else {
    let thisRow = $(this).parent().attr('id');
      if (thisRow === 'roster-row-1') {
      $(this).css({'transform' : 'rotate(350deg)'});
      } else if (thisRow === 'roster-row-2') {
      $(this).css({'transform' : 'rotate(12deg)'});
      } else if (thisRow === 'roster-row-3') {
      $(this).css({'transform' : 'rotate(331deg)'});
      };
    };
  });

  $('.about-close').on('click', function () {
    $('.modal').css('display', 'none');
  });

});
