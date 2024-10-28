import { createContext, useContext, useMemo, useState } from 'react'

interface ChartDataContext {
  placeholderApiQuickTime: number
  setPlaceholderApiQuickTime: React.Dispatch<React.SetStateAction<number>>
  placeholderApiBubbleTime: number
  setPlaceholderApiBubbleTime: React.Dispatch<React.SetStateAction<number>>
  placeholderApiCocktailTime: number
  setPlaceholderApiCocktailTime: React.Dispatch<React.SetStateAction<number>>
  placeholderApiInsertionTime: number
  setPlaceholderApiInsertionTime: React.Dispatch<React.SetStateAction<number>>
  placeholderApiMergeTime: number
  setPlaceholderApiMergeTime: React.Dispatch<React.SetStateAction<number>>
  placeholderApiSelectionTime: number
  setPlaceholderApiSelectionTime: React.Dispatch<React.SetStateAction<number>>
  placeholderApiHeapTime: number
  setPlaceholderApiHeapTime: React.Dispatch<React.SetStateAction<number>>
  placeholderApiNativeTime: number
  setPlaceholderApiNativeTime: React.Dispatch<React.SetStateAction<number>>
  sampleQuickTime: number
  setSampleQuickTime: React.Dispatch<React.SetStateAction<number>>
  sampleBubbleTime: number
  setSampleBubbleTime: React.Dispatch<React.SetStateAction<number>>
  sampleCocktailTime: number
  setSampleCocktailTime: React.Dispatch<React.SetStateAction<number>>
  sampleInsertionTime: number
  setSampleInsertionTime: React.Dispatch<React.SetStateAction<number>>
  sampleMergeTime: number
  setSampleMergeTime: React.Dispatch<React.SetStateAction<number>>
  sampleSelectionTime: number
  setSampleSelectionTime: React.Dispatch<React.SetStateAction<number>>
  sampleHeapTime: number
  setSampleHeapTime: React.Dispatch<React.SetStateAction<number>>
  sampleNativeTime: number
  setSampleNativeTime: React.Dispatch<React.SetStateAction<number>>
  numbersQuickTime: number
  setNumbersQuickTime: React.Dispatch<React.SetStateAction<number>>
  numbersBubbleTime: number
  setNumbersBubbleTime: React.Dispatch<React.SetStateAction<number>>
  numbersCocktailTime: number
  setNumbersCocktailTime: React.Dispatch<React.SetStateAction<number>>
  numbersInsertionTime: number
  setNumbersInsertionTime: React.Dispatch<React.SetStateAction<number>>
  numbersMergeTime: number
  setNumbersMergeTime: React.Dispatch<React.SetStateAction<number>>
  numbersSelectionTime: number
  setNumbersSelectionTime: React.Dispatch<React.SetStateAction<number>>
  numbersHeapTime: number
  setNumbersHeapTime: React.Dispatch<React.SetStateAction<number>>
  numbersNativeTime: number
  setNumbersNativeTime: React.Dispatch<React.SetStateAction<number>>
}

const ChartDataContext = createContext({} as ChartDataContext)

interface ChartDataContextProviderProps {
  children?: React.ReactNode
}

export const ChartDataContextProvider: React.FC<
  ChartDataContextProviderProps
> = ({ children }) => {
  const [placeholderApiQuickTime, setPlaceholderApiQuickTime] = useState(0)
  const [placeholderApiBubbleTime, setPlaceholderApiBubbleTime] = useState(0)
  const [placeholderApiCocktailTime, setPlaceholderApiCocktailTime] =
    useState(0)
  const [placeholderApiInsertionTime, setPlaceholderApiInsertionTime] =
    useState(0)
  const [placeholderApiMergeTime, setPlaceholderApiMergeTime] = useState(0)
  const [placeholderApiSelectionTime, setPlaceholderApiSelectionTime] =
    useState(0)
  const [placeholderApiHeapTime, setPlaceholderApiHeapTime] = useState(0)
  const [placeholderApiNativeTime, setPlaceholderApiNativeTime] = useState(0)

  const [sampleQuickTime, setSampleQuickTime] = useState(0)
  const [sampleBubbleTime, setSampleBubbleTime] = useState(0)
  const [sampleCocktailTime, setSampleCocktailTime] = useState(0)
  const [sampleInsertionTime, setSampleInsertionTime] = useState(0)
  const [sampleMergeTime, setSampleMergeTime] = useState(0)
  const [sampleSelectionTime, setSampleSelectionTime] = useState(0)
  const [sampleHeapTime, setSampleHeapTime] = useState(0)
  const [sampleNativeTime, setSampleNativeTime] = useState(0)

  const [numbersQuickTime, setNumbersQuickTime] = useState(0)
  const [numbersBubbleTime, setNumbersBubbleTime] = useState(0)
  const [numbersCocktailTime, setNumbersCocktailTime] = useState(0)
  const [numbersInsertionTime, setNumbersInsertionTime] = useState(0)
  const [numbersMergeTime, setNumbersMergeTime] = useState(0)
  const [numbersSelectionTime, setNumbersSelectionTime] = useState(0)
  const [numbersHeapTime, setNumbersHeapTime] = useState(0)
  const [numbersNativeTime, setNumbersNativeTime] = useState(0)

  const contextValues = useMemo(
    () => ({
      placeholderApiQuickTime,
      setPlaceholderApiQuickTime,
      placeholderApiBubbleTime,
      setPlaceholderApiBubbleTime,
      placeholderApiCocktailTime,
      setPlaceholderApiCocktailTime,
      placeholderApiInsertionTime,
      setPlaceholderApiInsertionTime,
      placeholderApiMergeTime,
      setPlaceholderApiMergeTime,
      placeholderApiSelectionTime,
      setPlaceholderApiSelectionTime,
      placeholderApiHeapTime,
      setPlaceholderApiHeapTime,
      placeholderApiNativeTime,
      setPlaceholderApiNativeTime,
      sampleQuickTime,
      setSampleQuickTime,
      sampleBubbleTime,
      setSampleBubbleTime,
      sampleCocktailTime,
      setSampleCocktailTime,
      sampleInsertionTime,
      setSampleInsertionTime,
      sampleMergeTime,
      setSampleMergeTime,
      sampleSelectionTime,
      setSampleSelectionTime,
      sampleHeapTime,
      setSampleHeapTime,
      sampleNativeTime,
      setSampleNativeTime,
      numbersQuickTime,
      setNumbersQuickTime,
      numbersBubbleTime,
      setNumbersBubbleTime,
      numbersCocktailTime,
      setNumbersCocktailTime,
      numbersInsertionTime,
      setNumbersInsertionTime,
      numbersMergeTime,
      setNumbersMergeTime,
      numbersSelectionTime,
      setNumbersSelectionTime,
      numbersHeapTime,
      setNumbersHeapTime,
      numbersNativeTime,
      setNumbersNativeTime,
    }),
    [
      placeholderApiQuickTime,
      setPlaceholderApiQuickTime,
      placeholderApiBubbleTime,
      setPlaceholderApiBubbleTime,
      placeholderApiCocktailTime,
      setPlaceholderApiCocktailTime,
      placeholderApiInsertionTime,
      setPlaceholderApiInsertionTime,
      placeholderApiMergeTime,
      setPlaceholderApiMergeTime,
      placeholderApiSelectionTime,
      setPlaceholderApiSelectionTime,
      placeholderApiHeapTime,
      setPlaceholderApiHeapTime,
      placeholderApiNativeTime,
      setPlaceholderApiNativeTime,
      sampleQuickTime,
      setSampleQuickTime,
      sampleBubbleTime,
      setSampleBubbleTime,
      sampleCocktailTime,
      setSampleCocktailTime,
      sampleInsertionTime,
      setSampleInsertionTime,
      sampleMergeTime,
      setSampleMergeTime,
      sampleSelectionTime,
      setSampleSelectionTime,
      sampleHeapTime,
      setSampleHeapTime,
      sampleNativeTime,
      setSampleNativeTime,
      numbersQuickTime,
      setNumbersQuickTime,
      numbersBubbleTime,
      setNumbersBubbleTime,
      numbersCocktailTime,
      setNumbersCocktailTime,
      numbersInsertionTime,
      setNumbersInsertionTime,
      numbersMergeTime,
      setNumbersMergeTime,
      numbersSelectionTime,
      setNumbersSelectionTime,
      numbersHeapTime,
      setNumbersHeapTime,
      numbersNativeTime,
      setNumbersNativeTime,
    ],
  )

  return (
    <ChartDataContext.Provider value={contextValues}>
      {children}
    </ChartDataContext.Provider>
  )
}

export const useChartData = () => useContext(ChartDataContext)
