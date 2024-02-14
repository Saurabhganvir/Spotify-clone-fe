console.log("Welcome to your favouritte music app")
//initialising the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
// audioElement.play();
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    {songName:'Song No 1', filePath:'StaticFiles/songs/1.mp3', coverPath:'StaticFiles/covers/1.jpg'},
    {songName:'Song N0 2', filePath:'StaticFiles/songs/2.mp3', coverPath:'StaticFiles/covers/2.jpg'},
    {songName:'Song No 3', filePath:'StaticFiles/songs/3.mp3', coverPath:'StaticFiles/covers/3.jpg'},
    {songName:'Song No 4', filePath:'StaticFiles/songs/4.mp3', coverPath:'StaticFiles/covers/4.jpg'},
    {songName:'Song No 5', filePath:'StaticFiles/songs/5.mp3', coverPath:'StaticFiles/covers/5.jpg'},
    {songName:'Song No 6', filePath:'StaticFiles/songs/6.mp3', coverPath:'StaticFiles/covers/6.jpg'},
    {songName:'Song No 7', filePath:'StaticFiles/songs/7.mp3', coverPath:'StaticFiles/covers/7.jpg'},
    {songName:'Song No 8', filePath:'StaticFiles/songs/8.mp3', coverPath:'StaticFiles/covers/8.jpg'}
]


songItems.forEach((element, i) => {
    console.log(element , i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    // element.getElementsByClassName("timeStamp")[0].innerText = parseInt(Audio(songs[i].filePath).duration);
});

// audioElement.play();

//Handle play pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
    }
})

//Listen to the Events
audioElement.addEventListener('timeupdate', ()=>{
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);  
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change' , ()=>{
    audioElement.currentTime = (myProgressBar.value)*(audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        console.log(e);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        // audioElement.src = `StaticFiles/songs/${index}.mp3`;
       
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `StaticFiles/songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    })
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex>1){
        songIndex -=1;
    }else if(songIndex==0){
        songIndex = 8;
    }
    audioElement.src = `StaticFiles/songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");

})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex<8){
        songIndex +=1;
    }else{
        songIndex = 1;
    }
    audioElement.src = `StaticFiles/songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");


})