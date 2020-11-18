const initialStore = {}

export const userReducer = (state = initialStore, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.payload
        case 'REGISTER':
            return action.payload
        default: return state
    }
}