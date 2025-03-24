const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Diable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing joke to the VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: '',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = '';
  const apiURL =
    'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark?blacklistFlags=religious,political,racist';
  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    // Text-to-Speech
    tellMe(joke);

    // Disable button while joke is being told
    toggleButton();
  } catch (error) {
    console.log('Error: ', error);
  }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
