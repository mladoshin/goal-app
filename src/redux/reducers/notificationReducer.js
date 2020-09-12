export const notificationReducer = (state=["1"], action) => {
    var tempState = state
    switch (action.type){
        case "NOTIFICATION/PUSH":
          tempState.push(action.payload)
            return tempState
        case "NOTIFICATION/REMOVE":
            tempState.slice(action.payload, 1)
            return tempState
        default:
            return state
    }
  }