function animateCounter(el) {
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const decimals = parseInt(el.dataset.decimal || '0');
      const duration = 1800;
      const start = 1;
      const startTime = performance.now();
      function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }
      function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuart(progress);
        const current = start + (target - start) * eased;
        el.textContent = (decimals > 0 ? current.toFixed(decimals) : Math.floor(current)) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = (decimals > 0 ? target.toFixed(decimals) : target) + suffix;
      }
      requestAnimationFrame(tick);
    }
    const statNums = document.querySelectorAll('.stat-item .num[data-target]');
    let animated = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statNums.forEach(el => animateCounter(el));
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('.stats-band').forEach(el => observer.observe(el));