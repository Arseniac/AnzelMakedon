var a = 35;
console.log(a);

// $(".lesson__types .lesson__types-list ").hide().prev().click(function() {
// 	$(this).parents(".lesson__types").find(".lesson__types-list").not(this).slideUp().prev().removeClass("active");
//   $(".lesson__types-button").toggleClass("buttonActive");
// 	$(this).next().not(":visible").slideDown().prev().addClass("active");
  
  
  
// });

$(".lesson__types .lesson__types-list ").hide().prev().on("click",(function() {
	$(this).parents(".lesson__types").find(".lesson__types-list").not(this).slideUp().prev().removeClass("active");
  $(".lesson__types-button").toggleClass("buttonActive");
	$(this).next().not(":visible").slideDown().prev().addClass("active");
  
  
  
}));

// $(document).click(function (e) {
//   $el = $(e.target);
//   if ($el.hasClass('buttonActive')) {return false;} 
//   // else if ($el.hasClass('clickme')) {
//   //     $(".buttonActive").toggleClass('buttonActive');

//    else {
//       $(".buttonActive").removeClass('buttonActive');
//       //$(".lesson__types-item").removeClass('active');
//   }
// }); 

// $(document).click(function (e) {
//   $el = $(e.target);
//   if ($el.hasClass('active')) {return false;} 
//   // else if ($el.hasClass('clickme')) {
//   //     $(".buttonActive").toggleClass('buttonActive');

//    else {
      
//       //$(".lesson__types-item").removeClass('active');
//       $(".lesson__types-list").css('display','none');
//   }
// }); 


$(function(){

  $('.lesson__slider').slick({
    arrows: true,
    dots: false,
    // fade: true,
    swipe: false,
  }); 

  $('.katalog__slider').slick({
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipe: false,
    //centerMode: true,
    
    dots: false
  }); 

  $('.offer__slider').slick({
    dots: true,
    swipe: false,
  });

  $('.reviews__slider').slick({
    dots: true,
    //swipe: false,
  });
  
});