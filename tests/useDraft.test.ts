import {describe, expect, it} from 'vitest'
import {act, renderHook} from '@testing-library/react'
import {useDraft} from '../src'

describe('useDraft', () => {
  it('should change local state', () => {
    const value: Record<string, number> = {a: 1}
    const {result, rerender} = renderHook(
      value => useDraft<Record<string, number>>(value),
      {initialProps: value}
    )

    expect(result.current[0]).toStrictEqual({a: 1})
    act(() => {
      result.current[1]({b: 2})
    })
    expect(result.current[0]).toStrictEqual({b: 2})

    rerender({c: 1})
    expect(result.current[0]).toStrictEqual({c: 1})
  })

  it.only('can set state with a function', () => {
    const value: Record<string, number> = {a: 1}
    const {result} = renderHook(
      value => useDraft<Record<string, number>>(value),
      {
        initialProps: value,
      }
    )

    expect(result.current[0]).toStrictEqual({a: 1})
    act(() => {
      result.current[1](v => ({...v, b: 2}))
      result.current[1](v => ({...v, b: v.b + 1}))
    })
    expect(result.current[0]).toStrictEqual({a: 1, b: 3})
  })
})
