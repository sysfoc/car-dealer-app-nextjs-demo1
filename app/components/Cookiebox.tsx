'use client';
import { getLocalStorage, setLocalStorage } from '../lib/storageHelper';
import { useState, useEffect } from 'react';

interface CookieboxProps {
  cookieConsent: {
    message: string;
    buttonText: string;
    textColor: string;
    bgColor: string;
    buttonTextColor: string;
    buttonBgColor: string;
    status: 'active' | 'inactive';
  };
}

const Cookiebox = ({ cookieConsent }: CookieboxProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const stored = getLocalStorage("cookie_consent", null);
    if (stored !== 'essential' && stored !== 'all') {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (value: 'essential' | 'all') => {
    setLocalStorage("cookie_consent", value);

    if (typeof window.gtag === 'function') {
      const analyticsValue = value === 'all' ? 'granted' : 'denied';
      window.gtag('consent', 'update', {
        'analytics_storage': analyticsValue,
        'ad_storage': analyticsValue
      });
    }

    setIsVisible(false);
    window.location.reload();
  };

  if (!isVisible || cookieConsent?.status === 'inactive') return null;

  return (
    <section
      className="fixed bottom-3 right-3 z-10 shadow-lg flex"
      style={{ backgroundColor: cookieConsent?.bgColor }}
    >
      <div
        className="w-[350px] rounded-md px-6 py-4"
        style={{ backgroundColor: cookieConsent?.bgColor }}
      >
        <h2
          className="text-lg font-bold"
          style={{ color: cookieConsent?.textColor }}
        >
          {cookieConsent?.message || 'We Use Cookies'}
        </h2>
        <p className="mt-2 text-sm" style={{ color: cookieConsent?.textColor }}>
          We use cookies to enhance your experience. You can choose which ones to allow.
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => handleConsent('essential')}
            className="px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            style={{
              backgroundColor: cookieConsent?.buttonBgColor,
              color: cookieConsent?.buttonTextColor,
            }}
          >
            Only Essentials
          </button>
          <button
            type="button"
            onClick={() => handleConsent('all')}
            className="px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            style={{
              backgroundColor: cookieConsent?.buttonBgColor,
              color: cookieConsent?.buttonTextColor,
            }}
          >
            {cookieConsent?.buttonText || 'Accept All'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cookiebox;
