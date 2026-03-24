export const isDateMoreThenNow = (comparedDate: Date | string | number | null): boolean | null => {
  if (comparedDate === null) return comparedDate
  return (
   new Date().setHours(0)  > new Date(comparedDate).getTime()
  )
}