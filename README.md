# reworks

Useful collections of react components & hooks.

# APIs

- useDraft
- useFastEffect

## useDraft

It's same as `useState`, except that if the passing value changes, it will reset the internal(draft) value to the latest passing value to keep them synced.

```ts
import {useDraft} from 'reworks'

const [draft, setDraft] = useDraft(0)

setDraft(1)
setDraft(p => p + 1)
```

### Example

```tsx
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount(Math.round(Math.random() * 10)}>Reset</button>
      <Counter count={count} />
    </>
  )
}

function Counter(props: {count: number}) {
  const [draft, setDraft] = useDraft2(props.count)

  return (
    <>
      <h1>{draft}</h1>
      <button onClick={() => setDraft(draft + 1)}>Child +1</button>
    </>
  )
}
```

## useFastEffect

It's same as `useEffect`, except that it will be executed immediately in the current render, won't wait until dom has been updated like `useEffect`.

```ts
import {useFastEffect} from 'reworks'

useFastEffect(() => {
  console.log('excute while rendering')
}, [])
```

## Example

```tsx
function Modal(props: {visible: boolean; data: any}) {
  const form = useForm()

  useFastEffect(() => {
    if (visible) {
      form.fill(data)
    } else {
      form.reset()
    }
  }, [props.visible])

  return <form>...</form>
}
```
