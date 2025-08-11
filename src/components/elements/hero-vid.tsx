import React from 'react'

function HeroVid() {
  return (
<div className="absolute inset-0 w-full h-full overflow-hidden">
  <iframe
    className="absolute top-0 left-0 w-[120%] h-[120%] -translate-x-[10%] -translate-y-[10%] scale-[1.1]"
    src="https://www.youtube.com/embed/eRg-t3pA_QU?autoplay=1&mute=1&loop=1&playlist=eRg-t3pA_QU&controls=0&modestbranding=1&showinfo=0&playsinline=1"
    allow="autoplay; fullscreen"
  ></iframe>
</div>

  )
}

export default HeroVid