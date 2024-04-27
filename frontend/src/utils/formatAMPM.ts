export function formatAMPM(date: Date) {
  return date.toLocaleString(
    'en-US', 
    { 
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true
   }
  );
}