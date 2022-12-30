function speed() {
  let tittle = document.querySelector("#title > h1")
  let frag = document.createDocumentFragment();
  let s = document.createElement('input');
  let br = document.createElement('br');
  frag.appendChild(br);
  frag.appendChild(s);
  s.setAttribute('type', 'number');
  s.setAttribute('step', '0.05');
  s.setAttribute('min', '0');
  s.setAttribute('id', 's');
  const sheet = new CSSStyleSheet();
  sheet.insertRule(`#s {
    height:100%;
    display: block;
    margin: auto;
    text-align:center;
    outline: none;
    border: 0;
    font-size: 1.1em;
    background-color: #ffefef;
    color: #0000ff;
    border-radius: 1em;
  }`);
  document.adoptedStyleSheets = [sheet];

  chrome.storage.local.get(["speed"]).then((result) => {
    if (!result.speed) {
      result.speed = 1
    }
    document.getElementsByClassName('video-stream html5-main-video')[0].playbackRate = result.speed;
    console.log("Get: ", result.speed);
    s.setAttribute("value", result.speed.toString())
  });

  tittle.appendChild(frag);

  s.addEventListener('change', (e) => {
    document.getElementsByClassName('video-stream html5-main-video')[0].playbackRate = parseFloat(e.target.value);

    chrome.storage.local.set({ speed: parseFloat(e.target.value) }).then(() => {
      console.log("Set: ", parseFloat(e.target.value));
    });
  })


};

speed();