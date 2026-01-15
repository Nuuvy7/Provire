const targetDate = new Date("2026-01-15T14:59:40").getTime();
const countdownEl = document.querySelector("[countdown]");
const subtitleEl = document.querySelector(".subtitle");

let confettiCount = 0;  // Ganti flag dengan counter untuk menghitung berapa kali confetti muncul

function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        countdownEl.innerHTML = "<span style='font-weight:600; font-size:22px'>IT'S STARTING</span>";
        subtitleEl.innerHTML = "";

        if (confettiCount < 3) {
            confetti({
                particleCount: 400, 
                spread: 1200, 
                origin: { y: 0.6 },
                duration: 5000  
            });
            confettiCount++;  
        }
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownEl.innerHTML = `
        <div style="
            font-size: 16px;
            margin-top: 10px;
            font-weight: 600;
            letter-spacing: 1px;
        ">
            ${days} Days 
            ${hours} Hours 
            ${minutes} Minutes 
            ${seconds} Seconds
        </div>
    `;
}

updateCountdown();
setInterval(updateCountdown, 1000);


// const targetDate = new Date("2026-01-14T15:40:30").getTime();
// const countdownEl = document.querySelector("[countdown]");
// const subtitleEl = document.querySelector(".subtitle");

// let hasConfettiShown = false;

// function updateCountdown() {
//     const now = new Date().getTime();
//     const diff = targetDate - now;

//     if (diff <= 0) {
//         countdownEl.innerHTML = "<span style='font-weight:600; font-size:22px'>IT'S STARTING</span>";
//         subtitleEl.innerHTML = "";
        
//         if (!hasConfettiShown) {
//             confetti({
//                 particleCount: 700,
//                 spread: 1200, 
//                 origin: { y: 0.6 },
//                 duration: 5000  
//             });
//             hasConfettiShown = true; 
//         }
//         return;
//     }

//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//     countdownEl.innerHTML = `
//         <div style="
//             font-size: 16px;
//             margin-top: 10px;
//             font-weight: 600;
//             letter-spacing: 1px;
//         ">
//             ${days} Days 
//             ${hours} Hours 
//             ${minutes} Minutes 
//             ${seconds} Seconds
//         </div>
//     `;
// }

// updateCountdown();
// setInterval(updateCountdown, 1000);