'use strict';

var usersPictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getComments() {
  var arrayOfComments = [];

  for (var i = 0; i < getRandomInt(1, 10); i++) {
    arrayOfComments.push({
      avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
      message: generateMessage(window.const.messages),
      name: window.const.names[getRandomInt(0, window.const.names.length - 1)]
    });
  }

  return arrayOfComments;
}

function generateMessage(array) {
  var arrayMessages = array.slice();
  if (getRandomInt(0, 1) === 0) {
    var randomMassage = getRandomInt(0, arrayMessages.length - 1);
    return arrayMessages[randomMassage];
  } else {
    var numberFirstRandomMessage = getRandomInt(0, arrayMessages.length - 1);
    var firstRandomMessage = arrayMessages[numberFirstRandomMessage];

    arrayMessages.splice(numberFirstRandomMessage, 1);

    var numberSecondRandomMessage = getRandomInt(0, arrayMessages.length - 1);
    var secondRandomMessage = arrayMessages[numberSecondRandomMessage];
    return firstRandomMessage + ' ' + secondRandomMessage;
  }
}

function createArrayOfObjects(countObjects) {
  var arr = [];

  for (var i = 0; i < countObjects; i++) {
    arr.push({'url': 'photos/' + (i + 1) + '.jpg', 'description': 'Лучшее фото на свете!', 'likes': getRandomInt(15, 200), 'comments': getComments()});
  }

  return arr;
}

var pictures = createArrayOfObjects(window.const.objects);
var createPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;

};

var fragment = document.createDocumentFragment();


usersPictures.appendChild(fragment);


function renderPictureElements() {
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(createPicture(pictures[i]));
  }
}

renderPictureElements();

var picturesList = document.querySelector('.pictures');
picturesList.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');
var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
var bigPictureCaption = bigPicture.querySelector('.social__caption');
var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
var bigPictureCommentsBlock = bigPicture.querySelector('.social__comments');

var commentTemplate = bigPictureCommentsBlock.querySelector('.social__comment');


function createComment(photo) {
  var comment = commentTemplate.cloneNode(true);
  var picture = comment.querySelector('.social__picture');
  var commentContent = comment.querySelector('.social__text');


  picture.src = photo.url;
  picture.alt = photo.comments[0].name;
  commentContent.textContent = photo.comments[0].message;

  return comment;
}

function renderOpenedPicture(picture) {
  bigPicture.src = picture;
  bigPictureCaption.textContent = picture.description;
  bigPictureLikesCount.textContent = picture.likes;
  bigPictureCommentsCount.textContent = picture.comments.length;
  bigPictureCommentsBlock.appendChild(createComment(picture));
}

renderOpenedPicture(pictures[0]);

// Добавляет возможность просмотра любой фотографии в полноразмерном режиме;
var thumbnails = document.querySelectorAll('.picture__img');
var closeBigPicture = document.querySelector('.big-picture__cancel');

var addThumbnailClickHandler = function (thumbnail, picture) {
  thumbnail.addEventListener('click', function () {
    bigPictureImage.src = picture.url;
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
  });
  thumbnail.addEventListener('keydown', function (evt) {
    if (evt.key === window.const.enterKey) {
      bigPictureImage.src = picture.url;
      bigPicture.classList.remove('hidden');
      document.body.classList.add('modal-open');
    }
  });
  closeBigPicture.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });
  closeBigPicture.addEventListener('click', function () {
    document.body.classList.remove('modal-open');
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.key === window.const.escKey) {
      bigPicture.classList.add('hidden');
    }
  });
};

for (var i = 0; i < thumbnails.length; i++) {
  addThumbnailClickHandler(thumbnails[i], pictures[i]);
}


var commentsCount = bigPicture.querySelector('.social__comment-count');
commentsCount.classList.add('hidden');

var commentsLoader = bigPicture.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');


var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var closeUploadOverlay = document.querySelector('.cancel');


uploadFile.addEventListener('change', function () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

closeUploadOverlay.addEventListener('click', function () {
  imgUploadOverlay.classList.add('hidden');
});

document.addEventListener('keydown', function (evt) {
  if (evt.key === window.const.escKey) {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

closeUploadOverlay.addEventListener('click', function () {
  document.body.classList.remove('modal-open');
});

