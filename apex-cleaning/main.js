/**
 * Apex LLC - Main Interactive Behaviors
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
  handleScroll(); // Initial check on load


  // --- 2. Mobile Navigation Toggle & Drawer ---
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu() {
    mobileNavToggle.classList.toggle('open');
    mobileMenuDrawer.classList.toggle('open');
    document.body.style.overflow = mobileMenuDrawer.classList.contains('open') ? 'hidden' : '';
  }

  mobileNavToggle.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when clicking a link
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
    rootMargin: '-30% 0px -60% 0px', // Trigger active when section occupies center viewport
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
  const serviceCardCtas = document.querySelectorAll('.service-card-cta');
  const propertySelect = document.getElementById('property-type');

  serviceCardCtas.forEach(cta => {
    cta.addEventListener('click', (e) => {
      // Don't prevent default, allow smooth scroll to #contact
      const targetService = cta.getAttribute('data-service');
      if (targetService && propertySelect) {
        propertySelect.value = targetService;
      }
    });
  });


  // --- 5. Quote Request Form Submission State Handling ---
  const quoteForm = document.getElementById('quote-form');
  const formSuccessState = document.getElementById('form-success-state');
  const successClientName = document.getElementById('success-client-name');
  const successPropertyType = document.getElementById('success-property-type');
  const btnSuccessReset = document.getElementById('btn-success-reset');
  const btnSubmit = quoteForm.querySelector('.btn-form-submit');
  const btnSubmitText = btnSubmit.querySelector('.btn-text');
  const loadingSpinner = btnSubmit.querySelector('.loading-spinner');

  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic Input validations
    const fullName = document.getElementById('full-name').value.trim();
    const phone = document.getElementById('phone-number').value.trim();
    const email = document.getElementById('email-address').value.trim();
    const propertyType = propertySelect.value;

    if (!fullName || !phone || !email || !propertyType) {
      alert('Please fill out all required fields.');
      return;
    }

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
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      // Exit Loading State
      btnSubmit.disabled = false;
      btnSubmitText.textContent = currentLang === 'en' ? 'Submit Quote Request' : 'Enviar Solicitud';
      loadingSpinner.style.display = 'none';

      // Set Success Info
      successClientName.textContent = fullName;
      
      const typeTranslations = {
        'Residential': currentLang === 'en' ? 'Residential / Luxury Apartment' : 'Residencial / Apartamento',
        'Commercial': currentLang === 'en' ? 'Commercial / Corporate Office' : 'Comercial / Oficina Corporativa'
      };
      
      let readablePropertyType = typeTranslations[propertyType] || 'Selected Property';
      
      successPropertyType.textContent = readablePropertyType;

      // Show Success State
      formSuccessState.classList.add('active');
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      alert('Hubo un problema al enviar su solicitud. Por favor intente de nuevo.');
      btnSubmit.disabled = false;
      btnSubmitText.textContent = currentLang === 'en' ? 'Submit Quote Request' : 'Enviar Solicitud';
      loadingSpinner.style.display = 'none';
    });
  });

  // Reset form to write another query
  btnSuccessReset.addEventListener('click', () => {
    quoteForm.reset();
    formSuccessState.classList.remove('active');
  });


  // --- 6. Legal Modal (Privacy Policy & Terms) Logic ---
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

  privacyLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal('privacy');
  });

  termsLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal('terms');
  });

  closeModalBtn.addEventListener('click', closeModal);
  
  // Close on backdrop click
  legalModal.addEventListener('click', (e) => {
    if (e.target === legalModal) {
      closeModal();
    }
  });

  // Close on Escape press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && legalModal.classList.contains('open')) {
      closeModal();
    }
  });


  // --- 7. Language Toggle (EN / ES) ---
  const translateBtn = document.getElementById('translate-btn');
  let currentLang = 'en';

  const T = {
    en: {
      'translate-btn': '<span class="lang-icon">ES</span><span class="lang-text"> Español</span>',
      // Nav
      'nav': ['Services', 'Why Apex', 'Service Area', 'Contact'],
      // Hero
      'hero-badge-1': "Miami's Most Trusted Cleaning Team",
      'hero-badge-2': 'Licensed, Bonded & Insured',
      'hero-title': 'Cleaning Services in Miami: <span class="highlight-text">Impeccable Spaces, Absolute Confidence.</span>',
      'hero-desc': 'Experience the peace of mind that comes with a cleaning service built on trust, quality, and attention to detail — for your home and your business.',
      'hero-cta-1': 'Get a Free Estimate',
      'hero-cta-2': 'Explore Services',
      'hero-trust-1': '2-Hour Operations Response',
      'hero-trust-2': '100% Background-Vetted Team',
      'hero-status': 'Operations Live & Booking',
      'metric-1': 'Google Rating',
      'metric-2': 'Cleanings Completed',
      'check-1': 'Standardized Operational Checklists',
      'check-2': 'EPA-Approved Disinfectants Only',
      'check-3': 'Status Verification Reports',
      'hero-card-cta': 'Book Cleaning Walkthrough',
      // Services
      'svc-subtitle': 'Services',
      'svc-title': 'Cleaning Services',
      'svc-desc': 'We provide structured and reliable cleaning services designed to meet commercial standards and strict property management requirements.',
      'c1-title': 'Vacation Rental Cleaning',
      'c1-text': 'Focused on strict schedule compliance, attention to operational details, and clear reporting after each stay.',
      'c1-li': ['<strong>Same-day turnovers:</strong> Fast and efficient preparation between reservations.', '<strong>Laundry management:</strong> Washing and drying of bed linens and towels.', '<strong>Status reports:</strong> Property inspection to notify of any damages or missing items.'],
      'c1-cta': 'Request Quote →',
      'c2-badge': 'Popular Service',
      'c2-title': 'Residential Cleaning',
      'c2-text': 'Consistent maintenance and comprehensive organization for homes, performed by reliable and organized staff.',
      'c2-li': ['<strong>Recurring service:</strong> Weekly or bi-weekly cleaning options.', '<strong>Deep cleaning:</strong> Detailed attention to all areas of the home.', '<strong>Move-in/Move-out services:</strong> Complete cleaning when entering or leaving the property.', '<strong>Surface cleaning:</strong> Proper maintenance for different types of materials and fixtures.'],
      'c2-cta': 'Schedule Cleaning →',
      'c3-title': 'Commercial & Office Cleaning',
      'c3-text': 'Structured operations under strict protocol compliance and low impact on your company\'s activities.',
      'c3-li': ['<strong>Flexible schedules:</strong> Nighttime or after-hours cleaning.', '<strong>Area disinfection:</strong> Consistent attention to common areas, desks, and meeting rooms.', '<strong>General maintenance:</strong> Systematic emptying of trash bins, floor, and window cleaning.', '<strong>Custom protocols:</strong> Tailored checklists adapted to your commercial facilities.'],
      'c3-cta': 'Consult Contracts →',
      // Trust
      'trust-subtitle': 'Our Pillars',
      'trust-title': 'Built on Security, Driven by Excellence',
      'trust-desc': 'When you invite someone into your property, trust is everything. That\'s why every element of our operation is designed to give you complete peace of mind.',
      'p1-title': 'Fully Licensed, Bonded & Insured',
      'p1-text': 'Your assets are protected. As a fully registered Florida LLC with comprehensive liability coverage, we stand behind every service with complete financial accountability.',
      'p2-title': '100% Background-Verified Team',
      'p2-text': 'Every member of our team passes background screening before entering your property. We hire for integrity because your safety and privacy are non-negotiable.',
      'p3-title': 'Effortless, Flexible Scheduling',
      'p3-text': 'We adapt to your operations. From tight same-day turnovers to recurring residential schedules and after-hours commercial cleanings.',
      
      // Pricing Section
      'ps-sub': 'Our Services',
      'ps-title': 'Cleaning Services',
      'ps-desc': 'Services for home and business — tailored to the size and needs of every space.',
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
      
      'pcta-note': 'Unsure which service to choose? Contact us for free advice.',
      'pcta-btn': 'Request Free Quote',
      
      // Coverage
      'cov-subtitle': 'Miami Operations',
      'cov-title': 'Our Service Area',
      'cov-text': 'Proudly serving Miami, Sweetwater, and surrounding areas. Headquartered near the SW 109th Ave corridor, our team handles properties across key local zip codes including 33174 with immediate availability.',
      'meta-1': 'Avg. dispatch response to Sweetwater corridor',
      'meta-2': 'Active cleaning operations per week',
      'meta-num-1': '15 Min',
      'meta-num-2': '6 Days',
      'map-title': 'Coverage Highlight',
      'map-text': 'Direct logistics dispatch to all property owners in the SW 109th Ave corridor.',
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
      'form-sub': 'Fill out the form and we\'ll respond in less than 2 hours.',
      'flabel-name': 'Full Name',
      'flabel-phone': 'Phone / WhatsApp',
      'flabel-email': 'Email Address',
      'flabel-type': 'Service Type',
      'fopt-0': '— Select property type —',
      'fopt-2': '🏠 Residential / Apartment',
      'fopt-3': '🏢 Commercial / Corporate Office',
      'flabel-msg': 'Additional Details',
      'fph-name': 'e.g. John Doe',
      'fph-phone': 'e.g. (305) 555-0100',
      'fph-email': 'e.g. yourname@gmail.com',
      'fph-msg': 'Tell us about property size, target dates, frequency...',
      'form-btn': 'Submit Quote Request',
      'form-disclaimer': 'By submitting, you agree to our terms. We protect your privacy & contact data. Response guaranteed in <2 business hours.',
      'success-title': 'Proposal Request Received',
      'success-reset': 'Submit Another Request',
      'st-1': 'Thank you, ',
      'st-2': '. Your request for ',
      'st-3': ' cleaning operations has been registered. Our operations officer will review and reach out within 2 hours.',
      // Footer
      'footer-tagline': 'Trusted cleaning services in Miami, Sweetwater & surrounding areas — built on integrity, delivered with excellence.',
      'flink': ['Services', 'The Trust Factor', 'Service Area', 'Request Estimate'],
      'copyright': '© 2026 Apex LLC. All rights reserved.',
      'privacy': 'Privacy Policy',
      'terms': 'Terms of Service',
    },
    es: {
      'translate-btn': '<span class="lang-icon">EN</span><span class="lang-text"> English</span>',
      'nav': ['Servicios', 'Confianza', 'Área de Servicio', 'Contacto'],
      'hero-badge-1': 'El Equipo de Limpieza más Confiable de Miami',
      'hero-badge-2': 'Licenciados, Afianzados y Asegurados',
      'hero-title': 'Servicios de Limpieza en Miami: <span class="highlight-text">Espacios Impecables, Confianza Absoluta.</span>',
      'hero-desc': 'Experimente la tranquilidad de contar con un servicio de limpieza basado en la confianza, la calidad y la atención al detalle para su hogar o negocio.',
      'hero-cta-1': 'Solicitar Presupuesto Gratis',
      'hero-cta-2': 'Ver Servicios',
      'hero-trust-1': 'Respuesta en 2 Horas',
      'hero-trust-2': 'Equipo 100% Verificado',
      'hero-status': 'Operaciones Activas y Reservando',
      'metric-1': 'Calificación Google',
      'metric-2': 'Limpiezas Realizadas',
      'check-1': 'Listas de Control Estandarizadas',
      'check-2': 'Solo Desinfectantes Aprobados por la EPA',
      'check-3': 'Reportes de Verificación de Estado',
      'hero-card-cta': 'Solicitar Inspección de Limpieza',
      // Services
      'svc-subtitle': 'Servicios',
      'svc-title': 'Servicios de Limpieza',
      'svc-desc': 'Ofrecemos servicios de limpieza estructurados y confiables diseñados para cumplir con estándares comerciales y requisitos estrictos de administración de propiedades.',
      'c1-title': 'Limpieza para Alquileres Vacacionales',
      'c1-text': 'Enfocados en el cumplimiento estricto de horarios, atención a los detalles operativos y reportes claros tras cada estadía.',
      'c1-li': ['<strong>Cambios el mismo día:</strong> Preparación rápida y eficiente entre reservas.', '<strong>Gestión de lavandería:</strong> Lavado y secado de ropa de cama y toallas.', '<strong>Reporte de estado:</strong> Inspección de la propiedad para notificar daños o faltantes.'],
      'c1-cta': 'Solicitar Cotización →',
      'c2-badge': 'Servicio Popular',
      'c2-title': 'Limpieza Residencial',
      'c2-text': 'Mantenimiento constante y orden integral para hogares, realizado por personal confiable y organizado.',
      'c2-li': ['<strong>Servicio recurrente:</strong> Opciones de limpieza semanal o quincenal.', '<strong>Limpieza profunda:</strong> Atención detallada a todas las áreas del hogar.', '<strong>Servicios de mudanza:</strong> Limpieza completa al entrar o salir de la propiedad.', '<strong>Limpieza de superficies:</strong> Mantenimiento adecuado para distintos tipos de materiales e instalaciones.'],
      'c2-cta': 'Agendar Limpieza →',
      'c3-title': 'Limpieza Comercial y de Oficinas',
      'c3-text': 'Operaciones estructuradas bajo cumplimiento de protocolos y bajo impacto en las actividades de su empresa.',
      'c3-li': ['<strong>Horarios flexibles:</strong> Limpiezas nocturnas o fuera del horario comercial.', '<strong>Desinfección de áreas:</strong> Atención constante en zonas comunes, escritorios y salas de reuniones.', '<strong>Mantenimiento general:</strong> Vaciado de papeleras, limpieza de pisos y ventanas de manera sistemática.', '<strong>Protocolos personalizados:</strong> Listas de verificación (checklists) adaptadas a las instalaciones comerciales.'],
      'c3-cta': 'Consultar Contratos →',
      // Trust
      'trust-subtitle': 'Nuestros Pilares',
      'trust-title': 'Seguridad y Consistencia Operativa',
      'trust-desc': 'Cuando permite el ingreso de personas a su propiedad, la confianza lo es todo. Por eso, diseñamos nuestra operación para darle tranquilidad absoluta.',
      'p1-title': 'Licenciados, Afianzados y Asegurados',
      'p1-text': 'Sus activos están protegidos. Como entidad LLC registrada en Florida con cobertura de responsabilidad civil, respaldamos cada servicio con responsabilidad financiera completa.',
      'p2-title': 'Personal 100% Verificado',
      'p2-text': 'Todo nuestro equipo pasa por una estricta verificación de antecedentes antes de ingresar a su propiedad. Seleccionamos por integridad porque su seguridad es nuestra prioridad.',
      'p3-title': 'Programación Sencilla y Flexible',
      'p3-text': 'Nos adaptamos a su horario de negocio y rutinas. Desde cambios rápidos el mismo día hasta limpieza residencial programada o limpiezas comerciales nocturnas.',
      
      // Pricing Section
      'ps-sub': 'Nuestros Servicios',
      'ps-title': 'Servicios de Limpieza',
      'ps-desc': 'Servicios para el hogar y la empresa — adaptados al tamaño y necesidad de cada espacio.',
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
      
      'pcta-note': '¿Tienes dudas sobre qué servicio elegir? Escríbenos y te asesoramos sin costo.',
      'pcta-btn': 'Solicitar Cotización Gratis',

      // Coverage
      'cov-subtitle': 'Operaciones en Miami',
      'cov-title': 'Área de Cobertura',
      'cov-text': 'Servimos con orgullo a Miami, Sweetwater y zonas aledañas. Con oficinas centrales cerca del corredor de la SW 109th Ave, atendemos el código postal 33174 con disponibilidad inmediata.',
      'meta-1': 'Tiempo de respuesta promedio en Sweetwater',
      'meta-2': 'Operaciones de limpieza activas por semana',
      'meta-num-1': '15 Min',
      'meta-num-2': '6 Días',
      'map-title': 'Área Destacada',
      'map-text': 'Despacho logístico directo a todas las propiedades en el corredor de la SW 109th Ave.',
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
      'flabel-name': 'Nombre Completo',
      'flabel-phone': 'Teléfono / WhatsApp',
      'flabel-email': 'Correo Electrónico',
      'flabel-type': 'Tipo de Servicio',
      'fopt-0': '— Seleccione tipo de propiedad —',
      'fopt-2': '🏠 Residencial / Apartamento',
      'fopt-3': '🏢 Comercial / Oficina Corporativa',
      'flabel-msg': 'Detalles Adicionales',
      'fph-name': 'Ej. Juan Pérez',
      'fph-phone': 'Ej. (305) 555-0100',
      'fph-email': 'Ej. tucorreo@gmail.com',
      'fph-msg': 'Cuéntanos sobre el tamaño del espacio, fechas, frecuencia...',
      'form-btn': 'Enviar Solicitud',
      'form-disclaimer': 'Al enviar, acepta nuestros términos. Protegemos su privacidad y datos. Respuesta garantizada en menos de 2 horas hábiles.',
      'success-title': 'Solicitud de Presupuesto Recibida',
      'success-reset': 'Enviar Otra Solicitud',
      'st-1': 'Gracias, ',
      'st-2': '. Su solicitud para limpieza de ',
      'st-3': ' ha sido registrada. Nuestro equipo revisará y le contactará en menos de 2 horas.',
      // Footer
      'footer-tagline': 'Servicios de limpieza confiables en Miami, Sweetwater y alrededores, basados en la integridad y el trabajo consistente.',
      'flink': ['Servicios', 'Confianza', 'Área de Cobertura', 'Solicitar Presupuesto'],
      'copyright': '© 2026 Apex LLC. Todos los derechos reservados.',
      'privacy': 'Política de Privacidad',
      'terms': 'Términos de Servicio',
    }
  };

  function applyLang(lang) {
    const t = T[lang];
    const $  = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    // Translate button label
    if (translateBtn) translateBtn.innerHTML = t['translate-btn'];

    // Nav links
    const navLinks = $$('.desktop-nav .nav-link');
    const mobileLinks = $$('.mobile-nav-link');
    t['nav'].forEach((text, i) => {
      if (navLinks[i]) navLinks[i].textContent = text;
      if (mobileLinks[i]) mobileLinks[i].textContent = text;
    });

    // Hero badges
    const badges = $$('.hero-badge');
    if (badges[0]) badges[0].textContent = t['hero-badge-1'];
    if (badges[1]) badges[1].textContent = t['hero-badge-2'];

    // Hero title (has inner HTML span)
    const heroTitle = $('.hero-title');
    if (heroTitle) heroTitle.innerHTML = t['hero-title'];

    // Hero description & CTAs
    const heroDesc = $('.hero-description');
    if (heroDesc) heroDesc.textContent = t['hero-desc'];
    const heroCtas = $$('.hero-cta-group .btn');
    if (heroCtas[0]) heroCtas[0].textContent = t['hero-cta-1'];
    if (heroCtas[1]) heroCtas[1].textContent = t['hero-cta-2'];

    // Trust indicators
    const trustTexts = $$('.indicator-text');
    if (trustTexts[0]) trustTexts[0].textContent = t['hero-trust-1'];
    if (trustTexts[1]) trustTexts[1].textContent = t['hero-trust-2'];

    // Hero card
    const statusText = $('.status-indicator-text');
    if (statusText) statusText.textContent = t['hero-status'];
    const metricLabels = $$('.metric-label');
    if (metricLabels[0]) metricLabels[0].textContent = t['metric-2'];
    const checkItems = $$('.checklist-item');
    [t['check-1'], t['check-2'], t['check-3']].forEach((text, i) => {
      if (checkItems[i]) {
        const spanEl = checkItems[i].querySelector('span');
        if (spanEl) spanEl.textContent = text;
      }
    });
    const cardCta = $('.visual-card-cta-wrapper .btn');
    if (cardCta) cardCta.textContent = t['hero-card-cta'];

    // Services section header
    const svcSection = $('.services-section');
    if (svcSection) {
      const sub = svcSection.querySelector('.section-subtitle');
      const title = svcSection.querySelector('.section-title');
      const desc = svcSection.querySelector('.section-description');
      if (sub) sub.textContent = t['svc-subtitle'];
      if (title) title.textContent = t['svc-title'];
      if (desc) desc.textContent = t['svc-desc'];
    }

    // Service cards
    const cards = $$('.service-card');
    function translateCard(card, titleKey, textKey, liKey, ctaKey, badgeKey) {
      if (!card) return;
      const title = card.querySelector('.service-card-title');
      const text = card.querySelector('.service-card-text');
      const cta = card.querySelector('.service-card-cta');
      if (title) title.textContent = t[titleKey];
      if (text) text.textContent = t[textKey];
      if (cta) cta.textContent = t[ctaKey];
      if (badgeKey) {
        const badge = card.querySelector('.badge-ribbon');
        if (badge) badge.textContent = t[badgeKey];
      }
      const lis = card.querySelectorAll('.service-deliverables li');
      t[liKey].forEach((text, i) => {
        if (lis[i]) {
          const bullet = lis[i].querySelector('.bullet');
          lis[i].innerHTML = text;
          if (bullet) lis[i].prepend(bullet);
        }
      });
    }
    translateCard(cards[0], 'c1-title', 'c1-text', 'c1-li', 'c1-cta', null);
    translateCard(cards[1], 'c2-title', 'c2-text', 'c2-li', 'c2-cta', 'c2-badge');
    translateCard(cards[2], 'c3-title', 'c3-text', 'c3-li', 'c3-cta', null);

    // Pricing Section Translation
    const pricingSub = $('.pricing-section .section-subtitle');
    const pricingTitle = $('.pricing-section .section-title');
    const pricingDesc = $('.pricing-section .section-description');
    if (pricingSub) pricingSub.textContent = t['ps-sub'];
    if (pricingTitle) pricingTitle.textContent = t['ps-title'];
    if (pricingDesc) pricingDesc.textContent = t['ps-desc'];

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
        if (txtNode) {
          txtNode.textContent = t[k] + ' ';
        } else {
          rowTitles[i].insertBefore(document.createTextNode(t[k] + ' '), rowTitles[i].firstChild);
        }
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
      for(let j=1; j<=3; j++) {
        if(tr.children[j]) tr.children[j].textContent = t['pt-quote'];
      }
    });

    const incTitle = $('.office-includes-title');
    if (incTitle) incTitle.textContent = t['pi-title'];
    const incLis = $$('.office-includes-cols li');
    const iKeys = ['pi-1','pi-2','pi-3','pi-4','pi-5','pi-6','pi-7'];
    iKeys.forEach((k, i) => { if (incLis[i] && t[k]) incLis[i].textContent = t[k]; });

    const ctaNote = $('.pricing-cta-note');
    const ctaBtn = $('.pricing-cta-row .btn');
    if (ctaNote) ctaNote.textContent = t['pcta-note'];
    if (ctaBtn) ctaBtn.textContent = t['pcta-btn'];

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

    // Coverage section
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
    if (metaNums[0]) metaNums[0].textContent = t['meta-num-1'] || metaNums[0].textContent;
    if (metaNums[1]) metaNums[1].textContent = t['meta-num-2'] || metaNums[1].textContent;
    const mapTitle = $('.map-overlay-title');
    const mapText = $('.map-overlay-text');
    if (mapTitle) mapTitle.textContent = t['map-title'];
    if (mapText) mapText.textContent = t['map-text'];

    // Contact section
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
    const labelKeys = ['dlabel-phone','dlabel-email','dlabel-addr','dlabel-wa'];
    detailLabels.forEach((el, i) => { if (t[labelKeys[i]]) el.textContent = t[labelKeys[i]]; });
    const waLink = $('.whatsapp-link');
    if (waLink) waLink.textContent = t['wa-link'];

    // Form
    const formTitle = $('.form-card-title');
    const formSub = $('.form-card-sub');
    if (formTitle) formTitle.textContent = t['form-title'];
    if (formSub) formSub.textContent = t['form-sub'];

    const formLabels = $$('.form-label');
    const formLabelKeys = ['flabel-name','flabel-phone','flabel-email','flabel-type','flabel-msg'];
    const hasRequired = [true, true, true, true, false];
    formLabels.forEach((el, i) => {
      if (!t[formLabelKeys[i]]) return;
      const req = el.querySelector('.required');
      el.textContent = t[formLabelKeys[i]] + ' ';
      if (hasRequired[i] && req) el.appendChild(req);
    });

    const opts = $$('#property-type option');
    ['fopt-0','fopt-2','fopt-3'].forEach((k, i) => {
      if (opts[i] && t[k]) opts[i].textContent = t[k];
    });

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

    // Success state
    const successTitle = $('.success-title');
    const resetBtn = document.getElementById('btn-success-reset');
    const st1 = $('.st-1');
    const st2 = $('.st-2');
    const st3 = $('.st-3');
    if (successTitle) successTitle.textContent = t['success-title'];
    if (resetBtn) resetBtn.textContent = t['success-reset'];
    if (st1) st1.textContent = t['st-1'];
    if (st2) st2.textContent = t['st-2'];
    if (st3) st3.textContent = t['st-3'];

    // Footer
    const footerTagline = $('.footer-tagline');
    if (footerTagline) footerTagline.textContent = t['footer-tagline'];
    const footerLinks = $$('.footer-link');
    t['flink'].forEach((text, i) => { if (footerLinks[i]) footerLinks[i].textContent = text; });
    const copyright = $('.copyright');
    const privacyLink = document.getElementById('privacy-link');
    const termsLink = document.getElementById('terms-link');
    if (copyright) copyright.textContent = t['copyright'];
    if (privacyLink) privacyLink.textContent = t['privacy'];
    if (termsLink) termsLink.textContent = t['terms'];

    // Update html lang attribute
    document.documentElement.lang = lang;
  }

  if (translateBtn) {
    translateBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'es' : 'en';
      applyLang(currentLang);
    });
  }

  // Initial translation apply on load to ensure everything matches currentLang
  applyLang(currentLang);


  // --- 8. Residential Services Tab Switcher ---
  const pricingTabs = document.querySelectorAll('.pricing-tab');
  const pricingPanels = document.querySelectorAll('.pricing-panel');

  pricingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      // Update tabs
      pricingTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Update panels
      pricingPanels.forEach(panel => {
        panel.classList.remove('active');
      });
      const activePanel = document.getElementById(`panel-${target}`);
      if (activePanel) activePanel.classList.add('active');
    });
  });

});

