let menuWidth = $('.header__menu').outerWidth();
let buildingWidth = $('.building__content').outerWidth();

let evenWidth = function () {
    if(menuWidth > buildingWidth || menuWidth < buildingWidth) {
        $('.header__menu').width(buildingWidth);
    }
}
evenWidth();

$(window).on('resize', function(){
    evenWidth();
})

$(window).on('scroll', function(){
    if ($(this).scrollTop() > 400) {
        $('#up').fadeIn(500);
    } else {
        $('#up').fadeOut(300);
    } 
})

$('#up').on('click', function(){
    $('html, body').animate({scrollTop:0}, 800);
})

$('.projects__slider').slick({
    arrows: false,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
            breakpoint: 800,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          }
        ]
})

$('.clients__slider').slick({
    arrows: false,
    dots: true,
    infinite: false,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
})

$('.projects__options').on('click', function(){
    let filterClass = $(this).data('value');

    if (filterClass == ".all") {
        $('.projects__flip-card').removeClass('active');
        $('.projects__subtitle').removeClass('active');
        $('.projects__slider').slick('slickUnfilter'); 
    } else {
        $('.projects__flip-card').removeClass('active');
        $('.projects__subtitle').removeClass('active');
        $('.projects__slider').slick('slickUnfilter');
        $('.projects__slider').slick('slickFilter', filterClass);  
    } 
})

$('.projects__item').on('click', function(){
    $(this).find('.projects__flip-card').toggleClass('active');
    $(this).find('.projects__subtitle').toggleClass('active')
})

$('.order-btn').on('click', function(e){
    e.preventDefault();
    $('#modal').fadeIn();
})

$('#modal').on('click', function(e){
    if( $(e.target).closest('.modal__form').length == 0) {
        $('.modal__input').val('');
        $(this).find('.error').empty();
        $(this).fadeOut();
    } 
})

$('#modal__close').on('click', function(){
    $('.modal__input').val('');
    $(this).parents('.modal').find('.error').empty();
    $(this).parents('.modal').fadeOut();
})

$('#modal__cancel').on('click', function(e){
    e.preventDefault()
    $('.modal__input').val('');
    $(this).parents('.modal').find('.error').empty();
    $(this).parents('.modal').fadeOut();
})
$('#modal__enter').on('click', function(e){
    e.preventDefault();
    
    let name = $('#name').val().trim(),
        phone = $('#phone').val().trim();
       
        if (name == "") {
            return $('#error-name').text('Enter your name')
        } else if (phone == "") {
            return $('#error-phone').text('Enter your phone number')
        }

        $.ajax({
            url: '../ajax/telegram.php',
            type: 'POST',
            cache: false,
            data: {'name': name, 'phone': phone},
            success: function() {
                $('#name').val('');
                $('#phone').val('');
                $('#error-name').empty();
                $('#error-phone').empty();
            }
        }) 
})

$('.modal__input').on('keydown', function(){
    $(this).parent().next().empty()
})


