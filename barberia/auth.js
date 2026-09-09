/* ============================================
   BARBERSHOP ELITE — Auth Logic
   ============================================ */

// ===== DATABASE HELPERS =====
const DB = {
    getUsers() {
        return JSON.parse(localStorage.getItem('bs_users') || '[]');
    },
    saveUsers(users) {
        localStorage.setItem('bs_users', JSON.stringify(users));
    },
    getSession() {
        return JSON.parse(localStorage.getItem('bs_session') || 'null');
    },
    saveSession(session) {
        localStorage.setItem('bs_session', JSON.stringify(session));
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

// ===== CRYPTO HELPERS =====
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'barbershop_elite_salt_2026');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateId() {
    return 'user_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
}

// ===== DOM ELEMENTS =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // If already logged in, redirect to home
    const session = DB.getSession();
    if (session) {
        const users = DB.getUsers();
        const user = users.find(u => u.id === session.userId);
        if (user) {
            window.location.href = 'index.html';
            return;
        }
    }

    initTabs();
    initLoginForm();
    initRegisterForm();
    initPasswordToggles();
    initPasswordStrength();
});

// ===== TAB SWITCHING =====
function initTabs() {
    const tabLogin = $('#tabLogin');
    const tabRegister = $('#tabRegister');
    const indicator = $('#tabIndicator');
    const loginForm = $('#loginForm');
    const registerForm = $('#registerForm');
    const goToRegister = $('#goToRegister');
    const goToLogin = $('#goToLogin');

    function switchTo(tab) {
        if (tab === 'login') {
            tabLogin.classList.add('active');
            tabRegister.classList.remove('active');
            indicator.classList.remove('right');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        } else {
            tabRegister.classList.add('active');
            tabLogin.classList.remove('active');
            indicator.classList.add('right');
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
        }
        clearMessages();
    }

    tabLogin.addEventListener('click', () => switchTo('login'));
    tabRegister.addEventListener('click', () => switchTo('register'));
    goToRegister.addEventListener('click', () => switchTo('register'));
    goToLogin.addEventListener('click', () => switchTo('login'));
}

// ===== LOGIN FORM =====
function initLoginForm() {
    const form = $('#loginForm');
    const messageEl = $('#loginMessage');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = $('#loginEmail').value.trim().toLowerCase();
        const password = $('#loginPassword').value;

        if (!email || !password) {
            showMessage(messageEl, 'Por favor completa todos los campos.', 'error');
            return;
        }

        // Simulate loading
        const btn = $('#loginBtn');
        btn.disabled = true;
        btn.innerHTML = '<div class="spinner" style="display:block;width:20px;height:20px;border:2px solid transparent;border-top-color:var(--bg-primary);border-radius:50%;animation:spin 0.6s linear infinite;"></div>';

        await new Promise(r => setTimeout(r, 800));

        const users = DB.getUsers();
        const passwordHash = await hashPassword(password);
        const user = users.find(u => u.email === email && u.passwordHash === passwordHash);

        if (!user) {
            showMessage(messageEl, 'Correo o contraseña incorrectos. Intenta de nuevo.', 'error');
            btn.disabled = false;
            btn.innerHTML = '<span>Iniciar Sesión</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
            return;
        }

        // Save session
        DB.saveSession({
            userId: user.id,
            loginAt: new Date().toISOString()
        });

        showMessage(messageEl, '¡Bienvenido de vuelta, ' + user.name.split(' ')[0] + '! Redirigiendo...', 'success');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });
}

// ===== REGISTER FORM =====
function initRegisterForm() {
    const form = $('#registerForm');
    const messageEl = $('#registerMessage');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = $('#regName').value.trim();
        const phone = $('#regPhone').value.trim();
        const email = $('#regEmail').value.trim().toLowerCase();
        const password = $('#regPassword').value;
        const passwordConfirm = $('#regPasswordConfirm').value;

        // Validations
        if (!name || !phone || !email || !password || !passwordConfirm) {
            showMessage(messageEl, 'Por favor completa todos los campos.', 'error');
            return;
        }

        if (password.length < 6) {
            showMessage(messageEl, 'La contraseña debe tener al menos 6 caracteres.', 'error');
            return;
        }

        if (password !== passwordConfirm) {
            showMessage(messageEl, 'Las contraseñas no coinciden.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage(messageEl, 'Por favor ingresa un correo electrónico válido.', 'error');
            return;
        }

        // Check if email already exists
        const users = DB.getUsers();
        if (users.find(u => u.email === email)) {
            showMessage(messageEl, 'Ya existe una cuenta con este correo. Intenta iniciar sesión.', 'error');
            return;
        }

        // Simulate loading
        const btn = $('#registerBtn');
        btn.disabled = true;
        btn.innerHTML = '<div class="spinner" style="display:block;width:20px;height:20px;border:2px solid transparent;border-top-color:var(--bg-primary);border-radius:50%;animation:spin 0.6s linear infinite;"></div>';

        await new Promise(r => setTimeout(r, 1000));

        // Create user
        const passwordHash = await hashPassword(password);
        const newUser = {
            id: generateId(),
            name,
            email,
            phone,
            passwordHash,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        DB.saveUsers(users);

        // Auto-login
        DB.saveSession({
            userId: newUser.id,
            loginAt: new Date().toISOString()
        });

        showMessage(messageEl, '¡Cuenta creada exitosamente! Redirigiendo...', 'success');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1200);
    });
}

// ===== PASSWORD TOGGLES =====
function initPasswordToggles() {
    $$('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = document.getElementById(btn.dataset.target);
            if (input.type === 'password') {
                input.type = 'text';
                btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
            } else {
                input.type = 'password';
                btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
            }
        });
    });
}

// ===== PASSWORD STRENGTH =====
function initPasswordStrength() {
    const input = $('#regPassword');
    const fill = $('#strengthFill');
    const text = $('#strengthText');

    input.addEventListener('input', () => {
        const value = input.value;
        fill.className = 'strength-fill';
        text.className = 'strength-text';

        if (!value) {
            fill.className = 'strength-fill';
            text.textContent = '';
            return;
        }

        let score = 0;
        if (value.length >= 6) score++;
        if (value.length >= 10) score++;
        if (/[A-Z]/.test(value)) score++;
        if (/[0-9]/.test(value)) score++;
        if (/[^A-Za-z0-9]/.test(value)) score++;

        if (score <= 2) {
            fill.classList.add('weak');
            text.classList.add('weak');
            text.textContent = 'Débil';
        } else if (score <= 3) {
            fill.classList.add('medium');
            text.classList.add('medium');
            text.textContent = 'Media';
        } else {
            fill.classList.add('strong');
            text.classList.add('strong');
            text.textContent = 'Fuerte';
        }
    });
}

// ===== HELPERS =====
function showMessage(el, message, type) {
    el.textContent = message;
    el.className = `form-message show ${type}`;
}

function clearMessages() {
    $$('.form-message').forEach(el => {
        el.className = 'form-message';
        el.textContent = '';
    });
}
