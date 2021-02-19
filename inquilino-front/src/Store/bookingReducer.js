export default function bookingReducer(state = null, action) {
    switch (action.type) {
        case 'booking':
            return action.data
        default:
            return state
    }
}