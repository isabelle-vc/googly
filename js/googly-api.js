// -------------------------------------------------------------
// Backend Interaction
// -------------------------------------------------------------

/** Trigger the API to authenticate a new user.
 * 
 * @param {*} nickname User nickname. 
 * @param {*} password User Password.
 * @param {*} callback Any function to execute something 
 *            you want using the data retrieved from the API. 
 */
function doLogin(nickname, password, callback, errorCallback) {

    const apiEndpoint = "http://127.0.0.1:8000/login";
    const requestConfig = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nickname: nickname,
            password: password
        })
    }
    fetch(apiEndpoint, requestConfig)
        .then((response) => {
            if (!response.ok)
                throw {
                    "error": `HTTP error! status: ${response.status}`,
                    "payload": response
                };
            return response.json();
        })
        .then(callback)
        .catch(errorCallback);
}


