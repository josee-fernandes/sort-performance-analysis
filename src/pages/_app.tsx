import { ThemeProvider } from '@/components/theme-provider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

App.displayName = 'App'

export default App
