export const formatDate = (rawDate: Date | null, mode: 'ui' | 'server' = 'server') => {
  if (rawDate === null) {
    return null
  }
  const date = new Date(rawDate);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yy = String(date.getFullYear()).slice(-2)
  const yyyy = String(date.getFullYear());
  if (mode === 'server') {
    return `${yyyy}-${mm}-${dd}`;
  } else {
    return `${dd}.${mm}.${yy}`;
  }

};