

const setToken = (token) => localStorage.setItem('token', JSON.stringify(token))

const getToken = () => {
    const token = localStorage.getItem('token')
    if (!token) return null;
    try {
        return JSON.parse(token)
    } catch (e) {
        return token;
    }
}

const clearToken = () => localStorage.removeItem('token')

export { setToken, getToken, clearToken }