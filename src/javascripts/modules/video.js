(function videoModule(){

  function testForVideo(idToTestFor){
    if(document.getElementById(idToTestFor)){
      writeBrightCoveToDocument();
    }
  }

  function writeBrightCoveToDocument(){
    var codeToAppend = document.createElement('script');
    var whereToAppend = document.body;
    var theVideoPlayer = document.getElementById('iftVideo').getAttribute('data-player');
    //might want to use a helper function to set multiple properties at once
    codeToAppend.setAttribute('async', 'true');
    codeToAppend.setAttribute('src', '//players.brightcove.net/1377104878001/' + theVideoPlayer +'_default/index.min.js');
    whereToAppend.appendChild(codeToAppend);
    //waits for scrpt to load
    codeToAppend.addEventListener('load', videoInit);
  }

  function videoInit(){
    console.log('brightcove js file loaded');
    var iftVideo = document.getElementById('iftVideo');
    /*must use video ready event*/
    videojs(iftVideo).ready(function() {
        var theVideo = this;
        theVideo.on('play', addPlayState);
        theVideo.on('pause', removePlayState);
      });
  }

  function removePlayState(){
    document.body.classList.remove('video-playing--STATE');
  }

  function addPlayState(){
    document.body.classList.add('video-playing--STATE');
  }

  function addPausedState(){
    document.body.classList.add('video-paused--STATE');
  }

  function addPlayerStateToBody(){

  }

  window.addEventListener('load', testForVideo('iftVideo'));
  //want to wait as long as possible

})();


// var isPaused = myPlayer.paused();
// var isPlaying = !myPlayer.paused();