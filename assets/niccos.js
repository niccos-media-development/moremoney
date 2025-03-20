document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".cust_wish-list").forEach(function (item) {
        item.addEventListener("click", function () {
            this.classList.toggle("active");
        });
    });
    // Niccos Product Grid
    const sliderContainers = document.querySelectorAll(".cust-slider-container");

    document.querySelectorAll(".cust-slider-container").forEach((container) => {
  const slider = container.querySelector(".cust-slider");
  const slides = container.querySelectorAll(".cust-slide");
  const prevBtn = container.querySelector(".cust-prev");
  const nextBtn = container.querySelector(".cust-next");
  const progressBar = container.querySelector(".cust-slider-progress-bar");
  let currentSlide = 0;
  let startX = 0;
  let startY = 0;
  let moveX = 0;
  let moveY = 0;
  let isDragging = false;
  let isHorizontalSwipe = false;
  const totalSlides = slides.length;

  function updateSlider(index) {
    currentSlide = index;
    const translateX = -(index * 100);
    slider.style.transform = `translateX(${translateX}%)`;

    slides.forEach((slide, i) => {
      slide.classList.toggle("cust-active", i === index);
    });

    // **Update Progress Bar for Mobile**
    const progressWidth = ((currentSlide + 1) / totalSlides) * 100;
    progressBar.style.width = `${progressWidth}%`;
  }

  // Previous Slide (Desktop Button)
  prevBtn.addEventListener("click", () => {
    currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
    updateSlider(currentSlide);
  });

  // Next Slide (Desktop Button)
  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider(currentSlide);
  });

  // Touch Start (Mobile)
  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
    isHorizontalSwipe = false;
  });

  // Touch Move (Allow Vertical Scroll but Prevent Horizontal Page Movement)
  slider.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    moveX = e.touches[0].clientX - startX;
    moveY = e.touches[0].clientY - startY;

    if (!isHorizontalSwipe) {
      isHorizontalSwipe = Math.abs(moveX) > Math.abs(moveY);
    }

    if (isHorizontalSwipe) {
      e.preventDefault(); // Prevent page from scrolling when swiping
      slider.style.transform = `translateX(${moveX}px)`;
    }
  }, { passive: false });

  // Touch End (Mobile Swipe Detection)
  slider.addEventListener("touchend", () => {
    isDragging = false;

    if (isHorizontalSwipe) {
      if (moveX > 50) {
        // Swipe Right (Previous Slide)
        currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
      } else if (moveX < -50) {
        // Swipe Left (Next Slide)
        currentSlide = (currentSlide + 1) % totalSlides;
      }
      updateSlider(currentSlide);
    }
  });

  // **Initialize Progress Bar**
  updateSlider(0);
});




    // Footer Mobile Dropdown
    document.querySelectorAll('.footer__block--links p.h6').forEach(function(item) {
      item.addEventListener('click', function() {
        this.closest('.footer__block--links').classList.toggle('active');
      });
    });
    // custom accordian popup
    document.querySelectorAll(".pop_button").forEach(function (button) {
        button.addEventListener("click", function () {
            let parentBlock = this.closest(".product-info__block-item");
            if (parentBlock) {
                parentBlock.querySelector(".product_accordian_poup")?.classList.remove("hidden");
                parentBlock.querySelector(".overlay_custom")?.classList.remove("hidden");
            }
        });
    });

    // Click event on .popup_close
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("popup_close")) {
            let parentPopup = event.target.closest(".product_accordian_poup");
            if (parentPopup) {
                parentPopup.classList.add("hidden");
                let overlay = parentPopup.closest(".product-info__block-item")?.querySelector(".overlay_custom");
                if (overlay) {
                    overlay.classList.add("hidden");
                }
            }
        }
    });

    // Click event on .overlay_custom
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("overlay_custom")) {
            event.target.classList.add("hidden");
            let popup = event.target.closest(".product-info__block-item")?.querySelector(".product_accordian_poup");
            if (popup) {
                popup.classList.add("hidden");
            }
        }
    });
  // Animate first image on collection 
     const productMedia = document.querySelector(".collection__main .product-list .product-card:first-child .product-card__media");
      setTimeout(function() {
        if (productMedia) {
            productMedia.classList.add("animate-slide");
        }
    }, 1000);
    setTimeout(function() {
       if (productMedia) {
            productMedia.classList.remove("animate-slide");
        }
   }, 2000);
 
    // paswdpopup
    const trigger = document.querySelector('[aria-controls="storefront-password-popup"]');
    const popup = document.querySelector('.password_form_popup');
    const overlay = document.querySelector('.overlay_custom');
    const closeBtns = document.querySelectorAll('.pop_close, .overlay_custom');

    if (trigger && popup && overlay) {
        trigger.addEventListener("click", function () {
            popup.classList.remove("hidden");
            overlay.classList.remove("hidden");
        });

        closeBtns.forEach(btn => {
            btn.addEventListener("click", function () {
                popup.classList.add("hidden");
                overlay.classList.add("hidden");
            });
        });
    }
    // Update product iomage
      function updateGallery(selectedThumbnail) {
        if (!selectedThumbnail) return;
    
        let altText = selectedThumbnail.querySelector("img")?.getAttribute("alt").trim().replace(/\s+/g, ' ');
    
        document.querySelectorAll('.product-gallery [data-media-type="image"]').forEach(galleryImage => {
            let galleryAlt = galleryImage.querySelector("img")?.getAttribute("alt").trim().replace(/\s+/g, ' ');
    
            if (galleryAlt === altText) {
                galleryImage.classList.remove("hidden");
            } else {
                galleryImage.classList.add("hidden");
            }
        });
     
        const visibleimages = document.querySelectorAll('.product-gallery__image-list .product-gallery__media');
          const visibleIndexes = [];
          
          visibleimages.forEach((image, index) => {
            if (!image.classList.contains('hidden')) {
              visibleIndexes.push(index);
            }
          });
          const buttons = document.querySelectorAll(".product-gallery carousel-navigation.page-dots button");
    

        buttons.forEach((button, index) => {
           if (visibleIndexes.includes(index)) {
                button.style.display = "block"; // Show only buttons for visible images
              } else {
                button.style.display = "none"; // Hide other buttons
              }
        });


        
    }
    let initialThumbnail = document.querySelector(".product-info__block-item :checked + .thumbnail-swatch");
    updateGallery(initialThumbnail);
    if (!initialThumbnail){
      const buttons = document.querySelectorAll(".product-gallery carousel-navigation.page-dots button");
    

        buttons.forEach((button, index) => {
           button.style.display = "block";
        });
    }
    document.addEventListener("click", function (event) {
      if (event.target.closest(".thumbnail-swatch")) {
          let thumbnail = event.target.closest(".thumbnail-swatch");
          updateGallery(thumbnail);
      }
    });

});