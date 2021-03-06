//check if the file is loaded and executed
console.log("Javascript execution started");

var photographers = [];
var mediaArray = [];
var photographersFilteredByTag = [];
var mediaFilteredByPhotographer = [];
var subpageMediaFilteredByTag = [];
var currentArray = mediaFilteredByPhotographer;
const body = document.querySelector("body");
var path = window.location.pathname;
var page = path.split("/").pop();
console.log(page + " is the page");
var sumOfLikes = 0;

function sumLikes(){
  mediaFilteredByPhotographer.forEach((element) => {sumOfLikes += element.likes});
}

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
        let htmlPhotographerName = document.createElement("h2");
        let htmlPhotographerLocation = document.createElement("p");
        let htmlPhotographerTagline = document.createElement("p");
        let htmlPhotographerPrice = document.createElement("p");
        let htmlPhotographerHashtagContainer = document.createElement("span");
        //add classes
        htmlPhotographerContainer.classList.add("photographer-portrait");
        htmlPhotographerContainer.setAttribute("tabindex", "0");
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
          let tagsaver = document.createElement("button");
          tagsaver.classList.add("hashtag");
          tagsaver.textContent = "#" + this.tags[tag];
          tagsaver.href = "#" + this.tags[tag];
          htmlPhotographerHashtagContainer.appendChild(tagsaver);
        }

        //add Content from object
        htmlThumbnailLink.href = this.createPageLink();
        htmlPhotographerImage.src =
          "files/media/Photographers_ID_Photos/" + this.portrait;
        htmlPhotographerImage.alt = "Photo of the Photographer " + this.name;
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

      // ---------------------------------
      // ----SUBPAGE DOM RENDERING--------
      // ---------------------------------

      else if(style === "photographer-pageheader"){
        //catch static dom objects
        let htmlHeadTitle = document.querySelector("title");
        let htmlPhotographerName = document.querySelector(".photographer-pageheader__name");
        let htmlPhotographerLocation = document.querySelector(".photographer-pageheader__location");
        let htmlPhotographerTagline = document.querySelector(".photographer-pageheader__tagline");
        let htmlPhotographerHashtagContainer = document.querySelector(".photographer-pageheader__hashtagcontainer");
        let htmlPhotographerModalTitle = document.querySelector(".modal__title");
        let htmlPhotographerImage = document.querySelector(".photographer-pageheader__image");
        let stickyInfoLikes = document.querySelector(".sticky-info__likes");
        let stickyInfoPrice = document.querySelector(".sticky-info__price");
        //get pageId
        let pageId = page.substring(0, 3);
        let photographerIndex;
        for (var i = 0, len = photographers.length; i < len; i++){
          //console.log("entered for loop, looking for id: " + pageId);
          if(photographers[i].id == pageId){
            photographerIndex = i;
            
          }
        }
        let self = photographers[photographerIndex];
        console.log(self);
        htmlPhotographerName.textContent = self.name;
        htmlPhotographerLocation.textContent = self.city + ", " + self.country;
        htmlPhotographerTagline.textContent = self.tagline;
        for (var tag in self.tags) {
          let tagsaver = document.createElement("button");
          tagsaver.classList.add("hashtag");
          tagsaver.classList.add("hashtag--photographer-pageheader");
          tagsaver.textContent = "#" + self.tags[tag];
          //tagsaver.href = "#" + self.tags[tag];
          htmlPhotographerHashtagContainer.appendChild(tagsaver);
        }
        htmlPhotographerModalTitle.innerHTML = "Contact <br> " + self.name;
        htmlPhotographerImage.src = "files/media/Photographers_ID_Photos/" + self.portrait;
        htmlPhotographerImage.title = "Portrait of " + self.name;
        htmlPhotographerImage.alt = "Portrait of " + self.name + " the photographer"
        htmlHeadTitle.innerHTML = self.name;

        //sum likes
        
        sumLikes();
        stickyInfoLikes.innerHTML = sumOfLikes + " &#9829";
        stickyInfoPrice.textContent = self.price + "$/day";

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
        liked : new Boolean (false),
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
        liked : new Boolean (false),
      };
    }

    //Media Item methods

    mediaItem.populateDom = function () {
      var extraThis = this;

      

      //create DOM ELEMENTS
      let parentNode = document.querySelector(".media-gallery");
      let htmlMediaItemContainer = document.createElement("article");
      
      let htmlMediaItem;
      let htmlMediaItemSource;
      let htmlMediaItemTextContainer = document.createElement("div");
      let htmlMediaItemTextTitle = document.createElement("h2");
      let htmlMediaItemTextLikes = document.createElement("button");
      let htmlMediaItemTextHeartIcon = document.createElement("i");

      if (extraThis.image !== undefined) {
        htmlMediaItem = document.createElement("img");
      } else {
        htmlMediaItem = document.createElement("video");
      }

      
      //assign Classes to DOM ELEMENTS
      htmlMediaItemContainer.classList.add("media-item");
      
      htmlMediaItemContainer.setAttribute("tabindex", "0");
      htmlMediaItemContainer.setAttribute("aria-role", "document");
      
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
        htmlMediaItem.alt = "A Photo tagged with " + extraThis.tags + " , called " + extraThis.title;
        
        htmlMediaItem.title = extraThis.title;
      } else {
        htmlMediaItem.src =
          "files/media/" + extraThis.photographerId + "/" + extraThis.video;
        //htmlMediaItemImage.appendChild(htmlMediaItemImageSource);
        
        htmlMediaItem.title = extraThis.title;
      }
      htmlMediaItemTextTitle.textContent = extraThis.title;
      htmlMediaItemTextLikes.textContent = extraThis.likes + " ";
      
      //Add Like Button Behaviour
      htmlMediaItemTextLikes.onclick = function(e){
        //console.log(extraThis.likes)
        likes = extraThis.likes;
        let stickyInfoLikes = document.querySelector(".sticky-info__likes");
        
        if (extraThis.liked === true){
          
          likes -= 1;
          htmlMediaItemTextLikes.textContent = likes + " ";
          htmlMediaItemTextLikes.appendChild(htmlMediaItemTextHeartIcon);
          extraThis.liked = false;
          extraThis.likes = likes;
          sumOfLikes -= 1;
          stickyInfoLikes.innerHTML = sumOfLikes + " &#9829";
          return;
        }
        else{
          likes += 1;
          htmlMediaItemTextLikes.textContent = likes + " ";
          htmlMediaItemTextLikes.appendChild(htmlMediaItemTextHeartIcon);
          extraThis.liked = true;
          extraThis.likes = likes;
          sumOfLikes += 1;
          stickyInfoLikes.innerHTML = sumOfLikes + " &#9829";
          return;
        }
      }

      //APPEND to DOM Parent Node
      parentNode.appendChild(htmlMediaItemContainer);
      //htmlMediaItemContainer.appendChild(htmlMediaItemImageLink);
      htmlMediaItemContainer.appendChild(htmlMediaItem);
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
//-------ARRAY SORTING FUNCTION------
//-----------------------------------

function sortMediaItems (array, selector){
  if (selector.toUpperCase() == "POPULARITY"){
    //console.log("Sorting by popularity");
    array.sort((a, b) => a.likes - b.likes);
    array.reverse();
    //console.log(array);
  }
  else if(selector.toUpperCase() == "TITLE"){
    //console.log("Sorting by title");
    array.sort(function(a, b) {
      return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
   });
    //console.log(array);
    
   
  }
  else if(selector.toUpperCase() == "DATE"){
    console.log("Sorting by date");
    array.sort(function(a,b){
      var c = new Date(a.date);
      console.log(c);
      var d = new Date(b.date);
      return c-d;
      });
    console.log(array);
  }
  else{
    console.log("Sorting selector invalid");
  }
}

//-----------------------------------
//-------DROPDOWN UPDATE FUNCTION----
//-----------------------------------

function updateDropdownOptions(selector){
  let currentSelection = document.getElementById("dropdownCurrentOption");
  let option1 = document.getElementById("dropdownOption1");
  let option2 = document.getElementById("dropdownOption2");

  switch(selector){
    case "Title":
      currentSelection.textContent = selector;
      option1.textContent = "Date";
      option2.textContent = "Popularity";
      break;
    case "Date":
      currentSelection.textContent = selector;
      option1.textContent = "Title";
      option2.textContent = "Popularity";
      break;
    case "Popularity":
      currentSelection.textContent = selector;
      option1.textContent = "Title";
      option2.textContent = "Date";
      break;
  }
}


//-----------------------------------
//-------LIGHTBOX FUNCTIONS----------
//-----------------------------------

function fillLightboxWithDomElement(type) {
  let currentLBContent = document.getElementById("lightbox__content__image");
  let parent = currentLBContent.parentNode;
  parent.removeChild(currentLBContent);
  let newLBContent;
  if (type === "image") {
    newLBContent = document.createElement("img");
  } else if (type === "video") {
    newLBContent = document.createElement("video");
  } else {
    console.log("Unknown lightbox content type");
  }
  newLBContent.classList.add("lightbox__content__image");
  newLBContent.id = "lightbox__content__image";
  newLBContent.alt = "Bigger Lightbox Image";
  parent.insertBefore(newLBContent, lightboxClose);
}

function changeLightboxItem(direction) {
  //console.log(lightboxImage.src);

  //create ARRAY from DOM and find index of node containing current image
  let currentLBContent = document.getElementById("lightbox__content__image");
  let currentImageSource = currentLBContent.src;
  let currentMediaArray = Array.from(
    document.getElementById("media-gallery").children
  );
  //console.log(currentMediaArray[0].firstChild.firstChild.src);
  //console.log(currentMediaArray[0]);
  let currentIndex = currentMediaArray
    .map(function (e) {
      return e.firstChild.src;
    })
    .indexOf(currentImageSource);

  if (direction === "next") {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= currentMediaArray.length) {
      nextIndex = 0;
    }
    let nextItemPath = currentMediaArray[nextIndex].firstChild.src;
    let nextAlt = currentMediaArray[nextIndex].firstChild.alt;
    if (nextItemPath.slice(nextItemPath.length - 3) === "mp4") {
      
      fillLightboxWithDomElement("video");
      document.getElementById("lightbox__content__image").src = nextItemPath;
      document.getElementById("lightbox__content__image").alt = nextAlt;
    } else {
      fillLightboxWithDomElement("image");
      document.getElementById("lightbox__content__image").src = nextItemPath;
      document.getElementById("lightbox__content__image").alt = nextAlt;
    }
    lightboxTitle.textContent =
      currentMediaArray[nextIndex].firstChild.title;
  }

  if (direction === "previous") {
    let nextIndex = currentIndex - 1;
    if (nextIndex < 0) {
      nextIndex = currentMediaArray.length - 1;
    }
    let nextItemPath = currentMediaArray[nextIndex].firstChild.src;
    let nextAlt = currentMediaArray[nextIndex].firstChild.alt;
    if (nextItemPath.slice(nextItemPath.length - 3) === "mp4") {
      console.log("this is a video");
      fillLightboxWithDomElement("video");
      document.getElementById("lightbox__content__image").src = nextItemPath;
      document.getElementById("lightbox__content__image").alt = nextAlt;
    } else {
      fillLightboxWithDomElement("image");
      document.getElementById("lightbox__content__image").src = nextItemPath;
      document.getElementById("lightbox__content__image").alt = nextAlt;
    }
    lightboxTitle.textContent =
      currentMediaArray[nextIndex].firstChild.title;
  }

  console.log(currentIndex);
}




//-----------------------------------
//-----------------------------------
//-----------------------------------
//-----------------------------------

// ACTUAL CALLING SEQUENCE TO parse data and then fill the INDEX PAGE OR SUBPAGES BELOW

//-----------------------------------
//-----------------------------------
//-----------------------------------
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
      photographers[0].populateDom("photographer-pageheader");
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
      fillLightboxWithDomElement("image");
      let lightboxTarget = event.target.src;
      let imageTitle = event.target.title;
      console.log(event.target.src);
      console.log(lightboxTarget);
      let currentLBI = document.getElementById("lightbox__content__image");
      currentLBI.src = lightboxTarget;

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
    // in case of a video
    else if (
      event.target.src !== undefined &&
      event.target.src.slice(event.target.src.length - 3) == "mp4"
    ) {
      fillLightboxWithDomElement("video");
      let lightboxTarget = event.target.src;
      let imageTitle = event.target.title;
      console.log(event.target.src);
      console.log(lightboxTarget);
      let currentLBI = document.getElementById("lightbox__content__image");
      currentLBI.src = lightboxTarget;
      lightbox.style.display = "block";
      lightboxImage.src = lightboxTarget;
      lightboxTitle.textContent = event.target.title;
    }
    else if (event.target.classList.contains("dropdown__option")){
      //remove # symbol from string
      let actualTag = event.target.textContent;
      console.log("Entered TagTree, Tag is : " + actualTag);
      //------LISTEN FOR SORTING TAGS
      if( actualTag.toUpperCase() === "POPULARITY"||
          actualTag.toUpperCase() === "DATE"||
          actualTag.toUpperCase() === "TITLE"){
            console.log("entered sorting tree");
            sortMediaItems(currentArray, actualTag);
            currentArray.forEach((element) => element.removeFromDom());
            currentArray.forEach((element) => element.populateDom());
            updateDropdownOptions(actualTag);
          }
    }

    //--------------   FILTER SUBPAGE MEDIA ITEMS by hashtag
    else if (event.target.classList.contains("hashtag")) {
      //remove # symbol from string
      let actualTag = event.target.textContent.substring(1);
      console.log("Entered TagTree, Tag is : " + actualTag);
      

      //filter media by tag
      filterSubpageMediaByTag(actualTag);
      
      mediaFilteredByPhotographer.forEach((element) => element.removeFromDom());
     
      if (actualTag === "all") {
        currentArray = mediaFilteredByPhotographer;
        mediaFilteredByPhotographer.forEach((element) =>
          element.populateDom("homepagePortrait")
        );
      } else {
        currentArray = subpageMediaFilteredByTag;
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
      console.log(document.activeElement);
      //console.log("Event was different then hashtag class");
      //return;
    }
  }
});

//----------------------------------------
//------- MODAL SCRIPT -------------------
//----------------------------------------

//Execute only if on subpage
if (
  page === "243.html" ||
  page === "930.html" ||
  page === "82.html" ||
  page === "527.html" ||
  page === "925.html" ||
  page === "195.html"
) {

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
};

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
}



document.onkeydown = function(e) {
  
  if(e.key === "Escape") { 
    //document.activeElement.click();
    lightbox.style.display = "none";
    modal.style.display ="none";
  }
  else if(e.key === "Enter") { 
    document.activeElement.click();
    //console.log(document.activeElement);
    
    if(document.activeElement.classList.contains("media-item")){
      var target = document.activeElement.firstChild;
      console.log(target);
      if (target.classList.contains("media-item__image")) {
        fillLightboxWithDomElement("image");
        let lightboxTarget = target.src;
        let imageTitle = target.title;
        console.log(target.src);
        console.log(lightboxTarget);
        let currentLBI = document.getElementById("lightbox__content__image");
        currentLBI.src = lightboxTarget;
  
        /*let currentIndex = Array.from(document.getElementById('media-gallery').children)
          .map(function (e) {
            return e.title;
          })
          .indexOf(imageTitle);
        changeLightbox(nextItem(currentIndex));*/
  
        lightbox.style.display = "block";
        lightboxImage.src = lightboxTarget;
        lightboxTitle.textContent = target.title;
      }
      // in case of a video
      else if (
        target.src !== undefined &&
        target.src.slice(target.src.length - 3) == "mp4"
      ) {
        fillLightboxWithDomElement("video");
        let lightboxTarget = target.src;
        let imageTitle = target.title;
        console.log(target.src);
        console.log(lightboxTarget);
        let currentLBI = document.getElementById("lightbox__content__image");
        currentLBI.src = lightboxTarget;
        lightbox.style.display = "block";
        lightboxImage.src = lightboxTarget;
        lightboxTitle.textContent = target.title;
      };
    }
    else if(document.activeElement.classList.contains("photographer-portrait")){
      let currentElement = document.activeElement.firstChild;
      console.log("Current Element is " + currentElement);
      currentElement.click();
      
    }
    else if(document.activeElement.classList.contains("header-link__container")){
      let currentElement = document.activeElement.firstChild.nextSibling;
      currentElement.click();
    }
  }
  else if(e.key === "ArrowLeft"){
    
    changeLightboxItem("previous");
  }
  else if(e.key === "ArrowRight"){
    changeLightboxItem("next");
  }
};


  


const buttonAll = document.getElementById("hashtag-all");

buttonAll.onclick = function() {
  mediaFilteredByPhotographer.forEach((element) => element.removeFromDom());
  currentArray = mediaFilteredByPhotographer;
        mediaFilteredByPhotographer.forEach((element) =>
          element.populateDom("homepagePortrait")
        );
};


//--------- HTML SELECT FUNCTION

function orderBy(selected){
  sortMediaItems(currentArray, selected);
  currentArray.forEach((element) => element.removeFromDom());
  currentArray.forEach((element) => element.populateDom());

}