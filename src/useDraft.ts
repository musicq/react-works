import { useRef, useState } from "react";

export function useDraft<T>(value: T) {
  const ref = useRef(value);
  const [draft, setDraft] = useState(ref.current);

  if (ref.current !== value) {
    setDraft(value);
    ref.current = value;
  }

  return [draft, setDraft] as const;
}
