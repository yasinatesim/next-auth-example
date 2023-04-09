type DebounceFunction = <T extends (...args: any[]) => any>(func: T, delay: number) => (...args: Parameters<T>) => void;

export const debounce: DebounceFunction = (func, delay) => {
  let timerId: ReturnType<typeof setTimeout>;
  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
