let inScroll = false;

function accordeon(btn) {
  $(btn).on('click', function () {
    let thisBtn = this;
    $(btn).each(function (index, element) {
      let accordItem = $(this).parent();
      if (thisBtn == element) {
        if (accordItem.hasClass('active')) {
          accordItem.removeClass('active');
        } else {
          accordItem.addClass('active');
        }
      } else {
        if (accordItem.hasClass('active')) {
          accordItem.removeClass('active');
        }
      }
    })
  });
}

function mobilemenu(btn, closeBtn, menuItem, menu) {
  $(btn).on('click', function () {
    $(menu).fadeIn(300);
    inScroll = true;
  });
  $(closeBtn).on('click', function () {
    $(menu).fadeOut(300);
    inScroll = false;
  });
  $(menuItem).on('click', function () {
    $(menu).fadeOut(300);
    inScroll = false;
  });
}

function carousel(container, prevBtn, nextBtn) {
  const carousel = $(container).owlCarousel({
    loop: false,
    margin: 0,
    nav: false,
    dots: false,
    items: 1
  });

  $(nextBtn).click(function () {
    carousel.trigger('next.owl.carousel');
  });

  $(prevBtn).click(function () {
    carousel.trigger('prev.owl.carousel');
  });
}

function form() {
  $('#section-form__form').on('submit', function (event) {
    event.preventDefault();

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://webdev-api.loftschool.com/sendmail",
      "method": "POST",
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "name": $('.section-form__input[name="name"]').val(),
        "phone": $('.section-form__input[name="phone"]').val(),
        "comment": $('.section-form__input[name="comment"]').val(),
        "to": "hombrehumor@gmail.com"
      }
    }

    $.ajax(settings).done(function (response) {
      inScroll = true;
      $('.overlay--form').fadeIn();
      $('.modal--form').fadeIn();
      if (response.message == "Письмо успешно отправлено") {
        $('.modal__text--formresp').text('Сообщение отправлено');
      } else {
        $('.modal__text--formresp').text('При отправке сообщения произошла ошибка!');
      }
      $('.modal__okbtn').on('click', function () {
        inScroll = false;
        $('.overlay--form').fadeOut();
        $('.modal--form').fadeOut();
      });
    });
  });
}

function modal(params) {
  $(params.openBtn).on('click', function () {
    inScroll = true;
    const inTitle = $(this).parent().parent().find(params.title).text();
    const inText = $(this).parent().parent().find(params.text).text();
    $(params.modal).find(params.modalTitle).text(inTitle);
    $(params.modal).find(params.modalText).text(inText);
    $(params.overlay).fadeIn();
    $(params.modal).fadeIn();

    $(params.closeBtn).on('click', function () {
      inScroll = false;
      $(params.overlay).fadeOut();
      $(params.modal).fadeOut();
    })
  });
}

accordeon('.section-team__btn');
accordeon('.section-menu__button');
carousel('.owl-carousel', '.slider-left__btn', '.slider-right__btn');
form();
modal({
  openBtn: '.review__view',
  title: '.review__title',
  text: '.review__text',
  modal: '.modal--reviews',
  overlay: '.overlay--reviews',
  modalTitle: '.modal__title',
  modalText: '.modal__text',
  closeBtn: '.modal__close'
});

// OPS

const sections = $(".section");
const display = $(".main");

mobilemenu('.hamburger-button', '.mobile__close', '.mobile-nav__link', '.mobile');

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

const setActiveMenuItem = itemEq => {
  const nowItem = $('.pagepanel__button').eq(itemEq).addClass('pagepanel__button--active');
  $('.pagepanel__button').not(nowItem).removeClass('pagepanel__button--active');
}

const performTransition = sectionEq => {
  const position = `${sectionEq * -100}%`;

  if (inScroll) return;

  inScroll = true;

  sections
    .eq(sectionEq)
    .addClass("active-js")
    .siblings()
    .removeClass("active-js");

  display.css({
    transform: `translate(0, ${position})`,
    "-webkit-transform": `translate(0, ${position})`
  });

  setTimeout(() => {
    inScroll = false;
    setActiveMenuItem(sectionEq);
  }, 1300);
};

const scrollToSection = direction => {
  const activeSection = sections.filter(".active-js");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === "up" && prevSection.length) {
    performTransition(prevSection.index());
  }

  if (direction === "down" && nextSection.length) {
    performTransition(nextSection.index());
  }
};

$(document).on({
  wheel: e => {
    const deltaY = e.originalEvent.deltaY;
    const direction = deltaY > 0 ? "down" : "up";

    scrollToSection(direction);
  },
  keydown: e => {
    switch (e.keyCode) {
      case 40:
        scrollToSection("down");
        break;

      case 38:
        scrollToSection("up");
        break;
    }
  },
  touchmove: e => e.preventDefault()
});


$('[data-scroll-to]').on('click', e => {
  e.preventDefault();

  const target = parseInt($(e.currentTarget).attr('data-scroll-to'));

  performTransition(target);

})

if (isMobile) {
  $(document).swipe({
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {

      const scrollDirection = direction === 'down' ? 'up' : 'down';

      scrollToSection(scrollDirection);
    }
  });
}

// Yandex map

ymaps.ready(init);

function init() {
  const myMap = new ymaps.Map("map", {
    center: [59.936249, 30.295334],
    zoom: 16,
    controls: []
  });

  myMap.behaviors.disable('scrollZoom');

  const mapMarker = {
    iconImageHref: './images/icon/map-marker.svg',
    iconImageSize: [46, 57.727],
    iconImageOffset: [-36, -57.727],
    iconLayout: 'default#image'
  };

  const myPlacemark = new ymaps.Placemark([59.935625, 30.301541], {
    hintContent: 'Mr. Burger на Галёрной',
    balloonContent: 'Mr. Burger на Галёрной, 1'
  }, mapMarker);
  const myPlacemark2 = new ymaps.Placemark([59.935037, 30.307211], {
    hintContent: 'Mr. Burger на Вознесенском',
    balloonContent: 'Mr. Burger на Вознесенском проспекте, 1'
  }, mapMarker);
  const myPlacemark3 = new ymaps.Placemark([59.939666, 30.292287], {
    hintContent: 'Mr. Burger на Кадетской',
    balloonContent: 'Mr. Burger на Кадетской линии ВО, 4'
  }, mapMarker);
  const myPlacemark4 = new ymaps.Placemark([59.940588, 30.285849], {
    hintContent: 'Mr. Burger на Большом проспекте ВО',
    balloonContent: 'Mr. Burger на Большом проспекте ВО, 15'
  }, mapMarker);

  myMap.geoObjects.add(myPlacemark);
  myMap.geoObjects.add(myPlacemark2);
  myMap.geoObjects.add(myPlacemark3);
  myMap.geoObjects.add(myPlacemark4);
}

// YT player

let player;

let width = "660";

if ($('.section').width() < 768) {
  width = "500";
}
if ($('.section').width() < 480) {
  width = "300";
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    width: width,
    videoId: "iM_KMYulI_s",
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  const duration = player.getDuration();
  let interval;

  $(".player").removeClass("hidden");

  clearInterval(interval);

  interval = setInterval(() => {
    const completed = player.getCurrentTime();
    const percents = (completed / duration) * 100;

    changeButtonPosition(percents);
  }, 1000);
}

function onPlayerStateChange(event) {
  const playerButton = $(".player__start");
  switch (event.data) {
    case 1:
      $(".player__wrapper").addClass("active");
      playerButton.addClass("paused");
      break;
    case 2:
      playerButton.removeClass("paused");
      break;
  }
}

$(".player__start").on("click", e => {
  const playerStatus = player.getPlayerState(); // 0 - ended, 1 - played, 2 - paused ...

  if (playerStatus !== 1) {
    player.playVideo();
  } else {
    player.pauseVideo();
  }
});


$(".player__playback").on("click", e => {
  e.preventDefault();
  const bar = $(e.currentTarget);
  const newButtonPosition = e.pageX - bar.offset().left;
  const clickedPercents = (newButtonPosition / bar.width()) * 100;
  const newPlayerTime = (player.getDuration() / 100) * clickedPercents;

  changeButtonPosition(clickedPercents);
  player.seekTo(newPlayerTime);
});

changeVolumeButtonPosition(100);

$(".player__volume-bar").on("click", e => {
  e.preventDefault();
  const bar = $(e.currentTarget);
  const newButtonPosition = e.pageX - bar.offset().left;
  const clickedPercents = (newButtonPosition / bar.width()) * 100;

  changeVolumeButtonPosition(clickedPercents);
  player.setVolume(clickedPercents);
});

$(".player__splash").on("click", e => {
  player.playVideo();
});

function changeButtonPosition(percents) {
  $(".player__playback-button").css({
    left: `${percents}%`
  });
}

function changeVolumeButtonPosition(percents) {
  $(".player__volume-button").css({
    left: `${percents}%`
  });
}