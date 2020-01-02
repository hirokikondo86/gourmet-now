const http = axios.create({
    baseURL: 'https://gourmet-now.site/api/',
    timeout: 2000,
})

export default function requestApi(params) {
    try {
        const res = http.get('gourmet', {
            params: params
        })
        return res
    } catch (error) {
        console.log(error)
    }
}