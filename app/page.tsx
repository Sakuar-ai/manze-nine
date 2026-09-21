'use client'

import { useState } from 'react'
import { ArchiveHeader } from '@/components/archive/archive-header'
import { BottomBar } from '@/components/archive/bottom-bar'
import { FolderIcon } from '@/components/archive/folder-icon'
import { MonthlyFolder, type Month } from '@/components/archive/monthly-folder'

const photos = {
  september: '/archive/september.png',
  august: '/archive/august.png',
  july: '/archive/july.png',
  june: '/archive/june.png',
  may: '/archive/may.png',
  april: '/archive/april.png',
}

const initialMonths: Month[] = [
  { id: 'september', name: 'September', count: 24, cover: photos.september, secondary: photos.august },
  { id: 'august', name: 'August', count: 18, cover: photos.august, secondary: photos.july },
  { id: 'july', name: 'July', count: 16, cover: photos.july, secondary: photos.september },
  { id: 'june', name: 'June', count: 12, cover: photos.june, secondary: photos.may },
  { id: 'may', name: 'May', count: 20, cover: photos.may, secondary: photos.april },
  { id: 'april', name: 'April', count: 15, cover: photos.april, secondary: photos.june },
]

const coverChoices = Object.values(photos)

type Screen = 'archive' | 'month' | 'add'

export default function Page() {
  const [months, setMonths] = useState<Month[]>(initialMonths)
  const [screen, setScreen] = useState<Screen>('archive')
  const [active, setActive] = useState<Month>(initialMonths[0])
  const [form, setForm] = useState({ name: '', note: '', cover: coverChoices[0] })

  const openMonth = (month: Month) => {
    setActive(month)
    setScreen('month')
  }

  const keepMonth = () => {
    const name = form.name.trim() || 'New Month'
    const cover = form.cover
    const secondary = coverChoices[(coverChoices.indexOf(cover) + 1) % coverChoices.length]
    const month: Month = { id: `m-${Date.now()}`, name, count: 1, cover, secondary }
    setMonths((current) => [month, ...current])
    setForm({ name: '', note: '', cover: coverChoices[0] })
    setActive(month)
    setScreen('month')
  }

  return (
    <div className="app">
      <div className="app__bg" aria-hidden="true" />
      <div className="app__veil" aria-hidden="true" />

      {screen === 'archive' && (
        <main className="archive">
          <div className="archive__inner">
            <ArchiveHeader onAdd={() => setScreen('add')} />

            <section className="hero">
              <h1 className="hero__title">My Moments</h1>
              <p className="hero__sub">
                Small moments.
                <br />
                Worth keeping.
              </p>
            </section>

            <section className="folders" aria-label="按月归档的记忆">
              {months.map((month, index) => (
                <MonthlyFolder
                  key={month.id}
                  month={month}
                  onOpen={openMonth}
                  style={index % 2 === 1 ? { transform: 'translateY(18px)' } : undefined}
                />
              ))}
            </section>

            <BottomBar onOpen={() => openMonth(months[0])} />
          </div>
        </main>
      )}

      {screen === 'month' && (
        <main className="sub-screen">
          <div className="sub-screen__inner">
            <header className="sub-top">
              <button type="button" className="glass-circle" onClick={() => setScreen('archive')} aria-label="返回">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="button" className="icon-btn" aria-label="更多">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <circle cx="5" cy="12" r="1.6" />
                  <circle cx="12" cy="12" r="1.6" />
                  <circle cx="19" cy="12" r="1.6" />
                </svg>
              </button>
            </header>

            <div className="month-head">
              <h1 className="month-head__title">{active.name}</h1>
              <p className="month-head__count">{active.count} moments kept</p>
            </div>

            <section className="prints">
              {[active.cover, active.secondary, ...coverChoices.filter((c) => c !== active.cover && c !== active.secondary)].map(
                (src, index) => (
                  <figure
                    key={src + index}
                    className="print"
                    style={{ transform: `rotate(${index % 2 === 0 ? -1.6 : 1.8}deg)` }}
                  >
                    <img src={src || '/placeholder.svg'} alt={`${active.name} 的记忆 ${index + 1}`} />
                  </figure>
                ),
              )}
            </section>
          </div>
        </main>
      )}

      {screen === 'add' && (
        <main className="sub-screen">
          <div className="sub-screen__inner">
            <header className="sub-top">
              <button type="button" className="glass-circle" onClick={() => setScreen('archive')} aria-label="关闭">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </button>
              <span className="sub-top__title">New Folder</span>
              <button type="button" className="text-btn" onClick={keepMonth}>
                Keep
              </button>
            </header>

            <div className="add-preview">
              <span className="folder folder--static" aria-hidden="true">
                <span className="folder__photos">
                  <img className="folder__photo p1" src={form.cover || '/placeholder.svg'} alt="" />
                </span>
                <span className="folder__pocket">
                  <span className="folder__meta">
                    <span className="folder__name">{form.name.trim() || 'New Month'}</span>
                    <span className="folder__count">1 moment</span>
                  </span>
                  <span className="folder__more">
                    <i />
                    <i />
                    <i />
                  </span>
                </span>
              </span>
            </div>

            <section className="glass-sheet">
              <span className="sheet-grip" aria-hidden="true" />
              <label className="sheet-field">
                <span>Name</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="A month worth keeping"
                />
              </label>
              <label className="sheet-field note-field">
                <span>Note</span>
                <textarea
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder="A small sentence about these days…"
                  rows={2}
                />
              </label>

              <div className="cover-picker" role="group" aria-label="选择封面照片">
                {coverChoices.map((src) => (
                  <button
                    key={src}
                    type="button"
                    className={`cover-chip ${form.cover === src ? 'is-active' : ''}`}
                    onClick={() => setForm({ ...form, cover: src })}
                    aria-label="使用这张照片"
                    aria-pressed={form.cover === src}
                  >
                    <img src={src || '/placeholder.svg'} alt="" />
                  </button>
                ))}
              </div>

              <button type="button" className="keep-cta" onClick={keepMonth}>
                <FolderIcon size={16} />
                Keep this folder
              </button>
            </section>
          </div>
        </main>
      )}
    </div>
  )
}
