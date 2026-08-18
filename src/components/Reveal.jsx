import React, { useEffect, useRef, useState } from 'react';

/* Scroll-reveal that fails visible. The markup is rendered on the server, and
   three separate paths guarantee it becomes visible: already-in-view at mount,
   IntersectionObserver on scroll, and a timeout backstop for environments where
   the observer never fires. */
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    /* Above-the-fold content should not wait for a scroll event. */
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    io.observe(el);

    const backstop = window.setTimeout(() => setVisible(true), 4000);

    return () => { io.disconnect(); window.clearTimeout(backstop); };
  }, []);

  return (
    <Tag ref={ref} className={['reveal', visible ? 'is-visible' : '', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Tag>
  );
}
