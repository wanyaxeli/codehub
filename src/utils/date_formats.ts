export function formatDateOnly(date:any){
    return new Date(date).toLocaleDateString("en-GB",{
        day:"numeric",
        month:"short",
        year:"numeric"
    })
}

export function formatLongMonth(date:any){
    return new Date(date).toLocaleDateString("en-GB",{
        day:"numeric",
        month:"long",
        year:"numeric"
    })
}

export const getTimeIn24HR = (iso: string | null | undefined): string => {
  if (!iso) return '—'
  const d = new Date(iso)
  if (isNaN(d.getTime())) return '—'
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
}

// getTime24('2026-10-02T07:00:00Z') -> '10:00' (browser local time, e.g. Nairobi UTC+3)