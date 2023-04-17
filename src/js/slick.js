$(document).ready(function () {
    $('.opinions__boxes').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: false,
        mobileFirst: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }],

    });
})


  
$('.headers__boxes').slick({
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,

});