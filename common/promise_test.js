function fetch(params) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject(new Error("Server Error"));
		}, 1000);
	});
}

  

const catchError = () => {
	try {
		console.log('loading...')
		const params = {
			model: "v1",
			brand: '42dot',
		}
		throw fetch(params);
	} catch (error) {
		console.error(error);
	}
}

// 결과는?
catchError();
