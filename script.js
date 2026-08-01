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

let index = 0;
function typeWriter() {
  if (index < greetingText.length) {
    greetingElement.textContent += greetingText.charAt(index);
    index++;
    setTimeout(typeWriter, 80);
  }
}
typeWriter();

// ===== CEK STATUS DOKUMEN =====
const form = document.getElementById("status-form");
const nikInput = document.getElementById("nik");
const cekBtn = document.getElementById("cek-btn");
const resultDiv = document.getElementById("result");

cekBtn.disabled = false;

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const nik = nikInput.value.trim();
  if (/^\d{16}$/.test(nik)) {
    resultDiv.innerHTML = `
      <div class="result-container">
        <p class="result-label">NIB: Sudah Terbit ✅
          <a class="btn-view" href="documents/nib.pdf" target="_blank">Lihat Dokumen</a>
        </p>
        <p class="result-label">Sertifikat Halal: Sudah Jadi ✅
          <a class="btn-view" href="documents/sertifikat.pdf" target="_blank">Lihat Dokumen</a>
        </p>
        <p class="result-label">Logo Halal: Sudah Tersedia ✅
          <a class="btn-view" href="documents/logo-halal.png" target="_blank" id="btn-logo-halal">Lihat Dokumen</a>
          <a class="btn-download-small" href="documents/logo-halal.png" download id="btn-dl-logo" style="display:none;">⬇ Download Logo</a>
        </p>
      </div>
    `;
    document.getElementById('btn-logo-halal').addEventListener('click', function () {
      document.getElementById('btn-dl-logo').style.display = 'inline-block';
    });
  } else {
    resultDiv.innerHTML = `<p style="color:red;">❌ NIK tidak valid. Harus 16 digit angka.</p>`;
  }
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

// ===== SIDEBAR TOGGLE =====
const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
const sidebar = document.getElementById('sidebar');
const sidebarCloseBtn = document.getElementById('sidebar-close-btn');

sidebarToggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('closed');
  sidebar.classList.toggle('open');
});
sidebarCloseBtn.addEventListener('click', () => {
  sidebar.classList.remove('open');
  sidebar.classList.add('closed');
});

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
  });
});

// ===== POMODORO TIMER =====
let pomodoroTotal = 25 * 60; // detik
let pomodoroLeft  = pomodoroTotal;
let pomodoroInterval = null;
let pomodoroRunning  = false;

function updatePomodoroDisplay() {
  const m = String(Math.floor(pomodoroLeft / 60)).padStart(2,'0');
  const s = String(pomodoroLeft % 60).padStart(2,'0');
  document.getElementById('pomodoro-display').textContent = `${m}:${s}`;
}

document.getElementById('timer-start').addEventListener('click', () => {
  if (pomodoroRunning) return;
  pomodoroRunning = true;
  pomodoroInterval = setInterval(() => {
    if (pomodoroLeft <= 0) {
      clearInterval(pomodoroInterval);
      pomodoroRunning = false;
      document.getElementById('pomodoro-display').textContent = '⏰ Selesai!';
      return;
    }
    pomodoroLeft--;
    updatePomodoroDisplay();
  }, 1000);
});

document.getElementById('timer-stop').addEventListener('click', () => {
  clearInterval(pomodoroInterval);
  pomodoroRunning = false;
});

document.getElementById('timer-reset').addEventListener('click', () => {
  clearInterval(pomodoroInterval);
  pomodoroRunning = false;
  pomodoroLeft = pomodoroTotal;
  updatePomodoroDisplay();
});

document.getElementById('timer-set').addEventListener('click', () => {
  const val = parseInt(document.getElementById('timer-duration').value);
  if (val > 0 && val <= 120) {
    clearInterval(pomodoroInterval);
    pomodoroRunning = false;
    pomodoroTotal = val * 60;
    pomodoroLeft  = pomodoroTotal;
    updatePomodoroDisplay();
  }
});

// ===== TO-DO LIST =====
let todos = JSON.parse(localStorage.getItem('todos') || '[]');

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getSortedTodos() {
  const sort = document.getElementById('todo-sort').value;
  const copy = [...todos];
  if (sort === 'az')   return copy.sort((a,b) => a.text.localeCompare(b.text));
  if (sort === 'done') return copy.sort((a,b) => b.done - a.done);
  return copy;
}

function renderTodos() {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  getSortedTodos().forEach((todo, i) => {
    const realIndex = todos.findIndex(t => t.id === todo.id);
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.done ? ' done' : '');
    li.innerHTML = `
      <span class="todo-check" data-i="${realIndex}">${todo.done ? '✅' : '⬜'}</span>
      <span class="todo-text" data-i="${realIndex}">${todo.text}</span>
      <button class="todo-edit" data-i="${realIndex}">✏️</button>
      <button class="todo-delete" data-i="${realIndex}">🗑️</button>
    `;
    list.appendChild(li);
  });

  // Event listeners
  list.querySelectorAll('.todo-check').forEach(el => {
    el.addEventListener('click', () => {
      todos[el.dataset.i].done = !todos[el.dataset.i].done;
      saveTodos(); renderTodos();
    });
  });
  list.querySelectorAll('.todo-edit').forEach(el => {
    el.addEventListener('click', () => {
      const newText = prompt('Edit tugas:', todos[el.dataset.i].text);
      if (newText && newText.trim()) {
        // Prevent duplicate on edit
        const dup = todos.some((t, idx) => t.text.toLowerCase() === newText.trim().toLowerCase() && idx !== parseInt(el.dataset.i));
        if (dup) { alert('Tugas sudah ada!'); return; }
        todos[el.dataset.i].text = newText.trim();
        saveTodos(); renderTodos();
      }
    });
  });
  list.querySelectorAll('.todo-delete').forEach(el => {
    el.addEventListener('click', () => {
      todos.splice(el.dataset.i, 1);
      saveTodos(); renderTodos();
    });
  });
}

document.getElementById('todo-add-btn').addEventListener('click', () => {
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  if (!text) return;
  // Prevent duplicate
  if (todos.some(t => t.text.toLowerCase() === text.toLowerCase())) {
    alert('Tugas "' + text + '" sudah ada dalam daftar!');
    return;
  }
  todos.push({ id: Date.now(), text, done: false });
  saveTodos(); renderTodos();
  input.value = '';
});

document.getElementById('todo-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('todo-add-btn').click();
});

document.getElementById('todo-sort').addEventListener('change', renderTodos);

renderTodos();

// ===== QUICK LINKS =====
let quickLinks = JSON.parse(localStorage.getItem('quickLinks') || '[]');

function saveLinks() {
  localStorage.setItem('quickLinks', JSON.stringify(quickLinks));
}

function renderLinks() {
  const list = document.getElementById('quick-links-list');
  list.innerHTML = '';
  quickLinks.forEach((link, i) => {
    const li = document.createElement('li');
    li.className = 'link-item';
    li.innerHTML = `
      <a href="${link.url}" target="_blank" class="link-btn">🔗 ${link.name}</a>
      <button class="link-delete" data-i="${i}">🗑️</button>
    `;
    list.appendChild(li);
  });
  list.querySelectorAll('.link-delete').forEach(el => {
    el.addEventListener('click', () => {
      quickLinks.splice(el.dataset.i, 1);
      saveLinks(); renderLinks();
    });
  });
}

document.getElementById('link-add-btn').addEventListener('click', () => {
  const name = document.getElementById('link-name-input').value.trim();
  const url  = document.getElementById('link-url-input').value.trim();
  if (!name || !url) return;
  if (!url.startsWith('http')) { alert('URL harus dimulai dengan http:// atau https://'); return; }
  quickLinks.push({ name, url });
  saveLinks(); renderLinks();
  document.getElementById('link-name-input').value = '';
  document.getElementById('link-url-input').value = '';
});

renderLinks();

// ===== EFEK SALJU =====
(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'snow-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const SNOWFLAKE_COUNT = 120;
  const snowflakes = [];

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createSnowflake() {
    return {
      x: randomBetween(0, canvas.width),
      y: randomBetween(-canvas.height, 0),
      radius: randomBetween(2, 5),
      speed: randomBetween(1, 3),
      drift: randomBetween(-0.5, 0.5),
      opacity: randomBetween(0.5, 1)
    };
  }

  for (let i = 0; i < SNOWFLAKE_COUNT; i++) {
    const flake = createSnowflake();
    flake.y = randomBetween(0, canvas.height);
    snowflakes.push(flake);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snowflakes.forEach(flake => {
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
      ctx.fill();
    });
  }

  function update() {
    snowflakes.forEach(flake => {
      flake.y += flake.speed;
      flake.x += flake.drift;
      if (flake.y > canvas.height + flake.radius) {
        flake.y = -flake.radius;
        flake.x = randomBetween(0, canvas.width);
        flake.speed = randomBetween(1, 3);
        flake.drift = randomBetween(-0.5, 0.5);
        flake.opacity = randomBetween(0.5, 1);
      }
      if (flake.x > canvas.width + flake.radius) flake.x = -flake.radius;
      if (flake.x < -flake.radius) flake.x = canvas.width + flake.radius;
    });
  }

  function animate() { draw(); update(); requestAnimationFrame(animate); }
  animate();
})();
