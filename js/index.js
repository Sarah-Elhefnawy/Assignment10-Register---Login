const login = document.querySelector("#login");
const signup = document.querySelector("#signup");
const loginBtn = document.querySelector("#loginBtn");
const signupBtn = document.querySelector("#signupBtn");
const register = document.querySelector("#register");
const openLogInBtn = document.querySelector("#openLogIn");
const home = document.querySelector("#home");
const logout = document.querySelector("#logout");
const nameSignUpInput = document.querySelector("#NameSignUp");
const emailSignUpInput = document.querySelector("#emailSignUp");
const passwordSignUpInput = document.querySelector("#PasswordSignUp");
const emailLogInInput = document.querySelector("#emailLogIn");
const passwordLogInInput = document.querySelector("#PasswordLogIn");
const errorLogIn = document.querySelector("#errorLogIn");
const errorSignUp = document.querySelector("#errorSignUp");
const userName = document.querySelector("#userName");

const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

// Add User
signupBtn.addEventListener("click", function () {
    hideError(errorSignUp);
    const name = nameSignUpInput.value.trim();
    const email = emailSignUpInput.value.trim();
    const password = passwordSignUpInput.value.trim();

    if (!name || !email || !password) {
        showError(errorSignUp, "All inputs are required");
        return;
    }

    if (isEmailTaken(email)) {
        showError(errorSignUp, "Email is already taken");
        return;
    }

    if (!nameValidation(name) || !emailValidation(email) || !passwordValidation(password)) {
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password
    };
    allUsers.push(user);
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    returnToLogIn();
    clearInputs();
});

// Open Sign Up
register.addEventListener("click", function () {
    toggleDisplay(login, false);
    toggleDisplay(signup, true);
});

// Open Home
loginBtn.addEventListener("click", function () {
    const email = emailLogInInput.value.trim();
    const password = passwordLogInInput.value.trim();
    var userFound = null;
    hideError(errorLogIn);

    // Check if all inputs are filled
    if (!email || !password) {
        showError(errorLogIn, "All inputs are required");
        return;
    }

    // Find the user and save it in userFound
    for (let index = 0; index < allUsers.length; index++) {
        if (email === allUsers[index].email) {
            userFound = allUsers[index];
            break;
        }
    }

    // Check email
    if (userFound === null) {
        showError(errorLogIn, "Email is incorrect");
        return;
    }

    // Check password
    if (password != userFound.password) {
        showError(errorLogIn, "Password is incorrect");
        return;
    }

    toggleDisplay(home, true);
    toggleDisplay(login, false);
    userName.innerHTML = userFound.name;
    clearInputs();
});

// Open LogIn
function returnToLogIn() {
    toggleDisplay(login, true);
    toggleDisplay(home, false);
    toggleDisplay(signup, false);
    clearInputs();
    hideError(errorLogIn);
    hideError(errorSignUp);
}
logout.addEventListener("click", returnToLogIn);
openLogInBtn.addEventListener("click", returnToLogIn);

// clear function
function clearInputs() {
    emailLogInInput.value = "";
    passwordLogInInput.value = "";
    nameSignUpInput.value = "";
    emailSignUpInput.value = "";
    passwordSignUpInput.value = "";
}

function toggleDisplay(element, show) {
    element.classList.toggle('d-block', show);
    element.classList.toggle('d-none', !show);
}

function showError(element, message) {
    element.classList.replace('d-none', 'd-block');
    element.innerHTML = message;
}

function hideError(element) {
    element.classList.replace('d-block', 'd-none');
}

// Check if email is taken
function isEmailTaken(email) {
    for (let index = 0; index < allUsers.length; index++) {
        if (allUsers[index].email == email) {
            return true;
        }
    }
    return false
}

// Check Name input validation
function nameValidation(name) {
    var regex = /^[A-Z][a-z]{3,}$/;
    if (!regex.test(name)) {
        showError(errorSignUp, "Name must be at least 3 characters and start with a capital letter");
        return false;
    }
    return true;
}

// Check Email input validation
function emailValidation(email) {
    // \w => Matches any word character (alphanumeric & underscore).
    var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regex.test(email)) {
        showError(errorSignUp, "Email syntax is incorrect");
        return false;
    }
    return true;
}

// Check Email input validation
function passwordValidation(password) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/;
    if (!regex.test(password)) {
        showError(errorSignUp, "Password must contain uppercase, lowercase, number, and special character");
        return false;
    }
    return true;
}