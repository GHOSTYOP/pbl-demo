let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [{
        name: "Excuses",
        artist: "AP Dhillon",
        image: "https://a10.gaanacdn.com/images/albums/4/4729504/crop_480x480_4729504.jpg",
        path: "music/excuses.mp3"
    },
    {
        name: "Overwhelmed",
        artist: "Ryan Mack",
        image: "https://i.scdn.co/image/ab67616d0000b273df62a79e3efd9e3438ce70ed",
        path: "music/overwhelmed.mp3"
    },
    {
        name: "Sahara",
        artist: "Hensonn",
        image: "https://i1.sndcdn.com/artworks-p3x7gn5Qpy5iCZJY-PsSTNQ-t500x500.jpg",
        path: "music/sahara.mp3",
    },
                  {
        name: "Lover",
        artist: "Diljit Dosanjh",
        image: "https://i.scdn.co/image/ab67616d0000b2733b8fbe2d8b25ca2bfddf5b16",
        path: "music/lover.mp3",
    },
    {
        name: "Insane",
        artist: "AP Dhillon",
        image: "https://a10.gaanacdn.com/images/albums/56/4073656/crop_480x480_4073656.jpg",
        path: "music/insane.mp3",
    },
    {
        name: "Thats What I Want",
        artist: "Lil Nas X",
        image: "https://media1.popsugar-assets.com/files/thumbor/kVqOy8E1htqg0CJJMlWVL-gSPK4/152x0:1714x1562/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2021/09/18/665/n/1922283/6eb24b6e6145fea6981f28.05720866_/i/lil-nas-x-thats-what-i-want-music-video.png",
        path: "music/lil.mp3"
    },
    {
        name: "Chaand Baaliyan",
        artist: "Aditya A",
        image: "https://a10.gaanacdn.com/images/albums/26/3814826/crop_480x480_3814826.jpg",
        path: "music/baaliyan.mp3"
    },
];


function random_bg_color() {

    // Get a number between 64 to 256 (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;

    // Construct a color withe the given values
    let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

    // Set the background to that color
    document.body.style.background = bgColor;
}

function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener("ended", nextTrack);
    random_bg_color();
}

function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length;
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);

        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
