// DOM Elements
const btnOpenDoor = document.getElementById('btn-open-door');
const doorLeft = document.getElementById('door-left');
const doorRight = document.getElementById('door-right');
const doorOverlay = document.getElementById('door-overlay');
const welcomeCenter = document.getElementById('welcome-center');
const mainContent = document.getElementById('main-content');

// --- 1. Door Opening Logic ---
btnOpenDoor.addEventListener('click', () => {
    // Play background music from the audio folder
    try {
        const bgMusic = new Audio('audio/1.mp3');
        bgMusic.loop = true; // Make it loop indefinitely
        bgMusic.volume = 0.5; // Set a comfortable volume level
        bgMusic.play().catch(e => console.error("Audio block:", e));
    } catch(err) {
        console.error("Audio error:", err);
    }

    // Hide center text
    welcomeCenter.classList.add('fade-out');

    // Slight delay before doors open for dramatic effect
    setTimeout(() => {
        doorLeft.classList.add('open');
        doorRight.classList.add('open');

        // Let the doors open, then fade out the overlay entirely
        setTimeout(() => {
            doorOverlay.classList.add('hidden');
            // Show main content
            mainContent.classList.add('visible');

            // Optional: Start background music here if needed
            // let audio = new Audio('romantic.mp3');
            // audio.play();
        }, 1500); // Wait for door transition
    }, 500);
});

// --- 2. Memory Details Modal Logic ---
const memoryData = {
    1: {
        img: 'img/6.jpg',
        title: 'يومنا الأول',
        text: 'في هذا اليوم، بدأت أجمل قصة في حياتي. نظرت في عينيك وعرفت أنكِ الشخص المقصود. كل تفصيلة في ذلك اليوم محفورة في ذاكرتي ولن أنساها أبداً.'
    },
    2: {
        img: 'img/7.jpg',
        title: 'ضحكات لا تتوقف',
        text: 'أكثر ما أحبه في أيامنا هو تلك اللحظات التي نضحك فيها حتى تدمع عيوننا. وجودك يضيف لحياتي ألواناً لم أكن أعرفها.'
    },
    3: {
        img: 'img/8.jpg',
        title: 'رحلتنا التي لا تُنسى',
        text: 'السفر معكِ يختلف عن أي مكان زرته من قبل. الأماكن تصبح أجمل، والوقت يمر وكأنه ثوانٍ عندما نكون معاً في مكان جديد. هذه فقط البداية لرحلاتنا.'
    },
    4: {
        img: 'img/9.jpg',
        title: 'نظرة تحمل ألف كلمة',
        text: 'في كل مرة تنظرين فيها إليّ أرى طمأنينة العالم. لم أكن أعلم أن نظرة واحدة يمكن أن تجعلني أشعر بأنني أمتلك كل شيء، حتى التقيت بك.'
    }
};

function openMemoryModal(id) {
    const modal = document.getElementById('memory-modal');
    const imgEl = document.getElementById('modal-image');
    const titleEl = document.getElementById('modal-title');
    const textEl = document.getElementById('modal-text');

    if (memoryData[id]) {
        imgEl.src = memoryData[id].img;
        titleEl.innerText = memoryData[id].title;
        textEl.innerText = memoryData[id].text;

        modal.classList.add('active');
    }
}

function closeMemoryModal() {
    document.getElementById('memory-modal').classList.remove('active');
}


// --- 3. Password / Secret Logic ---
function openPasswordModal() {
    document.getElementById('password-modal').classList.add('active');
    document.getElementById('password-error').innerText = ''; // clear error
    document.getElementById('secret-password').value = '';
}

function closePasswordModal() {
    document.getElementById('password-modal').classList.remove('active');
}

function checkPassword() {
    const input = document.getElementById('secret-password').value.trim();
    const errorMsg = document.getElementById('password-error');

    // Define the secret password here
    const correctPassword = 'احبك'; // Users can change this in the code

    if (input === correctPassword || input === 'أحبك') { // Allowing variations
        closePasswordModal();
        // Slight delay before opening the final surprise
        setTimeout(() => {
            openFinalModal();
        }, 400);
    } else {
        errorMsg.innerText = 'كلمة السر غير صحيحة... حاول مرة أخرى من قلبك ❤️';
    }
}

// Ensure Enter key works for password input
document.getElementById('secret-password').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        checkPassword();
    }
});


// --- 4. Final Surprise Modal Logic ---
function openFinalModal() {
    document.getElementById('final-modal').classList.add('active');
}

function closeFinalModal() {
    document.getElementById('final-modal').classList.remove('active');
}

// Close modals when clicking outside
window.onclick = function (event) {
    const memoryModal = document.getElementById('memory-modal');
    const passwordModal = document.getElementById('password-modal');
    const finalModal = document.getElementById('final-modal');

    if (event.target == memoryModal) {
        closeMemoryModal();
    }
    if (event.target == passwordModal) {
        closePasswordModal();
    }
    if (event.target == finalModal) {
        closeFinalModal();
    }
}
