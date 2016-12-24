
//submits the songs and shows the modal if success
function submitSong(event) {
  event.preventDefault();
  $('#playlist').modal('show');

   $.ajax({
     type: "GET",
     url:"https://api.spotify.com/v1/search?type=track&query="+$('#song').val(),
     success: showSong,
     error: handleError
   });
}

//If error
function handleError(error){
  console.log('Higueputaa Malpario');
  console.log(error);
}

//if success shows the song
function showSong(response){
 var song = response.tracks.items[0];
 var title = song.name;
 var artist = song.artists[0].name;
 var album = song.album.name;
 var cover = song.album.images[0].url;
 var preview = song.preview_url;
 console.log(song);

 $('.title').text('Title: ' + title);
 $('.author').text('Artist: ' + artist);
 $('.album').text('Album: ' + album);

 $('#coverimg').attr("src", cover);
 $('#pretrack').attr("src", preview);

 $('#pretrack').trigger('play');
}

//song progress bar
function printTime () {
  var current = $('#pretrack').prop('currentTime');
  console.log(current);
  $('.seekbar progress').prop('value', parseInt(current));


  if (parseInt(current) === 30){
    $('.seekbar progress').prop('value', 0)
    $('.btn-play').toggleClass('playing');
  };
}

//play and pause button
function pausePlay(){
  if ($('.btn-play').hasClass('playing')){
    $('#pretrack').trigger('pause');
  }
  else {
    $('#pretrack').trigger('play');
  }
  $('.btn-play').toggleClass('playing');
}

//<---  --->//

$(document).on('ready', function() {
  $('#searcher').on('submit', submitSong);
  $('#pretrack').on('timeupdate', printTime);
  $('.btn-play').on('click', pausePlay);
});
