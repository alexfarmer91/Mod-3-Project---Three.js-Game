
let pointsDisplay = document.getElementById("points-display");
let points = 0;
pointsDisplay.innerText = `${points} points`

let matchDisplay = document.getElementById("match-display") 
// matchShape = "sphere"
// matchColor = "purple"

function determineMatchProfile(matchColor, matchShape) {
    let myColor = matchColor
    let myShape = matchShape

    if (myColor === undefined){
        myColor = ""
    }

    if (myShape === undefined){
        myShape = ""
    }
matchProfile = {shape: myShape, color: myColor}
matchDisplay.innerText = `hit all the ${matchProfile.color} ${matchProfile.shape}s`
}
//hardcoding, for now
// determineMatchProfile(matchColor, matchShape);

function buildSignInForm(){
    let signInForm = document.createElement('form');
    signInForm.id = "sign-in-form";

let usernameField = document.createElement('input');
usernameField.id = "username-field";
usernameField.type = "text";
usernameField.name = "username";
usernameField.placeholder = "username..."

let passwordField = document.createElement('input');
passwordField.id = "password-field"
passwordField.type = "password";
passwordField.name = "password";
passwordField.placeholder = "password..."

let loginButton = document.createElement('input');
loginButton.type = 'submit';
loginButton.value = "submit";
loginButton.className = "button";
loginButton.style['background-color'] = 'Transparent';
loginButton.style['font-family'] = 'Pixel Square';
loginButton.style['color'] = 'rgb(0, 255, 0)';
loginButton.style['border-color'] = 'rgb(0, 255, 0)';

let backButton = document.createElement('button');
backButton.innerText = "back";
backButton.className = "button";
backButton.style['background-color'] = 'Transparent';
backButton.style['font-family'] = 'Pixel Square';
backButton.style['color'] = 'rgb(0, 255, 0)';
backButton.style['border-color'] = 'rgb(0, 255, 0)';
backButton.addEventListener('click', () => {
    sphereAudio.play();
    buildReturningUserDiv();

})
signInForm.appendChild(usernameField)
signInForm.appendChild(passwordField)
signInForm.appendChild(loginButton)
signInForm.appendChild(backButton)

 returningUserDiv.innerHTML = "";
 returningUserDiv.appendChild(signInForm);
}

let returningUserDiv = document.getElementById("returning-user-div");

function buildReturningUserDiv(){
    returningUserDiv.innerHTML = "";

    let divider = document.createElement('div')
    divider.className = "divider";

let newUserBtn = document.createElement('button')
newUserBtn.id = "new-player";
newUserBtn.className = "button";
newUserBtn.innerText = "new player";
newUserBtn.style['background-color'] = 'Transparent';
newUserBtn.style['font-family'] = 'Pixel Square';
newUserBtn.style['color'] = 'rgb(0, 255, 0)';
newUserBtn.style['border-color'] = 'rgb(0, 255, 0)';

newUserBtn.addEventListener('click', () => {
    sphereAudio.play();
    buildSignInForm();
    let newUserForm = document.querySelector("#sign-in-form");
    newUserForm.addEventListener('submit', (e) => {
        e.preventDefault()
        //the method here should be post to Users table
    })
    
})

returningUserDiv.appendChild(newUserBtn)
returningUserDiv.appendChild(divider)

let returningUserBtn = document.createElement('button')
returningUserBtn.id = "returning-player";
returningUserBtn.className = "button";
returningUserBtn.innerText = "returning player";
returningUserBtn.style['background-color'] = 'Transparent';
returningUserBtn.style['font-family'] = 'Pixel Square';
returningUserBtn.style['color'] = 'rgb(0, 255, 0)';
returningUserBtn.style['border-color'] = 'rgb(0, 255, 0)';

returningUserBtn.addEventListener('click', () => {
    sphereAudio.play();
    buildSignInForm();
    let returningUserForm = document.querySelector("#sign-in-form");
    returningUserForm.addEventListener('submit', (e) => {
        //the method here should be GET to Users table
        e.preventDefault()

    })

})

returningUserDiv.appendChild(returningUserBtn)
}
buildReturningUserDiv();