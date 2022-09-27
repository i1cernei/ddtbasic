// Put event listeners into place
window.addEventListener("DOMContentLoaded", function() {
  // Grab elements, create settings, etc.

  let crop;
  // // create a variable that will enable us to stop the loop.
  let raf;
  const canvas = document.getElementById("firstCanvas"),
    context = canvas.getContext("2d"),
    // we don't need to append the video to the document
    video = document.createElement("video"),

    videoObj = navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      }).then(stream => {
        video.srcObject = stream;
        video.onplaying = function(){
        const croppedWidth = ( Math.min(video.videoHeight, canvas.height) / Math.max(video.videoHeight,canvas.height)) * Math.min(video.videoWidth, canvas.width),
         croppedX = ( video.videoWidth - croppedWidth) / 2;
        crop = {w:croppedWidth, h:video.videoHeight, x:croppedX, y:0};
        // call our loop only when the video is playing
        raf = requestAnimationFrame(loop);
            };
        video.onpause = function(){
            // stop the loop
            cancelAnimationFrame(raf);
            }
        video.play();
      }).catch(error => {
        console.log(error);
      });
  document.querySelector('body').appendChild(video);

  // // create a crop object that will be calculated on load of the video


  // navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  // // Put video listeners into place
  // navigator.getUserMedia(videoObj, function (stream) {
  //   console.log(videoObj);
  //         video.srcObject = stream;
  //         video.onplaying = function(){
  //             var croppedWidth = ( Math.min(video.videoHeight, canvas.height) / Math.max(video.videoHeight,canvas.height)) * Math.min(video.videoWidth, canvas.width),
  //             croppedX = ( video.videoWidth - croppedWidth) / 2;
  //             crop = {w:croppedWidth, h:video.videoHeight, x:croppedX, y:0};
  //             // call our loop only when the video is playing
  //             raf = requestAnimationFrame(loop);
  //             };
  //         video.onpause = function(){
  //             // stop the loop
  //             cancelAnimationFrame(raf);
  //             }
  //         video.play();
  //     }, errBack);

  function loop(){
     context.drawImage(video, crop.x, crop.y, crop.w, crop.h, 0, 0, canvas.width, canvas.height);
     raf = requestAnimationFrame(loop);
  }
// now that our video is drawn correctly, we can do...
context.translate(canvas.width, 0);
context.scale(-1,1);

}, false);