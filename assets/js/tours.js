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
          <img src="${dest.image}" alt="${dest.name}" loading="lazy" onerror="this.src='assets/images/destinations/kuala-lumpur.jpg'">
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

        const galleryItems = t.gallery && t.gallery.length > 0 
          ? t.gallery 
          : [{ src: t.image, caption: t.title }];

        const thumbsHtml = galleryItems.length > 1 ? `
          <div class="tour-thumbs-row">
            ${galleryItems.map((g, idx) => `
              <button type="button" class="tour-thumb-btn ${idx === 0 ? 'active' : ''}" data-target-src="${g.src}" data-caption="${g.caption}" title="${g.caption}">
                <img src="${g.src}" alt="${g.caption}" loading="lazy">
              </button>
            `).join('')}
            <span class="tour-thumb-caption"><i class="fa-solid fa-camera"></i> ${galleryItems[0].caption}</span>
          </div>
        ` : '';

        const landmarksHtml = t.landmarks && t.landmarks.length > 0 ? `
          <div class="tour-spec-block">
            <h5><i class="fa-solid fa-camera-retro" style="color:var(--secondary-blue);"></i> Landmarks & Photo Stops</h5>
            <ul>
              ${t.landmarks.map(l => `<li>${l}</li>`).join('')}
            </ul>
          </div>
        ` : '';

        const cultureHtml = t.culture && t.culture.length > 0 ? `
          <div class="tour-spec-block">
            <h5><i class="fa-solid fa-landmark" style="color:var(--secondary-blue);"></i> Culture & Sightseeing</h5>
            <ul>
              ${t.culture.map(c => `<li>${c}</li>`).join('')}
            </ul>
          </div>
        ` : '';

        const shoppingHtml = t.optionalShopping && t.optionalShopping.length > 0 ? `
          <div class="tour-spec-block optional">
            <h5><i class="fa-solid fa-bag-shopping" style="color:var(--travel-green);"></i> Optional Shopping</h5>
            <ul>
              ${t.optionalShopping.map(s => `<li>${s}</li>`).join('')}
            </ul>
          </div>
        ` : '';

        const themeParksHtml = t.optionalThemeParks && t.optionalThemeParks.length > 0 ? `
          <div class="tour-spec-block optional">
            <h5><i class="fa-solid fa-ticket" style="color:var(--travel-green);"></i> Optional Experiences & Theme Parks</h5>
            <ul>
              ${t.optionalThemeParks.map(tp => `<li>${tp}</li>`).join('')}
            </ul>
          </div>
        ` : '';

        return `
          <article class="tour-card-detailed" id="${t.id}">
            <div class="tour-card-media">
              <span class="tour-badge-top">${t.number}</span>
              <div class="tour-main-img-wrap" data-lightbox data-lightbox-src="${galleryItems[0].src}" data-lightbox-caption="${galleryItems[0].caption}">
                <img src="${galleryItems[0].src}" alt="${t.title}" loading="lazy" onerror="this.src='assets/images/packages/kl-1.jpg'">
              </div>
              ${thumbsHtml}
            </div>
            <div class="tour-card-content">
              <div>
                <div class="tour-header">
                  <h3>${t.title}</h3>
                  <p class="tour-intro">${t.intro}</p>
                </div>
                <div class="tour-sections">
                  ${landmarksHtml}
                  ${cultureHtml}
                  ${shoppingHtml}
                  ${themeParksHtml}
                </div>
              </div>
              <div class="tour-footer">
                <div class="tour-price-note">
                  <i class="fa-solid fa-circle-info"></i> ${t.priceNote || 'Contact us for pricing and availability'}
                </div>
                <a href="${waUrl}" target="_blank" class="btn btn-whatsapp">
                  <i class="fa-brands fa-whatsapp"></i> Enquire About ${t.title.replace('Tour', '').trim()} Tour
                </a>
              </div>
            </div>
          </article>
        `;
      }).join('');

      bindTourThumbs(toursContainer);
    }

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
