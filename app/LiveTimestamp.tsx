'use client'
import TimeAgo from 'react-timeago'

function LiveTimestamp({ time }: { time: string }) {
  return (
    <TimeAgo date={time} />
  )
}

export default LiveTimestamp