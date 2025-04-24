"use client";
import { getLocalStorage, setLocalStorage } from '../lib/storageHelper';
import { useState, useEffect } from 'react';

const CookieBox = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const stored = getLocalStorage("cookie_consent", null);
    if (stored !== 'essential' && stored !== 'all') {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (value: 'essential' | 'all') => {
    setLocalStorage("cookie_consent", value);

    if (typeof window !== 'undefined' && window.gtag) {
      const analyticsValue = value === 'all' ? 'granted' : 'denied';
      window.gtag("consent", 'update', {
        'analytics_storage': analyticsValue
      });
      console.log("Cookie Consent:", analyticsValue);
    }

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: value === 'all' ? 'granted' : 'denied'
      });
    }

    window.location.reload();
  };

  if (!isVisible) return null;

  return (
    <section className="fixed bottom-3 right-3 z-10 shadow-lg flex">
      <div className="w-[350px] rounded-md bg-white px-6 py-4 dark:bg-gray-700">
        <h2 className="text-lg font-bold">We Use Cookies</h2>
        <p className="mt-2 text-sm">
          We use cookies to enhance your experience. You can choose which ones to allow.
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => handleConsent('essential')}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Only Essentials
          </button>
          <button
            type="button"
            onClick={() => handleConsent('all')}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Accept All
          </button>
        </div>
      </div>
    </section>
  );
};

export default CookieBox;
