import {format} from 'date-fns'
import { useEffect, useState } from 'react'

const Clock = () => {

    const [time, setTime] = useState<Date>(new Date())

    useEffect(()=>{
        const timer = setInterval(()=>{
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

  return (
    <span>
          {format(time, "dd-MMM • HH:mm")}
    </span>
  )
}

export default Clock