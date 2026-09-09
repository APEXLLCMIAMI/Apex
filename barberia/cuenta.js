/* ============================================
   BARBERSHOP ELITE — Account Page Logic
   ============================================ */

// ===== DATABASE HELPERS =====
const DB = {
    getUsers() {
        return JSON.parse(localStorage.getItem('bs_users') || '[]');
    },
    getSession() {
        return JSON.parse(localStorage.getItem('bs_session') || 'null');
    },
    clearSession() {
        localStorage.removeItem('bs_session');
    },
    getAppointments() {
        return JSON.parse(localStorage.getItem('bs_appointments') || '[]');
    },
    saveAppointments(appointments) {
        localStorage.setItem('bs_appointments', JSON.stringify(appointments));
    }
};

const MONTHS_ES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    const session = DB.getSession();
    if (!session) {
        window.location.href = 'auth.html';
        return;
    }

    const users = DB.getUsers();
    const user = users.find(u => u.id === session.userId);

    if (!user) {
        DB.clearSession();
        window.location.href = 'auth.html';
        return;
    }

    loadProfile(user);
    loadAppointments(user.id);
    initLogout();
    initMobileMenu();
});

// ===== LOAD PROFILE =====
function loadProfile(user) {
    const initials = user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    $('#profileInitials').textContent = initials;
    $('#profileName').textContent = user.name;
    $('#profileEmail').textContent = '✉️ ' + user.email;
    $('#profilePhone').textContent = '📞 ' + user.phone;

    const date = new Date(user.createdAt);
    $('#profileSince').textContent = `Miembro desde ${MONTHS_ES[date.getMonth()]} ${date.getFullYear()}`;
}

// ===== LOAD APPOINTMENTS =====
function loadAppointments(userId) {
    const appointments = DB.getAppointments().filter(a => a.userId === userId);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const upcoming = [];
    const past = [];

    appointments.forEach(appt => {
        const apptDate = new Date(appt.date);
        if (apptDate >= now) {
            upcoming.push(appt);
        } else {
            past.push(appt);
        }
    });

    // Sort upcoming by date ascending
    upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
    // Sort past by date descending
    past.sort((a, b) => new Date(b.date) - new Date(a.date));

    renderAppointments('upcomingAppointments', upcoming, false);
    renderAppointments('pastAppointments', past, true);
}

function renderAppointments(containerId, appointments, isPast) {
    const container = document.getElementById(containerId);

    if (appointments.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">${isPast ? '📭' : '📅'}</div>
                <p>${isPast ? 'Aún no tienes citas anteriores.' : 'No tienes citas próximas. <a href="index.html#agendar">¡Agenda una ahora!</a>'}</p>
            </div>
        `;
        return;
    }

    container.innerHTML = appointments.map(appt => {
        const date = new Date(appt.date);
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const dateStr = `${dayNames[date.getDay()]} ${date.getDate()} de ${MONTHS_ES[date.getMonth()]}`;

        const serviceIcons = {
            'Corte Clásico': '✂️',
            'Corte + Barba': '🪒',
            'Experiencia Premium': '💈',
            'Solo Barba': '🧔',
            'Color & Diseño': '🎨',
            'Corte Kids': '👦'
        };
        const icon = serviceIcons[appt.service] || '💈';

        return `
            <div class="appointment-card ${isPast ? 'past' : ''}">
                <div class="appt-icon">${icon}</div>
                <div class="appt-details">
                    <div class="appt-service">${appt.service}</div>
                    <div class="appt-barber">con ${appt.barber}</div>
                </div>
                <div class="appt-meta">
                    <div class="appt-date">${dateStr}</div>
                    <div class="appt-time">${appt.time}</div>
                    <div class="appt-price">$${appt.price} MXN</div>
                </div>
                ${!isPast ? `<button class="appt-cancel" title="Cancelar cita" data-id="${appt.id}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>` : ''}
            </div>
        `;
    }).join('');

    // Add cancel handlers
    if (!isPast) {
        container.querySelectorAll('.appt-cancel').forEach(btn => {
            btn.addEventListener('click', () => {
                if (confirm('¿Estás seguro de que quieres cancelar esta cita?')) {
                    const apptId = btn.dataset.id;
                    const allAppts = DB.getAppointments();
                    const filtered = allAppts.filter(a => a.id !== apptId);
                    DB.saveAppointments(filtered);

                    const session = DB.getSession();
                    loadAppointments(session.userId);
                }
            });
        });
    }
}

// ===== LOGOUT =====
function initLogout() {
    const logoutBtn = $('#logoutBtn');
    const mobileLogoutBtn = $('#mobileLogoutBtn');

    function doLogout() {
        DB.clearSession();
        window.location.href = 'index.html';
    }

    logoutBtn.addEventListener('click', doLogout);
    if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', (e) => { e.preventDefault(); doLogout(); });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const btn = $('#mobileMenuBtn');
    const menu = $('#mobileMenu');

    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            btn.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}
