// ===== GREETING DENGAN WAKTU & SAPAAN BERDASARKAN WAKTU =====
function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 11)  return "Selamat Pagi";
  if (hour >= 11 && hour < 15) return "Selamat Siang";
  if (hour >= 15 && hour < 18) return "Selamat Sore";
  return "Selamat Malam";
}

function updateDatetime() {
  const now = new Date();
  const days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
  const months = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  const dayName = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2,'0');
  const mins  = String(now.getMinutes()).padStart(2,'0');
  const secs  = String(now.getSeconds()).padStart(2,'0');
  const el = document.getElementById('datetime-display');
  if (el) el.textContent = `${getTimeGreeting()} | ${dayName}, ${date} ${month} ${year} | ${hours}:${mins}:${secs}`;
}
updateDatetime();
setInterval(updateDatetime, 1000);

// ===== GREETING MESIN KETIK =====
const savedName = localStorage.getItem('customName');
const baseName = savedName ? savedName : "Sahabat Halal";
const greetingText = `Layanan Pendampingan Produk Halal area Jawa Tengah`;
const greetingElement = document.getElementById("greeting");
const greetingPhoto = document.querySelector('.header-brand .logo');
const TYPEWRITER_SPEED = 80;

let index = 0;
function typeWriter() {
  if (!greetingElement) return;

  if (index === 0 && greetingPhoto) {
    greetingPhoto.classList.remove('typing-reveal');
    greetingPhoto.style.setProperty('--typing-duration', `${greetingText.length * TYPEWRITER_SPEED}ms`);
    void greetingPhoto.offsetWidth;
    greetingPhoto.classList.add('typing-reveal');
  }

  if (index < greetingText.length) {
    greetingElement.textContent += greetingText.charAt(index);
    index++;
    setTimeout(typeWriter, TYPEWRITER_SPEED);
    return;
  }

  setTimeout(() => {
    index = 0;
    greetingElement.textContent = "";
    typeWriter();
  }, 5000);
}
typeWriter();

// ===== CEK STATUS DOKUMEN =====
const form = document.getElementById("status-form");
const registrationInput = document.getElementById("registration-no");
const cekBtn = document.getElementById("cek-btn");
const resultDiv = document.getElementById("result");
const documentViewer = document.getElementById('document-viewer');
const documentViewerTitle = document.getElementById('document-viewer-title');
const documentPdf = document.getElementById('document-pdf');
const documentImage = document.getElementById('document-image');
const printServiceLink = document.getElementById('print-service-link');

const VERIFICATION_LIMIT = 2;
const verificationAttempts = {};
let activeRegistrationCode = "";

const DATABASE_MAP = {
  "sehati.0001": [
    { file: 'nib.pdf', label: 'NIB' },
    { file: 'sertifikat.pdf', label: 'Sertifikat Halal' },
    { file: 'STIKER HALAL.png', label: 'Stiker Halal' }
  ]
};

async function loadDatabaseMap() {
  try {
    if (window.location.protocol === 'file:') {
      return DATABASE_MAP;
    }

    const response = await fetch('database/index.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Database map not found');
    return await response.json();
  } catch (error) {
    console.warn('Menggunakan map lokal karena file database tidak dapat dimuat:', error);
    return DATABASE_MAP;
  }
}

function getLastFourDigits(code) {
  const match = String(code).match(/(\d{4})$/);
  return match ? match[1] : "";
}

function openDocumentViewer(docKey, fileLink) {
  const isPdf = /\.pdf$/i.test(fileLink.split('?')[0]);
  documentViewerTitle.textContent = docKey;
  documentPdf.hidden = !isPdf;
  documentImage.hidden = isPdf;

  if (isPdf) {
    documentImage.removeAttribute('src');
    documentPdf.src = fileLink;
  } else {
    documentPdf.removeAttribute('src');
    documentImage.src = fileLink;
  }

  const message = encodeURIComponent(`Halo Mbak Esma, saya ingin menggunakan layanan cetak untuk dokumen ${docKey}.`);
  printServiceLink.href = `https://wa.me/628989096818?text=${message}`;
  documentViewer.showModal();
}

function handleDocumentAccess(docKey, fileLink) {
  const codeToVerify = getLastFourDigits(activeRegistrationCode);
  const currentAttempt = verificationAttempts[docKey] || 0;

  if (currentAttempt >= VERIFICATION_LIMIT) {
    alert('Waktu Time Out');
    window.location.href = 'index.html';
    return;
  }

  const inputCode = prompt('Masukkan kode verifikasi anda');
  const enteredCode = String(inputCode || '').trim();

  if (enteredCode === codeToVerify) {
    verificationAttempts[docKey] = 0;
    openDocumentViewer(docKey, fileLink);
    return;
  }

  verificationAttempts[docKey] = currentAttempt + 1;

  if (verificationAttempts[docKey] >= VERIFICATION_LIMIT) {
    alert('Waktu Time Out');
    window.location.href = 'index.html';
    return;
  }

  alert('Verifikasi gagal');
}

function renderDocumentList(files, folderName) {
  activeRegistrationCode = folderName;
  const rows = files.map(item => {
    const fileName = item.file || item;
    const labelName = item.label || fileName;
    const href = `database/${folderName}/${fileName}`;
    const docKey = `${folderName}-${fileName}`;
    return `
      <div class="result-row">
        <span class="result-label">${labelName}: Tersedia ✅</span>
        <a class="btn-view doc-link" href="${href}" data-doc-key="${docKey}" data-file-link="${href}" target="_blank" rel="noopener noreferrer">Lihat Dokumen</a>
      </div>
    `;
  }).join('');

  return `
    <div class="result-container">
      <p class="result-meta">Nomor Registrasi: <strong>${folderName}</strong></p>
      ${rows}
    </div>
  `;
}

if (cekBtn) cekBtn.disabled = false;

if (form) {
  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const rawRegistrationCode = registrationInput ? registrationInput.value.trim() : "";
    const normalizedCode = rawRegistrationCode.toLowerCase();

    if (!/^[A-Za-z0-9._-]{5,30}$/.test(rawRegistrationCode)) {
      resultDiv.innerHTML = `<p style="color:red;">❌ Nomor registrasi tidak valid. Gunakan huruf, angka, titik, atau tanda hubung.</p>`;
      return;
    }

    const databaseMap = await loadDatabaseMap();
    const folderFiles = databaseMap[normalizedCode] || databaseMap[rawRegistrationCode];

    if (folderFiles && folderFiles.length) {
      resultDiv.innerHTML = renderDocumentList(folderFiles, normalizedCode);
      return;
    }

    const folderPath = `database/${normalizedCode}`;
    const directFiles = [
      { file: 'nib.pdf', label: 'NIB' },
      { file: 'sertifikat.pdf', label: 'Sertifikat Halal' },
      { file: 'STIKER HALAL.png', label: 'Stiker Halal' }
    ];

    const fallbackFiles = directFiles.filter(file => {
      const path = `${folderPath}/${file.file}`;
      return path.length > 0;
    });

    if (fallbackFiles.length) {
      resultDiv.innerHTML = renderDocumentList(fallbackFiles, normalizedCode);
      return;
    }

    resultDiv.innerHTML = `<p style="color:red;">❌ Nomor registrasi <strong>${rawRegistrationCode}</strong> tidak ditemukan di database.</p>`;
  });
}

resultDiv.addEventListener('click', function(e) {
  const link = e.target.closest('.doc-link');
  if (!link) return;

  e.preventDefault();
  const docKey = link.dataset.docKey;
  const fileLink = link.dataset.fileLink;
  handleDocumentAccess(docKey, fileLink);
});

const scrollNotice = document.getElementById('scroll-notice');
const scrollNoticeToggle = document.getElementById('scroll-notice-toggle');

if (scrollNotice && scrollNoticeToggle) {
  scrollNoticeToggle.addEventListener('click', function() {
    const isExpanded = scrollNoticeToggle.getAttribute('aria-expanded') === 'true';
    scrollNotice.classList.toggle('is-collapsed', isExpanded);
    scrollNoticeToggle.setAttribute('aria-expanded', String(!isExpanded));
    scrollNoticeToggle.setAttribute('aria-label', isExpanded ? 'Perluas notifikasi' : 'Ciutkan notifikasi');
    scrollNoticeToggle.textContent = isExpanded ? '+' : '−';
  });
}

if (scrollNotice) {
  const updateScrollNoticeVisibility = () => {
    scrollNotice.classList.toggle('is-hidden', window.scrollY > 180);
  };
  window.addEventListener('scroll', updateScrollNoticeVisibility, { passive: true });
  updateScrollNoticeVisibility();
}

document.getElementById('close-document-viewer').addEventListener('click', function() {
  documentViewer.close();
});

documentViewer.addEventListener('click', function(e) {
  if (e.target === documentViewer) documentViewer.close();
});

documentViewer.addEventListener('close', function() {
  documentPdf.removeAttribute('src');
  documentImage.removeAttribute('src');
});

// ===== DARK MODE =====
const darkBtn = document.getElementById('dark-mode-toggle');
let isDark = localStorage.getItem('darkMode') === 'true';
function applyDark(val) {
  document.body.classList.toggle('dark-mode', val);
  if (darkBtn) darkBtn.textContent = val ? '☀️' : '🌙';
}
applyDark(isDark);
if (darkBtn) {
  darkBtn.addEventListener('click', () => {
    isDark = !isDark;
    localStorage.setItem('darkMode', isDark);
    applyDark(isDark);
  });
}

// ===== EFEK PARTIKEL HIJAU EMAS =====
(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const PARTICLE_COUNT = 100;
  const particles = [];
  const colors = [
    { red: 18, green: 150, blue: 85 },
    { red: 212, green: 175, blue: 55 }
  ];

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createParticle() {
    return {
      x: randomBetween(0, canvas.width),
      y: randomBetween(0, canvas.height),
      radius: randomBetween(1, 3),
      speedX: randomBetween(-0.25, 0.25),
      speedY: randomBetween(-0.35, 0.35),
      phase: randomBetween(0, Math.PI * 2),
      twinkleSpeed: randomBetween(0.01, 0.035),
      opacity: randomBetween(0.4, 0.85),
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      const opacity = particle.opacity * (0.65 + Math.sin(particle.phase) * 0.35);
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${particle.color.red}, ${particle.color.green}, ${particle.color.blue}, ${opacity})`;
      ctx.fill();
    });
  }

  function update() {
    particles.forEach(particle => {
      particle.phase += particle.twinkleSpeed;
      particle.x += particle.speedX + Math.cos(particle.phase) * 0.15;
      particle.y += particle.speedY + Math.sin(particle.phase) * 0.15;
      if (particle.y > canvas.height + particle.radius) {
        particle.y = -particle.radius;
        particle.x = randomBetween(0, canvas.width);
      }
      if (particle.y < -particle.radius) {
        particle.y = canvas.height + particle.radius;
        particle.x = randomBetween(0, canvas.width);
      }
      if (particle.x > canvas.width + particle.radius) particle.x = -particle.radius;
      if (particle.x < -particle.radius) particle.x = canvas.width + particle.radius;
    });
  }

  function animate() { draw(); update(); requestAnimationFrame(animate); }
  animate();
})();
