type UseLocalStorage = {
  getStoredValue: Function;
  setValue: Function;
  removeValue: Function;
};

const useLocalStorage = (): UseLocalStorage => {
  const getStoredValue = (key: string) => {
    try {
      const item = window.localStorage.getItem(key);
      return item;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const setValue = (key: string, value: any) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  const removeValue = (key: string) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getStoredValue,
    setValue,
    removeValue,
  };
};

export default useLocalStorage;
