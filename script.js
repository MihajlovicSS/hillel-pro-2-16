'use strict'

const enterNicknameInput = document.querySelector('#inputNickname')
const submitBtn = document.querySelector('#submitButton')
const form = document.querySelector('#form')

submitBtn.addEventListener('click', onSubmitButtonClick)
enterNicknameInput.focus()

function onSubmitButtonClick(){
    if(isNotEmpty(enterNicknameInput.value)){
        fetch('https://api.github.com/users/' + enterNicknameInput.value)
        .then((response) => {
            if (!response.ok) {
                showError()
                throw Error('This user doesnt exist')
            }
            else return response.json()
        })
        .then((data) => {
            generateUserHTML(data)
        })
        .catch((error) => {
            console.warn(error)
        })
    }
    else alert('The field is empty!')
    clearInput()
}

function generateUserHTML(user){
    const userTemplateHTML = `
    <div class="form__user">
        <img class="form__user-photo" src="${user.avatar_url}">
        <p class="form__user-data">Name: ${user.name}</p>
        <p class="form__user-data">Number of repositories: ${user.public_repos}</p>
        <p class="form__user-data">Number of followers: ${user.followers}</p>
        <p class="form__user-data">Number of following: ${user.following}</p>
    </div>
    `
    form.insertAdjacentHTML('beforeend', userTemplateHTML)
}

function clearInput(){
    enterNicknameInput.value = ''
}

function isNotEmpty (value){
    return value.trim()
}

function showError(){
    alert('Error 404!')
}



//   8748593
//   MihajlovicSS
//   volodymyr-kryvoshapov
//   https://api.github.com/users/MihajlovicSS