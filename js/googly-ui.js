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
    const alertBanner = document.getElementById("alertDanger")
    alertBanner.classList.remove("d-none")

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
function ui__showLogOutButton() {
    const btnLogIn = document.getElementById("logIn")
    const btnLogOut = document.getElementById("logOut")
    const alertBanner = document.getElementById("alertDanger")

    btnLogIn.classList.add("d-none")
    btnLogOut.classList.remove("d-none")
    alertBanner.classList.add("d-none")
}

function ui__showLogInButton() {
    const btnLogIn = document.getElementById("logIn")
    const btnLogOut = document.getElementById("logOut")

    btnLogOut.classList.add("d-none")
    btnLogIn.classList.remove("d-none")
}

// essa função atualiza elementos do UI (foto de perfil e botão)
// parâmetro:
//   - nenhum
// retorno: nada
function ui__loginOk(apiResponse) {
    const user = document.getElementById("floatingInput").value

    console.log("Deu bom no login, apiResponse 👇")
    console.log(apiResponse)

    onClick_closeSingIn()
    ui__updateImage(apiResponse.profile_picture)
    ui__showLogOutButton()

    localStorage.setItem("login", "true")
    localStorage.setItem("username", user)

    // local storage: set item login:true
}

// -------------------------------------------------------------
// Frontend Interaction
// -------------------------------------------------------------

// essa função faz o login
// parâmetros:
//   - nenhum
// retorno: nada
function onClick_login() {
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

function onClick_signIn() {
    const modal = document.getElementById("modalSignin");

    modal.classList.add("d-block")
}

function onClick_signOut() {
    const profilePicture = document.getElementById("avatar")
    profilePicture.classList.add("d-none")
    ui__showLogInButton()

    localStorage.clear()

    // local storage: clean item login:true
}

function onClick_closeSingIn() {
    const modal = document.getElementById("modalSignin");
    const alertBanner = document.getElementById("alertDanger")

    modal.classList.remove("d-block")
    alertBanner.classList.add("d-none")


    // Clear all input fields inside the modal
    const inputs = modal.querySelectorAll("input");
    inputs.forEach(input => input.value = "");

}

// ----------------------------------------
// Run
// ----------------------------------------

console.log("I'm executing as soon as the web page loads!");
