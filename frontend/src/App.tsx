import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppErrorBoundary } from './components/AppErrorBoundary'
import { AppShell } from './layouts/AppShell'

const HomePage = lazy(() =>
  import('./pages/HomePage').then((module) => ({ default: module.HomePage })),
)
const ProjectsPage = lazy(() =>
  import('./pages/ProjectsPage').then((module) => ({ default: module.ProjectsPage })),
)
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })),
)
const ChatPage = lazy(() =>
  import('./pages/ChatPage').then((module) => ({ default: module.ChatPage })),
)
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((module) => ({ default: module.ContactPage })),
)

function App() {
  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="min-h-screen bg-[#040308] px-4 py-10 text-zinc-100">
              <div className="pixel-panel mx-auto max-w-3xl bg-[#0b0812]/95 p-6">
                <p className="font-display text-[0.62rem] tracking-[0.22em] text-cyan-200">
                  LOADING
                </p>
                <p className="mt-4 text-sm leading-7 text-zinc-300">
                  Chargement du frontend...
                </p>
              </div>
            </div>
          }
        >
          <Routes>
            <Route element={<AppShell />}>
              <Route index element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppErrorBoundary>
  )
}

export default App
