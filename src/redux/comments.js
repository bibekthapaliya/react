import * as ActionTypes from './ActionTypes';

export const Comments=(state={
        errMess:null,
        comments:[]
    },action)=>{
    switch(action.type){
        
        case ActionTypes.ADD_COMMENTS:
        return {...state, isLoading: false, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
        return {...state, isLoading: false, errMess: action.payload};


        case ActionTypes.ADD_COMMENT:
            var comment=action.payload;
            console.log("Comment",comment);
            return {...state,comments:state.comments.concat(comment)};// state.concat is javascript function to make copy of state and modify state create a new object.

        default:
            return state;
    }
}