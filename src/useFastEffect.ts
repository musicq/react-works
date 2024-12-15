import type { DependencyList } from "react";
import { useRef } from "react";

export function useFastEffect(fn: () => void, deps?: DependencyList) {
  const shouldRun = useShouldRunEffect(deps);

  if (shouldRun) {
    fn();
  }
}

function useShouldRunEffect(deps?: DependencyList): boolean {
  const firstRenderRef = useRef(true);
  const lastDeps = useRef<unknown[]>([]);

  // always run
  if (!deps) {
    return true;
  }

  // run once
  if (deps.length === 0) {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return true;
    }

    return false;
  }

  let shouldRun = false;
  for (let i = 0; i < deps.length; i++) {
    if (lastDeps.current[i] !== deps[i]) {
      shouldRun = true;
    }

    lastDeps.current[i] = deps[i];
  }

  return shouldRun;
}
