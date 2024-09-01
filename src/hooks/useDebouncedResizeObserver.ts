// src/hooks/useDebouncedResizeObserver.ts
import { useEffect } from "react";
import debounce from "lodash.debounce";

function useDebouncedResizeObserver(
  callback: (entries: ResizeObserverEntry[]) => void,
  options?: ResizeObserverOptions
) {
  useEffect(() => {
    const debouncedCallback = debounce(
      (entries: ResizeObserverEntry[]) => callback(entries),
      100
    );

    const observer = new ResizeObserver(debouncedCallback);
    observer.observe(document.body, options);
    return () => observer.disconnect();
  }, [callback, options]); // Add callback and options as dependencies
}

export default useDebouncedResizeObserver;
