const form = document.querySelector('.js-form'),
    input = form.querySelector('input'),
    greeting = document.querySelector('.js-greetings');

const USER_LS = 'currentUser',
    SHOWING_CL = 'showing';

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    painGreeting(currentValue)
    saveName(currentValue)
}

function saveName(text) {
    localStorage.setItem(USER_LS, text);
 }

function askForName() {
    form.classList.add(SHOWING_CL);
    form.addEventListener('submit', handleSubmit)
}

function painGreeting(text) {
    form.classList.remove(SHOWING_CL)
    greeting.classList.add(SHOWING_CL)
    greeting.innerText = `Hello ${text}`
}
function loadName() {
    const currentUser = localStorage.getItem(USER_LS)
    if (currentUser === null) {
        askForName();
    } else {
        painGreeting(currentUser);
    }

}
function init() {
    loadName();
}

init();