window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true; //this line of code enables the speech recognition as you're speaking. If you don't do that, your speech will only be recognized after you're done speaking.

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
  
  const transcript = Array.from(e.results)
  .map(result => result[0])
  .map(result => result.transcript)
  .join('')

  p.textContent = transcript; //notice that after doing this, your new speech overrides the old speech. So what we have to do is check if the reult is final

  if (e.results[0].isFinal) {
    p = document.createElement('p');
    words.appendChild(p);
  }
  
  // console.log(transcript);
}) //note that after you finish speaking, and your speech is recognized, it won't work again if you try to talk that;s because this function is only listening for the result. What we have to do is to listen to another function

recognition.addEventListener('end', recognition.start)

recognition.start();