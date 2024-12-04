import { useState } from 'react'

export const Counter = () => {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div className="flex space-x-4 items-center">
      <div className="text-2xl">Count: {count}</div>
      <button type="button" onClick={handleClick} className="btn btn-primary">
        increment
      </button>
    </div>
  )
}
