const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

// Ambil posisi musik terakhir
const savedTime = localStorage.getItem("musicTime");

// Ambil status musik
const musicPlaying = localStorage.getItem("musicPlaying");


// Kalau sebelumnya sudah ada posisi
if (savedTime !== null) {
    music.currentTime = parseFloat(savedTime);
}


// Update ikon tombol
function updateMusicButton() {
    if (music.paused) {
        musicButton.innerHTML =
            '<i class="fa-solid fa-volume-xmark"></i>';
    } else {
        musicButton.innerHTML =
            '<i class="fa-solid fa-volume-high"></i>';
    }
}


// Tombol ON / OFF
musicButton.addEventListener("click", function () {

    if (music.paused) {

        music.play();

        localStorage.setItem("musicPlaying", "true");

    } else {

        music.pause();

        localStorage.setItem("musicPlaying", "false");
    }

    updateMusicButton();
});


// Simpan posisi musik setiap 1 detik
setInterval(function () {

    if (!music.paused) {
        localStorage.setItem(
            "musicTime",
            music.currentTime
        );
    }

}, 1000);


// Ketika halaman dibuka
if (musicPlaying === "true") {

    music.play().then(function () {

        updateMusicButton();

    }).catch(function () {

        // Browser memblokir autoplay
        updateMusicButton();

    });

} else {

    updateMusicButton();
}