
const userReducer = (state= {user: {status:"401",username:"empty"}},action) =>{

	switch(action.type){

		case "USER_INFO":

			return{
				user : action.userInfo,
			};
			break;
		default :
			console.log("####################################################");
			return state;
			break;
	}

}

// export default combineReducers({userReducer})
export default userReducer
