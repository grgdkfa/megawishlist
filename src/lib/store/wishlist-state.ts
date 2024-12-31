import { writable } from "svelte/store";
import { loadState, debouncedSaveState } from "../utils/storage";

interface WishlistBlock {
    price: number,
    items: Array<string | null>
}

export type WishlistState = WishlistBlock[]

const STORAGE_NAME = 'wishlist'
let initialState: WishlistState | null = null

export const PRICE_MAP = [
    { price: 25000000, amount: 3 },
    { price: 17000000, amount: 3 },
    { price: 12000000, amount: 3 },
    { price: 5000000, amount: 3 },
    { price: 1000000, amount: 3 },
    { price: 500000, amount: 5 },
    { price: 100000, amount: 10 },
    { price: 50000, amount: 20 },
    { price: 20000, amount: 20 },
    { price: 10000, amount: 20 },
    { price: 5000, amount: 20 },
    { price: 1000, amount: 20 },
    { price: 500, amount: 20 },
    { price: 100, amount: 20 }
]

function createClearState() {
    let state: WishlistState = []
    PRICE_MAP.forEach(({price, amount}) => {
        state.push({
            price,
            items: Array(amount).fill(null)
        })
    })
    return state
}

function createInitialState(baseIncome: number | null) {
    if (!baseIncome) {
        return createClearState()
    }
    const map = [
        { price: 1000000, amount: 3 },
        { price: 500000, amount: 5 },
        { price: 100000, amount: 10 },
        { price: 50000, amount: 20 },
        { price: 20000, amount: 20 },
        { price: 10000, amount: 20 },
        { price: 5000, amount: 20 },
        { price: 1000, amount: 20 },
        { price: 500, amount: 20 },
        { price: 100, amount: 20 }
    ]
    const steps = [20, 30, 50, 100]
    steps.forEach(step => {
        const level = Math.round(baseIncome * step)
        if (level <= map[0].price) {
            return
        }
        map.unshift({
            price: Math.round(baseIncome * step),
            amount: 3
        })
    })
    let state: WishlistState = []
    map.forEach(({price, amount}) => {
        state.push({
            price,
            items: Array(amount).fill(null)
        })
    })
    return state
}

const previousState = loadState<WishlistState>(STORAGE_NAME)
if (previousState) {
    initialState = previousState
}

export const wishlistState = writable<WishlistState | null>(initialState)

export function resetState(baseIncome: number | null) {
    wishlistState.set(createInitialState(baseIncome))
}

export function clearState() {
    wishlistState.set(null)
}

wishlistState.subscribe((state) => {
    debouncedSaveState(STORAGE_NAME, state)
})