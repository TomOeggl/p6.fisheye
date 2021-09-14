//check if the file is loaded and executed
console.log("Javascript execution started");

var photographers = [];
var mediaArray = [];
var photographersFilteredByTag = [];
var mediaFilteredByPhotographer = [];
var subpageMediaFilteredByTag = [];
const body = document.querySelector("body");
var path = window.location.pathname;
var page = path.split("/").pop();
console.log(page + " is the page");

//factory function to create photographer objects

var Factory = function () {
  //factory method to create photographer objects + their methods
  this.createPhotographer = function (userData) {
    var photographer = {
      name: userData.name,
      id: userData.id,
      city: userData.city,
      country: userData.country,
      tagline: userData.tagline,
      tags: userData.tags,
      price: userData.price,
      portrait: userData.portrait,
    };

    //methods come here
    photographer.sayHi = function () {
      console.log("Hi, I am from " + this.city);
    };

    photographer.createPageLink = function () {
      //let pageLink = this.name.replace(/ /g,'') + ".html"; named link
      let pageLink = this.id + ".html";
      console.log(pageLink + " href link created");
      return pageLink;
    };

    //homepage methods of display and removal of individual photographers

    photographer.populateDom = function (style) {
      if (style === "homepagePortrait") {
        //create variables and DOM Elements
        let parentNode = document.querySelector("main");
        let htmlPhotographerContainer = document.createElement("section");
        let htmlThumbnailLink = document.createElement("a");
        let htmlPhotographerImage = document.createElement("img");
        let htmlPhotographerName = document.createElement("h3");
        let htmlPhotographerLocation = document.createElement("p");
        let htmlPhotographerTagline = document.createElement("p");
        let htmlPhotographerPrice = document.createElement("p");
        let htmlPhotographerHashtagContainer = document.createElement("span");
        //add classes
        htmlPhotographerContainer.classList.add("photographer-portrait");
        htmlPhotographerContainer.id = this.id;
        htmlThumbnailLink.classList.add("photographer-portrait__containerlink");
        htmlPhotographerImage.classList.add("photographer-portrait__image");
        htmlPhotographerName.classList.add("photographer-portrait__name");
        htmlPhotographerLocation.classList.add(
          "photographer-portrait__location"
        );
        htmlPhotographerTagline.classList.add("photographer-portrait__tagline");
        htmlPhotographerPrice.classList.add("photographer-portrait__price");
        htmlPhotographerHashtagContainer.classList.add(
          "photographer-portrait__hashtagcontainer"
        );
        for (var tag in this.tags) {
          let tagsaver = document.createElement("a");
          tagsaver.classList.add("hashtag");
          tagsaver.textContent = "#" + this.tags[tag];
          tagsaver.href = "#" + this.tags[tag];
          htmlPhotographerHashtagContainer.appendChild(tagsaver);
        }

        //add Content from object
        htmlThumbnailLink.href = this.createPageLink();
        htmlPhotographerImage.src =
          "files/media/Photographers_ID_Photos/" + this.portrait;
        htmlPhotographerName.textContent = this.name;
        htmlPhotographerLocation.textContent = this.city + ", " + this.country;
        htmlPhotographerTagline.textContent = this.tagline;
        htmlPhotographerPrice.textContent = this.price + "$/day";
        //append DOM Elements
        parentNode.appendChild(htmlPhotographerContainer);
        htmlPhotographerContainer.appendChild(htmlThumbnailLink);
        htmlThumbnailLink.appendChild(htmlPhotographerImage);
        htmlThumbnailLink.appendChild(htmlPhotographerName);
        htmlPhotographerContainer.appendChild(htmlPhotographerLocation);
        htmlPhotographerContainer.appendChild(htmlPhotographerTagline);
        htmlPhotographerContainer.appendChild(htmlPhotographerPrice);
        htmlPhotographerContainer.appendChild(htmlPhotographerHashtagContainer);
        //success notification
        console.log(
          "Rendered " + this.name + " in style " + style + " to the Dom."
        );
      }
    };

    photographer.removeFromDom = function () {
      if (document.getElementById(this.id)) {
        let toRemove = document.getElementById(this.id);
        let mainNode = document.querySelector("main");
        console.log(this.id);
        mainNode.removeChild(toRemove);
      }
    };

    //end
    return photographer;
  };

  //factory method to create mediaItems (image or video)
  this.createMedia = function (mediaData) {
    if (mediaData.video === undefined) {
      var mediaItem = {
        id: mediaData.id,
        photographerId: mediaData.photographerId,
        title: mediaData.title,
        image: mediaData.image,
        tags: mediaData.tags,
        likes: mediaData.likes,
        date: mediaData.date,
        price: mediaData.price,
      };
    } else {
      var mediaItem = {
        id: mediaData.id,
        photographerId: mediaData.photographerId,
        title: mediaData.title,
        video: mediaData.video,
        tags: mediaData.tags,
        likes: mediaData.likes,
        date: mediaData.date,
        price: mediaData.price,
      };
    }

    //Media Item methods

    mediaItem.populateDom = function () {
      var extraThis = this;

      console.log("Entered Populate DOM Method of item " + extraThis.id);

      //create DOM ELEMENTS
      let parentNode = document.querySelector(".media-gallery");
      let htmlMediaItemContainer = document.createElement("div");
      let htmlMediaItemImageLink = document.createElement("a");
      let htmlMediaItem;
      let htmlMediaItemSource;
      let htmlMediaItemTextContainer = document.createElement("div");
      let htmlMediaItemTextTitle = document.createElement("p");
      let htmlMediaItemTextLikes = document.createElement("p");
      let htmlMediaItemTextHeartIcon = document.createElement("i");

      if (extraThis.image !== undefined) {
        htmlMediaItem = document.createElement("img");
      } else {
        htmlMediaItem = document.createElement("video");
        //htmlMediaItemSource = document.createElement("source");
        //hmtlMediaItem.src =
        //  "files/media/" + extraThis.photographerId + "/" + extraThis.video;
        console.log("hmtl Video item created");
        console.log(htmlMediaItem);
      }

      //console.log(htmlMediaItem);
      //assign Classes to DOM ELEMENTS
      htmlMediaItemContainer.classList.add("media-item");
      htmlMediaItemImageLink.classList.add("media-item__imagelink");
      if (extraThis.image !== undefined) {
        htmlMediaItem.classList.add("media-item__image");
      }
      htmlMediaItemTextContainer.classList.add("media-item__text-content");
      htmlMediaItemTextTitle.classList.add("media-item__title");
      htmlMediaItemTextLikes.classList.add("media-item__likes");
      htmlMediaItemTextHeartIcon.classList.add("fa-heart");
      htmlMediaItemTextHeartIcon.classList.add("fas");

      //add Content from Media Object
      if (extraThis.image !== undefined) {
        htmlMediaItem.src =
          "files/media/" + extraThis.photographerId + "/" + extraThis.image;
        console.log("Entered Image Content branch");
        htmlMediaItem.title = extraThis.title;
      } else {
        htmlMediaItem.src =
          "files/media/" + extraThis.photographerId + "/" + extraThis.video;
        //htmlMediaItemImage.appendChild(htmlMediaItemImageSource);
        console.log(
          "files/media/" + extraThis.photographerId + "/" + extraThis.video
        );
        htmlMediaItem.title = extraThis.title;
      }
      htmlMediaItemTextTitle.textContent = extraThis.title;
      htmlMediaItemTextLikes.textContent = extraThis.likes + " ";
      htmlMediaItemImageLink.href = "#" + extraThis.id;

      //APPEND to DOM Parent Node
      parentNode.appendChild(htmlMediaItemContainer);
      htmlMediaItemContainer.appendChild(htmlMediaItemImageLink);
      htmlMediaItemImageLink.appendChild(htmlMediaItem);
      htmlMediaItemContainer.appendChild(htmlMediaItemTextContainer);
      htmlMediaItemTextContainer.appendChild(htmlMediaItemTextTitle);
      htmlMediaItemTextContainer.appendChild(htmlMediaItemTextLikes);
      htmlMediaItemTextLikes.appendChild(htmlMediaItemTextHeartIcon);
    };

    mediaItem.removeFromDom = function () {
      let myNode = document.getElementById("media-gallery");
      while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
      }
    };

    return mediaItem;
  };
};

//read the json file to gather information to populate the dom with photographer/media data objects

var factory = new Factory();

//reads json and fills the photographers Array with user data
async function readJsonPhotographers() {
  // http://localhost:8080
  const parsedData = await fetch("/files/FishEyeData.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then((json) => {
      this.users = json;
      //console.log(this.users.photographers);

      for (var i = 0, len = this.users.photographers.length; i < len; i++) {
        photographers.push(
          factory.createPhotographer(this.users.photographers[i])
        );
        //photographers[i].sayHi();
      }

      //console.log(photographers);
      return photographers;
    })
    .catch(function () {
      this.dataError = true;
    });
}
//reads json and fills the media Array with media data
async function readJsonMedia() {
  // http://localhost:8080
  const parsedData = await fetch("/files/FishEyeData.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then((json) => {
      this.users = json;
      //console.log(this.users.photographers);

      for (var i = 0, len = this.users.media.length; i < len; i++) {
        mediaArray.push(factory.createMedia(this.users.media[i]));
        //photographers[i].sayHi();
      }

      //console.log(photographers);
      return mediaArray;
    })
    .catch(function () {
      this.dataError = true;
    });
}

function filterPhotographersByTag(tag) {
  //make sure the filtered array is empty before we start
  photographersFilteredByTag.splice(0, photographersFilteredByTag.length);
  //returns index of -1 if not found in array and pushes it to filtered array otherwise
  for (var i = 0, len = photographers.length; i < len; i++) {
    if (photographers[i].tags.indexOf(tag) !== -1) {
      photographersFilteredByTag.push(photographers[i]);
    }
  }
}

function filterMediaByPhotographer(photographerPageId) {
  //make sure the filtered array is empty before we start
  mediaFilteredByPhotographer.splice(0, mediaFilteredByPhotographer.length);
  //returns index of -1 if not found in array and pushes it to filtered array otherwise
  for (var i = 0, len = mediaArray.length; i < len; i++) {
    if (mediaArray[i].photographerId == photographerPageId) {
      mediaFilteredByPhotographer.push(mediaArray[i]);
    }
  }
}

function filterSubpageMediaByTag(tag) {
  //make sure the filtered array is empty before we start
  subpageMediaFilteredByTag.splice(0, subpageMediaFilteredByTag.length);
  //returns index of -1 if not found in array and pushes it to filtered array otherwise
  for (var i = 0, len = mediaFilteredByPhotographer.length; i < len; i++) {
    if (mediaFilteredByPhotographer[i].tags.indexOf(tag) !== -1) {
      subpageMediaFilteredByTag.push(mediaFilteredByPhotographer[i]);
    }
  }
  console.log(subpageMediaFilteredByTag);
}
//-----------------------------------
//-------LIGHTBOX FUNCTIONS----------
//-----------------------------------
function changeLightboxItem(direction){
  console.log(lightboxImage.src);
  let currentImageSource = lightboxImage.src;
  let currentMediaArray = Array.from(document.getElementById('media-gallery').children);
  console.log(currentMediaArray[0].firstChild.firstChild.src);
  let currentIndex = currentMediaArray.map(function (e) {
    return e.firstChild.firstChild.src;
  })
  .indexOf(currentImageSource);

  if(direction === "next"){
    let nextIndex = currentIndex + 1;
    if(nextIndex >= currentMediaArray.length){
      nextIndex = 0;
    }
    lightboxImage.src = currentMediaArray[nextIndex].firstChild.firstChild.src;
    
  }

  if(direction === "previous"){
    let nextIndex = currentIndex - 1;
    if(nextIndex < 0){
      nextIndex = currentMediaArray.length - 1;
    }
    lightboxImage.src = currentMediaArray[nextIndex].firstChild.firstChild.src;
    
  }
  

  console.log(currentIndex);
}

//readJsonMedia();

//-----------------------------------

// ACTUAL CALLING SEQUENCE TO parse data and then fill the INDEX PAGE OR SUBPAGES BELOW

//-----------------------------------


readJsonPhotographers().then(() => {
  if (
    page === "243.html" ||
    page === "930.html" ||
    page === "82.html" ||
    page === "527.html" ||
    page === "925.html" ||
    page === "195.html"
  ) {
    //subpage routine comes here
    console.log("Entered subpage routine");
    let pageId = page.substring(0, 3);
    console.log(pageId);
    //call async read JSON Media function
    readJsonMedia().then(() => {
      filterMediaByPhotographer(pageId);
      console.log(mediaFilteredByPhotographer);
      mediaFilteredByPhotographer.forEach((element) => element.populateDom());
    });
  } else {
    for (var i = 0, len = photographers.length; i < len; i++) {
      photographers[i].populateDom("homepagePortrait");
    }
  }
});

//-----------------------------
// GLOBAL EVENT LISTENER 

// add global event listener, check for click events of hashtag class for filtering
body.addEventListener("click", (event) => {
  //photographer filtering for index.html
  if (
    page === "243.html" ||
    page === "930.html" ||
    page === "82.html" ||
    page === "527.html" ||
    page === "925.html" ||
    page === "195.html"
  ) {
    //----------------------------------------
    //----------- SUBPAGE LISTENER BELOW------
    //----------------------------------------
    //LIGHTBOX EVENT ROUTINE
    if (event.target.classList.contains("media-item__image")) {
      let lightboxTarget = event.target.src;
      let imageTitle = event.target.title;
      /*let currentIndex = Array.from(document.getElementById('media-gallery').children)
        .map(function (e) {
          return e.title;
        })
        .indexOf(imageTitle);
      changeLightbox(nextItem(currentIndex));*/

      lightbox.style.display = "block";
      lightboxImage.src = lightboxTarget;
      lightboxTitle.textContent = event.target.title;
    }
    //--------------   FILTER SUBPAGE MEDIA ITEMS by hashtag
    else if (event.target.classList.contains("hashtag")) {
      //remove # symbol from string
      let actualTag = event.target.textContent.substring(1);
      //filter by tag
      filterSubpageMediaByTag(actualTag);
      console.log(mediaFilteredByPhotographer);
      mediaFilteredByPhotographer.forEach((element) => element.removeFromDom());
      console.log(mediaFilteredByPhotographer);
      if (actualTag === "all") {
        mediaFilteredByPhotographer.forEach((element) =>
          element.populateDom("homepagePortrait")
        );
      } else {
        subpageMediaFilteredByTag.forEach((element) =>
          element.populateDom("homepagePortrait")
        );
      }
    }
    //----------------------------------------
    //-------------- INDEX PAGE LISTENER BELOW
    //----------------------------------------
  } else {
    // index page photographer filtering by hashtag below
    if (event.target.classList.contains("hashtag")) {
      //remove # symbol from string
      let actualTag = event.target.textContent.substring(1);
      console.log("click event recorded - tag:" + actualTag);

      //filter by tag
      filterPhotographersByTag(actualTag);

      //clear dom
      photographers.forEach((element) => element.removeFromDom());

      //show all photographers
      if (actualTag === "all") {
        photographers.forEach((element) =>
          element.populateDom("homepagePortrait")
        );
      } else {
        photographersFilteredByTag.forEach((element) =>
          element.populateDom("homepagePortrait")
        );
      }
    } else {
      console.log(event.target.classList);
      console.log("Event was different then hashtag class");
      return;
    }
  }
});

//----------------------------------------
//------- MODAL SCRIPT -------------------
//----------------------------------------

// Get the modal
var modal = document.getElementById("contactModal");
// Get the form and reset on reload
var contactForm = document.getElementById("contact-form");
contactForm.reset();

function handleForm(event) {
  event.preventDefault();
}
contactForm.addEventListener("submit", handleForm);

// Get the button that opens the modal
var btn = document.getElementById("contact-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
  console.log("click on btn logged");
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Get send button and form data
var submitMessage = document.getElementById("submit");
var firstName = document.getElementById("first");
var lastName = document.getElementById("last");
var email = document.getElementById("email");
var textMessage = document.getElementById("text-message");

// On Submit: log the Input to console, reset
function logMessageToConsole() {
  console.log(
    firstName.value +
      " " +
      lastName.value +
      " with email adress " +
      email.value +
      " sent you following message: " +
      textMessage.value
  );
  contactForm.reset();
  modal.style.display = "none";
}

//----------------------------------------
//------- LIGHTBOX SCRIPT ----------------
//----------------------------------------

// Get the modal
var lightbox = document.getElementById("lightboxModal");
var lightboxImage = document.getElementById("lightbox__content__image");
var lightboxTitle = document.getElementById("lightbox__content__title");

// Get the <span> element that closes the modal
var lightboxClose = document.getElementsByClassName(
  "lightbox__content__close"
)[0];
// Get the <span> elements that point to next and previous picture
var lightboxBack = document.getElementsByClassName(
  "lightbox__content__back"
)[0];
var lightboxForward = document.getElementsByClassName(
  "lightbox__content__forward"
)[0];

lightboxForward.onclick = function () {
  changeLightboxItem("next");
};

lightboxBack.onclick = function () {
  changeLightboxItem("previous");
}

// When the user clicks on <span> (x), close the modal
lightboxClose.onclick = function () {
  lightbox.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == lightbox) {
    lightbox.style.display = "none";
  }
};
