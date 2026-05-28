import { Component, type ErrorInfo, type ReactNode } from 'react'

type AppErrorBoundaryProps = {
  children: ReactNode
}

type AppErrorBoundaryState = {
  hasError: boolean
  message: string
}

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  override state: AppErrorBoundaryState = {
    hasError: false,
    message: '',
  }

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return {
      hasError: true,
      message: error.message || 'Unexpected application error',
    }
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('AppErrorBoundary caught an error', error, info)
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#040308] px-4 py-10 text-zinc-100">
          <div className="pixel-panel mx-auto max-w-3xl bg-[#0b0812]/95 p-6">
            <p className="font-display text-[0.62rem] tracking-[0.22em] text-fuchsia-200">
              FRONTEND ERROR
            </p>
            <h1 className="mt-4 text-2xl font-semibold text-white">
              Le frontend a rencontré une erreur de rendu.
            </h1>
            <p className="mt-3 text-sm leading-7 text-zinc-300">
              Recharge la page après le redémarrage du service. Si l’erreur revient,
              ouvre la console navigateur et récupère le message exact.
            </p>
            <pre className="mt-5 overflow-x-auto border border-white/10 bg-black/40 p-4 text-xs text-cyan-200">
              {this.state.message}
            </pre>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
