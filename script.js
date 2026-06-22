// ================================
// CONFIGURATION
// ================================

const TOTAL_CHILD_PHOTOS = 15;
const TOTAL_SOLO_PHOTOS = 30;
const TOTAL_FAMILY_PHOTOS = 25;
const TOTAL_VIDEOS = 6;

// ================================
// ELEMENTS
// ================================

const childGallery = document.getElementById("childGallery");
const soloGallery = document.getElementById("soloGallery");
const familyGallery = document.getElementById("familyGallery");
const videoGrid = document.getElementById("videoGrid");

const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterBtn");
const bgMusic = document.getElementById("bgMusic");

const celebrateBtn = document.getElementById("celebrateBtn");

const flame = document.getElementById("flame");

const heartsContainer = document.getElementById("heartsContainer");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

// ================================
// LOAD PHOTOS
// ================================

function loadGallery(folder, total, container){

    for(let i=1;i<=total;i++){

        const img=document.createElement("img");

        const num=String(i).padStart(2,"0");

        img.src=`images/${folder}/${num}.jpg`;

        img.alt=`${folder} ${i}`;

        img.loading="lazy";

        img.onerror=()=>{
            img.style.display="none";
        }

        img.addEventListener("click",()=>{

            lightbox.style.display="flex";
            lightboxImg.src=img.src;

        });

        container.appendChild(img);

    }

}

// ================================
// LOAD VIDEOS
// ================================

function loadVideos(){

    for(let i=1;i<=TOTAL_VIDEOS;i++){

        const video=document.createElement("video");

        video.controls=true;

        video.preload="metadata";

        const source=document.createElement("source");

        const num=String(i).padStart(2,"0");

        source.src=`assets/videos/${num}.mp4`;

        source.type="video/mp4";

        video.appendChild(source);

        video.onerror=()=>{

            video.style.display="none";

        }

        videoGrid.appendChild(video);

    }

}

// ================================
// CLOSE LIGHTBOX
// ================================

closeLightbox.onclick=()=>{

    lightbox.style.display="none";

}

lightbox.onclick=(e)=>{

    if(e.target===lightbox){

        lightbox.style.display="none";

    }

}

// ================================
// INTRO
// ================================

enterBtn.addEventListener("click",()=>{

    intro.style.opacity="0";

    setTimeout(()=>{

        intro.style.display="none";

    },800);

    bgMusic.play().catch(()=>{});

    launchHearts();

});

// ================================
// HEARTS
// ================================

function createHeart(){

    const heart=document.createElement("div");

    heart.className="heart";

    const hearts=["❤️","💕","💖","💗","💝"];

    heart.innerHTML=
        hearts[Math.floor(Math.random()*hearts.length)];

    heart.style.left=Math.random()*100+"vw";

    heart.style.fontSize=
        (20+Math.random()*20)+"px";

    heart.style.animationDuration=
        (4+Math.random()*4)+"s";

    heartsContainer.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },8000);

}

function launchHearts(){

    setInterval(createHeart,500);

}

// ================================
// CONFETTI
// ================================

function launchConfetti(){

    if(typeof confetti!=="function") return;

    confetti({

        particleCount:180,

        spread:120,

        origin:{y:0.6}

    });

    setTimeout(()=>{

        confetti({

            particleCount:220,

            spread:180

        });

    },400);

}

celebrateBtn.addEventListener("click",launchConfetti);

// ================================
// CANDLE
// ================================

let blown=false;

flame.addEventListener("click",()=>{

    if(blown) return;

    blown=true;

    flame.style.transition=".5s";

    flame.style.opacity="0";

    flame.style.transform="translateX(-50%) scale(0)";

    launchConfetti();

    setTimeout(()=>{

        alert("🎂 Make a wish ❤️");

    },500);

});

// ================================
// SCROLL REVEAL
// ================================

const reveals=document.querySelectorAll(".reveal");

function revealSections(){

    reveals.forEach(section=>{

        const top=section.getBoundingClientRect().top;

        if(top<window.innerHeight*0.85){

            section.classList.add("show");

        }

    });

}

window.addEventListener("scroll",revealSections);

// ================================
// SMOOTH ACTIVE NAV
// ================================

const navLinks=document.querySelectorAll("nav a");

navLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.forEach(a=>a.classList.remove("active"));

        link.classList.add("active");

    });

});

// ================================
// PARALLAX HERO
// ================================

window.addEventListener("scroll",()=>{

    const hero=document.querySelector(".hero");

    hero.style.backgroundPositionY=
        window.scrollY*0.4+"px";

});

// ================================
// DOUBLE CLICK IMAGE LIKE EFFECT
// ================================

document.addEventListener("dblclick",(e)=>{

    if(e.target.tagName==="IMG"){

        const heart=document.createElement("div");

        heart.innerHTML="❤️";

        heart.style.position="fixed";

        heart.style.left=e.clientX+"px";

        heart.style.top=e.clientY+"px";

        heart.style.fontSize="40px";

        heart.style.pointerEvents="none";

        heart.style.transition="1s";

        document.body.appendChild(heart);

        setTimeout(()=>{

            heart.style.opacity="0";

            heart.style.transform="translateY(-80px) scale(2)";

        },20);

        setTimeout(()=>{

            heart.remove();

        },1000);

    }

});

// ================================
// KEYBOARD SUPPORT
// ================================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        lightbox.style.display="none";

    }

});

// ================================
// INIT
// ================================

loadGallery(
    "childhood",
    TOTAL_CHILD_PHOTOS,
    childGallery
);

loadGallery(
    "solo",
    TOTAL_SOLO_PHOTOS,
    soloGallery
);

loadGallery(
    "family",
    TOTAL_FAMILY_PHOTOS,
    familyGallery
);

loadVideos();

revealSections();