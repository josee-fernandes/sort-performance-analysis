import { ThemeProvider } from '@/components/theme-provider'
import { queryClient } from '@/lib/tanstack-query'
import '@/styles/globals.css'
import { QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

App.displayName = 'App'

export default App
