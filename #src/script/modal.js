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