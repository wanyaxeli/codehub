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