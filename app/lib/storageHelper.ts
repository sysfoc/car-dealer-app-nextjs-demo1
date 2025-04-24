export function getLocalStorage(key: string, defaultValue: any) {
    const stickyValue = localStorage.getItem(key);
    return stickyValue !== null && stickyValue !== 'undefined'
      ? stickyValue
      : defaultValue;
  }
  
  export function setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  