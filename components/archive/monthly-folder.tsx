'use client'

import type { CSSProperties } from 'react'

export type Month = {
  id: string
  name: string
  count: number
  cover: string
  secondary: string
}

type Props = {
  month: Month
  onOpen: (month: Month) => void
  style?: CSSProperties
}

export function MonthlyFolder({ month, onOpen, style }: Props) {
  return (
    <button
      type="button"
      className="folder"
      style={style}
      onClick={() => onOpen(month)}
      aria-label={`${month.name}, ${month.count} moments`}
    >
      <span className="folder__sheets" aria-hidden="true">
        <span className="folder__sheet s2" />
        <span className="folder__sheet s1" />
      </span>

      <span className="folder__photos" aria-hidden="true">
        <img className="folder__photo p2" src={month.secondary || '/placeholder.svg'} alt="" />
        <img className="folder__photo p1" src={month.cover || '/placeholder.svg'} alt="" />
      </span>

      <span className="folder__pocket">
        <span className="folder__meta">
          <span className="folder__name">{month.name}</span>
          <span className="folder__count">{month.count} moments</span>
        </span>
        <span className="folder__more" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </span>
    </button>
  )
}
