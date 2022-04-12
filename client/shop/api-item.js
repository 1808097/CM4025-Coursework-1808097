const create = async (signal, credentials, item) => {
  try {
    console.log(credentials)
    console.log(item)
    let response = await fetch('/api/items/admin', {
      method: 'POST',
      signal: signal,
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

const list = async (signal) => {
  try {
    let response = await fetch('/api/items/', {
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const update = async (params, credentials, item) => {
  try {
    let response = await fetch('/api/items/admin/' + params.itemId, {
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

const remove = async (params, credentials) => {
  try {
    let response = await fetch('/api/items/admin/' + params.itemId, {
      method: 'DELETE',
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

export {
  create,
  list,
  update,
  remove
}
