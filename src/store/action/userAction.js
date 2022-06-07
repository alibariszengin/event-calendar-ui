export const LoggedInUser = (user) =>{

	return {
		type:"USER_INFO",
		userInfo:user
	};
};

export default LoggedInUser;
