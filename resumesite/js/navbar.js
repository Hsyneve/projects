 $('.showlist').on('click',function(){
     $(this).toggle();
        $('.hidelist').toggle();
        $('.navdetails').addClass('active');
    });
     $('.hidelist').on('click',function(){
     $(this).toggle();
        $('.showlist').toggle();
        $('.navdetails').removeClass('active');
    });