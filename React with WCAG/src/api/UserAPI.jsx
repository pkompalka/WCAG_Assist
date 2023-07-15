const API_USER_URL = ''

const handleResponse = response => {
    if(response.status >= 400){
        throw Error(response.error)
    }
    return response
}

export const userLogin = (userLoginRequest) => {
    return fetch(API_USER_URL + '/login', {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userLoginRequest)
    }).catch((error) => {
        console.log(error)
      })
    .then(r => r.json())
    .then(handleResponse)
}

export const userRegister = (userRegisterRequest) => {
    return fetch(API_USER_URL, {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userRegisterRequest)
    }).catch((error) => {
        console.log(error)
      })
    .then(r => r.json())
    .then(handleResponse)
}