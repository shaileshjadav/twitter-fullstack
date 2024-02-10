import { useEffect, useState } from "react";

const useDebounce = (value: string, milliSeconds: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (value) {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, milliSeconds);

      return () => clearTimeout(handler);
    }
  }, [milliSeconds, value]);
  return debouncedValue;
};

export default useDebounce;
