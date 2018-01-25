      var order_btn = document.querySelectorAll(".buy");
      var order_popup = document.querySelector(".add-item");
      var order_close = document.querySelector(".modal-content-close");
      
      for (var i = order_btn.length - 1; i >= 0; i--) {
          order_btn[i].addEventListener("click", function(event){
            event.preventDefault();
            order_popup.classList.add("modal-content-show");
        });
      }

      order_close.addEventListener("click", function(event){
        event.preventDefault();
        order_popup.classList.remove("modal-content-show");
      });

      window.addEventListener("keydown", function(event){
        if (event.keyCode === 27) {
          if (order_popup.classList.contains("modal-content-show")) {
            order_popup.classList.remove("modal-content-show");
          }
        }
      });   

      var link = document.querySelector(".popup-btn");
      var popup = document.querySelector(".modal-content");
      var close = popup.querySelector(".modal-content-close");
      var namefield = popup.querySelector("[name=name]");

      link.addEventListener("click", function(event) {
        event.preventDefault();
        popup.classList.add("modal-content-show");
        namefield.focus();
      });

      close.addEventListener("click", function(event){
        event.preventDefault();
        popup.classList.remove("modal-content-show");
      });

      window.addEventListener("keydown", function(event){
        if (event.keyCode === 27) {
          if (popup.classList.contains("modal-content-show")) {
            popup.classList.remove("modal-content-show");
          }
        }
      });   

      var mapOpen = document.querySelector(".js-open-map");
      var mapPopup = document.querySelector(".modal-content-map");
      var mapClose = mapPopup.querySelector(".modal-content-close");

      mapOpen.addEventListener("click", function(event){
        event.preventDefault();
        mapPopup.classList.add("modal-content-show");
      });

      mapClose.addEventListener("click", function(event){
        event.preventDefault();
        mapPopup.classList.remove("modal-content-show");
      });

      window.addEventListener("keydown", function(event){
        if (event.keyCode === 27) {
          if (mapPopup.classList.contains("modal-content-show")) {
            mapPopup.classList.remove("modal-content-show");
          }
        }
      }); 