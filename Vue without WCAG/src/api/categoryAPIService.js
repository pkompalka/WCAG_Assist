const API_CATEGORY_URL = ''

const handleResponse = response => {
    if(response.status >= 400){
        throw Error(response.error)
    }
    return response
}

export const getCategory = () => {
    return fetch(API_CATEGORY_URL, {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        method: 'get'
    }).catch((error) => {
        console.log(error)
      })
    .then(r => r.json())
    .then(handleResponse)
}