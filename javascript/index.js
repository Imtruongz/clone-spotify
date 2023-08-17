var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

const playBtn = $(".btn-toggle-play");
const img = $(".imgSong");
const nameSong = $(".nameSong");
const nameSinger = $(".nameSinger");
const audio = $("#audio");
const progress = $(".progress");
const NextSongBtn = $(".btn-toggle-next");
const PrevSongBtn = $(".btn-toggle-prev");
const RepeatSongBtn = $(".btn-toggle-repeat");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isColorIcon: false,

  accounts: [
    {
      img: "assets/img/thieuz.png",
    },
  ],

  songs: [
    {
      name: "Somebody",
      singer: "Keshi",
      img: "assets/img-songs/somebody.jpg",
      path: "assets/songs/SOMEBODY.mp3",
    },
    {
      name: "Limbo",
      singer: "Keshi",
      img: "assets/img-songs/limbo.jpg",
      path: "assets/songs/limbo.mp3",
    },
    {
      name: "Blue",
      singer: "Keshi",
      img: "assets/img-songs/blue.jpg",
      path: "assets/songs/blue.mp3",
    },
    {
      name: "Beside you",
      singer: "Keshi",
      img: "assets/img-songs/bedise you.jpg",
      path: "assets/songs/beside you.mp3",
    },
    {
      name: "Right here",
      singer: "Keshi",
      img: "assets/img-songs/right here.jpg",
      path: "assets/songs/right here.mp3",
    },
  ],

  albums: [
    {
      name: "GABRIEL",
      img: "assets/img-albums/GABRIEL.jpg",
    },
    {
      name: "ALWAYS",
      img: "assets/img-albums/always.jpg",
    },
    {
      name: "BANDAIDS",
      img: "assets/img-albums/bandails.jpg",
    },
    {
      name: "99%",
      img: "assets/img-albums/99.jpg",
    },
    {
      name: "FEARLESS",
      img: "assets/img-albums/fearless.jpg",
    },
    {
      name: "JUSTICE",
      img: "assets/img-albums/justice.jpg",
    },
  ],

  //Khi load trang web
  render: function () {
    const renderSongs = this.songs.map((song) => {
      return `
            <div class="name-song">
                <img src="${song.img}" alt="" />
                <b>${song.name}</b>
                <p>${song.singer}</p>
            </div>`;
    });
    $(".songs").innerHTML = renderSongs.join("");

    const renderAlbums = this.albums.map((album) => {
      return `
        <div class="name-album">
            <img src="${album.img}" alt="" />
            <b>${album.name}</b>
          </div>`;
    });
    $(".album").innerHTML = renderAlbums.join("");

    const renderAccounts = this.accounts.map((account) => {
      return `
      <img src="${account.img}" alt="" />
    `;
    });
    $(".account").innerHTML = renderAccounts.join("");
  },

  defineproperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  loadCurrentSong: function () {
    const currentSong = app.songs[app.currentIndex];
    img.src = app.songs[app.currentIndex].img;
    nameSong.textContent = currentSong.name;
    nameSinger.textContent = currentSong.singer;
    audio.src = currentSong.path;
  },

  handleEvents: function () {
    //Play and pause audio
    playBtn.onclick = function () {
      if (app.isPlaying) {
        app.isPlaying = false;
        audio.pause();
        playBtn.classList.remove("playing");
      } else {
        app.isPlaying = true;
        audio.play();
        playBtn.classList.add("playing");
      }
    };

    //Music runtime
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    //Seek
    progress.oninput = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    //Next Song
    NextSongBtn.onclick = function () {
      app.NextSong();
      audio.play();
      playBtn.classList.add("playing");
    };

    //Prev Song
    PrevSongBtn.onclick = function () {
      app.PrevSong();
      audio.play();
      playBtn.classList.add("playing");
    };

    //Next song if current song was ended
    audio.onended = function () {
      app.NextSong();
      audio.play();
      playBtn.classList.add("playing");
    };

    //Btn toggle repeat song
    RepeatSongBtn.onclick = function () {
      app.isColorIcon = !app.isColorIcon;
      if (app.isColorIcon) {
        RepeatSongBtn.classList.add("changeColor");
      } else {
        RepeatSongBtn.classList.remove("changeColor");
      }
    };
  },

  //Main start
  start: function () {
    this.loadCurrentSong();
    this.handleEvents();
    this.defineproperties();
    this.render();
  },

  //Cac chuc nang
  NextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  PrevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },

};

app.start();
