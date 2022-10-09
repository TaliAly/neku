interface Query {
    page: string | undefined,
    genres?: string,
    search?: string,
}
type Param = string | null

export default async function paginationFetch(routerQuery: Query, setFetch: Function, param: Param) {


    if ((routerQuery.page != "1")) {
        let data = {}

        // Checks if the page already have a query or not
        if (!!param) {

            // to know whenever one or the other exist
            let query = () => {
                if (routerQuery.search == undefined) {
                    return routerQuery.genres
                }
                return routerQuery.search

            }
            query()

            let page = routerQuery.page
            let genres = routerQuery.genres


            if (!!page) {
                data = await fetch(`https://api.jikan.moe/v4/manga?genre=${genres}&sfw=true&page=${page}`).then(r => r.json())
            } else {
                data = await fetch(`https://api.jikan.moe/v4/manga?genre=${genres}&sfw=true`).then(r => r.json())
            }

            setFetch(data)

        }
    }
}