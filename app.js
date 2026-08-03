/* ==========================================================================
   Aisyah Luxe Spa — Interactive Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const WA_NUMBER = '601171127820';

  // =========================================================================
  // Treatment Data Dictionary (Real data from price lists)
  // =========================================================================
  const treatmentsData = {
    'signature-facial': {
      title: 'Signature Facial',
      tag: '✦ Signature Facial',
      price: 'From RM100',
      duration: 'Varies by treatment',
      desc: 'Our signature facial range restores your natural glow with curated, premium skincare techniques. Choose from brightening, vitamin-infused, or luxe glow options — each tailored to your skin needs.',
      steps: [
        'Flawless Facial — RM100',
        'Luxe Glow Facial — RM120',
        'Signature Facial — RM150',
        'Vitamin C Facial — RM250'
      ]
    },
    'glowing-facial': {
      title: 'Glowing Facial',
      tag: '✦ Glowing Facial',
      price: 'From RM180',
      duration: 'Varies by treatment',
      desc: 'Deeply hydrating and brightening treatments designed to restore radiance, calm inflammation, and leave your skin visibly luminous and supple.',
      steps: [
        'Crystal Gel Facial — RM199',
        'Vitasnow Facial — RM399',
        'Aqua Hyaluronic Calming — RM250',
        'Hydrating Facial — RM180'
      ]
    },
    'pigmentation-whitening': {
      title: 'Pigmentation & Whitening',
      tag: '♦ Pigmentation & Whitening',
      price: 'From RM180',
      duration: 'Varies by treatment',
      desc: 'Targeted treatments to reduce dark spots, uneven skin tone, and hyperpigmentation — revealing clearer, brighter, and more even-toned skin with every session.',
      steps: [
        'Lightening Facial — RM180',
        'Aqua AHA Peel — RM250',
        'Dermabright Peel — RM270',
        'Elite K-Light Whitening — RM349',
        'Premium Aqua AHA — RM399'
      ]
    },
    'anti-aging-care': {
      title: 'Anti Aging & Care',
      tag: '💧 Anti Aging & Care',
      price: 'From RM239',
      duration: 'Varies by treatment',
      desc: 'Advanced anti-aging treatments using Dermapen micro-needling, ice snow therapy, and Vitamin C infusions to rejuvenate skin cells and restore youthful firmness.',
      steps: [
        'Dermapen Therapy — RM250',
        'Ice Snow Facial — RM239',
        'Dermabright Peel — RM270',
        'Double Layer Vitamin C — RM399'
      ]
    },
    'oily-acne': {
      title: 'Oily & Acne',
      tag: '💎 Oily & Acne',
      price: 'From RM180',
      duration: 'Varies by treatment',
      desc: 'Specifically formulated for oily, acne-prone skin — deep-cleansing and pore-refining treatments that reduce breakouts, minimize pores, and restore skin balance.',
      steps: [
        'Diamond Carbon Peel — RM300',
        'Purifying Facial — RM180',
        'Acne Elite K-Light — RM399',
        'Aqua BHA Peel — RM250'
      ]
    },
    'eye-treatment': {
      title: 'Eye Treatment',
      tag: '👁 Eye Treatment',
      price: 'From RM150',
      duration: 'Varies by treatment',
      desc: 'Specialized under-eye treatments targeting dark circles, puffiness, and fine lines — giving you bright, refreshed eyes that reflect your natural beauty.',
      steps: [
        'Under Eye Treatment — RM150',
        'Package 3 Sesi — RM399'
      ]
    }
  };

  // =========================================================================
  // 1. Mobile Menu Toggle
  // =========================================================================
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

  // =========================================================================
  // 2. Sticky Nav Shadow & Active Scrollspy
  // =========================================================================
  const nav = document.getElementById('siteNav');
  const navLinks = document.querySelectorAll('nav.links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }

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

  // =========================================================================
  // 3. Falling Petals Generator
  // =========================================================================
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

  // =========================================================================
  // 4. Scroll Reveal Observer
  // =========================================================================
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach(el => io.observe(el));

  // =========================================================================
  // 5. Modal Controllers
  // =========================================================================
  const bookingModal = document.getElementById('bookingModal');
  const detailModal = document.getElementById('detailModal');

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

  // Close on overlay click or close button
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(bookingModal);
        closeModal(detailModal);
      }
    });
  });

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(bookingModal);
      closeModal(detailModal);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(bookingModal);
      closeModal(detailModal);
    }
  });

  // =========================================================================
  // 6. Open Treatment Detail Modal
  // =========================================================================
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-detail');
    if (!btn) return;
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

  // =========================================================================
  // 7. Booking Modal Logic & WhatsApp Link Generator
  // =========================================================================
  const bookBtns = document.querySelectorAll('.btn-book-trigger');
  const bookingForm = document.getElementById('modalBookingForm');
  const bookingSelect = document.getElementById('modalTreatmentSelect');

  function openBookingFor(treatmentName) {
    if (bookingSelect && treatmentName) {
      for (let option of bookingSelect.options) {
        if (option.text.toLowerCase().includes(treatmentName.toLowerCase()) ||
            option.value.toLowerCase().includes(treatmentName.toLowerCase())) {
          option.selected = true;
          break;
        }
      }
    }
    openModal(bookingModal);
  }

  bookBtns.forEach(btn => {
    btn.addEventListener('click', () => {
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
        showToast('Sila isi semua maklumat tempahan.');
        return;
      }

      const msg = `Assalamualaikum Aisyah Luxe Spa! 🌸\n\nSaya ingin membuat tempahan:\n• Nama: ${name}\n• No. Tel: ${phone}\n• Rawatan: ${treatment}\n• Tarikh: ${date}\n• Masa: ${time}\n\nSila sahkan ketersediaan slot. Terima kasih!`;
      window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
      closeModal(bookingModal);
      showToast('Membuka WhatsApp dengan butiran tempahan anda...');
    });
  }

  // =========================================================================
  // 8. Inline Contact Section Booking Form
  // =========================================================================
  const inlineForm = document.getElementById('inlineBookingForm');
  if (inlineForm) {
    inlineForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const treatment = document.getElementById('inlineTreatment').value;
      const date = document.getElementById('inlineDate').value;
      const time = document.getElementById('inlineTime').value;

      let msg = `Assalamualaikum Aisyah Luxe Spa! 🌸\n\nSaya ingin bertanya / membuat tempahan:\n• Rawatan: ${treatment}`;
      if (date) msg += `\n• Tarikh: ${date}`;
      if (time) msg += `\n• Masa: ${time}`;

      window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
      showToast('Mengalihkan ke WhatsApp...');
    });
  }

  // =========================================================================
  // 9. Package Booking CTA
  // =========================================================================
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-pkg-book');
    if (!btn) return;
    const pkgName = btn.dataset.package || 'Package';
    const msg = `Assalamualaikum Aisyah Luxe Spa! 🌸\n\nSaya berminat dengan *${pkgName}*.\n\nBoleh saya dapatkan maklumat lanjut dan tempahan? Terima kasih!`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  });

  // =========================================================================
  // 10. Bekam Booking CTA
  // =========================================================================
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-bekam-book');
    if (!btn) return;
    const treatmentName = btn.dataset.bekam || 'Bekam';
    const msg = `Assalamualaikum Aisyah Luxe Spa! 🌸\n\nSaya ingin membuat tempahan untuk *${treatmentName}*.\n\nSila maklumkan slot yang tersedia. Terima kasih!`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  });

  // =========================================================================
  // 11. Flawless Facial Promo CTA
  // =========================================================================
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-promo');
    if (!btn) return;
    const msg = `Assalamualaikum Aisyah Luxe Spa! 🌸\n\nSaya berminat dengan *Promo Flawless Facial RM49*!\n\nBoleh saya dapatkan slot? Terima kasih!`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  });

  // =========================================================================
  // 12. Testimonial Slider Controls
  // =========================================================================
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

  // =========================================================================
  // 13. Trust Badge Strip — clone for seamless scroll loop
  // =========================================================================
  const trustTrack = document.querySelector('.trust-track');
  if (trustTrack) {
    const items = trustTrack.innerHTML;
    trustTrack.innerHTML = items + items;
  }

  // =========================================================================
  // 14. Toast Notification System
  // =========================================================================
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
