console.log("Lets Write JavaScript")
let currentSong = new Audio();
let songs;
let currFolder;

function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
}

async function getSongs(folder) {
    currFolder = folder;

    let a = await fetch(`/${encodeURIComponent(folder)}/`);
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");

    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            let parts = element.href.split("/");
            let filename = parts[parts.length - 1];
            songs.push(filename);
        }
    }

    // show all the songs in the playlist
    let songUL = document.querySelector(".song-List").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";
    for (const song of songs) {
        songUL.innerHTML += `<li> 
            <img class="invert" src="img/music.svg" alt="">
            <div class="info">
                <div>${(song || "").replaceAll("%20", " ")}</div>
                <div>Ayush</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert play1" src="img/play.svg" alt="">
            </div>
        </li>`;
    }

    // attach an event listener to each song
    Array.from(document.querySelector(".song-List").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            let trackName = e.querySelector(".info").firstElementChild.innerHTML;
            console.log(trackName);
            playMusic(trackName);
        });
    });
}

const playMusic = (track, pause = false) => {
    // let audio=new Audio(`/video 84-Project 2/songs/${track}`);
    currentSong.src = `/video 84-Project 2/${encodeURIComponent(currFolder)}/${encodeURIComponent(track)}`;

    if (!pause) {
        currentSong.play();
        play.src = "img/pause.svg";
    }

    document.querySelector(".song-info").innerHTML = track.replaceAll("%20", " ");
    document.querySelector(".song-time").innerHTML = "00:00 / 00:00";
}

async function displayAlbums() {
    let a = await fetch(`/songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a");
    let cardContainer = document.querySelector(".cardContainer");
    let array = Array.from(anchors);

    for (let index = 0; index < array.length; index++) {
        const e = array[index];

        if (e.href.includes("/songs" && !e.href.includes("htaccess"))) {
            let albumEncoded = e.href.split("/").slice(-2)[0];
            let folder = decodeURIComponent(albumEncoded);

            let metaRes = await fetch(`/songs/${encodeURIComponent(folder)}/info.json`);
            let meta = await metaRes.json();

            cardContainer.innerHTML += `
            <div data-folder="songs/${folder}" class="card">
                <div class="play">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                        <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
                        stroke="#000000" stroke-width="1.5" fill="#000" stroke-linejoin="round" />
                    </svg>
                </div>
                <img src="/video 84-Project 2/songs/${encodeURIComponent(folder)}/cover.jpeg" alt="">
                <h2>${meta.title}</h2>
                <p>${meta.description}</p>
            </div>`;
        }
    }

    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            await getSongs(item.currentTarget.dataset.folder);
        });
    });
}


async function main() {
    // get list of all songs
    await getSongs("songs/Trending");
    // console.log(songs)

    // Display all the albums on the page 
    displayAlbums();

    playMusic(songs[0], true);

    const previous = document.querySelector("#previous");
    const next = document.querySelector("#next");

    // attach an event listener to play 
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "img/pause.svg";
        } else {
            currentSong.pause();
            play.src = "img/play.svg";
        }
    });

    // Listen for time update event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".song-time").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    // Add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });

    // Add an Event listener for Hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    // Add an Event listener for close-btn
    document.querySelector(".close-btn").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    // Add an Event listener for previous button
    previous.addEventListener("click", () => {
        console.log("prev");
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if (index - 1 >= 0) playMusic(songs[index - 1]);
    });

    // Add an Event listener for next button
    next.addEventListener("click", () => {
        currentSong.pause();
        console.log("next");
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if (index + 1 < songs.length) playMusic(songs[index + 1]);
    });

    // Add an event to volume
    document.querySelector(".range input").addEventListener("change", (e) => {
        console.log("Setting volume to", e.target.value, "/ 100");
        currentSong.volume = e.target.value / 100;
        if (currentSong.volume > 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg");
        }
    });

    // Add event listener to mute the track
    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg");
            currentSong.volume = 0;
            document.querySelector(".range input").value = 0;
        } else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg");
            currentSong.volume = 0.10;
            document.querySelector(".range input").value = 10;
        }
    });
}

main();



