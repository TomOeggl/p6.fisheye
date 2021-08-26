//check if the file is loaded and executed
console.log("Javascript execution started");

var photographers = [];
var mediaArray = [];

//factory function to create photographer objects

var Factory = function () {
  //parse json data into js photographer object
  this.createPhotographer = function (userData) {
    var photographer = {
      name: userData.name,
      id: userData.id,
      city: userData.city,
      country: userData.country,
      tags: userData.tags,
      price: userData.price,
      portrait: userData.portrait,
    };

    //methods come here
    photographer.sayHi = function () {
      console.log("Hi, I am from " + this.city);
    };

    //end
    return photographer;
  };

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
          mediaArray.push(
            factory.createMedia(this.users.media[i])
          );
          //photographers[i].sayHi();
        }
        
        //console.log(photographers);
        return mediaArray;
      })
      .catch(function () {
        this.dataError = true;
      });
  }

readJsonPhotographers();
readJsonMedia();
console.log(photographers);
console.log(mediaArray);
