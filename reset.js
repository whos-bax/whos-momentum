const resetShow = document.querySelector('.resetShow');
const modal = document.querySelector('.modal');
const spanClose = document.querySelector('.close');
const resetbtn = document.querySelector('.resetbtn')

function deleteLS() {
    localStorage.clear();
    window.location.reload();
}

function resetBtnClick() {
    resetbtn.addEventListener("click", deleteLS);
}

function showBtn() {
    resetShow.addEventListener('click', function () {
        modal.style.display = 'block';
    })
}

function modalClose() {
    spanClose.addEventListener('click', function () {
        modal.style.display = 'none';
    })
    window.onclick = function (event) {
        if (event.target === modal)
            modal.style.display = 'none'
    }
}

function init() {
    showBtn();
    modalClose();
    resetBtnClick();
}

init();