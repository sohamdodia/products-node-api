const authenticationFailureResponse = {
	status: false,
	error_code: 1,
	error: 'Authentication failure'
};

const idNotFoundResponse = {
	status: false,
	error_code: 2,
	error: 'ID not found'
};

const emailNotFoundResponse = {
	status: false,
	error_code: 3,
	error: 'Email not found'
};

const passwordNotMatchResponse = {
	status: false,
	error_code: 4,
	error: 'Wrong Password'
};

module.exports = {
	idNotFoundResponse,
	authenticationFailureResponse,
	passwordNotMatchResponse,
	emailNotFoundResponse
};
