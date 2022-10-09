interface Query {
    page: string | undefined,
    genres?: string,
    search?: string,
}
type Param = string | null

export default async function paginationFetch(routerQuery: Query, setFetch: Function, param: Param) {


    if ((routerQuery.page != undefined)) {
        let data = {}

        // Checks if the page already have a query or not
        if (!!param) {

            let page = routerQuery.page
            let genres = routerQuery.genres

            if (!!page) {
                data = await fetch(`https://api.jikan.moe/v4/manga?genres=${genres}&page=${page}`).then(r => r.json())

            } else {
                data = await fetch(`https://api.jikan.moe/v4/manga?genres=${genres}`).then(r => r.json())
            }

            setFetch(data)

        }
    }
}