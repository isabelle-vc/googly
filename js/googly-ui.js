// -------------------------------------------------------------
// Backend Interaction
// -------------------------------------------------------------

/** Trigger the API to authenticate a new user.
 * 
 * @param {*} nickname User nickname. 
 * @param {*} password User Password.
 * @param {*} callback Any function to execute something 
 *            you want using the data retrieved from the API. 
 * @param {*} errorCallback Any function to execute something 
 *            you want if the API returns an error. 
 */
function doLogin(nickname, password, callback, errorCallback) {

    const apiEndpoint = "http://127.0.0.1:8000/login";
    const requestConfig = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "nickname": nickname,
            "password": password
        })
    }
    fetch(apiEndpoint, requestConfig)
        .then((response) => {
            if (!response.ok)
                throw {
                    "message": `HTTP error! status: ${response.status}`,
                    "payload": response
                };
            return response.json();
        })
        .then(callback)
        .catch(errorCallback);
}



// -------------------------------------------------------------
// Frontend Interaction
// -------------------------------------------------------------


// essa função exibi um erro quando as informações não batem
// parâmetros:
//   - nenhum
// retorno: mensagem de erro
function showError(error) {
    // TODO: improve this fuction 

    console.log("Deu ruim no login")
    console.log(error)

}

// essa função troca a imagem de perfil
// parâmetro:
//   - data: imagem de perfil
// retorno: nova imagem de perfil
function updateImage(data) {
    // TODO: update image in the UI
    document.getElementById("avatar").src = data.profile_picture

    console.log("Deu bom no login")
    console.log(data)
}

// TODO: Create Listener for the Button


// essa função faz o login
// parâmetros:
//   - nenhum
// retorno: nada
function onClick_login(){
    const user = "isabelle-vc"
    const password = "1234"
    doLogin(user, password, updateImage, showError)
}