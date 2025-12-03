// ============================================
// ENHANCED FEATURES FOR WEDDING INVITATION
// ============================================

// ============================================
// RENDER FAQ SECTION
// ============================================
function renderFAQ(config) {
  if (!config.faq || !config.faq.enable || !config.ui.showFAQ) return;

  const faqContainer = document.querySelector('.faq-container');
  if (!faqContainer) return;

  faqContainer.innerHTML = '';

  config.faq.questions.forEach((item, index) => {
    const faqItem = document.createElement('div');
    faqItem.className = 'faq-item';
    faqItem.setAttribute('data-aos', 'fade-up');
    faqItem.setAttribute('data-aos-delay', index * 100);

    faqItem.innerHTML = `
      <div class="faq-question">
        <h3>${item.question}</h3>
        <span class="faq-toggle">+</span>
      </div>
      <div class="faq-answer">
        <p>${item.answer}</p>
      </div>
    `;

    // Toggle functionality
    const question = faqItem.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = faqItem.classList.contains('active');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-toggle').textContent = '+';
      });

      // Toggle current item
      if (!isActive) {
        faqItem.classList.add('active');
        faqItem.querySelector('.faq-toggle').textContent = '−';
      }
    });

    faqContainer.appendChild(faqItem);
  });
}

// ============================================
// RENDER WEDDING DAY TIMELINE
// ============================================
function renderWeddingTimeline(config) {
  if (!config.weddingDayTimeline || !config.weddingDayTimeline.enable || !config.ui.showWeddingTimeline) return;

  const timelineContainer = document.querySelector('.timeline-day-container');
  if (!timelineContainer) return;

  timelineContainer.innerHTML = '';

  config.weddingDayTimeline.events.forEach((event, index) => {
    const timelineEvent = document.createElement('div');
    timelineEvent.className = 'timeline-day-event';
    timelineEvent.setAttribute('data-aos', 'fade-up');
    timelineEvent.setAttribute('data-aos-delay', index * 100);

    timelineEvent.innerHTML = `
      <div class="timeline-day-time">
        <span class="timeline-icon">${event.icon}</span>
        <span class="timeline-hour">${event.time}</span>
      </div>
      <div class="timeline-day-content">
        <h3>${event.title}</h3>
        <p>${event.description}</p>
      </div>
    `;

    timelineContainer.appendChild(timelineEvent);
  });
}

// ============================================
// RENDER WEATHER WIDGET
// ============================================
function renderWeather(config) {
  if (!config.weather || !config.weather.enable || !config.ui.showWeather) return;

  const weddingDate = new Date(config.wedding.date);
  const today = new Date();
  const daysUntilWedding = Math.ceil((weddingDate - today) / (1000 * 60 * 60 * 24));

  // Only show weather if API key is provided AND within 7 days
  if (!config.weather.apiKey || daysUntilWedding > 7) {
    // Hide weather section if no API key or too far in future
    const weatherSection = document.getElementById('weather');
    if (weatherSection) {
      weatherSection.style.display = 'none';
    }
    return;
  }

  // Fetch real weather data from OpenWeatherMap API
  fetchWeatherData(config.weather.city, config.weather.apiKey);
}

function updateWeatherUI(weather) {
  const tempEl = document.getElementById('weather-temp');
  const descEl = document.getElementById('weather-desc');
  const humidityEl = document.getElementById('weather-humidity');
  const windEl = document.getElementById('weather-wind');

  if (tempEl) tempEl.textContent = weather.temp;
  if (descEl) descEl.textContent = weather.description;
  if (humidityEl) humidityEl.textContent = `${weather.humidity}%`;
  if (windEl) windEl.textContent = `${weather.windSpeed} km/h`;
}

async function fetchWeatherData(city, apiKey) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=vi`
    );
    const data = await response.json();

    const weather = {
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6) // Convert m/s to km/h
    };

    updateWeatherUI(weather);
  } catch (error) {
    console.error('Error fetching weather:', error);
    // Fall back to mock data
    updateWeatherUI({
      temp: 25,
      description: 'Không thể tải dữ liệu thời tiết',
      humidity: 65,
      windSpeed: 12
    });
  }
}

// ============================================
// ENHANCED GALLERY WITH FILTER
// ============================================
function renderEnhancedGallery(config) {
  if (!config.gallery || !config.gallery.enable) return;

  const galleryGrid = document.querySelector('.gallery-grid');
  const galleryFilter = document.querySelector('.gallery-filter');

  if (!galleryGrid) return;

  // Render filter buttons
  if (galleryFilter && config.galleryCategories && config.galleryCategories.enable) {
    galleryFilter.innerHTML = '';

    config.galleryCategories.categories.forEach((category, index) => {
      const filterBtn = document.createElement('button');
      filterBtn.className = 'filter-btn' + (index === 0 ? ' active' : '');
      filterBtn.setAttribute('data-filter', category.id);
      filterBtn.innerHTML = `${category.icon} ${category.name}`;

      filterBtn.addEventListener('click', () => {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        filterBtn.classList.add('active');

        // Filter gallery items
        filterGallery(category.id);
      });

      galleryFilter.appendChild(filterBtn);
    });
  }

  // Render gallery items
  galleryGrid.innerHTML = '';

  config.gallery.photos.forEach((photo, index) => {
    const photoUrl = typeof photo === 'string' ? photo : photo.url;
    const photoCategory = typeof photo === 'object' ? photo.category : 'all';

    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.setAttribute('data-category', photoCategory);
    galleryItem.setAttribute('data-aos', 'fade-up');
    galleryItem.setAttribute('data-aos-delay', (index % 6) * 50);

    const img = document.createElement('img');
    img.setAttribute('data-src', convertGoogleDriveLink(photoUrl)); // Lazy load
    img.alt = `Ảnh cưới ${index + 1}`;
    img.loading = 'lazy';

    // Use Intersection Observer for lazy loading
    observeImage(img);

    galleryItem.appendChild(img);

    // Click để xem ảnh lớn
    galleryItem.addEventListener('click', () => {
      const allPhotos = config.gallery.photos.map(p =>
        convertGoogleDriveLink(typeof p === 'string' ? p : p.url)
      );
      openLightbox(allPhotos, index);
    });

    galleryGrid.appendChild(galleryItem);
  });
}

// Filter gallery items
function filterGallery(category) {
  const items = document.querySelectorAll('.gallery-item');

  items.forEach(item => {
    if (category === 'all' || item.getAttribute('data-category') === category) {
      item.style.display = 'block';
      // Re-trigger AOS animation
      item.classList.add('aos-animate');
    } else {
      item.style.display = 'none';
    }
  });
}

// Lazy load images using Intersection Observer
function observeImage(img) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyImg = entry.target;
        if (lazyImg.dataset.src) {
          lazyImg.src = lazyImg.dataset.src;
          lazyImg.removeAttribute('data-src');
          observer.unobserve(lazyImg);
        }
      }
    });
  });

  observer.observe(img);
}

// ============================================
// MAP DIRECTIONS
// ============================================
function initDirections() {
  const config = weddingConfig;

  document.querySelectorAll('.directions-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const eventType = btn.getAttribute('data-event');

      let address = '';
      if (eventType === 'ceremony') {
        address = encodeURIComponent(config.ceremony.address);
      } else if (eventType === 'reception') {
        address = encodeURIComponent(config.reception.address);
      }

      // Open Google Maps with directions
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
    });
  });
}

// ============================================
// INITIALIZE AOS (Animate On Scroll)
// ============================================
function initAOS() {
  if (typeof AOS !== 'undefined' && weddingConfig.ui.animation) {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 100
    });
  }
}

// ============================================
// HIDE/SHOW NEW SECTIONS
// ============================================
function hideShowNewSections(config) {
  // Hide FAQ if disabled
  if (!config.ui.showFAQ || !config.faq.enable) {
    const faqSection = document.getElementById('faq');
    if (faqSection) faqSection.style.display = 'none';
  }

  // Hide Weather if disabled
  if (!config.ui.showWeather || !config.weather.enable) {
    const weatherSection = document.getElementById('weather');
    if (weatherSection) weatherSection.style.display = 'none';
  }

  // Hide Wedding Timeline if disabled
  if (!config.ui.showWeddingTimeline || !config.weddingDayTimeline.enable) {
    const timelineSection = document.getElementById('wedding-timeline');
    if (timelineSection) timelineSection.style.display = 'none';
  }
}

// ============================================
// INITIALIZE ALL ENHANCEMENTS
// ============================================
function initEnhancements() {
  const config = weddingConfig;

  // Hide/show sections
  hideShowNewSections(config);

  // Render new sections
  renderFAQ(config);
  renderWeddingTimeline(config);
  renderWeather(config);

  // Enhanced gallery (replace the old one)
  if (config.ui.showGallery && config.gallery.enable) {
    renderEnhancedGallery(config);
  }

  // Initialize map directions
  initDirections();

  // Initialize AOS animations
  initAOS();
}

// Run enhancements after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Wait for config to be loaded
  setTimeout(initEnhancements, 100);
});
