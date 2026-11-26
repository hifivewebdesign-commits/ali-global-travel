/**
 * ALI GLOBAL TRAVEL & TOURS SDN. BHD.
 * Main Frontend Interactivity & UI Controllers
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize store and fetch settings
  await Store.init();
  const settings = await Store.getSettings();

  // 1. Header scroll effect
  const headerNav = document.querySelector('.header-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      headerNav?.classList.add('scrolled');
    } else {
      headerNav?.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Drawer
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const closeDrawerBtn = document.querySelector('.close-drawer-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    mobileOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    mobileOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburgerBtn?.addEventListener('click', openDrawer);
  closeDrawerBtn?.addEventListener('click', closeDrawer);
  mobileOverlay?.addEventListener('click', closeDrawer);

  // 3. Highlight current page in navigation
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 4. Update dynamic company elements if present
  if (settings) {
    document.querySelectorAll('.company-name').forEach(el => el.textContent = settings.companyName);
    document.querySelectorAll('.company-ssm').forEach(el => el.textContent = settings.ssm);
    document.querySelectorAll('.company-motac').forEach(el => el.textContent = settings.motac);
    document.querySelectorAll('.company-phone').forEach(el => {
      el.textContent = settings.primaryPhone;
      el.setAttribute('href', `tel:${settings.primaryPhone.replace(/\s+/g, '')}`);
    });
    document.querySelectorAll('.company-phone-sec').forEach(el => {
      el.textContent = settings.secondaryPhone;
      el.setAttribute('href', `tel:${settings.secondaryPhone.replace(/\s+/g, '')}`);
    });
    document.querySelectorAll('.company-email').forEach(el => {
      el.textContent = settings.email;
      el.setAttribute('href', `mailto:${settings.email}`);
    });
    document.querySelectorAll('.company-address').forEach(el => el.textContent = settings.address);
    document.querySelectorAll('.company-wa-link').forEach(el => {
      el.setAttribute('href', `https://wa.me/${settings.primaryWhatsApp || '60165006972'}`);
    });
    document.querySelectorAll('.company-ig-link').forEach(el => {
      if (settings.instagram) el.setAttribute('href', settings.instagram);
    });
  }

  // 5. Lightbox Modal
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Attach lightbox trigger to elements
  window.initLightboxTriggers = function () {
    document.querySelectorAll('[data-lightbox]').forEach(item => {
      item.addEventListener('click', () => {
        const src = item.getAttribute('data-lightbox-src') || item.querySelector('img')?.src;
        const caption = item.getAttribute('data-lightbox-caption') || item.querySelector('h4')?.textContent;
        if (src) openLightbox(src, caption);
      });
    });
  };
  window.initLightboxTriggers();

  // 6. Universal Contact Enquiry Form Handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const alertSuccess = document.getElementById('form-success-alert');
      const alertError = document.getElementById('form-error-alert');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting Enquiry...';
      }
      if (alertSuccess) alertSuccess.style.display = 'none';
      if (alertError) alertError.style.display = 'none';

      const formData = {
        name: document.getElementById('form-name')?.value.trim() || '',
        email: document.getElementById('form-email')?.value.trim() || '',
        phone: document.getElementById('form-phone')?.value.trim() || '',
        travelDate: document.getElementById('form-date')?.value || '',
        guests: document.getElementById('form-guests')?.value || 1,
        destination: document.getElementById('form-destination')?.value.trim() || '',
        pickup: document.getElementById('form-pickup')?.value.trim() || '',
        travelType: document.getElementById('form-type')?.value || 'Private',
        requirements: document.getElementById('form-notes')?.value.trim() || ''
      };

      try {
        const result = await Store.addEnquiry(formData);
        if (result) {
          if (alertSuccess) {
            alertSuccess.style.display = 'block';
            const emailSubject = encodeURIComponent(`New Travel Enquiry from ${formData.name}`);
            const emailBody = encodeURIComponent(
              `Dear Ali Global Travel Team,\n\nI have submitted a travel request:\n- Name: ${formData.name}\n- Email: ${formData.email}\n- Phone: ${formData.phone}\n- Travel Date: ${formData.travelDate}\n- Guests: ${formData.guests}\n- Destination: ${formData.destination}\n- Pickup: ${formData.pickup}\n- Travel Type: ${formData.travelType}\n- Notes: ${formData.requirements}\n\nPlease reply with quotation.`
            );
            alertSuccess.innerHTML = `
              <strong><i class="fa-solid fa-circle-check text-success"></i> Thank you, ${formData.name}!</strong> Your travel enquiry has been received and routed to <strong>info@ali-global-travel.com</strong>.
              <div style="margin-top:0.85rem; display:flex; gap:0.6rem; flex-wrap:wrap;">
                <a href="${buildEnquiryWhatsAppUrl(formData, settings)}" target="_blank" class="btn btn-whatsapp btn-sm">
                  <i class="fa-brands fa-whatsapp"></i> Send Direct via WhatsApp
                </a>
                <a href="mailto:info@ali-global-travel.com?subject=${emailSubject}&body=${emailBody}" class="btn btn-outline-primary btn-sm">
                  <i class="fa-solid fa-envelope"></i> Open in Email Client
                </a>
              </div>
            `;
          }
          contactForm.reset();
        } else {
          throw new Error('Submission failed');
        }
      } catch (err) {
        if (alertError) {
          alertError.style.display = 'block';
          alertError.textContent = 'Unable to send enquiry at this moment. Please contact Mr Ali directly via WhatsApp.';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Travel Enquiry';
        }
      }
    });

    // Option to send directly via WhatsApp
    const sendWaBtn = document.getElementById('btn-send-whatsapp');
    sendWaBtn?.addEventListener('click', () => {
      const formData = {
        name: document.getElementById('form-name')?.value.trim() || '',
        email: document.getElementById('form-email')?.value.trim() || '',
        phone: document.getElementById('form-phone')?.value.trim() || '',
        travelDate: document.getElementById('form-date')?.value || '',
        guests: document.getElementById('form-guests')?.value || 1,
        destination: document.getElementById('form-destination')?.value.trim() || '',
        pickup: document.getElementById('form-pickup')?.value.trim() || '',
        travelType: document.getElementById('form-type')?.value || 'Private',
        requirements: document.getElementById('form-notes')?.value.trim() || ''
      };
      const waUrl = buildEnquiryWhatsAppUrl(formData, settings);
      window.open(waUrl, '_blank');
    });
  }

  function buildEnquiryWhatsAppUrl(data, settings) {
    const phone = settings?.primaryWhatsApp || '60165006972';
    const text = 
`*NEW TRAVEL ENQUIRY - ALI GLOBAL TRAVEL*
• Name: ${data.name || 'Guest'}
• Phone: ${data.phone || 'N/A'}
• Email: ${data.email || 'N/A'}
• Travel Date: ${data.travelDate || 'Flexible'}
• Guests: ${data.guests}
• Preferred Destination: ${data.destination || 'Custom Tour'}
• Pickup Location: ${data.pickup || 'To be advised'}
• Travel Type: ${data.travelType}
• Requirements: ${data.requirements || 'Please advise packages and quotation'}`;

    return Store.createWhatsAppUrl(text, phone);
  }
});

