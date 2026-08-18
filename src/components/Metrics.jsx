import React, { useEffect, useRef } from 'react';

/* Count-up enhances a value that is already in the server-rendered HTML, so
   crawlers and no-JS visitors see the real figure. */
function useCountUp(ref, metric) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !metric.to) return;
    if (!('IntersectionObserver' in window) ||
        document.visibilityState !== 'visible' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        const duration = 1200;
        let start = null;
        const step = (now) => {
          if (start === null) start = now;
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(metric.to * eased) + metric.suffix;
          if (t < 1) requestAnimationFrame(step);
          else el.textContent = metric.value;
        };
        requestAnimationFrame(step);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });

    io.observe(el);
    /* Whatever interrupts the animation, the approved literal is what remains. */
    return () => { io.disconnect(); el.textContent = metric.value; };
  }, [ref, metric]);
}

function Metric({ metric }) {
  const ref = useRef(null);
  useCountUp(ref, metric);
  return (
    <div className="metric">
      <span className="metric__value" ref={ref}>{metric.value}</span>
      <span className="metric__label">{metric.label}</span>
    </div>
  );
}

export default function Metrics({ items }) {
  return (
    <div className="metrics">
      {items.map((m) => <Metric key={m.label} metric={m} />)}
    </div>
  );
}
