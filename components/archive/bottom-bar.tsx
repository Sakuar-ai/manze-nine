'use client'

import { FolderIcon } from './folder-icon'

export function BottomBar({ onOpen }: { onOpen: () => void }) {
  return (
    <footer className="archive-bottom">
      <div className="archive-bottom__note">
        <span>Keep noticing.</span>
        <i aria-hidden="true" />
      </div>
      <button type="button" className="glass-circle folder-btn" onClick={onOpen} aria-label="所有文件夹">
        <FolderIcon size={19} />
      </button>
    </footer>
  )
}
