const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error(`Oh No!!!`, err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    // take the pixels out
    let pixel = ctx.getImageData(0, 0, width, height);
    // mess with them
    // pixel = redEffect(pixel);

    pixel = rgbSplit(pixel);
    ctx.globalAlpha = 0.1;
    // put the back
    ctx.putImageData(pixel, 0, 0);
  }, 16)
}

function takePhoto() {
  // played the sound
  snap.currentTime = 0;
  snap.play();

  // Take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixel) {
  for (let i = 0; i < pixel.data.length; i+=4) {
    pixel.data[i + 0] = pixel.data[i + 0] + 100; //red
    pixel.data[i + 1] = pixel.data[i + 1] - 50; //green
    pixel.data[i + 2] = pixel.data[i + 2] * 0.5; //blue
  }

  return pixel;
}

function rgbSplit(pixel) {
for (let i = 0; i < pixel.data.length; i+=4) {
  pixel.data[i - 150] = pixel.data[i + 0] + 100; //red
  pixel.data[i + 500] = pixel.data[i + 1] - 50; //green
  pixel.data[i - 150] = pixel.data[i + 2] * 0.5; //blue
  }

  return pixel;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);