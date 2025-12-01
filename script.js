// ============================================
// THIỆP CƯỚI ONLINE - JAVASCRIPT
// ============================================

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', function() {
  // Ẩn loading screen
  setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
  }, 1000);

  // Load config và render
  initWedding();

  // Khởi tạo các tính năng
  initCountdown();
  initScrollAnimations();
  initMusicPlayer();
  initGuestbook();
  initGallery();

  // Smooth scroll cho các link anchor
  initSmoothScroll();
});

// ============================================
// LOAD CONFIG VÀ RENDER TRANG
// ============================================
function initWedding() {
  const config = weddingConfig;

  // Apply theme colors
  if (config.theme) {
    document.documentElement.style.setProperty('--primary', config.theme.primaryColor);
    document.documentElement.style.setProperty('--secondary', config.theme.secondaryColor);
    document.documentElement.style.setProperty('--bg', config.theme.backgroundColor);
  }

  // Set hero background
  if (config.theme && config.theme.heroBackground) {
    const hero = document.querySelector('.hero');
    if (hero) {
      if (config.theme.heroBackground.startsWith('http')) {
        hero.style.backgroundImage = `url(${config.theme.heroBackground})`;
      } else {
        hero.style.background = config.theme.heroBackground;
      }
    }
  }

  // Update title
  document.title = `Thiệp cưới ${config.bride.nickName} & ${config.groom.nickName}`;

  // Render các section dựa trên config
  renderHero(config);
  renderEvents(config);

  if (config.ui.showLoveStory && config.loveStory.enable) {
    renderLoveStory(config);
  }

  if (config.ui.showGallery && config.gallery.enable) {
    renderGallery(config);
  }

  if (config.ui.showBridalParty && config.bridalParty.enable) {
    renderBridalParty(config);
  }

  renderRSVP(config);

  if (config.banking.enable) {
    renderBanking(config);
  }

  renderFooter(config);
}

// ============================================
// RENDER HERO SECTION
// ============================================
function renderHero(config) {
  const brideAvatar = document.querySelector('.couple-avatar.bride');
  const groomAvatar = document.querySelector('.couple-avatar.groom');
  const brideNameEl = document.querySelector('.bride-name');
  const groomNameEl = document.querySelector('.groom-name');
  const dateEl = document.querySelector('.wedding-date');

  if (brideAvatar) brideAvatar.src = config.bride.avatar;
  if (groomAvatar) groomAvatar.src = config.groom.avatar;
  if (brideNameEl) brideNameEl.textContent = config.bride.fullName;
  if (groomNameEl) groomNameEl.textContent = config.groom.fullName;

  if (dateEl) {
    const date = new Date(config.wedding.date);
    const formattedDate = formatVietnameseDate(date);
    dateEl.textContent = `${config.wedding.dayOfWeek}, ${formattedDate}`;
  }
}

// ============================================
// RENDER EVENTS
// ============================================
function renderEvents(config) {
  const ceremonyCard = document.querySelector('.event-card.ceremony');
  const receptionCard = document.querySelector('.event-card.reception');

  if (ceremonyCard) {
    ceremonyCard.querySelector('.event-time').textContent =
      `${config.ceremony.time} - ${config.ceremony.endTime}`;
    ceremonyCard.querySelector('.event-location').textContent = config.ceremony.location;
    ceremonyCard.querySelector('.event-address').textContent = config.ceremony.address;

    const mapFrame = ceremonyCard.querySelector('iframe');
    if (mapFrame) {
      mapFrame.src = config.ceremony.mapUrl;
    }
  }

  if (receptionCard) {
    receptionCard.querySelector('.event-time').textContent =
      `${config.reception.time} - ${config.reception.endTime}`;
    receptionCard.querySelector('.event-location').textContent = config.reception.location;
    receptionCard.querySelector('.event-address').textContent = config.reception.address;

    const mapFrame = receptionCard.querySelector('iframe');
    if (mapFrame) {
      mapFrame.src = config.reception.mapUrl;
    }
  }
}

// ============================================
// RENDER LOVE STORY
// ============================================
function renderLoveStory(config) {
  const timelineEl = document.querySelector('.timeline');
  if (!timelineEl || !config.loveStory.timeline) return;

  timelineEl.innerHTML = '';

  config.loveStory.timeline.forEach(item => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';
    timelineItem.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <span class="timeline-year">${item.year}</span>
        <h3 class="timeline-title">${item.title}</h3>
        <p>${item.description}</p>
        ${item.image ? `<img src="${item.image}" alt="${item.title}" class="timeline-image">` : ''}
      </div>
    `;
    timelineEl.appendChild(timelineItem);
  });
}

// ============================================
// RENDER GALLERY
// ============================================
function renderGallery(config) {
  const galleryGrid = document.querySelector('.gallery-grid');
  if (!galleryGrid || !config.gallery.photos) return;

  galleryGrid.innerHTML = '';

  config.gallery.photos.forEach((photo, index) => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.innerHTML = `<img src="${photo}" alt="Ảnh cưới ${index + 1}" loading="lazy">`;

    // Click để xem ảnh lớn
    galleryItem.addEventListener('click', () => {
      openLightbox(config.gallery.photos, index);
    });

    galleryGrid.appendChild(galleryItem);
  });
}

// ============================================
// RENDER BRIDAL PARTY
// ============================================
function renderBridalParty(config) {
  const bridesmaidsGrid = document.querySelector('.party-grid.bridesmaids');
  const groomsmenGrid = document.querySelector('.party-grid.groomsmen');

  if (bridesmaidsGrid && config.bridalParty.bridesmaids) {
    bridesmaidsGrid.innerHTML = '';
    config.bridalParty.bridesmaids.forEach(person => {
      const member = createPartyMember(person);
      bridesmaidsGrid.appendChild(member);
    });
  }

  if (groomsmenGrid && config.bridalParty.groomsmen) {
    groomsmenGrid.innerHTML = '';
    config.bridalParty.groomsmen.forEach(person => {
      const member = createPartyMember(person);
      groomsmenGrid.appendChild(member);
    });
  }
}

function createPartyMember(person) {
  const member = document.createElement('div');
  member.className = 'party-member';
  member.innerHTML = `
    <img src="${person.avatar}" alt="${person.name}" class="party-avatar">
    <div class="party-name">${person.name}</div>
    <div class="party-role">${person.role}</div>
  `;
  return member;
}

// ============================================
// RENDER RSVP
// ============================================
function renderRSVP(config) {
  const rsvpBtn = document.querySelector('.btn-rsvp');
  const phoneLinks = document.querySelectorAll('.contact-phone');

  if (rsvpBtn && config.contact.rsvpFormUrl) {
    rsvpBtn.href = config.contact.rsvpFormUrl;
  }

  if (phoneLinks.length >= 2) {
    phoneLinks[0].href = `tel:${config.contact.phone.bride}`;
    phoneLinks[0].textContent = config.contact.phone.bride;
    phoneLinks[1].href = `tel:${config.contact.phone.groom}`;
    phoneLinks[1].textContent = config.contact.phone.groom;
  }
}

// ============================================
// RENDER BANKING
// ============================================
function renderBanking(config) {
  const bankAccounts = document.querySelector('.bank-accounts');
  if (!bankAccounts || !config.banking.accounts) return;

  bankAccounts.innerHTML = '';

  config.banking.accounts.forEach(account => {
    const bankCard = document.createElement('div');
    bankCard.className = 'bank-card';
    bankCard.innerHTML = `
      <div class="bank-name">${account.bank}</div>
      <div class="account-number">${account.accountNumber}</div>
      <div class="account-name">${account.accountName}</div>
      <img src="${account.qrCode}" alt="QR ${account.bank}" class="qr-code">
      <button class="btn btn-secondary mt-1" onclick="copyAccountNumber('${account.accountNumber}')">
        📋 Sao chép STK
      </button>
    `;
    bankAccounts.appendChild(bankCard);
  });
}

// Copy account number
function copyAccountNumber(accountNumber) {
  navigator.clipboard.writeText(accountNumber).then(() => {
    alert('Đã sao chép số tài khoản!');
  });
}

// ============================================
// RENDER FOOTER
// ============================================
function renderFooter(config) {
  const footerText = document.querySelector('footer p');
  if (footerText && config.messages.footer) {
    footerText.textContent = config.messages.footer;
  }
}

// ============================================
// COUNTDOWN TIMER
// ============================================
function initCountdown() {
  const config = weddingConfig;
  if (!config.ui.showCountdown) return;

  const weddingDate = new Date(config.wedding.date).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      document.querySelector('.countdown-timer').innerHTML =
        '<h2 style="color: var(--primary)">🎉 Đám cưới đã diễn ra! 🎉</h2>';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe các element cần animation
  const animatedElements = document.querySelectorAll(
    '.event-card, .timeline-item, .gallery-item, .party-member, .bank-card'
  );

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Scroll indicator
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      document.querySelector('#countdown').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// ============================================
// MUSIC PLAYER
// ============================================
function initMusicPlayer() {
  const config = weddingConfig;
  if (!config.music.enable) return;

  const musicPlayer = document.querySelector('.music-player');
  const audio = document.getElementById('wedding-music');

  if (!musicPlayer || !audio) return;

  audio.src = config.music.url;
  audio.loop = true;

  if (config.music.autoplay) {
    // Auto play when user interacts
    document.addEventListener('click', () => {
      audio.play().catch(e => console.log('Autoplay prevented'));
    }, { once: true });
  }

  musicPlayer.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      musicPlayer.classList.add('playing');
      musicPlayer.querySelector('.music-icon').textContent = '🎵';
    } else {
      audio.pause();
      musicPlayer.classList.remove('playing');
      musicPlayer.querySelector('.music-icon').textContent = '🎵';
    }
  });
}

// ============================================
// GUESTBOOK
// ============================================
function initGuestbook() {
  const form = document.getElementById('guestbook-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('guest-name').value;
    const message = document.getElementById('guest-message').value;

    if (!name || !message) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    // Lưu vào localStorage
    const messages = getGuestbookMessages();
    messages.unshift({
      name,
      message,
      date: new Date().toISOString()
    });
    localStorage.setItem('guestbook', JSON.stringify(messages));

    // Reset form
    form.reset();

    // Render lại messages
    renderGuestbookMessages();

    alert('Cảm ơn lời chúc của bạn! ❤️');
  });

  // Load và hiển thị messages
  renderGuestbookMessages();
}

function getGuestbookMessages() {
  const stored = localStorage.getItem('guestbook');
  return stored ? JSON.parse(stored) : [];
}

function renderGuestbookMessages() {
  const messagesList = document.querySelector('.messages-list');
  if (!messagesList) return;

  const messages = getGuestbookMessages();

  if (messages.length === 0) {
    messagesList.innerHTML = '<p style="text-align: center; color: var(--text-light)">Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc! 💝</p>';
    return;
  }

  messagesList.innerHTML = messages.map(msg => `
    <div class="message-item">
      <div class="message-author">💝 ${msg.name}</div>
      <div class="message-text">${msg.message}</div>
      <div class="message-date">${formatDate(new Date(msg.date))}</div>
    </div>
  `).join('');
}

// ============================================
// GALLERY LIGHTBOX
// ============================================
function initGallery() {
  // Gallery lightbox sẽ được xử lý trong renderGallery
}

function openLightbox(photos, startIndex) {
  let currentIndex = startIndex;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
  `;

  lightbox.innerHTML = `
    <button style="position: absolute; top: 20px; right: 20px; background: white; border: none; font-size: 2rem; cursor: pointer; width: 50px; height: 50px; border-radius: 50%; z-index: 10001;" onclick="this.parentElement.remove()">×</button>
    <button style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); background: white; border: none; font-size: 2rem; cursor: pointer; width: 50px; height: 50px; border-radius: 50%;" class="prev-btn">‹</button>
    <img src="${photos[currentIndex]}" style="max-width: 90%; max-height: 90%; object-fit: contain; border-radius: 10px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);" class="lightbox-img">
    <button style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); background: white; border: none; font-size: 2rem; cursor: pointer; width: 50px; height: 50px; border-radius: 50%;" class="next-btn">›</button>
  `;

  const img = lightbox.querySelector('.lightbox-img');
  const prevBtn = lightbox.querySelector('.prev-btn');
  const nextBtn = lightbox.querySelector('.next-btn');

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    img.src = photos[currentIndex];
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % photos.length;
    img.src = photos[currentIndex];
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.remove();
    }
  });

  document.body.appendChild(lightbox);
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function formatVietnameseDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// ============================================
// PARTICLES (Optional)
// ============================================
if (weddingConfig.ui.particles && typeof particlesJS !== 'undefined') {
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#d4a574' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#d4a574', opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
      modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });
}
