// ============================================
// THIỆP CƯỚI ONLINE - JAVASCRIPT
// ============================================

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 DOMContentLoaded fired!');

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
  console.log('✅ Config loaded:', config.bride.avatar, config.groom.avatar);

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
      const bgValue = config.theme.heroBackground;

      // Check if it's a URL (http/https) or local file path
      if (bgValue.startsWith('http') || bgValue.startsWith('images/') || bgValue.startsWith('./') || bgValue.endsWith('.jpg') || bgValue.endsWith('.png') || bgValue.endsWith('.jpeg') || bgValue.endsWith('.webp')) {
        // It's an image URL or file path
        hero.style.backgroundImage = `url('${bgValue}')`;
        hero.style.backgroundSize = 'cover';
        hero.style.backgroundPosition = 'center';
        hero.style.backgroundAttachment = 'fixed';
      } else {
        // It's a gradient or other CSS value
        hero.style.background = bgValue;
      }
    }
  }

  // Update title
  document.title = `Thiệp cưới ${config.bride.nickName} & ${config.groom.nickName}`;

  // Hide/show sections based on config
  hideShowSections(config);

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
// HIDE/SHOW SECTIONS BASED ON CONFIG
// ============================================
function hideShowSections(config) {
  // Hide countdown section if disabled
  if (!config.ui.showCountdown) {
    const countdownSection = document.getElementById('countdown');
    if (countdownSection) countdownSection.style.display = 'none';
  }

  // Hide love story section if disabled
  if (!config.ui.showLoveStory || !config.loveStory.enable) {
    const loveStorySection = document.getElementById('love-story');
    if (loveStorySection) loveStorySection.style.display = 'none';

    // Remove from navigation
    const navLink = document.querySelector('a[href="#love-story"]');
    if (navLink && navLink.parentElement) {
      navLink.parentElement.style.display = 'none';
    }
  }

  // Hide gallery section if disabled
  if (!config.ui.showGallery || !config.gallery.enable) {
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) gallerySection.style.display = 'none';

    // Remove from navigation
    const navLink = document.querySelector('a[href="#gallery"]');
    if (navLink && navLink.parentElement) {
      navLink.parentElement.style.display = 'none';
    }
  }

  // Hide bridal party section if disabled
  if (!config.ui.showBridalParty || !config.bridalParty.enable) {
    const bridalPartySection = document.getElementById('bridal-party');
    if (bridalPartySection) bridalPartySection.style.display = 'none';
  }

  // Hide guestbook section if disabled
  if (!config.ui.showGuestbook) {
    const guestbookSection = document.getElementById('guestbook');
    if (guestbookSection) guestbookSection.style.display = 'none';

    // Remove from navigation
    const navLink = document.querySelector('a[href="#guestbook"]');
    if (navLink && navLink.parentElement) {
      navLink.parentElement.style.display = 'none';
    }
  }

  // Hide banking section if disabled
  if (!config.banking.enable) {
    const bankingSection = document.getElementById('banking');
    if (bankingSection) bankingSection.style.display = 'none';
  }
}

// ============================================
// CONVERT GOOGLE DRIVE LINK TO DIRECT LINK
// ============================================
function convertGoogleDriveLink(url, size = null) {
  if (!url || typeof url !== 'string') return url;

  // Nếu đã là direct link
  if (url.includes('drive.google.com/uc?') && !size) {
    return url;
  }

  // Convert từ share link sang direct link
  // Format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // Thành: https://drive.google.com/uc?export=view&id=FILE_ID
  const patterns = [
    /drive\.google\.com\/file\/d\/([^/]+)/,
    /drive\.google\.com\/open\?id=([^&]+)/,
    /drive\.google\.com\/uc\?.*id=([^&]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      const fileId = match[1];

      // Thử nhiều endpoint khác nhau của Google Drive
      // Endpoint 1: uc?export=view (tốt nhất cho ảnh nhỏ/trung bình)
      return `https://drive.google.com/uc?export=view&id=${fileId}`;

      // Nếu bị download, có thể thử:
      // return `https://lh3.googleusercontent.com/d/${fileId}`;
      // hoặc:
      // return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
  }

  return url; // Nếu không phải Google Drive link thì giữ nguyên
}

// ============================================
// RENDER HERO SECTION
// ============================================
function renderHero(config) {
  // New hero layout with script names
  const brideNameScript = document.querySelector('.bride-name-script');
  const groomNameScript = document.querySelector('.groom-name-script');
  const weddingDateHero = document.querySelector('.wedding-date-hero');
  const weddingVenue = document.querySelector('.wedding-venue');

  // Update script names
  if (brideNameScript) brideNameScript.textContent = config.bride.fullName;
  if (groomNameScript) groomNameScript.textContent = config.groom.fullName;

  // Update wedding date and time in hero
  if (weddingDateHero) {
    const ceremonyTime = config.ceremony.time || '10:00';
    const date = new Date(config.wedding.date);
    const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

    const dayName = dayNames[date.getDay()];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    weddingDateHero.textContent = `${ceremonyTime} - ${dayName}, ${day} ${month}, ${year}`;
  }

  // Update venue
  if (weddingVenue) {
    weddingVenue.textContent = `${config.ceremony.location}, ${config.ceremony.address}`;
  }

  // Old hero layout (backup compatibility)
  const brideAvatar = document.querySelector('.couple-avatar.bride');
  const groomAvatar = document.querySelector('.couple-avatar.groom');
  const brideNameEl = document.querySelector('.bride-name');
  const groomNameEl = document.querySelector('.groom-name');
  const dateEl = document.querySelector('.wedding-date');

  // Avatar từ local hoặc Google Drive
  if (brideAvatar) {
    const brideUrl = convertGoogleDriveLink(config.bride.avatar);
    console.log('🎀 Bride avatar URL:', brideUrl);
    brideAvatar.src = brideUrl;
    brideAvatar.onerror = function() {
      console.error('Failed to load bride avatar:', brideUrl);
      this.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👰</text></svg>";
    };
  }

  if (groomAvatar) {
    const groomUrl = convertGoogleDriveLink(config.groom.avatar);
    console.log('🤵 Groom avatar URL:', groomUrl);
    groomAvatar.src = groomUrl;
    groomAvatar.onerror = function() {
      console.error('Failed to load groom avatar:', groomUrl);
      this.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤵</text></svg>";
    };
  }

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
    const imageUrl = item.image ? convertGoogleDriveLink(item.image) : '';
    timelineItem.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <span class="timeline-year">${item.year}</span>
        <h3 class="timeline-title">${item.title}</h3>
        <p>${item.description}</p>
        ${imageUrl ? `<img src="${imageUrl}" alt="${item.title}" class="timeline-image">` : ''}
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

  // Convert tất cả Google Drive links
  const convertedPhotos = config.gallery.photos.map(photo => convertGoogleDriveLink(photo));

  convertedPhotos.forEach((photo, index) => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.innerHTML = `<img src="${photo}" alt="Ảnh cưới ${index + 1}" loading="lazy">`;

    // Click để xem ảnh lớn
    galleryItem.addEventListener('click', () => {
      openLightbox(convertedPhotos, index);
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
    <img src="${convertGoogleDriveLink(person.avatar)}" alt="${person.name}" class="party-avatar">
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
      const countdownTimer = document.querySelector('.countdown-timer');
      if (countdownTimer) {
        countdownTimer.innerHTML = '<h2 style="color: var(--primary)">🎉 Đám cưới đã diễn ra! 🎉</h2>';
      }
      const countdownTimerHero = document.querySelector('.countdown-timer-hero');
      if (countdownTimerHero) {
        countdownTimerHero.innerHTML = '<h2 style="color: white">🎉 Đám cưới đã diễn ra! 🎉</h2>';
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update regular countdown
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
    if (secondsEl) secondsEl.textContent = seconds;

    // Update hero countdown
    const daysHeroEl = document.getElementById('days-hero');
    const hoursHeroEl = document.getElementById('hours-hero');
    const minutesHeroEl = document.getElementById('minutes-hero');
    const secondsHeroEl = document.getElementById('seconds-hero');

    if (daysHeroEl) daysHeroEl.textContent = days;
    if (hoursHeroEl) hoursHeroEl.textContent = hours;
    if (minutesHeroEl) minutesHeroEl.textContent = minutes;
    if (secondsHeroEl) secondsHeroEl.textContent = seconds;
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

// ============================================
// NAVIGATION MENU
// ============================================
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

// Mobile menu toggle
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// Close mobile menu when clicking on a link
if (navLinks) {
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Hide/show nav on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navMenu.classList.remove('hidden');
    return;
  }

  if (currentScroll > lastScroll && currentScroll > 100) {
    // Scrolling down
    navMenu.classList.add('hidden');
  } else {
    // Scrolling up
    navMenu.classList.remove('hidden');
  }

  lastScroll = currentScroll;
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTop = document.getElementById('back-to-top');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// SHARE FUNCTIONALITY
// ============================================
const shareModal = document.getElementById('share-modal');
const shareTrigger = document.getElementById('share-trigger');
const shareClose = document.getElementById('share-close');
const shareLinkInput = document.getElementById('share-link-input');

// Get current page URL
const currentUrl = window.location.href;
if (shareLinkInput) {
  shareLinkInput.value = currentUrl;
}

// Open share modal
if (shareTrigger) {
  shareTrigger.addEventListener('click', () => {
    shareModal.classList.add('active');
  });
}

// Close share modal
if (shareClose) {
  shareClose.addEventListener('click', () => {
    shareModal.classList.remove('active');
  });
}

// Close modal when clicking outside
if (shareModal) {
  shareModal.addEventListener('click', (e) => {
    if (e.target === shareModal) {
      shareModal.classList.remove('active');
    }
  });
}

// Share to Facebook
function shareToFacebook() {
  const url = encodeURIComponent(currentUrl);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
}

// Share to Zalo
function shareToZalo() {
  const url = encodeURIComponent(currentUrl);
  window.open(`https://chat.zalo.me/?url=${url}`, '_blank', 'width=600,height=400');
}

// Share to WhatsApp
function shareToWhatsApp() {
  const config = weddingConfig;
  const text = encodeURIComponent(`Thiệp cưới ${config.bride.nickName} & ${config.groom.nickName}`);
  const url = encodeURIComponent(currentUrl);
  window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
}

// Copy link to clipboard
function copyLink() {
  if (shareLinkInput) {
    shareLinkInput.select();
    shareLinkInput.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(currentUrl).then(() => {
      alert('✅ Đã sao chép link thiệp cưới!');
    }).catch(() => {
      // Fallback for older browsers
      document.execCommand('copy');
      alert('✅ Đã sao chép link thiệp cưới!');
    });
  }
}

// Web Share API (if supported)
if (navigator.share && shareTrigger) {
  shareTrigger.addEventListener('dblclick', async () => {
    try {
      await navigator.share({
        title: `Thiệp cưới ${weddingConfig.bride.nickName} & ${weddingConfig.groom.nickName}`,
        text: 'Trân trọng kính mời bạn đến dự lễ thành hôn',
        url: currentUrl
      });
    } catch (err) {
      // User cancelled or browser doesn't support
    }
  });
}

// ============================================
// ADD TO CALENDAR
// ============================================
function addToCalendar() {
  const config = weddingConfig;
  const event = config.reception;

  // Format date for iCalendar (YYYYMMDDTHHMMSS)
  const startDate = new Date(event.date + 'T' + event.time);
  const endDate = new Date(event.date + 'T' + event.endTime);

  const formatICSDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//EN',
    'BEGIN:VEVENT',
    `DTSTART:${formatICSDate(startDate)}`,
    `DTEND:${formatICSDate(endDate)}`,
    `SUMMARY:Tiệc cưới ${config.bride.nickName} & ${config.groom.nickName}`,
    `DESCRIPTION:Trân trọng kính mời bạn đến dự tiệc cưới`,
    `LOCATION:${event.location}, ${event.address}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Nhắc nhở: Tiệc cưới sắp bắt đầu trong 1 giờ',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  // Create downloadable file
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'wedding-invitation.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  alert('✅ Đã tải file lịch! Mở file để thêm vào lịch của bạn.');
}

// ============================================
// DARK MODE
// ============================================
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check saved dark mode preference
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'enabled') {
  body.classList.add('dark-mode');
  if (darkModeToggle) darkModeToggle.textContent = '☀️';
}

// Toggle dark mode
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
      darkModeToggle.textContent = '☀️';
    } else {
      localStorage.setItem('darkMode', 'disabled');
      darkModeToggle.textContent = '🌙';
    }
  });
}

// ============================================
// LAZY LOADING IMAGES
// ============================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// IMAGE ERROR HANDLING
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.hasAttribute('onerror')) {
      img.addEventListener('error', function() {
        // Replace with placeholder emoji if image fails to load
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
        this.style.fontSize = '3rem';
        this.style.background = 'var(--bg)';
        this.alt = '🖼️';
      });
    }
  });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Preload critical images (sau khi convert Google Drive links)
const preloadImages = [
  convertGoogleDriveLink(weddingConfig.bride.avatar),
  convertGoogleDriveLink(weddingConfig.groom.avatar)
];
preloadImages.forEach(src => {
  if (src) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  }
});

// ============================================
// ACCESSIBILITY
// ============================================
// Skip to main content (for keyboard users)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab' && e.shiftKey === false) {
    const focusable = document.querySelectorAll('a, button, input, textarea, select');
    if (focusable.length > 0 && document.activeElement === document.body) {
      e.preventDefault();
      focusable[0].focus();
    }
  }
});

// ============================================
// CONSOLE ART
// ============================================
console.log(`
%c💒 Wedding Invitation
%cThiệp cưới online được tạo bởi Claude AI
%cChúc bạn có một đám cưới thật hạnh phúc! 🎉

Nếu bạn cần tùy chỉnh thiệp, hãy sửa file config.js
`,
'color: #d4a574; font-size: 24px; font-weight: bold;',
'color: #8b7355; font-size: 14px;',
'color: #666; font-size: 12px;'
);

// ============================================
// AUTO-FILL NAME FOR RSVP AND GUESTBOOK
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  // Wait for StorageUtils to be available
  setTimeout(() => {
    if (typeof StorageUtils !== 'undefined') {
      // Auto-fill RSVP form if exists (Google Forms thường không cho phép)
      // Nhưng có thể dùng cho custom RSVP form
      StorageUtils.autoFillAll('#rsvp-name', '#rsvp-phone');
    }
  }, 100);
});
