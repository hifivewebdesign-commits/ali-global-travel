/**
 * ALI GLOBAL TRAVEL & TOURS SDN. BHD.
 * Tours, Destinations, Transportation & Gallery Renderer
 */

document.addEventListener('DOMContentLoaded', async () => {
  await Store.init();
  const settings = await Store.getSettings();
  const phone = settings?.primaryWhatsApp || '60165006972';

  // Helper: Create WhatsApp link for tour
  function getTourWhatsAppUrl(tourTitle) {
    const msg = `Hello ALI GLOBAL TRAVEL & TOURS, I am interested in your ${tourTitle}. Please share the package details, prices and availability.`;
    return Store.createWhatsAppUrl(msg, phone);
  }

  // Helper: Create WhatsApp link for vehicle
  function getVehicleWhatsAppUrl(vehicleName, capacity) {
    const msg = `Hello ALI GLOBAL TRAVEL & TOURS, I am interested in booking the ${vehicleName} (${capacity}). Please share quotation and availability.`;
    return Store.createWhatsAppUrl(msg, phone);
  }

  // Helper: Create WhatsApp link for destination
  function getDestWhatsAppUrl(destName) {
    const msg = `Hello ALI GLOBAL TRAVEL & TOURS, I would like to enquire about tours and transport to ${destName}. Please share details and pricing.`;
    return Store.createWhatsAppUrl(msg, phone);
  }

  // 1. Render Destinations Grid on Homepage (if empty or dynamic sync)
  const homeDestContainer = document.getElementById('home-destinations-grid');
  if (homeDestContainer && homeDestContainer.children.length === 0) {
    const destinations = await Store.getDestinations();
    homeDestContainer.innerHTML = destinations.map(dest => `
      <div class="destination-card">
        <div class="dest-image-wrap">
          <img src="${dest.image}" alt="${dest.name}" loading="lazy" onerror="this.src='assets/tourist attraction photos/KL city tour/KL city tour (1).jpeg'">
          <span class="dest-badge">Malaysia</span>
        </div>
        <div class="dest-content">
          <h3>${dest.name}</h3>
          <div class="dest-tagline">${dest.tagline || 'Inbound Tour Destination'}</div>
          <p class="dest-desc">${dest.description}</p>
          <div class="dest-actions">
            <a href="tours.html" class="btn btn-outline-primary btn-sm">
              <i class="fa-solid fa-compass"></i> Explore Tours
            </a>
            <a href="${getDestWhatsAppUrl(dest.name)}" target="_blank" class="btn btn-whatsapp btn-sm">
              <i class="fa-brands fa-whatsapp"></i> WhatsApp
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 2. Render 4 Vehicle preview cards on Homepage (if empty)
  const homeVehicleContainer = document.getElementById('home-vehicles-grid');
  if (homeVehicleContainer && homeVehicleContainer.children.length === 0) {
    const vehicles = await Store.getVehicles();
    homeVehicleContainer.innerHTML = vehicles.slice(0, 4).map(v => `
      <div class="vehicle-card">
        <div class="vehicle-img-wrap">
          <img src="${v.image}" alt="${v.name}" loading="lazy" onerror="this.src='assets/images/vehicles/vehicle-1.jpg'">
          <div class="vehicle-capacity-badge">
            <i class="fa-solid fa-users"></i> ${v.capacity}
          </div>
        </div>
        <div class="vehicle-body">
          <h3>${v.name}</h3>
          <p>${v.description}</p>
          <div class="vehicle-features-list">
            ${(v.features || []).map(f => `<span><i class="fa-solid fa-check text-success"></i> ${f}</span>`).join('')}
          </div>
          <a href="${getVehicleWhatsAppUrl(v.name, v.capacity)}" target="_blank" class="btn btn-whatsapp" style="margin-top:auto;">
            <i class="fa-brands fa-whatsapp"></i> Enquire for Booking
          </a>
        </div>
      </div>
    `).join('');
  }

  // Helper: Bind thumbnails and lightbox triggers on tour cards
  function bindTourThumbs(container = document) {
    container.querySelectorAll('.tour-card-detailed').forEach(card => {
      const mainImg = card.querySelector('.tour-main-img-wrap img');
      const mainWrap = card.querySelector('.tour-main-img-wrap');
      const captionEl = card.querySelector('.tour-thumb-caption');
      const thumbBtns = card.querySelectorAll('.tour-thumb-btn');

      thumbBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetSrc = btn.getAttribute('data-target-src');
          const caption = btn.getAttribute('data-caption');

          if (mainImg && targetSrc) {
            mainImg.src = targetSrc;
          }
          if (mainWrap && targetSrc) {
            mainWrap.setAttribute('data-lightbox-src', targetSrc);
            mainWrap.setAttribute('data-lightbox-caption', caption || '');
          }
          if (captionEl && caption) {
            captionEl.innerHTML = `<i class="fa-solid fa-camera"></i> ${caption}`;
          }
          thumbBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
    });
    if (window.initLightboxTriggers) {
      window.initLightboxTriggers();
    }
  }

  // 3. Filter on tours.html
  const toursContainer = document.getElementById('tours-list-container');
  if (toursContainer) {
    bindTourThumbs(toursContainer);
    const allTours = await Store.getTours();
    const filterButtons = document.querySelectorAll('.tours-filter-btn');

    function renderTours(category = 'all') {
      const filtered = category === 'all' 
        ? allTours.filter(t => t.enabled !== false) 
        : allTours.filter(t => t.enabled !== false && t.category === category);

      if (filtered.length === 0) {
        toursContainer.innerHTML = `<div style="text-align:center; padding: 3rem; color: var(--muted-text);">No tour packages found in this category.</div>`;
        return;
      }

      toursContainer.innerHTML = filtered.map(t => {
        const waUrl = getTourWhatsAppUrl(t.title);

        const galleryItems = (t.gallery && t.gallery.length > 0 
          ? t.gallery 
          : [{ src: t.image, caption: t.title }]).slice(0, 4);

        const photosGridHtml = `
          <div class="pkg-photos-4-grid">
            ${galleryItems.map(g => `
              <div class="pkg-photo-thumb" data-lightbox data-lightbox-src="${g.src}" data-lightbox-caption="${g.caption}">
                <img src="${g.src}" alt="${g.caption}" loading="lazy" onerror="this.src='assets/tourist attraction photos/KL city tour/KL city tour (1).jpeg'">
                <span class="photo-caption-tag">${g.caption}</span>
              </div>
            `).join('')}
          </div>
        `;

        const placesList = [
          ...(t.landmarks || []),
          ...(t.culture || [])
        ];

        const optionalList = [
          ...(t.optionalShopping || []),
          ...(t.optionalThemeParks || [])
        ];

        return `
          <article class="pkg-detailed-card" id="${t.id}" data-category="${t.category}">
            <div class="pkg-header-row">
              <div class="pkg-title-area">
                <span class="dest-label"><i class="fa-solid fa-location-dot"></i> ${t.number} · Malaysia Tour Package</span>
                <h3>${t.title}</h3>
              </div>
              <div class="pkg-duration-pill">
                <i class="fa-regular fa-clock"></i> Private & Group Tour
              </div>
            </div>

            ${photosGridHtml}

            <p style="color:var(--muted-text); margin-bottom:1.5rem; font-size:0.98rem;">${t.intro}</p>

            <div class="pkg-info-columns">
              <div class="pkg-box-detail">
                <h5><i class="fa-solid fa-camera-retro"></i> Landmarks & Places Guests Will Visit:</h5>
                <ul>
                  ${placesList.map(item => `<li><i class="fa-solid fa-circle-check"></i> ${item}</li>`).join('')}
                </ul>
              </div>

              <div class="pkg-box-detail">
                <h5><i class="fa-solid fa-star"></i> Optional Shopping & Experiences:</h5>
                <ul>
                  ${optionalList.length > 0 
                    ? optionalList.map(item => `<li><i class="fa-solid fa-circle-check"></i> ${item}</li>`).join('')
                    : `<li><i class="fa-solid fa-circle-check"></i> Customisable itinerary based on your group's preferences</li>
                       <li><i class="fa-solid fa-circle-check"></i> Hotel pickup & drop-off with licensed driver</li>`
                  }
                </ul>
              </div>
            </div>

            <div class="pkg-footer-actions">
              <div class="pkg-price-note"><i class="fa-solid fa-tag"></i> ${t.priceNote || 'Contact us for our best available pricing and availability'}</div>
              <a href="${waUrl}" target="_blank" class="btn btn-whatsapp">
                <i class="fa-brands fa-whatsapp"></i> Enquire About ${t.title.replace('Tour', '').trim()} Tour
              </a>
            </div>
          </article>
        `;
      }).join('');

      if (window.initLightboxTriggers) {
        window.initLightboxTriggers();
      }
    }

    // Render all 12 tours immediately in the Homepage Packages layout
    renderTours('all');

    // Attach click events to filter buttons
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTours(btn.getAttribute('data-category'));
      });
    });
  }

  // 4. Render Transport Cards on transport-gallery.html (if empty)
  const transportCardsContainer = document.getElementById('transport-cards-container');
  if (transportCardsContainer && transportCardsContainer.children.length === 0) {
    const vehicles = await Store.getVehicles();
    transportCardsContainer.innerHTML = vehicles.map(v => `
      <div class="vehicle-card">
        <div class="vehicle-img-wrap">
          <img src="${v.image}" alt="${v.name}" loading="lazy" onerror="this.src='assets/images/vehicles/vehicle-1.jpg'">
          <div class="vehicle-capacity-badge">
            <i class="fa-solid fa-users"></i> ${v.capacity}
          </div>
        </div>
        <div class="vehicle-body">
          <h3>${v.name}</h3>
          <p>${v.description}</p>
          <div class="vehicle-features-list">
            ${(v.features || []).map(f => `<span><i class="fa-solid fa-check text-success"></i> ${f}</span>`).join('')}
          </div>
          <a href="${getVehicleWhatsAppUrl(v.name, v.capacity)}" target="_blank" class="btn btn-whatsapp" style="margin-top:auto;">
            <i class="fa-brands fa-whatsapp"></i> Book This Vehicle
          </a>
        </div>
      </div>
    `).join('');
  }

  // 5. Render Gallery on transport-gallery.html
  const fullGalleryContainer = document.getElementById('full-gallery-grid');
  if (fullGalleryContainer) {
    const galleryItems = await Store.getGallery();
    const filterTabs = document.querySelectorAll('.gallery-filter-tabs .filter-tab');

    function renderGallery(cat = 'all') {
      const items = cat === 'all' ? galleryItems : galleryItems.filter(g => g.category === cat);
      fullGalleryContainer.innerHTML = items.map(item => `
        <div class="gallery-item" data-lightbox data-lightbox-src="${item.image}" data-lightbox-caption="${item.title}">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <div class="gallery-overlay">
            <h4>${item.title}</h4>
            <span>${item.categoryName || 'Ali Global Moments'}</span>
          </div>
        </div>
      `).join('');

      if (window.initLightboxTriggers) window.initLightboxTriggers();
    }

    renderGallery();

    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderGallery(tab.getAttribute('data-filter'));
      });
    });
  }
});
