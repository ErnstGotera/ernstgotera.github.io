let theme = localStorage.getItem('theme');

if (theme == null) {
  setTheme('light');
} else {
  setTheme(theme);
}

let themeDots = document.getElementsByClassName('theme-dot');

for (var i = 0; themeDots.length > i; i++) {
  themeDots[i].addEventListener('click', function () {
    let mode = this.dataset.mode;
    console.log('Option clicked:', mode);
    setTheme(mode);
  });
}

function setTheme(mode) {
  if (mode == 'light') {
    document.getElementById('theme-style').href = 'css/default.css';
  }

  if (mode == 'blue') {
    document.getElementById('theme-style').href = 'css/blue.css';
  }

  if (mode == 'green') {
    document.getElementById('theme-style').href = 'css/green.css';
  }

  if (mode == 'purple') {
    document.getElementById('theme-style').href = 'css/purple.css';
  }

  localStorage.setItem('theme', mode);
}

class typeWriter {
  constructor(txtElement, words, wait = 2000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }
  type() {
    //Current index of word
    const current = this.wordIndex % this.words.length;
    //Get full text of current word
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      //remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      //add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 150;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at the end
      typeSpeed = this.wait;
      //set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 1000;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}
document.addEventListener('DOMContentLoaded', init);

function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');

  new typeWriter(txtElement, words, wait);
}
