'use client'

import { useState } from 'react'

interface Player {
  pos: string
  posColor: string
  posBg: string
  name: string
  trait: string
  clutch: string
  color: string
  report: string
  icon: React.ReactNode
}

const players: Player[] = [
  {
    pos: "PG",
    posColor: "#534AB7",
    posBg: "#EEEDFE",
    name: "Boba",
    trait: "The floor general",
    clutch: "99%",
    color: "#D4537E",
    report: "Unmatched versatility. Guaranteed to lift the whole team's morale the second she checks in.",
    icon: (
      <svg className="s5-drink-icon mx-auto mb-2" width="30" height="38" viewBox="0 0 32 40">
        <rect x="6" y="8" width="20" height="26" rx="4" fill="#FBEAF0" stroke="#ED93B1" strokeWidth="1.5"/>
        <rect x="8" y="6" width="16" height="4" rx="2" fill="#F4C0D1"/>
        <line x1="16" y1="6" x2="16" y2="0" stroke="#D4537E" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="11" cy="28" r="2" fill="#993556"/>
        <circle cx="16" cy="30" r="2" fill="#993556"/>
        <circle cx="21" cy="27" r="2" fill="#993556"/>
        <rect x="9" y="14" width="14" height="6" rx="2" fill="#F4C0D1" opacity="0.5"/>
      </svg>
    )
  },
  {
    pos: "SG",
    posColor: "#3B6D11",
    posBg: "#EAF3DE",
    name: "Matcha latte",
    trait: "The scorer",
    clutch: "91%",
    color: "#639922",
    report: "Looks calm, hits you hard. Mid-range game is elite. Never flashy but always delivers when you need a boost.",
    icon: (
      <svg className="s5-drink-icon mx-auto mb-2" width="28" height="38" viewBox="0 0 30 40">
        <path d="M5 12 L8 36 L22 36 L25 12 Z" fill="#EAF3DE" stroke="#639922" strokeWidth="1.5"/>
        <rect x="4" y="10" width="22" height="4" rx="2" fill="#C0DD97"/>
        <rect x="7" y="16" width="16" height="8" rx="1" fill="#97C459" opacity="0.35"/>
        <path d="M9 8 C9 8 11 4 15 4 C19 4 21 8 21 8" stroke="#639922" strokeWidth="1" fill="none" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    pos: "SF",
    posColor: "#712B13",
    posBg: "#FAECE7",
    name: "Diet coke",
    trait: "The spark",
    clutch: "97%",
    color: "#D85A30",
    report: "Don't sleep on her defensive presence. Crisp reads, clean stops. The spark that shuts the whole offense down.",
    icon: (
      <svg className="s5-drink-icon mx-auto mb-2" width="26" height="38" viewBox="0 0 28 40">
        <rect x="4" y="10" width="20" height="26" rx="3" fill="#FAECE7" stroke="#D85A30" strokeWidth="1.5"/>
        <rect x="4" y="10" width="20" height="10" rx="3" fill="#F0997B" opacity="0.45"/>
        <rect x="3" y="8" width="22" height="4" rx="2" fill="#F5C4B3"/>
        <line x1="14" y1="8" x2="14" y2="2" stroke="#993C1D" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="11" y1="2" x2="17" y2="2" stroke="#993C1D" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    pos: "PF",
    posColor: "#8B7500",
    posBg: "#FFF9CC",
    name: "Mango-A-Go-Go",
    trait: "The game winner",
    clutch: "",
    color: "#B8A000",
    report: "Clutch gene? Unmatched. Never missed a big shot. Some players are built for the moment.",
    icon: (
      <svg className="s5-drink-icon mx-auto mb-2" width="24" height="38" viewBox="0 0 26 40">
        <rect x="5" y="8" width="16" height="28" rx="5" fill="#FFF9CC" stroke="#FFDE21" strokeWidth="1.5"/>
        <rect x="8" y="5" width="10" height="5" rx="2" fill="#FFE866"/>
        <circle cx="9" cy="18" r="1.5" fill="#FFDE21" opacity="0.7"/>
        <circle cx="15" cy="22" r="1.5" fill="#FFDE21" opacity="0.7"/>
        <circle cx="11" cy="27" r="1" fill="#FFDE21" opacity="0.7"/>
        <circle cx="16" cy="15" r="1" fill="#FFDE21" opacity="0.7"/>
      </svg>
    )
  },
  {
    pos: "C",
    posColor: "#0C447C",
    posBg: "#E6F1FB",
    name: "Coffee",
    trait: "The anchor",
    clutch: "100%",
    color: "#185FA5",
    report: "The franchise player. Built different. Been here since day one. When she's off, the whole team suffers. Non-negotiable starting spot.",
    icon: (
      <svg className="s5-drink-icon mx-auto mb-2" width="34" height="38" viewBox="0 0 36 40">
        <rect x="4" y="14" width="22" height="20" rx="4" fill="#E6F1FB" stroke="#378ADD" strokeWidth="1.5"/>
        <path d="M26 18 C30 18 32 20 32 23 C32 26 30 28 26 28" stroke="#85B7EB" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <rect x="4" y="12" width="22" height="4" rx="2" fill="#B5D4F4"/>
        <rect x="6" y="16" width="18" height="8" rx="2" fill="#85B7EB" opacity="0.3"/>
        <path d="M11 10 C11 10 12 7 13 10" stroke="#185FA5" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M16 9 C16 9 17 6 18 9" stroke="#185FA5" strokeWidth="1" fill="none" strokeLinecap="round"/>
      </svg>
    )
  }
]

export function StartingFiveCard() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleSelect = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const scoutText = activeIndex !== null 
    ? players[activeIndex].report 
    : 'Click any drink to pull up the scouting report.'
  
  const scoutColor = activeIndex !== null 
    ? players[activeIndex].color 
    : '#888'

  return (
    <div className="bg-white border border-[#e8e4dc] rounded-[20px] p-7 md:p-8 max-w-[900px] w-full">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-1.5">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8" fill="#F0997B" stroke="#D85A30" strokeWidth="1"/>
          <path d="M10 2C10 2 6 6 6 10C6 14 10 18 10 18" stroke="#D85A30" strokeWidth="1" fill="none"/>
          <path d="M10 2C10 2 14 6 14 10C14 14 10 18 10 18" stroke="#D85A30" strokeWidth="1" fill="none"/>
          <path d="M2 10L18 10" stroke="#D85A30" strokeWidth="1"/>
        </svg>
        <h2 className="text-lg font-semibold text-[#1a1a1a]">Enya's Starting 5</h2>
      </div>

      <p className="text-[15px] text-[#666] mb-2 leading-relaxed">
        my all-time drink lineup report.
      </p>
      <p className="text-sm italic text-[#d85a30] mb-6">
        
      </p>

      {/* Court */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 mb-4">
        {players.map((player, index) => (
          <div
            key={index}
            className={`bg-[#f9f7f3] border rounded-[14px] p-3 sm:p-2 text-center cursor-pointer transition-all ${
              activeIndex === index 
                ? 'border-2' 
                : 'border-[#e8e4dc] hover:border-[#ccc]'
            }`}
            style={activeIndex === index ? { borderColor: player.color } : {}}
            onClick={() => handleSelect(index)}
          >
            <span
              className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-full mb-2.5"
              style={{ background: player.posBg, color: player.posColor }}
            >
              {player.pos}
            </span>
            {player.icon}
            <div className="text-[13px] font-semibold text-[#1a1a1a] leading-tight mb-1 break-words">
              {player.name}
            </div>
            <div className="text-[11px] text-[#888] leading-tight">
              {player.trait}
            </div>
          </div>
        ))}
      </div>

      {/* Bench */}
      <div className="pt-3.5 border-t border-[#e8e4dc] mb-3.5">
        <div className="text-[11px] uppercase tracking-wider text-[#bbb] mb-2">
          On the bench
        </div>
        <div className="flex gap-2 flex-wrap">
          {['Fresca', 'Hojicha', 'Sparkling Water',].map((drink, i) => (
            <div
              key={i}
              className="bg-[#f9f7f3] border border-[#e8e4dc] rounded-full px-3.5 py-1 text-xs text-[#888]"
            >
              {drink}
            </div>
          ))}
        </div>
      </div>

      {/* Scout report */}
      <div className="pt-3.5 border-t border-[#e8e4dc]">
        <div className="text-[11px] uppercase tracking-wider text-[#bbb] mb-1.5">
          Scouting report
        </div>
        <p
          className="text-[13px] leading-relaxed italic transition-colors duration-200"
          style={{ color: scoutColor }}
        >
          {scoutText}
        </p>
      </div>
    </div>
  )
}

// Made with Bob
