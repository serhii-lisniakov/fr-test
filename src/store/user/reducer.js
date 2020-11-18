const initialStore = {}

export const userReducer = (state = initialStore, action) => {
    switch (action.type) {
        case 'LOGGING':
            return action.payload
        default: return state
    }
}