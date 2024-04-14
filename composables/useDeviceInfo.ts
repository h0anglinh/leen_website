type DeviceInfo = {
  browser: string,
  device: string,
  language: string,
  navigator: Navigator,
  doNotTrack: string | null
};

export const useDeviceInfo = () => {
  const ua = navigator.userAgent;
  // Detect browser
  const browser = (() => {
      if (/chrome|chromium|crios/i.test(ua)) return 'Chrome';
      if (/firefox|fxios/i.test(ua)) return 'Firefox';
      if (/safari/i.test(ua) && !/chrome|crios|firefox|fxios/i.test(ua)) return 'Safari';
      if (/msie|trident/i.test(ua)) return 'Internet Explorer';
      if (/edg/i.test(ua)) return 'Edge';
      if (/opr|opera/i.test(ua)) return 'Opera';
      return 'UNKNOWN';
  })();

  // Detect device
  const device = (() => {
      if (/Android/i.test(ua)) return 'Android';
      if (/iPhone/i.test(ua)) return 'iPhone';
      if (/iPad/i.test(ua)) return 'iPad';
      if (/windows phone/i.test(ua)) return 'Windows Phone';
      if (/macintosh|mac os x/i.test(ua)) return 'Mac';
      if (/windows/i.test(ua)) return 'PC';
      if (/linux/i.test(ua)) return 'Linux';
      return 'UNKNOWN';
  })();
  const DNT = navigator.doNotTrack
  // Get language
  const language = navigator.language || navigator.languages[0] || 'UNKNOWN';

  

  return { browser, device, language, navigator, doNotTrack: DNT };
}

