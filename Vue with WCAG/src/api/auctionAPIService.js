const API_AUCTION_URL = ''

function handleResponse(response) {
    if (response.status >= 400) {
        throw Error(response.error)
    }
    return response
}

export const getAuction = (id) => {
    return fetch(API_AUCTION_URL + '/auction/' + id, {
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

export const getAuctionByCategory = (category) => {
    return fetch(API_AUCTION_URL + '/category/' + category, {
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

export const getAuctionBySearch = (word) => {
    return fetch(API_AUCTION_URL + '/search/' + word, {
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

export const getBoughtAuction = (id) => {
    return fetch(API_AUCTION_URL + '/bought/' + id, {
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

export const getSellingAuction = (id) => {
    return fetch(API_AUCTION_URL + '/selling/' + id, {
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

export const addAuction = (addAuctionRequest) => {
    return fetch(API_AUCTION_URL, {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addAuctionRequest)
    }).catch((error) => {
        console.log(error)
      })
    .then(handleResponse)
}

export const buyAuction = (buyAuctionRequest) => {
    return fetch(API_AUCTION_URL + '/buy', {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buyAuctionRequest)
    }).catch((error) => {
        console.log(error)
      })
    .then(handleResponse)
}