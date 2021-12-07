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

