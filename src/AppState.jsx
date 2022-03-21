// // application level state
// import React, {useContext, useReducer} from 'react';

// const initialState = {
//     // url: "http://amreactrailsbackend.herokuapp.com",
//     // url: 'https://sandbox.cardscan.ai/v1/access-token',

//     token: null,
//     username: null
// }

// // reducer --one big function to handle everything (like redux)
// //alwasys passed two args. action = object with a type key, string value. Has a payload
// // action = {type: "", payload: ---}
// const reducer = (state, action) => {
//     let newState;
//     switch(action.type) {
//         case "login":
//             newState = {...state, ...action.payload};
//             return newState;
//             break;
//         default: 
//             return state;
//             break;
//     }
// };
// //create App context outside of componenet. Object that provides state to everyting
// const AppContext = React.createContext(null)

// export const AppState = (props) => {   
//     //dispatch function passs the action the reducer instead of specifiying exactly what 
//     // i want to set state to in setState
//     const [state, dispatch] = useReducer(reducer, initialState);
//     //inititalState becomes the state. 
//     //dispath function, we pass it an action, that runs reducer function
//     return (
//         <AppContext.Provider value={{state, dispatch}}>
//             {props.children}
//         </AppContext.Provider>
//     )
// }

// //custom hook allows us to pull context whereever we need it
// export const useAppState = () => {
//     return React.useContext(AppContext)
// }


// // const reducer = (state, action) => {
// //     switch(action.type) {
// //         case "signup":
// //             fetch(state.url + "/users/", {
// //                 method: "post",
// //                 headers: {
// //                     "Content-Type": "application/json"
// //                 },
// //                 body: JSON.stringify(action.payload)
// //             })
// //             .then(response => response.json())
// //             .then(user => {
// //                 return {
// //                     ...state,
// //                     token: user.token,
// //                     username: user.username
// //                 }
// //             })
// //             break
// //         case "login":
// //             fetch(state.url + "/login/", {
// //                 method: "post",
// //                 headers: {
// //                     "Content-Type": "application/json"
// //                 },
// //                 body: JSON.stringify(action.payload)
// //             })
// //             .then(response => response.json())
// //             .then(user => {
// //                 console.log(user)
// //                 console.log(state)
// //                 return {
// //                     ...state,
// //                     token: user.token,
// //                     username: user.username
// //                 }
// //             })
// //             break
// //         default: 
// //             return state
// //         }
// //     }