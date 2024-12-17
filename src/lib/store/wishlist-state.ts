import { writable } from "svelte/store";
import { loadState, debouncedSaveState } from "../utils/storage";

export type WishlistState = Record<string, Array<string | null>>

const STORAGE_NAME = 'wishlist'
let initialState: WishlistState = {}

export const PRICE_MAP = [
    { price: '25000000', amount: 3 },
    { price: '17000000', amount: 3 },
    { price: '12000000', amount: 3 },
    { price: '5000000', amount: 3 },
    { price: '1000000', amount: 3 },
    { price: '500000', amount: 5 },
    { price: '100000', amount: 10 },
    { price: '50000', amount: 20 },
    { price: '20000', amount: 20 },
    { price: '10000', amount: 20 },
    { price: '5000', amount: 20 },
    { price: '1000', amount: 20 },
    { price: '500', amount: 20 },
    { price: '100', amount: 20 }
]

function createClearState() {
    let state: WishlistState = {}
    PRICE_MAP.forEach(({price, amount}) => {
        state[price] = Array(amount).fill(null)
    })
    return state
}

const previousState = loadState<WishlistState>(STORAGE_NAME)
if (previousState) {
    initialState = previousState
} else {
    initialState = createClearState()
}

export const wishlistState = writable<WishlistState>(initialState)

export function resetState() {
    wishlistState.set(createClearState())
}

wishlistState.subscribe((state) => {
    debouncedSaveState(STORAGE_NAME, state)
})