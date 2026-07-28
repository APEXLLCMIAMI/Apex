/**
 * Apex LLC — Main Interactive Behaviors
 * Optimized: FAQ accordion, inline validation, fixed translations, removed dead code
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Sticky Header Scroll Effect ---
  const header = document.getElementById('site-header');
  const scrollThreshold = 50;

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();


  // --- 2. Mobile Navigation Toggle & Drawer ---
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu() {
    mobileNavToggle.classList.toggle('open');
    mobileMenuDrawer.classList.toggle('open');
    const isOpen = mobileMenuDrawer.classList.contains('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    mobileNavToggle.setAttribute('aria-expanded', isOpen);
  }

  mobileNavToggle.addEventListener('click', toggleMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenuDrawer.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });


  // --- 3. Scroll Intersection Observer for Active Nav Link ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));


  // --- 4. Dynamic Form Dropdown Pre-selection ---
  const propertySelect = document.getElementById('property-type');

  function selectCustomOption(value) {
    if (!propertySelect) return;
    const csDisplay = document.getElementById('cs-display');
    const allOpts = document.querySelectorAll('.cs-option');
    let matched = null;
    allOpts.forEach(opt => {
      opt.classList.remove('selected');
      if (opt.getAttribute('data-value') === value) matched = opt;
    });
    if (matched) {
      matched.classList.add('selected');
      propertySelect.value = value;
      if (csDisplay) {
        csDisplay.textContent = matched.textContent.trim();
        csDisplay.classList.add('has-value');
      }
    }
  }


  // --- 5. Quote Request Form — Inline Validation & Submission ---
  const quoteForm = document.getElementById('quote-form');
  const formSuccessState = document.getElementById('form-success-state');
  const successClientName = document.getElementById('success-client-name');
  const successPropertyType = document.getElementById('success-property-type');
  const btnSuccessReset = document.getElementById('btn-success-reset');
  const btnSubmit = quoteForm.querySelector('.btn-form-submit');
  const btnSubmitText = btnSubmit.querySelector('.btn-text');
  const loadingSpinner = btnSubmit.querySelector('.loading-spinner');

  // Inline validation helpers
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + '-error');
    if (field) field.classList.add('error');
    if (errorEl) errorEl.textContent = message;
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + '-error');
    if (field) field.classList.remove('error');
    if (errorEl) errorEl.textContent = '';
  }

  function clearAllErrors() {
    ['full-name', 'phone-number', 'email-address', 'property-type'].forEach(clearError);
  }

  // Clear errors on input
  ['full-name', 'phone-number', 'email-address'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => clearError(id));
  });

  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllErrors();

    const fullName = document.getElementById('full-name').value.trim();
    const phone = document.getElementById('phone-number').value.trim();
    const email = document.getElementById('email-address').value.trim();
    const propertyType = propertySelect.value;

    let hasError = false;

    if (!fullName) {
      showError('full-name', currentLang === 'en' ? 'Name is required.' : 'El nombre es obligatorio.');
      hasError = true;
    }
    if (!phone) {
      showError('phone-number', currentLang === 'en' ? 'Phone number is required.' : 'El teléfono es obligatorio.');
      hasError = true;
    }
    if (!email) {
      showError('email-address', currentLang === 'en' ? 'Email is required.' : 'El correo es obligatorio.');
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('email-address', currentLang === 'en' ? 'Please enter a valid email.' : 'Ingrese un correo válido.');
      hasError = true;
    }
    if (!propertyType) {
      showError('property-type', currentLang === 'en' ? 'Please select a service type.' : 'Seleccione un tipo de servicio.');
      hasError = true;
    }

    if (hasError) return;

    // Enter Loading State
    btnSubmit.disabled = true;
    btnSubmitText.textContent = currentLang === 'en' ? 'Processing request...' : 'Procesando solicitud...';
    loadingSpinner.style.display = 'inline-block';

    const messageData = document.getElementById('message').value.trim();

    const formData = {
      Name: fullName,
      Phone: phone,
      Email: email,
      Property: propertyType,
      Details: messageData || 'No additional details provided.'
    };

    const formAction = quoteForm.getAttribute('action');

    fetch(formAction, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      btnSubmit.disabled = false;
      btnSubmitText.textContent = currentLang === 'en' ? 'Submit Quote Request' : 'Enviar Solicitud';
      loadingSpinner.style.display = 'none';

      successClientName.textContent = fullName;

      const typeTranslations = {
        'Standard-Cleaning':  currentLang === 'en' ? 'Standard Cleaning'       : 'Limpieza Estándar',
        'Deep-Cleaning':      currentLang === 'en' ? 'Deep Cleaning'            : 'Limpieza Profunda',
        'Move-InOut':         currentLang === 'en' ? 'Move In / Move Out'       : 'Limpieza de Mudanza',
        'Large-Homes':        currentLang === 'en' ? 'Large Homes'              : 'Casas Grandes',
        'Office-Workspace':   currentLang === 'en' ? 'Office / Workspace'       : 'Oficina / Área de Trabajo',
        'Retail-Storefront':  currentLang === 'en' ? 'Retail / Storefront'      : 'Local / Frente Comercial',
        'Airbnb-Vacation':    currentLang === 'en' ? 'Airbnb / Vacation Rental' : 'Airbnb / Alquiler Vacacional',
        'Post-Construction':  currentLang === 'en' ? 'Post-Construction'        : 'Post-Construcción',
        'Other-Commercial':   currentLang === 'en' ? 'Other Commercial Space'   : 'Otro Espacio Comercial'
      };

      successPropertyType.textContent = typeTranslations[propertyType] || propertyType;
      formSuccessState.classList.add('active');
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      // Fixed: error message now respects current language (was hardcoded in Spanish)
      const errorMsg = currentLang === 'en'
        ? 'There was a problem submitting your request. Please try again.'
        : 'Hubo un problema al enviar su solicitud. Por favor intente de nuevo.';
      showError('full-name', errorMsg);
      btnSubmit.disabled = false;
      btnSubmitText.textContent = currentLang === 'en' ? 'Submit Quote Request' : 'Enviar Solicitud';
      loadingSpinner.style.display = 'none';
    });
  });

  btnSuccessReset.addEventListener('click', () => {
    quoteForm.reset();
    formSuccessState.classList.remove('active');
    clearAllErrors();
    // Reset custom select display
    const csDisplay = document.getElementById('cs-display');
    if (csDisplay) {
      csDisplay.textContent = currentLang === 'en' ? '— Select service type —' : '— Seleccione tipo de servicio —';
      csDisplay.classList.remove('has-value');
    }
    document.querySelectorAll('.cs-option').forEach(o => o.classList.remove('selected'));
  });


  // --- 6. Legal Modal ---
  const legalModal = document.getElementById('legal-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const privacyLink = document.getElementById('privacy-link');
  const termsLink = document.getElementById('terms-link');

  const legalContent = {
    privacy: `
      <h4>1. Collection of Operational Information</h4>
      <p>We collect corporate and contact information submitted through our estimate request forms, including full names, contact phone numbers, e-mail addresses, and specific property profiles. This information is utilized solely to deliver accurate commercial or residential service proposals.</p>
      <h4>2. Security and Data Protection</h4>
      <p>Apex LLC implements standard administrative, technical, and physical safety measures to protect client records and details from unauthorized access, modification, or distribution. We do not sell or lease property or contact directories to third parties.</p>
      <h4>3. Service Disclaimers</h4>
      <p>Data provided is handled strictly in compliance with US privacy frameworks. Communication from our logistics managers is based on active consent given by submitting requests.</p>
    `,
    terms: `
      <h4>1. Service Agreements</h4>
      <p>All cleaning services provided by Apex LLC are executed under customized corporate proposals or residential service checklists agreed upon prior to dispatching teams.</p>
      <h4>2. Insurance and Liability Coverage</h4>
      <p>Apex LLC maintains active commercial liability insurance. Any claims regarding damages must be filed with photographic verification and client-log documentation within 24 hours of service completion.</p>
      <h4>3. Cancellation and Scheduling Turnarounds</h4>
      <p>To support high-turnover operations, scheduling modifications or cancellations must be reported at least 24 hours prior to the scheduled service block to avoid reservation or idle-labor fees.</p>
    `
  };

  function openModal(type) {
    if (type === 'privacy') {
      modalTitle.textContent = 'Privacy Policy | Apex LLC';
      modalBody.innerHTML = legalContent.privacy;
    } else if (type === 'terms') {
      modalTitle.textContent = 'Terms of Service | Apex LLC';
      modalBody.innerHTML = legalContent.terms;
    }
    legalModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    legalModal.classList.remove('open');
    if (!mobileMenuDrawer.classList.contains('open')) {
      document.body.style.overflow = '';
    }
  }

  privacyLink.addEventListener('click', (e) => { e.preventDefault(); openModal('privacy'); });
  termsLink.addEventListener('click', (e) => { e.preventDefault(); openModal('terms'); });
  closeModalBtn.addEventListener('click', closeModal);
  legalModal.addEventListener('click', (e) => { if (e.target === legalModal) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && legalModal.classList.contains('open')) closeModal();
  });


  // --- 7. FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      faqItems.forEach(other => {
        other.classList.remove('open');
        const btn = other.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        const answer = other.querySelector('.faq-answer');
        if (answer) answer.setAttribute('aria-hidden', 'true');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
        const answer = item.querySelector('.faq-answer');
        if (answer) answer.setAttribute('aria-hidden', 'false');
      }
    });
  });


  // --- 8. Language Toggle (EN / ES) ---
  const translateBtn = document.getElementById('translate-btn');
  let currentLang = 'en';

  const T = {
    en: {
      'translate-btn': '<span class="lang-icon">ES</span><span class="lang-text"> Español</span>',
      'nav': ['Services', 'Why Apex', 'Service Area', 'Contact'],
      'nav-desc': ['Explore our solutions', 'Why choose us', 'Areas we cover', 'Get in touch with us'],
      'call-now': 'Call Now',
      // Hero
      'hero-badge-1': "Miami's Most Trusted Cleaning Team",
      'hero-badge-2': 'Licensed, Bonded & Insured',
      'hero-title': 'Professional Cleaning Services in Miami: <span class="highlight-text">Trusted, Thorough, On Time.</span>',
      'hero-desc': 'Experience the peace of mind that comes with a cleaning service built on trust, discretion, and obsessive attention to detail — for your home and your business.',
      'hero-cta-1': 'Get a Free Estimate',
      'hero-cta-2': 'Explore Services',
      'hero-trust-1': '2-Hour Response Guarantee',
      'hero-trust-2': '100% Background-Vetted Team',
      'hero-status': 'Operations Live & Booking',
      'metric-1': 'Google Rating',
      'metric-2': 'Cleanings Completed',
      'check-1': 'Property Manager Approved Protocols',
      'check-2': 'EPA-Approved Disinfectants Only',
      'check-3': 'Instant Photo Verification Reports',
      // How It Works
      'hiw-subtitle': 'Simple Process',
      'hiw-title': 'How It Works',
      'hiw-desc': "Getting your space professionally cleaned is easy. Three simple steps — that's it.",
      'hiw-t-1': 'Request a Free Estimate',
      'hiw-d-1': "Fill out our quick form, call, or message us on WhatsApp. Tell us about your space and we'll send a tailored proposal within 2 hours.",
      'hiw-t-2': 'We Clean Your Space',
      'hiw-d-2': 'Our background-verified team arrives on schedule with all professional supplies. We follow standardized checklists and send photo verification reports.',
      'hiw-t-3': 'Enjoy Your Spotless Space',
      'hiw-d-3': 'Walk into a sparkling clean home or office. Love it? Set up recurring service and never worry about cleaning again.',
      // Pricing Section
      'ps-sub': 'Our Services',
      'ps-title': 'Cleaning Services',
      'ps-desc': 'Services for home and business<br><span style="color: var(--accent-teal); font-weight: 500;">tailored to the size and needs of every space.</span>',
      'ptab-1': 'Standard Cleaning', 'ptab-2': 'Deep Cleaning', 'ptab-3': 'Move In / Move Out', 'ptab-4': 'Large Homes / 2-Story', 'ptab-5': 'Offices / Commercial',
      'pnote-1': 'Ideal for regular maintenance.', 'pnote-2': 'For the first time or every 3 months.', 'pnote-3': '50% deposit required to secure the date.', 'pnote-4': 'Large spaces with stairs or more than 4 bedrooms.', 'pnote-5': 'Rate guide for contracts and recurring visits, by square foot.',
      'pr-t-1': 'Standard Cleaning', 'pr-t-2': 'Standard Cleaning', 'pr-t-3': 'Standard Cleaning', 'pr-t-4': 'Standard Cleaning',
      'pr-t-5': 'Deep Cleaning', 'pr-t-6': 'Deep Cleaning', 'pr-t-7': 'Deep Cleaning', 'pr-t-8': 'Deep Cleaning',
      'pr-t-9': 'Move Out Cleaning', 'pr-t-10': 'Standard — Large Home', 'pr-t-11': 'Deep — Large Home',
      'pr-s-1': '1 bed · 1 bath', 'pr-s-2': '2 beds · 2 baths', 'pr-s-3': '3 beds · 2 baths', 'pr-s-4': '4 beds · 2 baths',
      'pr-s-5': '1 bed · 1 bath', 'pr-s-6': '2 beds · 2 baths', 'pr-s-7': '3 beds · 2 baths', 'pr-s-8': '4 beds · 2 baths',
      'pr-s-9': 'Based on size', 'pr-s-10': '2-story · 4+ beds', 'pr-s-11': '2-story · 4+ beds',
      'pr-d-1': '2–3 hours', 'pr-d-2': '3–4 hours', 'pr-d-3': '4–5 hours', 'pr-d-4': '5–6 hours',
      'pr-d-5': '4–5 hours', 'pr-d-6': '5–6 hours', 'pr-d-7': '6–7 hours', 'pr-d-8': '7–8 hours',
      'pr-d-9': 'Variable time', 'pr-d-10': '6–7 hours', 'pr-d-11': '8–9 hours',
      'pr-desc-1': 'Ideal for maintenance. Includes vacuuming, mopping, bathroom, kitchen exterior, dusting, and trash removal.',
      'pr-desc-2': 'Most requested. Complete home cleaning: vacuuming, mopping, bathrooms, kitchen, and bedrooms.',
      'pr-desc-3': 'Family home. General cleaning of all spaces in the house.',
      'pr-desc-4': 'Spacious single-story home. Complete general cleaning of all spaces.',
      'pr-desc-5': 'For the first time or every 3 months. Includes inside oven, microwave, fridge, baseboards, and inside windows.',
      'pr-desc-6': 'Complete detailed cleaning: inside appliances, fans, door frames, and full shower.',
      'pr-desc-7': 'More comprehensive. All basics plus inside cabinets, closets, and walls.',
      'pr-desc-8': 'Total deep cleaning including appliances, closets, and walls.',
      'pr-desc-9': 'Empty house ready to hand over or receive. Total deep cleaning. 50% deposit required.',
      'pr-desc-10': 'Two-story home with more than 4 bedrooms. Includes surcharge for stairs and additional space.',
      'pr-desc-11': 'Two-story home with more than 4 bedrooms. Total deep cleaning with surcharge for stairs and extra area.',
      'pt-h-1': 'Office Size', 'pt-h-2': '1x / Week', 'pt-h-3': '3x / Week', 'pt-h-4': '5x / Week',
      'pt-r-1': 'Under 1,000 sqft', 'pt-r-2': 'Under 2,000 sqft', 'pt-r-3': '2,000 – 5,000 sqft', 'pt-r-4': '5,000 – 10,000 sqft',
      'pt-quote': 'Quote',
      'pi-title': 'What standard office cleaning includes',
      'pi-1': 'Empty all trash bins', 'pi-2': 'Vacuum and mop floors', 'pi-3': 'Clean full bathrooms + restock paper/soap', 'pi-4': 'Kitchen / coffee area: clean counters, microwave inside/out, and sink', 'pi-5': 'Clean desks, phones, and surfaces', 'pi-6': 'Clean entrance and conference room glass', 'pi-7': 'Take trash to dumpster',
      // Trust
      'trust-subtitle': 'Why Clients Trust Us',
      'trust-title': 'Built on Security, Driven by Excellence',
      'trust-desc': "When you invite someone into your property, trust isn't optional — it's everything. Every element of our operation is designed to give you complete peace of mind.",
      'p1-title': 'Fully Licensed, Bonded & Insured',
      'p1-text': "Your assets are protected from day one. As a fully registered Florida LLC with comprehensive commercial liability coverage, we stand behind every service with complete financial accountability — so you never have to worry.",
      'p2-title': '100% Background-Verified Team',
      'p2-text': 'Every member of our team passes rigorous background screening before they ever step into your property. We hire for integrity first — because your safety and privacy are non-negotiable.',
      'p3-title': 'Effortless, Flexible Scheduling',
      'p3-text': "Your time is valuable — that's why we adapt to your life, not the other way around. From tight same-day turnovers to recurring weekly plans and discreet overnight commercial operations, we're always on your schedule.",
      // Testimonials
      'testimonials-subtitle': 'Client Reviews',
      'testimonials-title': 'What Our Clients Say',
      'testimonials-desc': "Don't just take our word for it — hear from homeowners and property managers who trust Apex with their spaces.",
      'testimonial-1': '"Apex has been cleaning my 3-bedroom home for over a year now. They are always punctual, thorough, and respectful. The background check guarantee gave me confidence to hand over my keys. Highly recommend!"',
      'testimonial-2': '"We use Apex for our office building in Coral Gables — 3 times per week. Their team follows a strict checklist, always stocks our bathrooms, and the quality has been consistent for months. Great communication too."',
      'testimonial-3': '"I manage 4 Airbnb properties in Brickell. Apex handles all same-day turnovers between guests — laundry, deep clean, restocking. They send photo reports after every job. Absolutely reliable."',
      'testimonial-detail-1': 'Homeowner · Sweetwater',
      'testimonial-detail-2': 'Property Manager · Coral Gables',
      'testimonial-detail-3': 'Airbnb Host · Brickell',
      // Coverage
      'cov-subtitle': 'Miami Operations',
      'cov-title': 'Our Service Area',
      'cov-text': 'Proudly serving Miami, Sweetwater, and surrounding areas. Headquartered near the SW 109th Ave corridor, our team handles properties across key local zip codes including 33174 and nearby sectors with immediate availability.',
      'meta-1': 'Avg. dispatch response to Sweetwater corridor',
      'meta-2': 'Active cleaning operations per week',
      'meta-num-1': '15 Min', 'meta-num-2': '6 Days',
      'map-title': 'Coverage Highlight',
      'map-text': 'Direct logistics dispatch to all property owners in the SW 109th Ave corridor.',
      // FAQ
      'faq-subtitle': 'Common Questions',
      'faq-title': 'Frequently Asked Questions',
      'faq-desc': 'Everything you need to know before booking your first cleaning.',
      'faq-q-1': 'Are your cleaning staff background-checked?',
      'faq-a-1': 'Yes. Every member of our team passes a comprehensive background screening before they are assigned to any property. We hire for integrity first — your safety and privacy are non-negotiable.',
      'faq-q-2': 'Is Apex LLC licensed and insured?',
      'faq-a-2': 'Absolutely. Apex LLC is a fully registered Florida LLC with comprehensive commercial liability insurance. Your property and assets are protected from day one.',
      'faq-q-3': 'What areas do you serve in Miami?',
      'faq-a-3': 'We proudly serve Miami, Sweetwater, Coral Gables, Brickell, Downtown Miami, Doral, Kendall, and Coconut Grove. Our headquarters is near the SW 109th Ave corridor (33174) with 15-minute dispatch availability.',
      'faq-q-4': 'How quickly can I get an estimate?',
      'faq-a-4': 'We respond to all quote requests within 2 business hours. For urgent needs, call us directly at (786) 817-7387 or message us on WhatsApp for immediate response.',
      'faq-q-5': 'Do I need to provide cleaning supplies?',
      'faq-a-5': 'No. Our team brings all professional-grade, EPA-approved cleaning supplies and equipment. We use eco-friendly disinfectants that are safe for families, pets, and the environment.',
      'faq-q-6': 'What is your cancellation policy?',
      'faq-a-6': 'We ask for at least 24 hours notice for cancellations or rescheduling to avoid idle-labor fees. We understand plans change and always work with you to find a suitable alternative time.',
      'faq-q-7': 'What payment methods do you accept?',
      'faq-a-7': 'We accept cash, Zelle, Venmo, and bank transfers. For commercial contracts, we can arrange invoicing with net-15 or net-30 payment terms.',
      'faq-q-8': 'Do you offer same-day cleaning?',
      'faq-a-8': 'Yes, subject to availability. We regularly handle same-day turnovers for Airbnb hosts and urgent cleaning requests. Call us at (786) 817-7387 to check availability.',
      // Contact
      'cont-subtitle': 'Secure Your Schedule',
      'cont-title': 'Request a Free Estimate Today',
      'cont-intro': 'Receive a transparent, fixed-price cleaning proposal or residential service checklist. Our team answers all requests within 2 business hours.',
      'dlabel-phone': 'Direct Corporate Line',
      'dlabel-email': 'Corporate Email Dispatch',
      'dlabel-addr': 'Headquarters Address',
      'dlabel-wa': 'WhatsApp — Immediate Response',
      'wa-link': 'Chat on WhatsApp →',
      // Form
      'form-title': 'Request Your Free Quote',
      'form-sub': "Fill out the form and we'll respond in less than 2 hours.",
      'flabel-name': 'Full Name', 'flabel-phone': 'Phone / WhatsApp', 'flabel-email': 'Email Address', 'flabel-type': 'Service Type', 'flabel-msg': 'Additional Details',
      'fopt-0': '— Select service type —',
      'foptg-1': '🏠 Residential Services', 'foptg-2': '🏢 Commercial Services',
      'fopt-res-1': 'Standard Cleaning', 'fopt-res-2': 'Deep Cleaning', 'fopt-res-3': 'Move In / Move Out', 'fopt-res-4': 'Large Homes',
      'fopt-com-1': 'Office / Workspace', 'fopt-com-2': 'Retail / Storefront', 'fopt-com-3': 'Airbnb / Vacation Rental', 'fopt-com-4': 'Post-Construction', 'fopt-com-5': 'Other Commercial Space',
      'fph-name': 'e.g. John Doe', 'fph-phone': 'e.g. (305) 555-0100', 'fph-email': 'e.g. yourname@gmail.com', 'fph-msg': 'Tell us about property size, target dates, frequency of service or any special instructions...',
      'form-btn': 'Submit Quote Request',
      'form-disclaimer': 'By submitting, you agree to our terms. We protect your privacy & contact data. Response guaranteed in <2 business hours.',
      'success-title': 'Proposal Request Received',
      'success-reset': 'Submit Another Request',
      'st-1': 'Thank you, ', 'st-2': '. Your request for ', 'st-3': ' cleaning operations has been registered. Our operations officer will review and reach out within 2 hours.',
      // Booking CTA
      'booking-badge-lbl': 'Free Estimate — No Commitment',
      'booking-main-title': 'Ready for a Spotless Space?',
      'booking-main-desc': "Tell us about your property and we'll send a tailored proposal within 1 business hour.",
      'booking-stat-resp': 'Response Time', 'booking-stat-ver': 'Verified Team', 'booking-stat-days': 'Days a Week',
      'booking-stat-val-resp': 'Under 1h',
      'booking-cta-btn-txt': 'Request Free Estimate',
      'bf-2-lbl': 'Under 1h Reply',
      // Trust Cards
      'tc-1': 'Background-Verified Staff', 'tc-2': 'Professionally Trained Staff', 'tc-3': 'Fully Insured Staff',
      // Footer
      'footer-tagline': 'Trusted cleaning services in Miami, Sweetwater & surrounding areas — built on integrity, delivered with excellence.',
      'flink': ['Services', 'The Trust Factor', 'Service Area', 'FAQ', 'Request Estimate'],
      'copyright': '© 2026 Apex LLC. All rights reserved.',
      'privacy': 'Privacy Policy', 'terms': 'Terms of Service',
      'footer-hours': '🕐 Mon–Sat: 7:00 AM – 7:00 PM',
    },
    es: {
      'translate-btn': '<span class="lang-icon">EN</span><span class="lang-text"> English</span>',
      'nav': ['Servicios', 'Confianza', 'Área de Servicio', 'Contacto'],
      'nav-desc': ['Explora soluciones', 'Por qué elegirnos', 'Zonas de cobertura', 'Ponte en contacto'],
      'call-now': 'Llamar Ahora',
      'hero-badge-1': 'El Equipo de Limpieza más Confiable de Miami',
      'hero-badge-2': 'Licenciados, Afianzados y Asegurados',
      'hero-title': 'Servicios de Limpieza Profesional en Miami: <span class="highlight-text">Confianza, Detalle, Puntualidad.</span>',
      'hero-desc': 'Experimente la tranquilidad de contar con un servicio de limpieza basado en la confianza, la discreción y la atención obsesiva al detalle para su hogar o negocio.',
      'hero-cta-1': 'Solicitar Presupuesto Gratis',
      'hero-cta-2': 'Ver Servicios',
      'hero-trust-1': 'Respuesta Garantizada en 2 Horas',
      'hero-trust-2': 'Equipo 100% Verificado',
      'hero-status': 'Operaciones Activas y Reservando',
      'metric-1': 'Calificación Google',
      'metric-2': 'Limpiezas Realizadas',
      'check-1': 'Protocolos Aprobados por Administradores',
      'check-2': 'Solo Desinfectantes Aprobados por la EPA',
      'check-3': 'Reportes Fotográficos de Verificación',
      // How It Works
      'hiw-subtitle': 'Proceso Simple',
      'hiw-title': 'Cómo Funciona',
      'hiw-desc': 'Conseguir que limpien su espacio profesionalmente es fácil. Tres simples pasos — eso es todo.',
      'hiw-t-1': 'Solicite un Presupuesto Gratis',
      'hiw-d-1': 'Complete nuestro formulario rápido, llame o escríbanos por WhatsApp. Cuéntenos sobre su espacio y le enviaremos una propuesta personalizada en 2 horas.',
      'hiw-t-2': 'Limpiamos su Espacio',
      'hiw-d-2': 'Nuestro equipo verificado llega puntual con todos los suministros profesionales. Seguimos listas de control estandarizadas y enviamos reportes fotográficos.',
      'hiw-t-3': 'Disfrute su Espacio Impecable',
      'hiw-d-3': 'Entre a un hogar u oficina impecable. ¿Le gustó? Configure servicio recurrente y olvídese de la limpieza para siempre.',
      // Pricing
      'ps-sub': 'Nuestros Servicios',
      'ps-title': 'Servicios de Limpieza',
      'ps-desc': 'Servicios para el hogar y la empresa<br><span style="color: var(--accent-teal); font-weight: 500;">adaptados al tamaño y necesidad de cada espacio.</span>',
      'ptab-1': 'Limpieza Básica', 'ptab-2': 'Limpieza Profunda', 'ptab-3': 'Mudanza', 'ptab-4': 'Casas Grandes / 2 Plantas', 'ptab-5': 'Oficinas / Comercial',
      'pnote-1': 'Ideal para mantenimiento regular.', 'pnote-2': 'Para primera vez o cada 3 meses.', 'pnote-3': 'Se pide 50% de depósito para apartar la fecha.', 'pnote-4': 'Espacios amplios con escaleras o más de 4 habitaciones.', 'pnote-5': 'Guía de tarifas para contratos y visitas recurrentes, por pie cuadrado.',
      'pr-t-1': 'Limpieza Básica', 'pr-t-2': 'Limpieza Básica', 'pr-t-3': 'Limpieza Básica', 'pr-t-4': 'Limpieza Básica',
      'pr-t-5': 'Limpieza Profunda', 'pr-t-6': 'Limpieza Profunda', 'pr-t-7': 'Limpieza Profunda', 'pr-t-8': 'Limpieza Profunda',
      'pr-t-9': 'Limpieza de Mudanza', 'pr-t-10': 'Básica — Casa Grande', 'pr-t-11': 'Profunda — Casa Grande',
      'pr-s-1': '1 cuarto · 1 baño', 'pr-s-2': '2 cuartos · 2 baños', 'pr-s-3': '3 cuartos · 2 baños', 'pr-s-4': '4 cuartos · 2 baños',
      'pr-s-5': '1 cuarto · 1 baño', 'pr-s-6': '2 cuartos · 2 baños', 'pr-s-7': '3 cuartos · 2 baños', 'pr-s-8': '4 cuartos · 2 baños',
      'pr-s-9': 'Según tamaño', 'pr-s-10': '2 plantas · 4+ cuartos', 'pr-s-11': '2 plantas · 4+ cuartos',
      'pr-d-1': '2–3 horas', 'pr-d-2': '3–4 horas', 'pr-d-3': '4–5 horas', 'pr-d-4': '5–6 horas',
      'pr-d-5': '4–5 horas', 'pr-d-6': '5–6 horas', 'pr-d-7': '6–7 horas', 'pr-d-8': '7–8 horas',
      'pr-d-9': 'Tiempo variable', 'pr-d-10': '6–7 horas', 'pr-d-11': '8–9 horas',
      'pr-desc-1': 'Ideal para mantenimiento. Incluye aspirar, mapeado, baño, cocina por fuera, sacudir y sacar la basura.',
      'pr-desc-2': 'La más pedida. Limpieza completa de toda la casa: aspirar, mapeado, baños, cocina y cuartos.',
      'pr-desc-3': 'Casa familiar. Limpieza general de todos los espacios de la casa.',
      'pr-desc-4': 'Casa amplia de una planta. Limpieza general completa de todos los espacios de la casa.',
      'pr-desc-5': 'Para primera vez o cada 3 meses. Incluye dentro de horno, microondas, nevera, rodapiés y ventanas por dentro.',
      'pr-desc-6': 'Limpieza detallada completa: dentro de electrodomésticos, abanicos, marcos de puertas y ducha completa.',
      'pr-desc-7': 'Más completa. Todo lo básico más interior de gabinetes, clósets y paredes.',
      'pr-desc-8': 'Limpieza profunda total incluyendo electrodomésticos, clósets y paredes.',
      'pr-desc-9': 'Casa vacía lista para entregar o recibir. Limpieza profunda total. Se pide 50% de depósito.',
      'pr-desc-10': 'Casa de dos plantas con más de 4 cuartos. Incluye recargo por escaleras y espacio adicional a limpiar.',
      'pr-desc-11': 'Casa de dos plantas con más de 4 cuartos. Limpieza profunda total con recargo por escaleras y área extra.',
      'pt-h-1': 'Tamaño Oficina', 'pt-h-2': '1x por Semana', 'pt-h-3': '3x por Semana', 'pt-h-4': '5x por Semana',
      'pt-r-1': 'Menos de 1,000 sqft', 'pt-r-2': 'Menos de 2,000 sqft', 'pt-r-3': '2,000 – 5,000 sqft', 'pt-r-4': '5,000 – 10,000 sqft',
      'pt-quote': 'Cotizar',
      'pi-title': 'Qué incluye la limpieza de oficina básica',
      'pi-1': 'Vaciar todos los zafacones', 'pi-2': 'Aspirar y mapear pisos', 'pi-3': 'Limpiar baños completos + rellenar papel/jabón', 'pi-4': 'Cocina / área de café: limpiar mesones, microondas por fuera y por dentro, y fregadero', 'pi-5': 'Limpiar escritorios, teléfonos y superficies', 'pi-6': 'Limpiar vidrios de entrada y sala de conferencias', 'pi-7': 'Sacar la basura al contenedor',
      // Trust
      'trust-subtitle': 'Por qué Confían en Nosotros',
      'trust-title': 'Seguridad y Excelencia Operativa',
      'trust-desc': 'Cuando permite el ingreso de personas a su propiedad, la confianza no es opcional — lo es todo. Cada elemento de nuestra operación está diseñado para darle tranquilidad absoluta.',
      'p1-title': 'Licenciados, Afianzados y Asegurados',
      'p1-text': 'Sus activos están protegidos desde el primer día. Como entidad LLC registrada en Florida con cobertura completa de responsabilidad civil, respaldamos cada servicio con responsabilidad financiera total.',
      'p2-title': 'Personal 100% Verificado',
      'p2-text': 'Todo nuestro equipo pasa por una rigurosa verificación de antecedentes antes de ingresar a su propiedad. Seleccionamos por integridad primero — su seguridad y privacidad no son negociables.',
      'p3-title': 'Programación Sencilla y Flexible',
      'p3-text': 'Su tiempo es valioso — por eso nos adaptamos a su vida, no al revés. Desde cambios rápidos el mismo día hasta planes semanales recurrentes y operaciones comerciales nocturnas.',
      // Testimonials
      'testimonials-subtitle': 'Opiniones de Clientes',
      'testimonials-title': 'Lo que Dicen Nuestros Clientes',
      'testimonials-desc': 'No solo confíe en nuestra palabra — escuche a propietarios y administradores que confían en Apex para sus espacios.',
      'testimonial-1': '"Apex ha estado limpiando mi casa de 3 habitaciones por más de un año. Siempre son puntuales, minuciosos y respetuosos. La garantía de verificación de antecedentes me dio confianza para entregar mis llaves. ¡Muy recomendados!"',
      'testimonial-2': '"Usamos Apex para nuestro edificio de oficinas en Coral Gables — 3 veces por semana. Su equipo sigue una lista de verificación estricta, siempre abastece nuestros baños, y la calidad ha sido consistente por meses. Excelente comunicación también."',
      'testimonial-3': '"Administro 4 propiedades de Airbnb en Brickell. Apex maneja todos los cambios el mismo día entre huéspedes — lavandería, limpieza profunda, reabastecimiento. Envían reportes fotográficos después de cada trabajo. Absolutamente confiables."',
      'testimonial-detail-1': 'Propietaria · Sweetwater',
      'testimonial-detail-2': 'Administrador de Propiedad · Coral Gables',
      'testimonial-detail-3': 'Anfitriona Airbnb · Brickell',
      // Coverage
      'cov-subtitle': 'Operaciones en Miami',
      'cov-title': 'Área de Cobertura',
      'cov-text': 'Servimos con orgullo a Miami, Sweetwater y zonas aledañas. Con oficinas centrales cerca del corredor de la SW 109th Ave, atendemos propiedades en códigos postales clave incluyendo 33174 y sectores cercanos con disponibilidad inmediata.',
      'meta-1': 'Tiempo de respuesta promedio en Sweetwater',
      'meta-2': 'Operaciones de limpieza activas por semana',
      'meta-num-1': '15 Min', 'meta-num-2': '6 Días',
      'map-title': 'Área Destacada',
      'map-text': 'Despacho logístico directo a todas las propiedades en el corredor de la SW 109th Ave.',
      // FAQ
      'faq-subtitle': 'Preguntas Frecuentes',
      'faq-title': 'Preguntas Frecuentes',
      'faq-desc': 'Todo lo que necesita saber antes de reservar su primera limpieza.',
      'faq-q-1': '¿Su personal de limpieza tiene antecedentes verificados?',
      'faq-a-1': 'Sí. Cada miembro de nuestro equipo pasa una verificación exhaustiva de antecedentes antes de ser asignado a cualquier propiedad. Contratamos por integridad primero — su seguridad y privacidad no son negociables.',
      'faq-q-2': '¿Apex LLC está licenciado y asegurado?',
      'faq-a-2': 'Absolutamente. Apex LLC es una LLC registrada en Florida con seguro de responsabilidad civil comercial completo. Su propiedad y activos están protegidos desde el primer día.',
      'faq-q-3': '¿Qué áreas atienden en Miami?',
      'faq-a-3': 'Servimos con orgullo a Miami, Sweetwater, Coral Gables, Brickell, Downtown Miami, Doral, Kendall y Coconut Grove. Nuestra sede está cerca del corredor SW 109th Ave (33174) con disponibilidad de despacho en 15 minutos.',
      'faq-q-4': '¿Qué tan rápido puedo obtener un presupuesto?',
      'faq-a-4': 'Respondemos a todas las solicitudes de cotización en 2 horas hábiles. Para necesidades urgentes, llámenos directamente al (786) 817-7387 o escríbanos por WhatsApp.',
      'faq-q-5': '¿Necesito proporcionar productos de limpieza?',
      'faq-a-5': 'No. Nuestro equipo trae todos los suministros y equipos de limpieza profesional aprobados por la EPA. Usamos desinfectantes ecológicos seguros para familias, mascotas y el medio ambiente.',
      'faq-q-6': '¿Cuál es su política de cancelación?',
      'faq-a-6': 'Solicitamos al menos 24 horas de aviso para cancelaciones o reprogramaciones para evitar cargos por tiempo inactivo. Entendemos que los planes cambian y siempre trabajamos con usted para encontrar un horario alternativo.',
      'faq-q-7': '¿Qué métodos de pago aceptan?',
      'faq-a-7': 'Aceptamos efectivo, Zelle, Venmo y transferencias bancarias. Para contratos comerciales, podemos organizar facturación con términos de pago de 15 o 30 días.',
      'faq-q-8': '¿Ofrecen limpieza el mismo día?',
      'faq-a-8': 'Sí, sujeto a disponibilidad. Regularmente manejamos cambios el mismo día para anfitriones de Airbnb y solicitudes urgentes. Llame al (786) 817-7387 para verificar disponibilidad.',
      // Contact
      'cont-subtitle': 'Reserve su Fecha',
      'cont-title': 'Solicite un Presupuesto Gratis Hoy',
      'cont-intro': 'Reciba una propuesta comercial transparente de precio fijo o un plan de limpieza residencial. Nuestro equipo responde las solicitudes en menos de 2 horas hábiles.',
      'dlabel-phone': 'Línea de Atención Directa',
      'dlabel-email': 'Envío de Propuestas por Correo',
      'dlabel-addr': 'Dirección de Oficina Principal',
      'dlabel-wa': 'WhatsApp — Respuesta Inmediata',
      'wa-link': 'Chatear en WhatsApp →',
      // Form
      'form-title': 'Solicite su Presupuesto Gratis',
      'form-sub': 'Complete el formulario y le responderemos en menos de 2 horas.',
      'flabel-name': 'Nombre Completo', 'flabel-phone': 'Teléfono / WhatsApp', 'flabel-email': 'Correo Electrónico', 'flabel-type': 'Tipo de Servicio', 'flabel-msg': 'Detalles Adicionales',
      'fopt-0': '— Seleccione tipo de servicio —',
      'foptg-1': '🏠 Servicios Residenciales', 'foptg-2': '🏢 Servicios Comerciales',
      'fopt-res-1': 'Limpieza Estándar', 'fopt-res-2': 'Limpieza Profunda', 'fopt-res-3': 'Limpieza de Mudanza', 'fopt-res-4': 'Casas Grandes',
      'fopt-com-1': 'Oficina / Área de Trabajo', 'fopt-com-2': 'Local / Frente Comercial', 'fopt-com-3': 'Airbnb / Alquiler Vacacional', 'fopt-com-4': 'Post-Construcción', 'fopt-com-5': 'Otro Espacio Comercial',
      'fph-name': 'Ej. Juan Pérez', 'fph-phone': 'Ej. (305) 555-0100', 'fph-email': 'Ej. tucorreo@gmail.com', 'fph-msg': 'Cuéntanos sobre el tamaño del espacio, fechas, frecuencia o instrucciones especiales...',
      'form-btn': 'Enviar Solicitud',
      'form-disclaimer': 'Al enviar, acepta nuestros términos. Protegemos su privacidad y datos. Respuesta garantizada en menos de 2 horas hábiles.',
      'success-title': 'Solicitud de Presupuesto Recibida',
      'success-reset': 'Enviar Otra Solicitud',
      'st-1': 'Gracias, ', 'st-2': '. Su solicitud para limpieza de ', 'st-3': ' ha sido registrada. Nuestro equipo revisará y le contactará en menos de 2 horas.',
      // Booking CTA
      'booking-badge-lbl': 'Estimado Gratis — Sin Compromiso',
      'booking-main-title': '¿Listo para un Espacio Impecable?',
      'booking-main-desc': 'Cuéntenos sobre su propiedad y le enviaremos una propuesta personalizada en menos de 1 hora.',
      'booking-stat-resp': 'Tiempo de Respuesta', 'booking-stat-ver': 'Equipo Verificado', 'booking-stat-days': 'Días a la Semana',
      'booking-stat-val-resp': '< 1 Hora',
      'booking-cta-btn-txt': 'Solicitar Estimado Gratis',
      'bf-2-lbl': 'Respuesta < 1h',
      // Trust Cards
      'tc-1': 'Personal con Antecedentes Verificados', 'tc-2': 'Personal con Entrenamiento Profesional', 'tc-3': 'Personal Totalmente Asegurado',
      // Footer
      'footer-tagline': 'Servicios de limpieza confiables en Miami, Sweetwater y alrededores — basados en la integridad y el trabajo consistente.',
      'flink': ['Servicios', 'Confianza', 'Área de Cobertura', 'FAQ', 'Solicitar Presupuesto'],
      'copyright': '© 2026 Apex LLC. Todos los derechos reservados.',
      'privacy': 'Política de Privacidad', 'terms': 'Términos de Servicio',
      'footer-hours': '🕐 Lun–Sáb: 7:00 AM – 7:00 PM',
    }
  };

  function applyLang(lang) {
    const t = T[lang];
    const $  = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    // Translate button label
    if (translateBtn) translateBtn.innerHTML = t['translate-btn'];

    // Nav
    const desktopNavLinks = $$('.desktop-nav .nav-link');
    const mobileLinks = $$('.mobile-nav-link');
    t['nav'].forEach((text, i) => {
      if (desktopNavLinks[i]) desktopNavLinks[i].textContent = text;
      if (mobileLinks[i]) {
        const mnTitle = mobileLinks[i].querySelector('.mn-title');
        const mnDesc = mobileLinks[i].querySelector('.mn-desc');
        if (mnTitle) mnTitle.textContent = text;
        if (mnDesc && t['nav-desc'] && t['nav-desc'][i]) mnDesc.textContent = t['nav-desc'][i];
      }
    });

    const callNowTitle = $('.mpb-title');
    if (callNowTitle) callNowTitle.textContent = t['call-now'];

    // Hero
    const badges = $$('.hero-badge');
    if (badges[0]) badges[0].textContent = t['hero-badge-1'];
    if (badges[1]) badges[1].textContent = t['hero-badge-2'];
    const heroTitle = $('.hero-title');
    if (heroTitle) heroTitle.innerHTML = t['hero-title'];
    const heroDesc = $('.hero-description');
    if (heroDesc) heroDesc.textContent = t['hero-desc'];
    const heroCtas = $$('.hero-cta-group .btn');
    if (heroCtas[0]) heroCtas[0].textContent = t['hero-cta-1'];
    if (heroCtas[1]) heroCtas[1].textContent = t['hero-cta-2'];
    const trustTexts = $$('.indicator-text');
    if (trustTexts[0]) trustTexts[0].textContent = t['hero-trust-1'];
    if (trustTexts[1]) trustTexts[1].textContent = t['hero-trust-2'];
    const statusText = $('.status-indicator-text');
    if (statusText) statusText.textContent = t['hero-status'];
    const metricLabels = $$('.metric-label');
    if (metricLabels[0]) metricLabels[0].textContent = t['metric-1'];
    if (metricLabels[1]) metricLabels[1].textContent = t['metric-2'];
    const checkItems = $$('.checklist-item');
    [t['check-1'], t['check-2'], t['check-3']].forEach((text, i) => {
      if (checkItems[i]) {
        const spanEl = checkItems[i].querySelector('span');
        if (spanEl) spanEl.textContent = text;
      }
    });

    // How It Works
    const hiwSection = $('.how-it-works-section');
    if (hiwSection) {
      const sub = hiwSection.querySelector('.section-subtitle');
      const title = hiwSection.querySelector('.section-title');
      const desc = hiwSection.querySelector('.section-description');
      if (sub) sub.textContent = t['hiw-subtitle'];
      if (title) title.textContent = t['hiw-title'];
      if (desc) desc.textContent = t['hiw-desc'];
    }
    ['hiw-t-1', 'hiw-t-2', 'hiw-t-3', 'hiw-d-1', 'hiw-d-2', 'hiw-d-3'].forEach(k => {
      const el = $(`.${k}`);
      if (el) el.textContent = t[k];
    });

    // Pricing Section
    const pricingSub = $('.pricing-section .section-subtitle');
    const pricingTitle = $('.pricing-section .section-title');
    const pricingDesc = $('.pricing-section .section-description');
    if (pricingSub) pricingSub.textContent = t['ps-sub'];
    if (pricingTitle) pricingTitle.textContent = t['ps-title'];
    if (pricingDesc) pricingDesc.innerHTML = t['ps-desc'];
    const pricingTabs = $$('.pricing-tab');
    ['ptab-1','ptab-2','ptab-3','ptab-4','ptab-5'].forEach((k, i) => { if (pricingTabs[i] && t[k]) pricingTabs[i].textContent = t[k]; });
    const pricingNotes = $$('.pricing-note');
    ['pnote-1','pnote-2','pnote-3','pnote-4','pnote-5'].forEach((k, i) => { if (pricingNotes[i] && t[k]) pricingNotes[i].textContent = t[k]; });

    const rowTitles = $$('.pricing-row-title');
    const rowSpecs = $$('.pricing-row-spec');
    const rowDurations = $$('.pricing-row-duration');
    const rowDescs = $$('.pricing-row-desc');
    const rTitles = ['pr-t-1','pr-t-2','pr-t-3','pr-t-4','pr-t-5','pr-t-6','pr-t-7','pr-t-8','pr-t-9','pr-t-10','pr-t-11'];
    const rSpecs = ['pr-s-1','pr-s-2','pr-s-3','pr-s-4','pr-s-5','pr-s-6','pr-s-7','pr-s-8','pr-s-9','pr-s-10','pr-s-11'];
    const rDurs = ['pr-d-1','pr-d-2','pr-d-3','pr-d-4','pr-d-5','pr-d-6','pr-d-7','pr-d-8','pr-d-9','pr-d-10','pr-d-11'];
    const rDescs = ['pr-desc-1','pr-desc-2','pr-desc-3','pr-desc-4','pr-desc-5','pr-desc-6','pr-desc-7','pr-desc-8','pr-desc-9','pr-desc-10','pr-desc-11'];
    rTitles.forEach((k, i) => {
      if (rowTitles[i] && t[k]) {
        let txtNode = Array.from(rowTitles[i].childNodes).find(n => n.nodeType === 3 && n.textContent.trim().length > 0);
        if (txtNode) txtNode.textContent = t[k] + ' ';
        else rowTitles[i].insertBefore(document.createTextNode(t[k] + ' '), rowTitles[i].firstChild);
      }
      if (rowSpecs[i] && t[rSpecs[i]]) rowSpecs[i].textContent = t[rSpecs[i]];
      if (rowDurations[i] && t[rDurs[i]]) rowDurations[i].textContent = t[rDurs[i]];
      if (rowDescs[i] && t[rDescs[i]]) rowDescs[i].textContent = t[rDescs[i]];
    });

    const ths = $$('.office-sqft-table th');
    ['pt-h-1','pt-h-2','pt-h-3','pt-h-4'].forEach((k, i) => { if (ths[i] && t[k]) ths[i].textContent = t[k]; });
    const trs = $$('.office-sqft-table tbody tr');
    const rKeys = ['pt-r-1','pt-r-2','pt-r-3','pt-r-4'];
    trs.forEach((tr, i) => {
      if (t[rKeys[i]]) tr.children[0].textContent = t[rKeys[i]];
      for(let j=1; j<=3; j++) { if(tr.children[j]) tr.children[j].textContent = t['pt-quote']; }
    });

    const incTitle = $('.office-includes-title');
    if (incTitle) incTitle.textContent = t['pi-title'];
    const incLis = $$('.office-includes-cols li');
    ['pi-1','pi-2','pi-3','pi-4','pi-5','pi-6','pi-7'].forEach((k, i) => { if (incLis[i] && t[k]) incLis[i].textContent = t[k]; });

    // Trust section
    const trustSection = $('.trust-section');
    if (trustSection) {
      const sub = trustSection.querySelector('.section-subtitle');
      const title = trustSection.querySelector('.section-title');
      const desc = trustSection.querySelector('.section-description');
      if (sub) sub.textContent = t['trust-subtitle'];
      if (title) title.textContent = t['trust-title'];
      if (desc) desc.textContent = t['trust-desc'];
    }
    const pillars = $$('.pillar-item');
    [['p1-title','p1-text'],['p2-title','p2-text'],['p3-title','p3-text']].forEach(([tk, pk], i) => {
      if (pillars[i]) {
        const ptitle = pillars[i].querySelector('.pillar-title');
        const ptext = pillars[i].querySelector('.pillar-text');
        if (ptitle) ptitle.textContent = t[tk];
        if (ptext) ptext.textContent = t[pk];
      }
    });

    // Testimonials
    const testSection = $('.testimonials-section');
    if (testSection) {
      const sub = testSection.querySelector('.section-subtitle');
      const title = testSection.querySelector('.section-title');
      const desc = testSection.querySelector('.section-description');
      if (sub) sub.textContent = t['testimonials-subtitle'];
      if (title) title.textContent = t['testimonials-title'];
      if (desc) desc.textContent = t['testimonials-desc'];
    }
    const testCards = $$('.testimonial-card');
    ['testimonial-1', 'testimonial-2', 'testimonial-3'].forEach((k, i) => {
      if (testCards[i]) {
        const textEl = testCards[i].querySelector('.testimonial-text');
        if (textEl) textEl.textContent = t[k];
      }
    });
    ['testimonial-detail-1', 'testimonial-detail-2', 'testimonial-detail-3'].forEach(k => {
      const el = $(`.${k}`);
      if (el) el.textContent = t[k];
    });

    // Coverage
    const covSection = $('.coverage-section');
    if (covSection) {
      const sub = covSection.querySelector('.section-subtitle');
      const title = covSection.querySelector('.section-title');
      if (sub) sub.textContent = t['cov-subtitle'];
      if (title) title.textContent = t['cov-title'];
    }
    const covText = $('.coverage-text');
    if (covText) covText.textContent = t['cov-text'];
    const metaDescs = $$('.meta-description');
    const metaNums = $$('.meta-number');
    if (metaDescs[0]) metaDescs[0].textContent = t['meta-1'];
    if (metaDescs[1]) metaDescs[1].textContent = t['meta-2'];
    if (metaNums[0]) metaNums[0].textContent = t['meta-num-1'];
    if (metaNums[1]) metaNums[1].textContent = t['meta-num-2'];
    const mapTitle = $('.map-overlay-title');
    const mapText = $('.map-overlay-text');
    if (mapTitle) mapTitle.textContent = t['map-title'];
    if (mapText) mapText.textContent = t['map-text'];

    // FAQ
    const faqSection = $('.faq-section');
    if (faqSection) {
      const sub = faqSection.querySelector('.section-subtitle');
      const title = faqSection.querySelector('.section-title');
      const desc = faqSection.querySelector('.section-description');
      if (sub) sub.textContent = t['faq-subtitle'];
      if (title) title.textContent = t['faq-title'];
      if (desc) desc.textContent = t['faq-desc'];
    }
    for (let i = 1; i <= 8; i++) {
      const qEl = $(`.faq-q-${i}`);
      const aEl = $(`.faq-a-${i}`);
      if (qEl) qEl.textContent = t[`faq-q-${i}`];
      if (aEl) aEl.textContent = t[`faq-a-${i}`];
    }

    // Contact
    const contSection = $('.contact-section');
    if (contSection) {
      const sub = contSection.querySelector('.section-subtitle');
      const title = contSection.querySelector('.section-title');
      if (sub) sub.textContent = t['cont-subtitle'];
      if (title) title.textContent = t['cont-title'];
    }
    const contIntro = $('.contact-intro');
    if (contIntro) contIntro.textContent = t['cont-intro'];
    const detailLabels = $$('.detail-label');
    ['dlabel-phone','dlabel-email','dlabel-addr','dlabel-wa'].forEach((k, i) => { if (detailLabels[i] && t[k]) detailLabels[i].textContent = t[k]; });
    const waLink = $('.whatsapp-link');
    if (waLink) waLink.textContent = t['wa-link'];

    // Form
    const formTitle = $('.form-card-title');
    const formSub = $('.form-card-sub');
    if (formTitle) formTitle.textContent = t['form-title'];
    if (formSub) formSub.textContent = t['form-sub'];
    const formLabels = $$('.form-label');
    const formLabelKeys = ['flabel-name','flabel-phone','flabel-email','flabel-type','flabel-msg'];
    formLabels.forEach((el, i) => {
      if (!t[formLabelKeys[i]]) return;
      const req = el.querySelector('.required');
      el.textContent = t[formLabelKeys[i]] + ' ';
      if (req) el.appendChild(req);
    });

    // Custom Select i18n
    document.querySelectorAll('#cs-panel [data-i18n-key]').forEach(el => {
      const key = el.getAttribute('data-i18n-key');
      if (t[key]) el.textContent = t[key];
    });
    const csDisplay = document.getElementById('cs-display');
    const selectedOpt = document.querySelector('#cs-panel .cs-option.selected');
    if (csDisplay) {
      if (selectedOpt) {
        const key = selectedOpt.getAttribute('data-i18n-key');
        if (t[key]) csDisplay.textContent = t[key];
      } else {
        if (t['fopt-0']) csDisplay.textContent = t['fopt-0'];
      }
    }

    const nameI = document.getElementById('full-name');
    const phoneI = document.getElementById('phone-number');
    const emailI = document.getElementById('email-address');
    const msgT = document.getElementById('message');
    if (nameI) nameI.placeholder = t['fph-name'];
    if (phoneI) phoneI.placeholder = t['fph-phone'];
    if (emailI) emailI.placeholder = t['fph-email'];
    if (msgT) msgT.placeholder = t['fph-msg'];

    const submitTxt = $('.btn-form-submit .btn-text');
    if (submitTxt) submitTxt.textContent = t['form-btn'];
    const disclaimer = $('.form-disclaimer');
    if (disclaimer) disclaimer.textContent = t['form-disclaimer'];

    // Success
    const successTitle = $('.success-title');
    const resetBtn = document.getElementById('btn-success-reset');
    const st1 = $('.st-1'); const st2 = $('.st-2'); const st3 = $('.st-3');
    if (successTitle) successTitle.textContent = t['success-title'];
    if (resetBtn) resetBtn.textContent = t['success-reset'];
    if (st1) st1.textContent = t['st-1'];
    if (st2) st2.textContent = t['st-2'];
    if (st3) st3.textContent = t['st-3'];

    // Booking CTA & Trust Cards (class-based lookup)
    ['booking-badge-lbl', 'booking-main-title', 'booking-main-desc',
     'booking-stat-resp', 'booking-stat-ver', 'booking-stat-days',
     'booking-stat-val-resp', 'booking-cta-btn-txt', 'bf-2-lbl',
     'tc-1', 'tc-2', 'tc-3'].forEach(k => {
      const el = $(`.${k}`);
      if (el) el.textContent = t[k];
    });

    // Footer
    const footerTagline = $('.footer-tagline');
    if (footerTagline) footerTagline.textContent = t['footer-tagline'];
    const footerLinks = $$('.footer-link');
    t['flink'].forEach((text, i) => { if (footerLinks[i]) footerLinks[i].textContent = text; });
    const copyright = $('.copyright');
    if (copyright) copyright.textContent = t['copyright'];
    const privLink = document.getElementById('privacy-link');
    const trmLink = document.getElementById('terms-link');
    if (privLink) privLink.textContent = t['privacy'];
    if (trmLink) trmLink.textContent = t['terms'];
    const footerHours = $('.footer-hours');
    if (footerHours) footerHours.textContent = t['footer-hours'];

    document.documentElement.lang = lang;
  }

  if (translateBtn) {
    translateBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'es' : 'en';
      applyLang(currentLang);
    });
  }

  applyLang(currentLang);


  // --- 9. Custom Service Type Select ---
  const csWrapper  = document.getElementById('service-select-wrapper');
  const csTrigger  = document.getElementById('cs-trigger');
  const csPanel    = document.getElementById('cs-panel');
  const csDisplayEl = document.getElementById('cs-display');
  const csOptionEls = document.querySelectorAll('.cs-option');

  if (csWrapper && csTrigger && csPanel) {
    document.body.appendChild(csPanel);

    function positionPanel() {
      const rect = csTrigger.getBoundingClientRect();
      csPanel.style.top   = (rect.bottom + 4) + 'px';
      csPanel.style.left  = rect.left + 'px';
      csPanel.style.width = rect.width + 'px';
    }

    function openCustomSelect() {
      positionPanel();
      csWrapper.classList.add('open');
      csWrapper.setAttribute('aria-expanded', 'true');
      csPanel.classList.add('open');
    }

    function closeCustomSelect() {
      csWrapper.classList.remove('open');
      csWrapper.setAttribute('aria-expanded', 'false');
      csPanel.classList.remove('open');
    }

    csTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      csWrapper.classList.contains('open') ? closeCustomSelect() : openCustomSelect();
    });

    csTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); csWrapper.classList.contains('open') ? closeCustomSelect() : openCustomSelect(); }
      if (e.key === 'Escape') { closeCustomSelect(); csTrigger.focus(); }
    });

    csOptionEls.forEach(option => {
      option.addEventListener('click', () => {
        const value = option.getAttribute('data-value');
        if (propertySelect) propertySelect.value = value;
        if (csDisplayEl) { csDisplayEl.textContent = option.textContent.trim(); csDisplayEl.classList.add('has-value'); }
        csOptionEls.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        clearError('property-type');
        closeCustomSelect();
      });
    });

    document.addEventListener('click', (e) => {
      if (!csWrapper.contains(e.target) && !csPanel.contains(e.target)) closeCustomSelect();
    });

    window.addEventListener('scroll', (e) => {
      if (csPanel.contains(e.target)) return;
      closeCustomSelect();
    }, { passive: true, capture: true });

    window.addEventListener('resize', () => {
      if (csWrapper.classList.contains('open')) positionPanel();
    }, { passive: true });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && csWrapper.classList.contains('open')) { closeCustomSelect(); csTrigger.focus(); }
    });
  }


  // --- 10. Service Tab Switcher ---
  const pricingTabBtns = document.querySelectorAll('.pricing-tab');
  const pricingPanels = document.querySelectorAll('.pricing-panel');

  pricingTabBtns.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      pricingTabBtns.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      pricingPanels.forEach(panel => panel.classList.remove('active'));
      const activePanel = document.getElementById(`panel-${target}`);
      if (activePanel) activePanel.classList.add('active');
    });
  });

});


/* ==========================================================================
   DECORATIVE JS: Liquid Glass Interactions
   ========================================================================== */
(function initLiquidGlassEffects() {
  const glassCards = document.querySelectorAll('.pillar-item, .hero-visual-card, .testimonial-card');

  glassCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', `50%`);
      card.style.setProperty('--mouse-y', `50%`);
    });
  });

  // Scroll Reveal
  const revealElements = document.querySelectorAll('.pillar-item, .trust-glass-card, .testimonial-card, .hiw-step, .faq-item');
  revealElements.forEach(el => {
    if (!el.classList.contains('fade-in')) el.classList.add('glass-reveal');
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll('.glass-reveal').forEach(el => revealObserver.observe(el));
})();
