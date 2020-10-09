"use strict";

//IE HTMLcollection foreach polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

;

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }

    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

;
document.querySelectorAll('.interactive-trigger').forEach(function (item) {
  return item.addEventListener('click', function () {
    var target = item.getAttribute('data-target'),
        selector = item.getAttribute('data-sel'),
        toggleClass = item.getAttribute('data-toggleclass'),
        detailsMode = item.getAttribute('data-detailsMode');
    if (target == "this") target = item;
    if (target == "parent") target = item.parentNode;
    if (target == "grandparent") target = item.parentNode.parentNode;
    if (!target) target = document;
    if (selector) target.querySelectorAll(selector).forEach(function (item) {
      if (detailsMode && item.classList.contains('details')) {
        if (item.style.maxHeight) item.style.removeProperty('max-height');else item.style.maxHeight = item.scrollHeight + 'px';
      }

      item.classList.toggle(toggleClass);
    });
    return target.classList.toggle(toggleClass);
  });
});
;
var imagepopupcontainer = document.querySelector('.imagepopup');
var imgpopuped = false,
    imgpopupposition = 0;

var popupClick = function popupClick(elem) {
  imagepopupcontainer.innerHTML = "";
  var clone = elem.cloneNode(true);
  imagepopupcontainer.appendChild(clone);
  imagepopupcontainer.classList.remove('hidden');
  imgpopuped = true;
  imgpopupposition = pageYOffset;
};

var popupCheck = function popupCheck(elem) {
  if (!elem.onclick) {
    elem.onclick = function () {
      return popupClick(elem);
    };
  }
};

document.querySelectorAll('.popuping').forEach(function (item) {
  return item.onclick = function () {
    return popupClick(item);
  };
});

imagepopupcontainer.onclick = function () {
  imgpopuped = false;
  this.classList.add('hidden');
};

document.addEventListener('scroll', function () {
  if (imgpopuped && Math.abs(imgpopupposition - pageYOffset) > 15) {
    imgpopuped = false;
    imagepopupcontainer.classList.add('hidden');
  }
});
;
var textarea = document.querySelector('.calculation__form textarea');

if (textarea) {
  textarea.addEventListener('input', function () {
    if (textarea.offsetHeight < textarea.scrollHeight) textarea.classList.add('overflow');else textarea.classList.remove('overflow');
  });
}

;

function scratchFooterTags() {
  var prevHeight;
  document.querySelectorAll('.footerTags-content-item').forEach(function (item) {
    item.classList.remove('footerTags-content-item_notfirst');
    var itemHeight = item.getBoundingClientRect().bottom;

    if (prevHeight == undefined) {
      prevHeight = itemHeight;
    } else {
      if (itemHeight == prevHeight) {
        item.classList.add('footerTags-content-item_notfirst');
      } else {
        prevHeight = itemHeight;
      }
    }
  });
}

window.onresize = scratchFooterTags;
window.addEventListener('resize', new function () {
  scratchFooterTags();
}());
window.addEventListener('load', new function () {
  scratchFooterTags();
}());
;

function getVideoHtml(dataLink) {
  return '<iframe height="100%" width="100%" src="' + dataLink + '?autoplay=1" frameborder="0" allow="accelerometer; autoplay="1"; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
}

document.querySelectorAll('.video').forEach(function (item) {
  return item.onclick = function () {
    item.innerHTML = getVideoHtml(item.getAttribute('data-link'));

    item.onclick = function () {
      return false;
    };
  };
});
;
document.querySelectorAll('.case__container .swiper-container').forEach(function (item) {
  return item = new Swiper(item, {
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: '.swiper-pagination'
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
});
new Swiper('.tags .swiper-container', {
  slidesPerView: 'auto',
  slidesOffsetBefore: 20,
  breakpoints: {
    1920: {
      slidesOffsetBefore: 20
    },
    1805: {
      slidesOffsetBefore: 19
    },
    1690: {
      slidesOffsetBefore: 18
    },
    1575: {
      slidesOffsetBefore: 17
    },
    1460: {
      slidesOffsetBefore: 16
    },
    1344: {
      slidesOffsetBefore: 15
    },
    1229: {
      slidesOffsetBefore: 14
    },
    1114: {
      slidesOffsetBefore: 13
    },
    999: {
      slidesOffsetBefore: 12
    },
    884: {
      slidesOffsetBefore: 11
    },
    320: {
      slidesOffsetBefore: 10
    }
  },
  navigation: {
    nextEl: '.tags__next',
    prevEl: '.tags__prev'
  }
});
objectFitImages();