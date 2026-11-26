/**
 * ALI GLOBAL TRAVEL & TOURS SDN. BHD.
 * Admin Dashboard Controller - Full CRUD & Content Management
 */

document.addEventListener('DOMContentLoaded', async () => {
  await Store.init();

  const loginOverlay = document.getElementById('admin-login-overlay');
  const loginForm = document.getElementById('admin-login-form');
  const loginError = document.getElementById('login-error');
  const logoutBtn = document.getElementById('admin-logout-btn');

  // Check login session
  function isLoggedIn() {
    return sessionStorage.getItem('ali_admin_auth') === 'true';
  }

  function showDashboard() {
    if (loginOverlay) loginOverlay.style.display = 'none';
    loadAllAdminData();
  }

  function showLogin() {
    if (loginOverlay) loginOverlay.style.display = 'flex';
  }

  if (isLoggedIn()) {
    showDashboard();
  } else {
    showLogin();
  }

  // Handle Login Submission
  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('admin-password')?.value;

    if (password === 'aliglobal2026') {
      sessionStorage.setItem('ali_admin_auth', 'true');
      if (loginError) loginError.style.display = 'none';
      showDashboard();
    } else {
      if (loginError) {
        loginError.style.display = 'block';
        loginError.textContent = 'Invalid administrator password. Please try again.';
      }
    }
  });

  logoutBtn?.addEventListener('click', () => {
    sessionStorage.removeItem('ali_admin_auth');
    location.reload();
  });

  // Tab Navigation
  const navItems = document.querySelectorAll('.admin-nav-item');
  const tabPanes = document.querySelectorAll('.admin-tab-pane');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');
      if (!targetTab) return;

      navItems.forEach(n => n.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      item.classList.add('active');
      document.getElementById(`tab-${targetTab}`)?.classList.add('active');
    });
  });

  // Toast notification
  function showToast(message, type = 'success') {
    let toast = document.querySelector('.admin-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'admin-toast';
      document.body.appendChild(toast);
    }
    toast.className = `admin-toast ${type}`;
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3500);
  }

  // Modal helpers
  const modalOverlay = document.getElementById('admin-modal-overlay');
  const modalTitle = document.getElementById('admin-modal-title');
  const modalBody = document.getElementById('admin-modal-body');
  const modalClose = document.getElementById('admin-modal-close');

  function openModal(title, htmlContent) {
    if (!modalOverlay || !modalTitle || !modalBody) return;
    modalTitle.textContent = title;
    modalBody.innerHTML = htmlContent;
    modalOverlay.classList.add('active');
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    if (modalBody) modalBody.innerHTML = '';
  }

  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Load All Admin Data
  async function loadAllAdminData() {
    await renderStats();
    await renderToursTable();
    await renderDestinationsTable();
    await renderVehiclesTable();
    await renderGalleryTable();
    await renderEnquiriesTable();
    await loadSettingsForm();
  }

  // 1. STATS
  async function renderStats() {
    const tours = await Store.getTours();
    const destinations = await Store.getDestinations();
    const vehicles = await Store.getVehicles();
    const gallery = await Store.getGallery();
    const enquiries = await Store.getEnquiries();

    const newEnquiries = enquiries.filter(e => e.status === 'New').length;

    document.getElementById('stat-tours-count').textContent = tours.length;
    document.getElementById('stat-dest-count').textContent = destinations.length;
    document.getElementById('stat-veh-count').textContent = vehicles.length;
    document.getElementById('stat-gal-count').textContent = gallery.length;
    document.getElementById('stat-enq-count').textContent = enquiries.length;
    
    const enqBadge = document.getElementById('nav-enq-badge');
    if (enqBadge) {
      enqBadge.textContent = newEnquiries;
      enqBadge.style.display = newEnquiries > 0 ? 'inline-block' : 'none';
    }
  }

  // 2. TOURS CRUD
  async function renderToursTable() {
    const tours = await Store.getTours();
    const tbody = document.getElementById('tours-table-body');
    if (!tbody) return;

    tbody.innerHTML = tours.map(t => `
      <tr>
        <td><strong>${t.number}</strong></td>
        <td><img src="${t.image}" class="table-thumb" alt="${t.title}" onerror="this.src='assets/tourist attraction photos/KL city tour/KL city tour (1).jpeg'"></td>
        <td>
          <strong>${t.title}</strong><br>
          <span style="font-size:0.8rem; color:var(--admin-muted);">${(t.landmarks || []).slice(0, 3).join(', ')}...</span>
        </td>
        <td><span style="text-transform:capitalize; font-size:0.82rem; background:#edf2f7; padding:2px 8px; border-radius:4px;">${t.category}</span></td>
        <td>
          <input type="text" class="form-control price-input" data-tour-id="${t.id}" value="${t.priceNote || 'Contact us for pricing'}" style="font-size:0.82rem; padding:4px 8px; max-width:210px;">
        </td>
        <td>
          <label style="cursor:pointer; display:inline-flex; align-items:center; gap:0.4rem; font-size:0.85rem;">
            <input type="checkbox" class="toggle-tour-enabled" data-tour-id="${t.id}" ${t.enabled !== false ? 'checked' : ''}>
            <span>${t.enabled !== false ? 'Active' : 'Hidden'}</span>
          </label>
        </td>
        <td>
          <div style="display:flex; gap:0.5rem;">
            <button class="btn btn-outline-primary btn-sm btn-edit-tour" data-id="${t.id}"><i class="fa-solid fa-pen"></i></button>
            <button class="btn btn-sm btn-delete-tour" data-id="${t.id}" style="background:#fee2e2; color:#b91c1c;"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');

    // Attach Price quick-save
    document.querySelectorAll('.price-input').forEach(input => {
      input.addEventListener('change', async () => {
        const id = input.getAttribute('data-tour-id');
        const tour = await Store.getTourById(id);
        if (tour) {
          tour.priceNote = input.value.trim();
          await Store.saveTour(tour);
          showToast(`Price updated for ${tour.title}`);
        }
      });
    });

    // Attach Toggle Enabled
    document.querySelectorAll('.toggle-tour-enabled').forEach(chk => {
      chk.addEventListener('change', async () => {
        const id = chk.getAttribute('data-tour-id');
        const tour = await Store.getTourById(id);
        if (tour) {
          tour.enabled = chk.checked;
          await Store.saveTour(tour);
          showToast(`Visibility updated for ${tour.title}`);
          renderToursTable();
        }
      });
    });

    // Attach Edit button
    document.querySelectorAll('.btn-edit-tour').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const tour = await Store.getTourById(id);
        if (tour) openTourModal(tour);
      });
    });

    // Attach Delete button
    document.querySelectorAll('.btn-delete-tour').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this tour package?')) {
          await Store.deleteTour(id);
          showToast('Tour package removed');
          renderToursTable();
          renderStats();
        }
      });
    });
  }

  // Open Tour Modal (Add / Edit)
  function openTourModal(tour = null) {
    const isEdit = !!tour;
    const t = tour || {
      id: '',
      number: `TOUR 12`,
      title: '',
      category: 'city',
      image: 'assets/tourist attraction photos/KL city tour/KL city tour (1).jpeg',
      intro: '',
      landmarks: [],
      culture: [],
      optionalShopping: [],
      optionalThemeParks: [],
      priceNote: 'Contact us for pricing and availability',
      enabled: true
    };

    const modalHtml = `
      <form id="tour-form">
        <div class="form-row">
          <div class="form-group">
            <label>Tour Number</label>
            <input type="text" id="m-tour-num" class="form-control" value="${t.number}" required>
          </div>
          <div class="form-group">
            <label>Category</label>
            <select id="m-tour-cat" class="form-control">
              <option value="city" ${t.category === 'city' ? 'selected' : ''}>City & Shopping</option>
              <option value="nature" ${t.category === 'nature' ? 'selected' : ''}>Highlands & Nature</option>
              <option value="heritage" ${t.category === 'heritage' ? 'selected' : ''}>Culture & Heritage</option>
              <option value="beach" ${t.category === 'beach' ? 'selected' : ''}>Island & Beach</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Tour Title</label>
          <input type="text" id="m-tour-title" class="form-control" value="${t.title}" placeholder="e.g. Kuala Lumpur Heritage Tour" required>
        </div>

        <div class="form-group">
          <label>Destination Photograph URL / Upload</label>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <input type="text" id="m-tour-img" class="form-control" value="${t.image}">
            <label class="btn btn-outline-primary btn-sm" style="margin:0; cursor:pointer;">
              <i class="fa-solid fa-upload"></i> Upload
              <input type="file" id="m-tour-file" accept="image/*" style="display:none;">
            </label>
          </div>
          <div id="m-tour-preview" style="margin-top:0.5rem;">
            <img src="${t.image}" style="height:70px; border-radius:6px; object-fit:cover;" onerror="this.style.display='none'">
          </div>
        </div>

        <div class="form-group">
          <label>Tour Introduction Description</label>
          <textarea id="m-tour-intro" class="form-control" rows="2" required>${t.intro}</textarea>
        </div>

        <div class="form-group">
          <label>Landmarks & Photo Stops (One item per line)</label>
          <textarea id="m-tour-landmarks" class="form-control" rows="3">${(t.landmarks || []).join('\n')}</textarea>
        </div>

        <div class="form-group">
          <label>Culture & Sightseeing Stops (One item per line)</label>
          <textarea id="m-tour-culture" class="form-control" rows="3">${(t.culture || []).join('\n')}</textarea>
        </div>

        <div class="form-group">
          <label>Optional Shopping Excursions (One item per line)</label>
          <textarea id="m-tour-shopping" class="form-control" rows="2">${(t.optionalShopping || []).join('\n')}</textarea>
        </div>

        <div class="form-group">
          <label>Optional Theme Parks & Activities (One item per line)</label>
          <textarea id="m-tour-themeparks" class="form-control" rows="2">${(t.optionalThemeParks || []).join('\n')}</textarea>
        </div>

        <div class="form-group">
          <label>Price & Availability Note</label>
          <input type="text" id="m-tour-price" class="form-control" value="${t.priceNote}">
        </div>

        <div style="display:flex; justify-content:flex-end; gap:1rem; margin-top:1.5rem;">
          <button type="button" class="btn btn-outline-primary" onclick="document.getElementById('admin-modal-overlay').classList.remove('active')">Cancel</button>
          <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Save Tour Package</button>
        </div>
      </form>
    `;

    openModal(isEdit ? `Edit ${t.title}` : 'Add New Tour Package', modalHtml);

    // Image file upload
    const fileInput = document.getElementById('m-tour-file');
    fileInput?.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        showToast('Uploading image...');
        const url = await Store.uploadImage(file);
        document.getElementById('m-tour-img').value = url;
        const prev = document.getElementById('m-tour-preview');
        prev.innerHTML = `<img src="${url}" style="height:70px; border-radius:6px; object-fit:cover;">`;
      }
    });

    // Form submit
    document.getElementById('tour-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const updatedTour = {
        id: t.id || ('tour-' + Date.now()),
        number: document.getElementById('m-tour-num').value.trim(),
        title: document.getElementById('m-tour-title').value.trim(),
        category: document.getElementById('m-tour-cat').value,
        image: document.getElementById('m-tour-img').value.trim(),
        intro: document.getElementById('m-tour-intro').value.trim(),
        landmarks: document.getElementById('m-tour-landmarks').value.split('\n').map(s => s.trim()).filter(Boolean),
        culture: document.getElementById('m-tour-culture').value.split('\n').map(s => s.trim()).filter(Boolean),
        optionalShopping: document.getElementById('m-tour-shopping').value.split('\n').map(s => s.trim()).filter(Boolean),
        optionalThemeParks: document.getElementById('m-tour-themeparks').value.split('\n').map(s => s.trim()).filter(Boolean),
        priceNote: document.getElementById('m-tour-price').value.trim(),
        enabled: t.enabled ?? true
      };

      await Store.saveTour(updatedTour);
      closeModal();
      showToast('Tour package saved successfully!');
      renderToursTable();
      renderStats();
    });
  }

  document.getElementById('btn-add-tour')?.addEventListener('click', () => openTourModal());

  // 3. DESTINATIONS CRUD
  async function renderDestinationsTable() {
    const destinations = await Store.getDestinations();
    const tbody = document.getElementById('destinations-table-body');
    if (!tbody) return;

    tbody.innerHTML = destinations.map(d => `
      <tr>
        <td><img src="${d.image}" class="table-thumb" alt="${d.name}" onerror="this.src='assets/tourist attraction photos/KL city tour/KL city tour (1).jpeg'"></td>
        <td><strong>${d.name}</strong></td>
        <td><span style="font-size:0.85rem; color:var(--admin-blue); font-weight:600;">${d.tagline || ''}</span></td>
        <td><p style="font-size:0.84rem; color:var(--admin-muted); margin:0;">${(d.description || '').slice(0, 75)}...</p></td>
        <td>
          <div style="display:flex; gap:0.5rem;">
            <button class="btn btn-outline-primary btn-sm btn-edit-dest" data-id="${d.id}"><i class="fa-solid fa-pen"></i></button>
            <button class="btn btn-sm btn-delete-dest" data-id="${d.id}" style="background:#fee2e2; color:#b91c1c;"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');

    document.querySelectorAll('.btn-edit-dest').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const dests = await Store.getDestinations();
        const dest = dests.find(d => d.id === id);
        if (dest) openDestModal(dest);
      });
    });

    document.querySelectorAll('.btn-delete-dest').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Delete this destination?')) {
          await Store.deleteDestination(id);
          showToast('Destination deleted');
          renderDestinationsTable();
          renderStats();
        }
      });
    });
  }

  function openDestModal(dest = null) {
    const isEdit = !!dest;
    const d = dest || {
      id: '',
      name: '',
      tagline: '',
      description: '',
      image: 'assets/tourist attraction photos/KL city tour/KL city tour (1).jpeg'
    };

    const modalHtml = `
      <form id="dest-form">
        <div class="form-group">
          <label>Destination Name</label>
          <input type="text" id="m-dest-name" class="form-control" value="${d.name}" placeholder="e.g. Melaka" required>
        </div>

        <div class="form-group">
          <label>Tagline / Highlights</label>
          <input type="text" id="m-dest-tag" class="form-control" value="${d.tagline}" placeholder="e.g. UNESCO World Heritage & Colonial Streets">
        </div>

        <div class="form-group">
          <label>Photograph URL / Upload</label>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <input type="text" id="m-dest-img" class="form-control" value="${d.image}" required>
            <label class="btn btn-outline-primary btn-sm" style="margin:0; cursor:pointer;">
              <i class="fa-solid fa-upload"></i> Upload
              <input type="file" id="m-dest-file" accept="image/*" style="display:none;">
            </label>
          </div>
          <div id="m-dest-prev" style="margin-top:0.5rem;">
            <img src="${d.image}" style="height:70px; border-radius:6px; object-fit:cover;">
          </div>
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea id="m-dest-desc" class="form-control" rows="3" required>${d.description}</textarea>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:1rem; margin-top:1.5rem;">
          <button type="button" class="btn btn-outline-primary" onclick="document.getElementById('admin-modal-overlay').classList.remove('active')">Cancel</button>
          <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Save Destination</button>
        </div>
      </form>
    `;

    openModal(isEdit ? `Edit ${d.name}` : 'Add Destination', modalHtml);

    document.getElementById('m-dest-file')?.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        showToast('Uploading...');
        const url = await Store.uploadImage(file);
        document.getElementById('m-dest-img').value = url;
        document.getElementById('m-dest-prev').innerHTML = `<img src="${url}" style="height:70px; border-radius:6px; object-fit:cover;">`;
      }
    });

    document.getElementById('dest-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newD = {
        id: d.id || ('dest-' + Date.now()),
        name: document.getElementById('m-dest-name').value.trim(),
        tagline: document.getElementById('m-dest-tag').value.trim(),
        image: document.getElementById('m-dest-img').value.trim(),
        description: document.getElementById('m-dest-desc').value.trim()
      };
      await Store.saveDestination(newD);
      closeModal();
      showToast('Destination saved!');
      renderDestinationsTable();
      renderStats();
    });
  }

  document.getElementById('btn-add-dest')?.addEventListener('click', () => openDestModal());

  // 4. VEHICLES CRUD
  async function renderVehiclesTable() {
    const vehicles = await Store.getVehicles();
    const tbody = document.getElementById('vehicles-table-body');
    if (!tbody) return;

    tbody.innerHTML = vehicles.map(v => `
      <tr>
        <td><img src="${v.image}" class="table-thumb" alt="${v.name}" onerror="this.src='assets/images/vehicles/vehicle photo  (1).jpeg'"></td>
        <td><strong>${v.name}</strong></td>
        <td><span class="status-badge" style="background:#eaf6e9; color:#269B35;"><i class="fa-solid fa-users"></i> ${v.capacity}</span></td>
        <td><p style="font-size:0.84rem; color:var(--admin-muted); margin:0;">${v.description.slice(0, 80)}...</p></td>
        <td>
          <div style="display:flex; gap:0.5rem;">
            <button class="btn btn-outline-primary btn-sm btn-edit-veh" data-id="${v.id}"><i class="fa-solid fa-pen"></i></button>
            <button class="btn btn-sm btn-delete-veh" data-id="${v.id}" style="background:#fee2e2; color:#b91c1c;"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');

    document.querySelectorAll('.btn-edit-veh').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const vehs = await Store.getVehicles();
        const veh = vehs.find(v => v.id === id);
        if (veh) openVehicleModal(veh);
      });
    });

    document.querySelectorAll('.btn-delete-veh').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Delete vehicle?')) {
          await Store.deleteVehicle(id);
          showToast('Vehicle removed');
          renderVehiclesTable();
          renderStats();
        }
      });
    });
  }

  function openVehicleModal(veh = null) {
    const isEdit = !!veh;
    const v = veh || {
      id: '',
      name: '',
      capacity: '14 Passengers',
      description: '',
      image: 'assets/images/vehicles/vehicle photo  (1).jpeg',
      features: ['Full Air-Conditioning', 'Generous Luggage Space', 'Licensed Driver']
    };

    const modalHtml = `
      <form id="veh-form">
        <div class="form-row">
          <div class="form-group">
            <label>Vehicle Name</label>
            <input type="text" id="m-veh-name" class="form-control" value="${v.name}" placeholder="e.g. 18-Seater Van" required>
          </div>
          <div class="form-group">
            <label>Seating Capacity</label>
            <input type="text" id="m-veh-cap" class="form-control" value="${v.capacity}" placeholder="e.g. 18 Passengers" required>
          </div>
        </div>

        <div class="form-group">
          <label>Vehicle Photograph URL / Upload</label>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <input type="text" id="m-veh-img" class="form-control" value="${v.image}" required>
            <label class="btn btn-outline-primary btn-sm" style="margin:0; cursor:pointer;">
              <i class="fa-solid fa-upload"></i> Upload
              <input type="file" id="m-veh-file" accept="image/*" style="display:none;">
            </label>
          </div>
          <div id="m-veh-prev" style="margin-top:0.5rem;">
            <img src="${v.image}" style="height:70px; border-radius:6px; object-fit:cover;">
          </div>
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea id="m-veh-desc" class="form-control" rows="3" required>${v.description}</textarea>
        </div>

        <div class="form-group">
          <label>Features & Amenities (Comma-separated)</label>
          <input type="text" id="m-veh-feat" class="form-control" value="${(v.features || []).join(', ')}" placeholder="e.g. Climate Control, USB Charging, Luggage Space">
        </div>

        <div style="display:flex; justify-content:flex-end; gap:1rem; margin-top:1.5rem;">
          <button type="button" class="btn btn-outline-primary" onclick="document.getElementById('admin-modal-overlay').classList.remove('active')">Cancel</button>
          <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Save Vehicle</button>
        </div>
      </form>
    `;

    openModal(isEdit ? `Edit ${v.name}` : 'Add New Vehicle', modalHtml);

    document.getElementById('m-veh-file')?.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        showToast('Uploading...');
        const url = await Store.uploadImage(file);
        document.getElementById('m-veh-img').value = url;
        document.getElementById('m-veh-prev').innerHTML = `<img src="${url}" style="height:70px; border-radius:6px; object-fit:cover;">`;
      }
    });

    document.getElementById('veh-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newV = {
        id: v.id || ('v-' + Date.now()),
        name: document.getElementById('m-veh-name').value.trim(),
        capacity: document.getElementById('m-veh-cap').value.trim(),
        image: document.getElementById('m-veh-img').value.trim(),
        description: document.getElementById('m-veh-desc').value.trim(),
        features: document.getElementById('m-veh-feat').value.split(',').map(s => s.trim()).filter(Boolean)
      };
      await Store.saveVehicle(newV);
      closeModal();
      showToast('Vehicle saved successfully!');
      renderVehiclesTable();
      renderStats();
    });
  }

  document.getElementById('btn-add-vehicle')?.addEventListener('click', () => openVehicleModal());

  // 5. GALLERY CRUD
  async function renderGalleryTable() {
    const gallery = await Store.getGallery();
    const grid = document.getElementById('admin-gallery-grid');
    if (!grid) return;

    grid.innerHTML = gallery.map(item => `
      <div style="background:#fff; border-radius:10px; overflow:hidden; border:1px solid var(--admin-border); box-shadow:0 2px 4px rgba(0,0,0,0.04); position:relative;">
        <img src="${item.image}" style="width:100%; height:160px; object-fit:cover;">
        <div style="padding:0.9rem;">
          <strong style="font-size:0.88rem; color:var(--admin-navy); display:block; margin-bottom:0.25rem;">${item.title}</strong>
          <span style="font-size:0.75rem; color:var(--admin-blue); font-weight:600;">${item.categoryName || item.category}</span>
          <div style="margin-top:0.8rem; display:flex; justify-content:flex-end;">
            <button class="btn btn-sm btn-delete-gallery" data-id="${item.id}" style="background:#fee2e2; color:#b91c1c; font-size:0.78rem;">
              <i class="fa-solid fa-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.btn-delete-gallery').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Delete this photo from gallery?')) {
          await Store.deleteGalleryItem(id);
          showToast('Photo deleted from gallery');
          renderGalleryTable();
          renderStats();
        }
      });
    });
  }

  document.getElementById('btn-add-gallery')?.addEventListener('click', () => {
    const modalHtml = `
      <form id="gallery-form">
        <div class="form-group">
          <label>Photo Caption / Title</label>
          <input type="text" id="m-gal-title" class="form-control" placeholder="e.g. Tour group in Putrajaya" required>
        </div>

        <div class="form-group">
          <label>Category</label>
          <select id="m-gal-cat" class="form-control">
            <option value="destinations">Malaysia Destinations</option>
            <option value="tours">Group Tours</option>
            <option value="customers">Guest Experiences</option>
            <option value="transport">Transportation</option>
            <option value="attractions">Attractions & Sightseeing</option>
          </select>
        </div>

        <div class="form-group">
          <label>Photo URL / Upload</label>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <input type="text" id="m-gal-img" class="form-control" placeholder="assets/images/..." required>
            <label class="btn btn-outline-primary btn-sm" style="margin:0; cursor:pointer;">
              <i class="fa-solid fa-upload"></i> Upload
              <input type="file" id="m-gal-file" accept="image/*" style="display:none;">
            </label>
          </div>
          <div id="m-gal-prev" style="margin-top:0.5rem;"></div>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:1rem; margin-top:1.5rem;">
          <button type="button" class="btn btn-outline-primary" onclick="document.getElementById('admin-modal-overlay').classList.remove('active')">Cancel</button>
          <button type="submit" class="btn btn-primary"><i class="fa-solid fa-plus"></i> Add to Gallery</button>
        </div>
      </form>
    `;

    openModal('Upload Gallery Photo', modalHtml);

    document.getElementById('m-gal-file')?.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        showToast('Uploading photo...');
        const url = await Store.uploadImage(file);
        document.getElementById('m-gal-img').value = url;
        document.getElementById('m-gal-prev').innerHTML = `<img src="${url}" style="height:80px; border-radius:6px; object-fit:cover;">`;
      }
    });

    document.getElementById('gallery-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const sel = document.getElementById('m-gal-cat');
      const item = {
        title: document.getElementById('m-gal-title').value.trim(),
        category: sel.value,
        categoryName: sel.options[sel.selectedIndex].text,
        image: document.getElementById('m-gal-img').value.trim()
      };
      await Store.addGalleryItem(item);
      closeModal();
      showToast('Photo added to gallery!');
      renderGalleryTable();
      renderStats();
    });
  });

  // 6. ENQUIRIES INBOX
  async function renderEnquiriesTable() {
    const enquiries = await Store.getEnquiries();
    const tbody = document.getElementById('enquiries-table-body');
    if (!tbody) return;

    if (enquiries.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--admin-muted);">No enquiries yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = enquiries.map(e => {
      const d = new Date(e.createdAt || Date.now());
      const dateStr = d.toLocaleDateString('en-GB') + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      return `
        <tr>
          <td style="font-size:0.8rem; color:var(--admin-muted);">${dateStr}</td>
          <td>
            <strong>${e.name}</strong><br>
            <span style="font-size:0.82rem; color:var(--admin-muted);">${e.travelType || 'Private'} (${e.guests || 1} guests)</span>
          </td>
          <td>
            <a href="tel:${(e.phone || '').replace(/\s+/g, '')}" style="color:var(--admin-blue); font-weight:600;"><i class="fa-solid fa-phone"></i> ${e.phone}</a><br>
            <span style="font-size:0.82rem; color:var(--admin-muted);">${e.email}</span>
          </td>
          <td>
            <strong>${e.destination || 'Custom Tour'}</strong><br>
            <span style="font-size:0.8rem; color:var(--admin-muted);">Pickup: ${e.pickup || 'N/A'} · Date: ${e.travelDate || 'Flexible'}</span>
          </td>
          <td>
            <select class="form-control select-enquiry-status" data-id="${e.id}" style="font-size:0.8rem; padding:4px 8px; width:110px;">
              <option value="New" ${e.status === 'New' ? 'selected' : ''}>New</option>
              <option value="Contacted" ${e.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
              <option value="Booked" ${e.status === 'Booked' ? 'selected' : ''}>Booked</option>
              <option value="Archived" ${e.status === 'Archived' ? 'selected' : ''}>Archived</option>
            </select>
          </td>
          <td>
            <button class="btn btn-whatsapp btn-sm btn-reply-wa" data-phone="${e.phone}" data-name="${e.name}">
              <i class="fa-brands fa-whatsapp"></i> Chat
            </button>
          </td>
          <td>
            <button class="btn btn-sm btn-delete-enq" data-id="${e.id}" style="background:#fee2e2; color:#b91c1c;">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Status change listener
    document.querySelectorAll('.select-enquiry-status').forEach(sel => {
      sel.addEventListener('change', async () => {
        const id = sel.getAttribute('data-id');
        await Store.updateEnquiry(id, { status: sel.value });
        showToast('Enquiry status updated');
        renderStats();
      });
    });

    // WhatsApp Reply button
    document.querySelectorAll('.btn-reply-wa').forEach(btn => {
      btn.addEventListener('click', () => {
        const phone = btn.getAttribute('data-phone');
        const name = btn.getAttribute('data-name');
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        const msg = encodeURIComponent(`Hello ${name}, thank you for contacting ALI GLOBAL TRAVEL & TOURS regarding your travel plans in Malaysia. I am Mr Ali, how may I assist you today?`);
        window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
      });
    });

    // Delete button
    document.querySelectorAll('.btn-delete-enq').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Delete this enquiry record?')) {
          await Store.deleteEnquiry(id);
          showToast('Enquiry deleted');
          renderEnquiriesTable();
          renderStats();
        }
      });
    });
  }

  // Export Enquiries to CSV
  document.getElementById('btn-export-enquiries')?.addEventListener('click', async () => {
    const enquiries = await Store.getEnquiries();
    if (enquiries.length === 0) return alert('No enquiries to export.');

    let csv = 'ID,Date,Name,Email,Phone,Travel Date,Guests,Destination,Pickup,Type,Requirements,Status\n';
    enquiries.forEach(e => {
      csv += `"${e.id}","${e.createdAt}","${e.name}","${e.email}","${e.phone}","${e.travelDate}","${e.guests}","${e.destination}","${e.pickup}","${e.travelType}","${(e.requirements || '').replace(/"/g, '""')}","${e.status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ali_global_enquiries_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // 7. WEBSITE SETTINGS
  async function loadSettingsForm() {
    const s = await Store.getSettings();
    if (!s) return;

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('set-company-name', s.companyName);
    setVal('set-tagline', s.tagline);
    setVal('set-ssm', s.ssm);
    setVal('set-motac', s.motac);
    setVal('set-contact-person', s.contactPerson);
    setVal('set-phone-primary', s.primaryPhone);
    setVal('set-wa-primary', s.primaryWhatsApp);
    setVal('set-phone-sec', s.secondaryPhone);
    setVal('set-email', s.email);
    setVal('set-address', s.address);
    setVal('set-maps-url', s.mapsUrl);
    setVal('set-ig-url', s.instagram);
    setVal('set-hero-title', s.heroTitle);
    setVal('set-hero-desc', s.heroDescription);
  }

  document.getElementById('settings-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const getVal = id => document.getElementById(id)?.value.trim() || '';

    const newSettings = {
      companyName: getVal('set-company-name'),
      tagline: getVal('set-tagline'),
      ssm: getVal('set-ssm'),
      motac: getVal('set-motac'),
      contactPerson: getVal('set-contact-person'),
      primaryPhone: getVal('set-phone-primary'),
      primaryWhatsApp: getVal('set-wa-primary'),
      secondaryPhone: getVal('set-phone-sec'),
      email: getVal('set-email'),
      address: getVal('set-address'),
      mapsUrl: getVal('set-maps-url'),
      instagram: getVal('set-ig-url'),
      heroTitle: getVal('set-hero-title'),
      heroDescription: getVal('set-hero-desc')
    };

    await Store.updateSettings(newSettings);
    showToast('Website settings saved successfully!');
  });
});

