/* ==========================================================================
   Aisyah Luxe Spa — Interactive Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Treatment Data Dictionary
  const treatmentsData = {
    'urut-melayu': {
      title: 'Traditional Malay Massage',
      tag: 'Urut Melayu Tradisional',
      price: 'RM 150 (60m) / RM 210 (90m)',
      duration: '60 – 90 mins',
      desc: 'Firm, rhythmic long strokes using warm infused coconut and lemongrass oil, passed down through generations to ease deep-seated muscle tension and restore body energy.',
      steps: [
        'Warm foot soak with kaffir lime and salt',
        'Deep rhythmic tissue massage tracing body pressure points',
        'Warm herbal compress application',
        'Soothing head and scalp massage'
      ]
    },
    'mandian-bunga': {
      title: 'Flower Petal Bath Ritual',
      tag: 'Mandian Bunga Rampai',
      price: 'RM 130',
      duration: '45 mins',
      desc: 'Our signature ritual: a soothing warm copper tub bath scattered with fresh rose, jasmine, and shredded pandan leaves, paired with aura-cleansing herbal essences.',
      steps: [
        'Preparation with 7 traditional floral essences',
        'Aromatic petal steam and soak',
        'Hydrating floral water rinse',
        'Application of jasmine body lotion'
      ]
    },
    'lulur-rempah': {
      title: 'Herbal Turmeric Scrub',
      tag: 'Lulur Rempah',
      price: 'RM 160',
      duration: '60 mins',
      desc: 'A traditional fine rice, ginger, and wild turmeric body polish that removes dead skin cells, improves blood circulation, and leaves skin radiantly soft.',
      steps: [
        'Gentle dry brush exfoliation',
        'Warm turmeric and rice polish application',
        'Warm towel body mask wrap',
        'Nourishing herbal oil lotion polish'
      ]
    },
    'wajah-berseri': {
      title: 'Facial Radiance Ritual',
      tag: 'Wajah Berseri',
      price: 'RM 175',
      duration: '60 mins',
      desc: 'A brightening facial using fresh organic botanicals, rice bran extracts, and cooling cucumber, finished with a gentle rose quartz gua sha facial massage.',
      steps: [
        'Double cleansing with herbal oils',
        'Botanical steam and mild exfoliation',
        'Rosewater & organic honey facial mask',
        'Gua sha sculpting massage & facial acupressure'
      ]
    },
    'bengkung-berpantang': {
      title: 'Postnatal Care Ritual',
      tag: 'Bengkung & Berpantang',
      price: 'RM 240',
      duration: '90 mins',
      desc: 'Gentle confinement massage and traditional belly-binding (Bengkung) care designed specifically for new mothers seeking warmth, muscle recovery, and quiet rest.',
      steps: [
        'Soothe-and-warm confinement oil massage',
        'Param & Tapel warming herbal paste application',
        'Traditional cotton cloth Bengkung belly wrapping',
        'Nourishing hot ginger tea'
      ]
    },
    'rehat-teh': {
      title: 'Foot Ritual & Herbal Tea',
      tag: 'Rehat & Teh Herba',
      price: 'RM 110',
      duration: '45 mins',
      desc: 'A relaxing lower leg and reflexology foot massage paired with warm pandan and lemongrass herbal tea — the ultimate quiet close to a busy day.',
      steps: [
        'Warm floral foot bath & salt scrub',
        'Reflexology acupressure point massage',
        'Cooling cucumber leg wrap',
        'Freshly brewed pandan & lemongrass herbal tea'
      ]
    }
  };

  // 1. Mobile Menu Toggle
  const burger = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // 2. Sticky Nav Shadow & Active Scrollspy
  const nav = document.getElementById('siteNav');
  const navLinks = document.querySelectorAll('nav.links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }

    // Scrollspy
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Falling Petals Generator
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const petalContainer = document.createElement('div');
    petalContainer.className = 'petal-container';
    heroSection.appendChild(petalContainer);

    const colors = ['#D9A9A0', '#C6A15B', '#9AAE85', '#EFE2C7'];
    for (let i = 0; i < 12; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = `${Math.random() * 95}%`;
      petal.style.animationDelay = `${Math.random() * 12}s`;
      petal.style.animationDuration = `${10 + Math.random() * 8}s`;

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 16 20');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M8,0 C14,6 14,14 8,20 C2,14 2,6 8,0 Z');
      path.setAttribute('fill', colors[i % colors.length]);

      svg.appendChild(path);
      petal.appendChild(svg);
      petalContainer.appendChild(petal);
    }
  }

  // 4. Scroll Reveal Observer
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));

  // 5. Modal Controllers
  const bookingModal = document.getElementById('bookingModal');
  const detailModal = document.getElementById('detailModal');
  const closeModalBtns = document.querySelectorAll('.modal-close, .modal-overlay');

  function openModal(modal) {
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target === btn || btn.classList.contains('modal-close')) {
        closeModal(bookingModal);
        closeModal(detailModal);
      }
    });
  });

  // Esc key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(bookingModal);
      closeModal(detailModal);
    }
  });

  // 6. Open Treatment Detail Modal
  const detailBtns = document.querySelectorAll('.btn-detail');
  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const treatmentKey = btn.dataset.treatment;
      const data = treatmentsData[treatmentKey];
      if (data) {
        document.getElementById('detailTag').textContent = data.tag;
        document.getElementById('detailTitle').textContent = data.title;
        document.getElementById('detailPrice').textContent = data.price;
        document.getElementById('detailDuration').textContent = `⏱️ ${data.duration}`;
        document.getElementById('detailDesc').textContent = data.desc;

        const stepsUl = document.getElementById('detailSteps');
        stepsUl.innerHTML = data.steps.map(step => `<li>${step}</li>`).join('');

        const bookBtn = document.getElementById('detailBookBtn');
        bookBtn.onclick = () => {
          closeModal(detailModal);
          openBookingFor(data.title);
        };

        openModal(detailModal);
      }
    });
  });

  // 7. Booking Modal Logic & WhatsApp Link Generator
  const bookBtns = document.querySelectorAll('.btn-book-trigger');
  const bookingForm = document.getElementById('modalBookingForm');
  const bookingSelect = document.getElementById('modalTreatmentSelect');

  function openBookingFor(treatmentName) {
    if (bookingSelect && treatmentName) {
      for (let option of bookingSelect.options) {
        if (option.text.includes(treatmentName) || option.value.includes(treatmentName.toLowerCase())) {
          option.selected = true;
          break;
        }
      }
    }
    openModal(bookingModal);
  }

  bookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const treatment = btn.dataset.treatment || '';
      openBookingFor(treatment);
    });
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalName').value.trim();
      const phone = document.getElementById('modalPhone').value.trim();
      const treatment = document.getElementById('modalTreatmentSelect').value;
      const date = document.getElementById('modalDate').value;
      const time = document.getElementById('modalTime').value;

      if (!name || !date || !time) {
        showToast('Please fill in all required booking fields.');
        return;
      }

      const msg = `Hello Aisyah Luxe Spa! 🌸\n\nI would like to book a ritual:\n• Guest Name: ${name}\n• Contact: ${phone}\n• Treatment: ${treatment}\n• Preferred Date: ${date}\n• Preferred Time: ${time}\n\nPlease confirm availability. Thank you!`;

      const whatsappUrl = `https://wa.me/60123456789?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, '_blank');
      closeModal(bookingModal);
      showToast('Opening WhatsApp with your booking details...');
    });
  }

  // 8. Inline Contact Section Booking Form
  const inlineForm = document.getElementById('inlineBookingForm');
  if (inlineForm) {
    inlineForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const treatment = document.getElementById('inlineTreatment').value;
      const date = document.getElementById('inlineDate').value;
      const time = document.getElementById('inlineTime').value;

      let msg = `Hello Aisyah Luxe Spa! 🌸\n\nI would like to inquire/book a ritual:\n• Treatment: ${treatment}`;
      if (date) msg += `\n• Date: ${date}`;
      if (time) msg += `\n• Time: ${time}`;

      const whatsappUrl = `https://wa.me/60123456789?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, '_blank');
      showToast('Redirecting to WhatsApp booking...');
    });
  }

  // 9. Testimonial Slider Controls
  const testiRow = document.querySelector('.testi-row');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');

  if (testiRow && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      testiRow.scrollBy({ left: -360, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      testiRow.scrollBy({ left: 360, behavior: 'smooth' });
    });
  }

  // 10. Toast Notification System
  function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
});
