'use client'

import { FolderIcon } from './folder-icon'

export function ArchiveHeader({ onAdd }: { onAdd: () => void }) {
  return (
    <header className="archive-top">
      <div className="brand">
        <span className="brand__icon">
          <FolderIcon size={17} />
        </span>
        <span className="brand__name">Notebook</span>
      </div>

      <div className="archive-top__actions">
        <button type="button" className="icon-btn" aria-label="搜索">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="m20 20-3.6-3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button type="button" className="glass-circle" onClick={onAdd} aria-label="添加记忆">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  )
}
