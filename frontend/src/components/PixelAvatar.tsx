import { useState } from 'react'
import pixelProfile from '../assets/PixelPP.png'
import ppProfile from '../assets/PP.png'

export function PixelAvatar() {
  const [isFlipped, setIsFlipped] = useState(false)

  const currentLabel = isFlipped ? 'PP' : 'PixelPP'
  const nextLabel = isFlipped ? 'PixelPP' : 'PP'

  return (
    <div className="relative mx-auto flex w-fit flex-col items-center gap-3 animate-float">
      <div className="absolute inset-4 -z-10 bg-[rgba(232,121,249,0.22)] blur-2xl" />
      <div className="pixel-panel bg-[#0d0a13]/95 p-3">
        <div className="flip-stage h-36 w-36 sm:h-44 sm:w-44 lg:h-52 lg:w-52">
          <div className={`flip-card ${isFlipped ? 'is-flipped' : ''}`}>
            <div className="flip-face overflow-hidden border-4 border-white/10 bg-[#120d1d]">
              <img
                src={pixelProfile}
                alt="PixelPP profile portrait"
                className="block h-full w-full object-cover"
              />
            </div>
            <div className="flip-face flip-face-back overflow-hidden border-4 border-white/10 bg-[#120d1d]">
              <img
                src={ppProfile}
                alt="PP profile portrait"
                className="block h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsFlipped((value) => !value)}
        className="pixel-button pixel-button-pink w-full px-3 py-2 text-[0.48rem] sm:w-auto sm:text-[0.52rem]"
        aria-label={`Afficher ${nextLabel} au lieu de ${currentLabel}`}
      >
        Switch to {nextLabel}
      </button>
    </div>
  )
}
