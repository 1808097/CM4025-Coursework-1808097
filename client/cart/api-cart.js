const create = async (cart) => {
    try {
        let response = await fetch('/api/cart/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const read = async (params, credentials, signal) => {
    try {
      let response = await fetch('/api/cart/' + params.cartId, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    } catch (err) {
      console.log(err)
    }
}

const update = async (params, credentials, cart) => {
    try {
        let response = await fetch('/api/cart/' + params.cartId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(item)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


export {
    create,
    read,
    update
}
