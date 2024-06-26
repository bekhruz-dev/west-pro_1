const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

// ? MENU-HAMBURGER START
const mainMenu = document.querySelector(".mainMenu");
const closeMenu = document.querySelector(".closeMenu");
const openMenu = document.querySelector(".openMenu");
const menu_items = document.querySelectorAll("nav .mainMenu li a");

openMenu.addEventListener("click", show);
closeMenu.addEventListener("click", close);

// close menu when you click on a menu item
menu_items.forEach((item) => {
  item.addEventListener("click", function () {
    close();
  });
});

function show() {
  mainMenu.style.display = "flex";
  mainMenu.style.top = "0";
}
function close() {
  mainMenu.style.top = "-100%";
}
// ! MENU-HAMBURGER END

// ? SEND-MESSAGE START
const TOKEN = "7196584729:AAE2yOslQxzlROizCxHwIpmjf5km_gXPQxk";
const CHAT_ID = "-4105873221";
const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    let message = `<b>New User</b> \n`;
    message += `<b> Name:</b> ${this.name.value} \n`;
    message += `<b> Email:</b> ${this.email.value} \n`;
    message += `<b> Message:</b> ${this.message.value} \n`;
    axios.post(URL_API, {
      chat_id: CHAT_ID,
      parse_mode: "html",
      text: message,
    });
  });
// ! SEND-MESSAGE END

// function alicoder() {
//   let fname = document.getElementById("first-name").value;
//   let email = document.getElementById("email").value;
//   event.preventDefault();
//   let telegram_bot_id = "7196584729:AAE2yOslQxzlROizCxHwIpmjf5km_gXPQxk";
//   let chat_id = 902111975; // 1111 o'rniga Habar borishi kerak bo'lgan ChatID
//   let message = `Name: ${fname}; PhoneNumber: ${email}`;
//   let settings = {
//     async: true,
//     crossDomain: true,
//     url: "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "cache-control": "no-cache",
//     },
//     data: JSON.stringify({
//       chat_id: chat_id,
//       text: message,
//     }),
//   };
//   $.ajax(settings).done(function (response) {
//     const toast = document.querySelector(".toast");
//     element.innerHTML = `<h1>Hello</h1>`;

//     // window.location.href = "ok.html";
//   });
//   document.getElementById("name").value = "";
//   document.getElementById("email").value = "";
//   return false;
// }
