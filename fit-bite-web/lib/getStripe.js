import {loadStripe} from '@stripe/stripe-js'
let stripePromise;
const getStripe = ()=>{
    if(!stripePromise){
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE);
    }
    return stripePromise;
}
export default getStripe;