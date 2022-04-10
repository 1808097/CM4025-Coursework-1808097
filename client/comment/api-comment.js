const create = async (comment) => {
    try {
        let response = await fetch('/api/comments/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const list = async (signal) => {
    try {
        let response = await fetch('/api/comments/', {
            method: 'GET',
            signal: signal,
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const update = async (params, credentials, user) => {
    try {
        let response = await fetch('/api/comments/' + params.commentId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(comment)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const remove = async (params, credentials) => {
    try {
        let response = await fetch('/api/comments/' + params.commentId, {
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
