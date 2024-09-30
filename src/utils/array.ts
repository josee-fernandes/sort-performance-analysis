/* eslint-disable @typescript-eslint/no-explicit-any */
export const shuffle = (array: any[]) => {
  const copy = array.slice()

  for (let i = copy.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }

  return copy
}
