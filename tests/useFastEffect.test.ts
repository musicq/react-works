import {beforeEach, describe, expect, it} from 'vitest'
import {renderHook} from '@testing-library/react'
import {useFastEffect} from '../src'

describe('useFastEffect', () => {
  let count = 0
  const fn = () => count++

  beforeEach(() => {
    count = 0
  })

  it('should always run', () => {
    const {rerender} = renderHook(() => useFastEffect(fn))

    expect(count).toBe(1)

    rerender()
    expect(count).toBe(2)
  })

  it('should only run once', () => {
    const {rerender} = renderHook(() => useFastEffect(fn, []))

    expect(count).toBe(1)

    rerender()
    expect(count).toBe(1)
  })

  it('should when deps change', () => {
    let a = 0
    let b = 0
    const {rerender} = renderHook(() => useFastEffect(fn, [a, b]))

    expect(count).toBe(1)

    rerender()
    expect(count).toBe(1)

    a = 1
    rerender()
    expect(count).toBe(2)

    b = 2
    rerender()
    expect(count).toBe(3)

    rerender()
    expect(count).toBe(3)
  })
})
