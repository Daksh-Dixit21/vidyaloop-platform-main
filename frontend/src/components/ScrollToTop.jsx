import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the window (and main scroll containers) to the top whenever
 * the route's pathname changes. Mounted once inside <BrowserRouter />.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Skip auto-scroll for in-page hash links
    if (window.location.hash) return;

    // Disable native scroll restoration so the browser does not fight us
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    // Belt-and-suspenders for browsers that ignore scrollTo on <html>
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
