// import "client-only";

// export function getLocalStorage(key: string, defaultValue:any){
//     const stickyValue = localStorage.getItem(key);

//     return (stickyValue !== null && stickyValue !== 'undefined')
//         ? JSON.parse(stickyValue)
//         : defaultValue;
// }

// export function setLocalStorage(key: string, value:any){
//     localStorage.setItem(key, JSON.stringify(value));
// }

export function getLocalStorage(key: string, defaultValue: any) {
    const stickyValue = localStorage.getItem(key);
    return stickyValue !== null && stickyValue !== 'undefined'
      ? stickyValue
      : defaultValue;
  }
  
  export function setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  