/*
	Smooth scroll functionality for anchor links (animates the scroll
	rather than a sudden jump in the page)
*/
$('.js-anchor-link').click(function(e){
  e.preventDefault();
  var target = $($(this).attr('href'));
  if(target.length){
    var scrollTo = target.offset().top;
    $('body, html').animate({scrollTop: scrollTo+'px'}, 800);
  }
});

/*
	Smooth scroll functionality for anchor links (animates the scroll
	rather than a sudden jump in the page)
*/
$('.js-anchor-link').click(function(e){
  e.preventDefault();
  var target = $($(this).attr('href'));
  if(target.length){
    var scrollTo = target.offset().top;
    $('body, html').animate({scrollTop: scrollTo+'px'}, 800);
  }
});

/*
  Nav active state on scroll
*/
const sections = document.querySelectorAll('#section-2, #section-1, #section-4, #section-5');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.btn-box a').forEach(a => a.classList.remove('active'));
      const id = entry.target.getAttribute('id');
      const activeLink = document.querySelector(`.btn-box a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, {
  threshold: 0.2
});

sections.forEach(section => observer.observe(section));