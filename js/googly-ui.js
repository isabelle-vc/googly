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
// Frontend Fuction Interaction
// -------------------------------------------------------------


// essa função exibi um erro quando as informações não batem
// parâmetros:
//   - nenhum
// retorno: mensagem de erro
function ui__showError(apiResponseError) {
    // TODO: improve this fuction 
    alert("deu ruim")
    console.log("Deu ruim no login")
    console.log(apiResponseError)

}

// essa função troca a imagem de perfil.
// parâmetro:
//   - apiResponse: resposta da API, um objecto JS.
// retorno: nenhum.
function ui__updateImage(imageURL) {
    const profilePicture = document.getElementById("avatar")
    profilePicture.classList.remove("d-none")
    profilePicture.src = imageURL

}

// TODO: Create Listener for the Button

// essa função troca o estilo e conteúdo do botão de login
// parâmetro:
//   - nenhum
// retorno: nada
function ui__updateMainButton() {
    const mainButton = document.getElementById("logInAndOut")
    // mainButton.textContent = "Sair"
    // mainButton.classList.add("btnLogOut")

    if (mainButton.classList.contains("btnLogOut")){
        mainButton.classList.remove("btnLogOut")
        mainButton.classList.add("btnLogIn")
        console.log("Botão login ok")
        return
    }
    mainButton.textContent = "Sair"
    mainButton.classList.remove("btnLogIn")
    mainButton.classList.add("btnLogOut")
    console.log("Botão sair ok") //FIXME: log de teste, apagar depois

}

// essa função atualiza elementos do UI (foto de perfil e botão)
// parâmetro:
//   - nenhum
// retorno: nada
function ui__loginOk(apiResponse) {
    console.log("Deu bom no login, apiResponse 👇")
    console.log(apiResponse)
    const modal = document.getElementById("modalSignin").remove("d-block")
    ui__updateImage(apiResponse.profile_picture)
    ui__updateMainButton()
}

// -------------------------------------------------------------
// Frontend Interaction
// -------------------------------------------------------------

// essa função faz o login
// parâmetros:
//   - nenhum
// retorno: nada
function onClick_login(){
    const user = document.getElementById("floatingInput").value
    const password = document.getElementById("floatingPassword").value
    /* Manda a API tentar autenticar o usuário */
    doLogin(
        /* Faz parte do Payload que será enviado p/ a API 👇 */
        user,  
        password, 
        /* Se der boa ✅, o doLogin vai chamar a função 👇 */
        ui__loginOk, 
        /* Se der ruim ❌, o doLogin vai chamar a função 👇 */
        ui__showError
        /* PS.: ambas as funções vão receber um Objeto (JS)
           com os dados da API, independente se deu certo, 
           ou não. */
    );
}

function onClick_signin() {
    const modal = document.getElementById("modalSignin");
    modal.classList.add("d-block")
}

function onClick_closeSingin() {
    const modal = document.getElementById("modalSignin");
    modal.classList.remove("d-block")
}