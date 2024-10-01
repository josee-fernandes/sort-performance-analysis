import { clear } from 'console'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

type SortingType =
  | 'none'
  | 'quick'
  | 'bubble'
  | 'cocktail'
  | 'insertion'
  | 'merge'
  | 'selection'

interface SortingStateContext {
  nowSorting: SortingType
  updateNowSorting: (sorting: SortingType) => void
}

const SortingStateContext = createContext({} as SortingStateContext)

interface SortingStateContextProviderProps {
  children?: React.ReactNode
}

export const SortingStateContextProvider: React.FC<
  SortingStateContextProviderProps
> = ({ children }) => {
  const [nowSorting, setNowSorting] = useState<SortingType>('quick')

  const updateNowSorting = useCallback((sorting: SortingType) => {
    const timeout = setTimeout(() => {
      setNowSorting(sorting)

      clearTimeout(timeout)
    }, 2000)
  }, [])

  const contextValues = useMemo(
    () => ({
      nowSorting,
      updateNowSorting,
    }),
    [nowSorting, updateNowSorting],
  )

  return (
    <SortingStateContext.Provider value={contextValues}>
      {children}
    </SortingStateContext.Provider>
  )
}

export const useSortingState = () => useContext(SortingStateContext)
