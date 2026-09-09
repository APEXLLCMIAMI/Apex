/* ============================================
   BARBERSHOP ELITE — Scheduling Logic
   ============================================ */

// ===== DATA =====
const SERVICES = [
    { id: 'corte-clasico', name: 'Corte Clásico', icon: '✂️', price: 250, duration: '30 min' },
    { id: 'corte-barba', name: 'Corte + Barba', icon: '🪒', price: 400, duration: '50 min' },
    { id: 'premium', name: 'Experiencia Premium', icon: '💈', price: 600, duration: '75 min', featured: true },
    { id: 'barba', name: 'Solo Barba', icon: '🧔', price: 200, duration: '25 min' },
    { id: 'color', name: 'Color & Diseño', icon: '🎨', price: 500, duration: '60 min' },
    { id: 'kids', name: 'Corte Kids', icon: '👦', price: 180, duration: '20 min' },
];

const BARBERS = [
    { id: 'carlos', name: 'Carlos García', initials: 'CG', role: 'Master Barber' },
    { id: 'miguel', name: 'Miguel López', initials: 'ML', role: 'Senior Barber' },
    { id: 'andres', name: 'Andrés Ramírez', initials: 'AR', role: 'Color Specialist' },
    { id: 'daniel', name: 'Daniel Martínez', initials: 'DM', role: 'Style Expert' },
    { id: 'ricardo', name: 'Ricardo Hernández', initials: 'RH', role: 'Junior Barber' },
];

const TIME_SLOTS = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
    '7:00 PM', '7:30 PM',
];

const MONTHS_ES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// ===== STATE =====
const state = {
    currentStep: 1,
    selectedService: null,
    selectedBarber: null,
    selectedDate: null,
    selectedTime: null,
    calendarMonth: new Date().getMonth(),
    calendarYear: new Date().getFullYear(),
};

// ===== DOM ELEMENTS =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initHeroStats();
    initBookingServices();
    initBookingBarbers();
    initCalendar();
    initStepNavigation();
    initFormSubmission();
    initScrollReveal();
    initServiceCardClicks();
});

// ===== NAVBAR =====
function initNavbar() {
    window.addEventListener('scroll', () => {
        const navbar = $('#navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
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

// ===== HERO STATS COUNTER =====
function initHeroStats() {
    const counters = $$('.stat-number[data-count]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(target * eased).toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

// ===== SERVICE CARD CLICKS (from hero) =====
function initServiceCardClicks() {
    $$('.service-card[data-service]').forEach(card => {
        card.addEventListener('click', () => {
            const serviceId = card.dataset.service;
            state.selectedService = SERVICES.find(s => s.id === serviceId);

            // Scroll to booking
            document.getElementById('agendar').scrollIntoView({ behavior: 'smooth' });

            // Select in booking
            setTimeout(() => {
                const bookingCard = $$(`.booking-service-card[data-id="${serviceId}"]`);
                if (bookingCard.length) {
                    bookingCard[0].click();
                }
            }, 600);
        });
    });
}

// ===== BOOKING: SERVICES =====
function initBookingServices() {
    const container = $('#bookingServices');

    SERVICES.forEach(service => {
        const card = document.createElement('div');
        card.className = 'booking-service-card';
        card.dataset.id = service.id;
        card.innerHTML = `
            <div class="service-icon">${service.icon}</div>
            <h4>${service.name}</h4>
            <div class="price">$${service.price}</div>
            <div class="duration">${service.duration}</div>
        `;

        card.addEventListener('click', () => {
            $$('.booking-service-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            state.selectedService = service;
            $('#toStep2').disabled = false;
        });

        container.appendChild(card);
    });
}

// ===== BOOKING: BARBERS =====
function initBookingBarbers() {
    const container = $('#bookingBarbers');

    BARBERS.forEach(barber => {
        const card = document.createElement('div');
        card.className = 'booking-barber-card';
        card.dataset.id = barber.id;
        card.innerHTML = `
            <div class="barber-avatar">
                <div class="avatar-placeholder">${barber.initials}</div>
            </div>
            <h4>${barber.name}</h4>
            <div class="role">${barber.role}</div>
        `;

        card.addEventListener('click', () => {
            $$('.booking-barber-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            state.selectedBarber = barber;
            $('#toStep3').disabled = false;
        });

        container.appendChild(card);
    });
}

// ===== CALENDAR =====
function initCalendar() {
    renderCalendar();

    $('#prevMonth').addEventListener('click', () => {
        state.calendarMonth--;
        if (state.calendarMonth < 0) {
            state.calendarMonth = 11;
            state.calendarYear--;
        }
        renderCalendar();
    });

    $('#nextMonth').addEventListener('click', () => {
        state.calendarMonth++;
        if (state.calendarMonth > 11) {
            state.calendarMonth = 0;
            state.calendarYear++;
        }
        renderCalendar();
    });
}

function renderCalendar() {
    const container = $('#calendarDays');
    const monthLabel = $('#calendarMonth');

    monthLabel.textContent = `${MONTHS_ES[state.calendarMonth]} ${state.calendarYear}`;

    const firstDay = new Date(state.calendarYear, state.calendarMonth, 1).getDay();
    const daysInMonth = new Date(state.calendarYear, state.calendarMonth + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    container.innerHTML = '';

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('button');
        empty.className = 'cal-day empty';
        empty.disabled = true;
        container.appendChild(empty);
    }

    // Day cells
    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(state.calendarYear, state.calendarMonth, d);
        const dayBtn = document.createElement('button');
        dayBtn.className = 'cal-day';
        dayBtn.textContent = d;

        const isSunday = date.getDay() === 0;
        const isPast = date < today;

        if (isSunday || isPast) {
            dayBtn.classList.add('disabled');
            dayBtn.disabled = true;
        }

        if (date.getTime() === today.getTime()) {
            dayBtn.classList.add('today');
        }

        if (state.selectedDate &&
            date.getDate() === state.selectedDate.getDate() &&
            date.getMonth() === state.selectedDate.getMonth() &&
            date.getFullYear() === state.selectedDate.getFullYear()) {
            dayBtn.classList.add('selected');
        }

        dayBtn.addEventListener('click', () => {
            if (dayBtn.classList.contains('disabled')) return;
            $$('.cal-day').forEach(b => b.classList.remove('selected'));
            dayBtn.classList.add('selected');
            state.selectedDate = date;
            state.selectedTime = null;
            renderTimeSlots();
        });

        container.appendChild(dayBtn);
    }
}

function renderTimeSlots() {
    const container = $('#timeSlots');
    const hint = $('#timeHint');

    if (!state.selectedDate) {
        hint.style.display = '';
        container.innerHTML = '';
        return;
    }

    hint.style.display = 'none';
    container.innerHTML = '';

    const now = new Date();
    const isToday = state.selectedDate.toDateString() === now.toDateString();

    // On Saturday, only up to 6:00 PM
    const isSaturday = state.selectedDate.getDay() === 6;
    const maxSlot = isSaturday ? '6:00 PM' : '7:30 PM';

    TIME_SLOTS.forEach(time => {
        const slot = document.createElement('button');
        slot.className = 'time-slot';
        slot.textContent = time;

        // Check if slot is in the past for today
        let isUnavailable = false;

        if (isSaturday && TIME_SLOTS.indexOf(time) > TIME_SLOTS.indexOf(maxSlot)) {
            isUnavailable = true;
        }

        if (isToday) {
            const [h, m] = parseTime(time);
            const slotDate = new Date(state.selectedDate);
            slotDate.setHours(h, m, 0, 0);
            if (slotDate <= now) isUnavailable = true;
        }

        // Random unavailability for realism
        if (!isUnavailable && Math.random() < 0.15) {
            isUnavailable = true;
        }

        if (isUnavailable) {
            slot.classList.add('unavailable');
            slot.disabled = true;
        }

        slot.addEventListener('click', () => {
            if (slot.classList.contains('unavailable')) return;
            $$('.time-slot').forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
            state.selectedTime = time;
            $('#toStep4').disabled = false;
        });

        container.appendChild(slot);
    });
}

function parseTime(timeStr) {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return [hours, minutes];
}

// ===== STEP NAVIGATION =====
function initStepNavigation() {
    $('#toStep2').addEventListener('click', () => goToStep(2));
    $('#toStep3').addEventListener('click', () => goToStep(3));
    $('#toStep4').addEventListener('click', () => {
        updateSummary();
        goToStep(4);
    });
    $('#backStep1').addEventListener('click', () => goToStep(1));
    $('#backStep2').addEventListener('click', () => goToStep(2));
    $('#backStep3').addEventListener('click', () => goToStep(3));
}

function goToStep(step) {
    state.currentStep = step;

    // Update steps visibility
    $$('.booking-step').forEach(s => s.classList.remove('active'));
    $(`#step${step}`).classList.add('active');

    // Update progress
    $$('.progress-step').forEach(ps => {
        const psStep = parseInt(ps.dataset.step);
        ps.classList.remove('active', 'completed');
        if (psStep === step) ps.classList.add('active');
        else if (psStep < step) ps.classList.add('completed');
    });

    // Scroll to top of booking section
    document.getElementById('agendar').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateSummary() {
    $('#sumService').textContent = state.selectedService ? state.selectedService.name : '—';
    $('#sumBarber').textContent = state.selectedBarber ? state.selectedBarber.name : '—';
    $('#sumDate').textContent = state.selectedDate ? formatDate(state.selectedDate) : '—';
    $('#sumTime').textContent = state.selectedTime || '—';
    $('#sumTotal').textContent = state.selectedService ? `$${state.selectedService.price} MXN` : '—';
}

function formatDate(date) {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return `${days[date.getDay()]} ${date.getDate()} de ${MONTHS_ES[date.getMonth()]}`;
}

// ===== FORM SUBMISSION =====
function initFormSubmission() {
    const form = $('#bookingForm');

    // Auto-fill user data if logged in
    const session = JSON.parse(localStorage.getItem('bs_session') || 'null');
    if (session) {
        const users = JSON.parse(localStorage.getItem('bs_users') || '[]');
        const user = users.find(u => u.id === session.userId);
        if (user) {
            $('#clientName').value = user.name;
            $('#clientPhone').value = user.phone;
            $('#clientEmail').value = user.email;
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Check if user is logged in
        const currentSession = JSON.parse(localStorage.getItem('bs_session') || 'null');
        if (!currentSession) {
            if (confirm('Necesitas iniciar sesión para agendar una cita. ¿Ir a la página de inicio de sesión?')) {
                window.location.href = 'auth.html';
            }
            return;
        }

        const name = $('#clientName').value.trim();
        const phone = $('#clientPhone').value.trim();

        if (!name || !phone) {
            alert('Por favor completa los campos obligatorios.');
            return;
        }

        // Save appointment to localStorage
        const appointments = JSON.parse(localStorage.getItem('bs_appointments') || '[]');
        const newAppointment = {
            id: 'appt_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 6),
            userId: currentSession.userId,
            service: state.selectedService.name,
            barber: state.selectedBarber.name,
            date: state.selectedDate.toISOString().split('T')[0],
            time: state.selectedTime,
            price: state.selectedService.price,
            notes: $('#clientNotes').value.trim(),
            createdAt: new Date().toISOString()
        };
        appointments.push(newAppointment);
        localStorage.setItem('bs_appointments', JSON.stringify(appointments));

        showSuccessModal();
    });

    $('#closeModal').addEventListener('click', () => {
        $('#successModal').classList.remove('active');
        resetBooking();
    });
}

function showSuccessModal() {
    const modal = $('#successModal');
    const details = $('#modalDetails');

    details.innerHTML = `
        <p><span class="detail-label">Servicio</span><span class="detail-value">${state.selectedService.name}</span></p>
        <p><span class="detail-label">Barbero</span><span class="detail-value">${state.selectedBarber.name}</span></p>
        <p><span class="detail-label">Fecha</span><span class="detail-value">${formatDate(state.selectedDate)}</span></p>
        <p><span class="detail-label">Hora</span><span class="detail-value">${state.selectedTime}</span></p>
        <p><span class="detail-label">Total</span><span class="detail-value" style="color: var(--accent); font-size: 1.1rem;">$${state.selectedService.price} MXN</span></p>
    `;

    modal.classList.add('active');
}

function resetBooking() {
    state.selectedService = null;
    state.selectedBarber = null;
    state.selectedDate = null;
    state.selectedTime = null;

    $$('.booking-service-card').forEach(c => c.classList.remove('selected'));
    $$('.booking-barber-card').forEach(c => c.classList.remove('selected'));

    $('#toStep2').disabled = true;
    $('#toStep3').disabled = true;
    $('#toStep4').disabled = true;

    $('#clientName').value = '';
    $('#clientPhone').value = '';
    $('#clientEmail').value = '';
    $('#clientNotes').value = '';

    renderCalendar();

    goToStep(1);
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const sections = $$('.services, .barbers, .booking');

    sections.forEach(section => {
        section.classList.add('reveal');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    $$('.reveal').forEach(el => observer.observe(el));
}

// ===== SMOOTH ANCHOR LINKS =====
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    }
});
