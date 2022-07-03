import { useEffect, useRef } from "react";

/**
 * A custom useEffect hook that only triggers on updates, not on initial mount
 * @param {Function} effect
 * @param {Array<any>} dependencies
 */

export default function useUpdateEffect(effect, dependencies: any[] = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    }

    return () => {
      isInitialMount.current = false;
    };
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
}
