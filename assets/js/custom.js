// Loader
setTimeout(function(){
    $('.loader').fadeToggle();
}, 1500);

$("a[href='#top']").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
});

// header

const header = document.querySelector("header");
const sectionOne = document.querySelector(".change-name");

const sectionOneOptions = {
  rootMargin: "-200px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function(
  entries,
  sectionOneObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      header.classList.add("nav-scrolled");
    } else {
      header.classList.remove("nav-scrolled");
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(sectionOne);

// testimonial 
$('.carousel-testimonial').owlCarousel({
    loop:true,
    margin:0,
    responsiveClass:true,
    pagination:true,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:2,
            nav:false
        },
        1000:{
            items:3,
            nav:true,
            loop:false
        }
    }
})

// About Us

$('.owl-what-they-say').owlCarousel({
  items:2,
  loop:true,
  dots: false,
  nav: false,
  autoplay: true,
  margin:30,
    responsive:{
      0:{
        items:1
      },
      767:{
        items:1
      },
      1200:{
        items:2
      },
      1600:{
        items:2
      }
    }
})