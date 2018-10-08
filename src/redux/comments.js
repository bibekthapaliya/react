import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments=(state=COMMENTS,action)=>{
    switch(action.type){
        case ActionTypes.ADD_COMMENT:
            var comment=action.payload;
            comment.id=state.length;
            comment.date=new Date().toISOString();
            console.log("Comment",comment);
            return state.concat(comment);// state.concat is javascript function to make copy of state and modify state create a new object.

        default:
            return state;
    }
}