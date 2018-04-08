$(document).ready(function(){
  
  let yukaMullenBio = $('#Yuka-Mullen-bio');
  let jinjinGeBio = $('#Jinjin-Ge-bio');
  let alexTranBio = $('#Alex-Tran-bio');


  /*Jinjin Ge hovercard functionality*/
  $('#Jinjin-Ge-profile').on('click', function () {
    jinjinGeBio.css('display', 'block');
    }
  );

  jinjinGeBio.find('.close-hovercard').on('click', function () {
    jinjinGeBio.css('display', 'none');
    event.preventDefault();
    }
  );


  /*Yuka Mullen hovercard functionality*/
  $('#Yuka-Mullen-profile').on('click', function () {
    yukaMullenBio.css('display', 'block');
    }
  );

  yukaMullenBio.find('.close-hovercard').on('click', function () {
    yukaMullenBio.css('display', 'none');
    event.preventDefault();
    }
  );

  /*Alex Tran hovercard functionality*/
  $('#Alex-Tran-profile').on('click', function () {
    alexTranBio.css('display', 'block');
    }
  );

  alexTranBio.find('.close-hovercard').on('click', function () {
    alexTranBio.css('display', 'none');
    event.preventDefault();
    }
  );

});
