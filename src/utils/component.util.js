export const formatXaxis=(currentTime)=>{
const date = new Date(currentTime);
return date.toLocaleDateString('en-IN',{
    day:'2-digit',
    month:'short'
})
}