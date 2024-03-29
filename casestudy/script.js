//Responsive Menu
function toggleMenu() {
  var menu = document.getElementById("navbarMenu");
  menu.classList.toggle("show");
}

//Dropdown Open
function toggleDropdown() {
  var dropdownContent = document.getElementById("myDropdown");
  var icon = document.querySelector(".icon-arrow");
  var dropbtn = document.querySelector(".dropbtn");

  var isDropdownVisible = dropdownContent.classList.toggle("show");

  icon.classList.toggle("iconsnew", isDropdownVisible);
  dropbtn.classList.toggle("dropbtnnew", isDropdownVisible);

  var closeBtn = document.getElementById("closebtnn");
  closeBtn.style.display = isDropdownVisible ? "inline-block" : "none";

  closeBtn.onclick = function () {
    dropdownContent.classList.remove("show");
    closeBtn.style.display = "none";
    icon.classList.remove("iconsnew");
    dropbtn.classList.remove("dropbtnnew");
  };
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    arrow = button.querySelector("i.icon-arrow");
    document.getElementsByClassName("close-btn").classList.add("show");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

//Filters Mouse Event
const slider = document.querySelector(".items");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
});

slider.addEventListener("mouseup", () => {
  isDown = false;
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});

slider.addEventListener("touchstart", (e) => {
  isDown = true;
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("touchmove", (e) => {
  if (!isDown) return;
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});

slider.addEventListener("touchend", () => {
  isDown = false;
});

//Filters Modal Open
function openModal(title) {
  var modal = document.getElementById("myModal");
  var modalTitle = document.getElementById("modalTitle");
  modalTitle.textContent = title;
  modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

window.onclick = function (event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//Content Select
document.addEventListener("DOMContentLoaded", function () {
  var propertyListButton = document.querySelector(
    ".menu-btn[data-content='propertyList']"
  );
  showContent("propertyList", propertyListButton);
  propertyListButton.classList.add("active");

  console.log(propertyListButton);
});

function showContent(contentId, button) {
  var contents = document.getElementsByClassName("content");
  for (var i = 0; i < contents.length; i++) {
    contents[i].classList.remove("showMain");
  }

  var buttons = document.getElementsByClassName("menu-btn");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }

  var selectedContent = document.getElementById(contentId + "Content");
  selectedContent.classList.add("showMain");

  button.classList.add("active");
}

//Search Area
const searchInput = document.getElementById("searchInput");
const autocompleteResults = document.getElementById("autocompleteResults");

searchInput.addEventListener("input", function () {
  const searchQuery = searchInput.value.toLowerCase();

  if (searchQuery.length >= 2) {
    loadingMessage("Loading Products...");
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((products) => {
        const filteredProducts = products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery)
        );
        showResults(filteredProducts);
      })
      .catch((error) => {
        console.error(error);
        showErrorMessage("An error occurred while fetching data.");
      });
  } else {
    autocompleteResults.innerHTML = "";
  }
});

function showResults(results) {
  autocompleteResults.innerHTML = "";

  if (results.length === 0) {
    showErrorMessage("No products found!");
    return;
  }
  const list = document.createElement("ul");
  results.forEach((result) => {
    const listItem = document.createElement("li");
    listItem.classList.add("autocomplete-item");
    listItem.addEventListener("click", function () {
      searchInput.value = result.title;
      autocompleteResults.innerHTML = "";
    });

    const titleElement = document.createElement("label");
    titleElement.textContent = result.title;
    listItem.appendChild(titleElement);

    const categoryElement = document.createElement("label");
    categoryElement.textContent = result.category;
    listItem.appendChild(categoryElement);

    list.appendChild(listItem);
  });
  autocompleteResults.appendChild(list);
}

function loadingMessage(messageload) {
  autocompleteResults.innerHTML = "";
  const loadingMsg = document.createElement("div");
  loadingMsg.classList.add("loading-message");
  loadingMsg.textContent = messageload;
  autocompleteResults.appendChild(loadingMsg);
}

function showErrorMessage(message) {
  autocompleteResults.innerHTML = "";
  const errorMessage = document.createElement("div");
  errorMessage.classList.add("error-message");
  errorMessage.textContent = message;
  autocompleteResults.appendChild(errorMessage);
}

document.addEventListener("click", function (event) {
  if (
    !autocompleteResults.contains(event.target) &&
    event.target !== searchInput
  ) {
    autocompleteResults.innerHTML = "";
  }
});

//Top Button
document.addEventListener("DOMContentLoaded", function () {
  var topButton = document.getElementById("topBtn");

  window.onscroll = function () {
    if (
      document.body.scrollTop > 30 ||
      document.documentElement.scrollTop > 30
    ) {
      topButton.style.display = "block";
    } else {
      topButton.style.display = "none";
    }
  };

  topButton.addEventListener("click", function () {
    //Top Button Animate
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
