import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

const stars = [
  { top: '8%', left: '10%', delay: '0s', size: 8 },
  { top: '16%', left: '76%', delay: '0.8s', size: 6 },
  { top: '22%', left: '32%', delay: '1.4s', size: 10 },
  { top: '34%', left: '88%', delay: '0.2s', size: 7 },
  { top: '48%', left: '18%', delay: '1.8s', size: 5 },
  { top: '56%', left: '62%', delay: '1.1s', size: 9 },
  { top: '72%', left: '80%', delay: '0.6s', size: 8 },
  { top: '78%', left: '24%', delay: '1.5s', size: 6 },
  { top: '84%', left: '54%', delay: '0.9s', size: 7 },
]

export function AppShell() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-zinc-100">
      <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(232,121,249,0.18),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(103,232,249,0.16),_transparent_24%),linear-gradient(180deg,_#100611_0%,_#07040d_38%,_#040308_100%)]" />
        <div className="grid-backdrop absolute inset-0 opacity-35" />
        <div className="scanlines absolute inset-0 opacity-20" />
        <div className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-[rgba(232,121,249,0.14)] blur-3xl" />
        <div className="absolute bottom-10 right-[-6rem] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        {stars.map((star) => (
          <span
            key={`${star.top}-${star.left}`}
            className="twinkle absolute block rounded-none bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-16 pt-28 sm:px-6 sm:pt-24 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}
