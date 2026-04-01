'use client'

import { useState } from 'react'
import Image from 'next/image'

interface HobbyNote {
  id: number
  tag: string
  title: string
  mood: string
  badge: string
  image: string
}

const hobbyNotes: HobbyNote[] = [
  {
    id: 1,
    tag: 'OUTSIDE',
    title: 'hiking!',
    mood: '',
    badge: '🥾',
    image: '/projects/atlas-system.jpg',
  },
  {
    id: 2,
    tag: 'KITCHEN',
    title: 'making press-on nails',
    mood: '',
    badge: '🧋',
    image: '',
  },
  {
    id: 3,
    tag: 'PLAY',
    title: 'basketball mode',
    mood: 'head clears fast',
    badge: '🏀',
    image: '/projects/clarity-research.jpg',
  },
  {
    id: 4,
    tag: 'CITY',
    title: 'new york wandering',
    mood: '',
    badge: '🗽',
    image: '/projects/flow-dashboard.jpg',
  },
]

const noteColors = [
  { bg: '#EEEDFE', text: '#534AB7', border: '#7C6FD9' },
  { bg: '#EAF3DE', text: '#3B6D11', border: '#639922' },
  { bg: '#FAECE7', text: '#712B13', border: '#D85A30' },
  { bg: '#E6F1FB', text: '#185FA5', border: '#378ADD' },
]

export function HikingGallery() {
  const [selectedNote, setSelectedNote] = useState<number | null>(null)

  const handleSelect = (id: number) => {
    setSelectedNote(selectedNote === id ? null : id)
  }

  const activeNote = selectedNote !== null
    ? hobbyNotes.find((h) => h.id === selectedNote)
    : null

  return (
    <div className="bg-white border border-[#e8e4dc] rounded-[20px] p-7 md:p-8 max-w-[900px] w-full">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-1.5">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8" fill="#E6F1FB" stroke="#378ADD" strokeWidth="1" />
          <path d="M6.5 10.5L9 13L13.8 8.2" stroke="#185FA5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 6.2L7.2 5M14 15L12.8 16.2" stroke="#85B7EB" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <h2 className="text-lg font-semibold text-[#1a1a1a]">hobby journal</h2>
      </div>

      <p className="text-[15px] text-[#666] mb-2 leading-relaxed">
        some other things I enjoy.
      </p>
      <p className="text-sm italic text-[#639922] mb-6">
        
      </p>

      {/* Hobby cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {hobbyNotes.map((hobby, index) => {
          const colors = noteColors[index % noteColors.length]
          const isSelected = selectedNote === hobby.id

          return (
            <div
              key={hobby.id}
              className={`bg-[#f9f7f3] border rounded-[14px] p-3 text-center cursor-pointer transition-all ${isSelected ? 'border-2' : 'border-[#e8e4dc] hover:border-[#ccc]'
                }`}
              style={isSelected ? { borderColor: colors.border } : {}}
              onClick={() => handleSelect(hobby.id)}
            >
              <span
                className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-full mb-2.5"
                style={{ background: colors.bg, color: colors.text }}
              >
                {hobby.tag}
              </span>
              <div className="text-3xl mb-2">{hobby.badge}</div>
              <div className="text-[13px] font-semibold text-[#1a1a1a] leading-tight mb-1 break-words">
                {hobby.title}
              </div>
              <div className="text-[11px] text-[#888] leading-tight">
                {hobby.mood}
              </div>
            </div>
          )
        })}
      </div>

      {/* Hobby photo */}
      <div className="pt-3.5 border-t border-[#e8e4dc]">
        <div className="text-[11px] uppercase tracking-wider text-[#bbb] mb-1.5">
          hobby snapshot
        </div>
        {activeNote ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-2xl">{activeNote.badge}</span>
              <div>
                <div className="font-semibold text-[#1a1a1a]">{activeNote.title}</div>
                <div className="text-xs text-[#888]">{activeNote.mood}</div>
              </div>
            </div>
            <div className="relative w-full h-56 md:h-64 rounded-[14px] overflow-hidden border border-[#e8e4dc] bg-[#f9f7f3] transition-all duration-300 scale-100">
              <Image
                key={activeNote.id}
                src={activeNote.image}
                alt={activeNote.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </div>
          </div>
        ) : (
          <p className="text-[13px] text-[#888] leading-relaxed italic">
            
          </p>
        )}
      </div>
    </div>
  )
}
