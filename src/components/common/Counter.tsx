// src/components/common/Counter.tsx
import { useEffect, useState } from 'react'

type CounterProps = {
  from: number
  to: number
  duration: number
  delay: number
  trigger: boolean
}

const Counter = ({ from, to, duration, delay, trigger }: CounterProps) => {
  const [count, setCount] = useState(from)

  useEffect(() => {
    if (!trigger) return

    let start: number | null = null
    let animationFrameId: number

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / (duration * 1000), 1)
      const currentCount = Math.floor(progress * (to - from) + from)
      setCount(currentCount)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      }
    }

    const timer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(step)
    }, delay * 1000)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(animationFrameId)
    }
  }, [trigger, from, to, duration, delay])

  return <>{count}</>
}

export default Counter