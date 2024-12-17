export function loadState<T>(name: string): T | null {
    console.log('Loading state...')
  const value = localStorage.getItem(name);
  if (value) {
    console.log('State loaded!')
    return JSON.parse(value) as T;
  }
  return null;
}

export function saveState(name: string, value: any) {
    console.log('Saving state...')
  localStorage.setItem(name, JSON.stringify(value));
}

const debounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  let timeoutTimer: ReturnType<typeof setTimeout>;

  return (...args: T) => {
    clearTimeout(timeoutTimer);

    timeoutTimer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export const debouncedSaveState = debounce(saveState, 500);
