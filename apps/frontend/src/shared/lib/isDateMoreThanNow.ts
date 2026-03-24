export const isDateMoreThenNow = (comparedDate: Date | string | number | null): boolean | null => {
  if (comparedDate === null) return comparedDate
  return (
    Date.now() > new Date(comparedDate).getTime()
  )
}