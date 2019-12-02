

const authentication = (state, action) => {

    switch(action.type){
        case 'LOGIN':
            return ({
                ...state,   
                isLoggedIn: true,
                user: action.user
                
            })
        case 'LOGOUT':
            return ({
                ...state,   
                isLoggedIn: false,
                user: undefined
            })
        default:
            return({
                ...state,
                isLoggedIn: false
            })
    }
   
}

export default authentication