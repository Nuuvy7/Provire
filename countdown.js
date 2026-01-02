const targetDate = new Date("2026-01-15T12:59:59").getTime();
const countdownEl = document.querySelector("[countdown]");

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            countdownEl.innerHTML = "<span style='font-weight:600;'>Waktu Habis!</span>";
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