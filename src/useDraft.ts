import {useCallback, useRef, useState} from 'react'

type Setter<T> = (s: T) => T

export function useDraft<T>(value: T) {
  const ref = useRef(value)
  const draftRef = useRef<T>(value)
  const [, update] = useState({})

  const setValue = useCallback((v: T | Setter<T>) => {
    if (typeof v === 'function') {
      draftRef.current = (v as Setter<T>)(draftRef.current)
    } else {
      draftRef.current = v
    }

    update({})
  }, [])

  if (ref.current !== value) {
    ref.current = value
    draftRef.current = value
  }

  return [draftRef.current, setValue] as const
}
