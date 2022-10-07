

interface Query {
    page: string,
    genres: string,
    search: string,
}
type Param = string | null

export default async function usePagination(routerQuery: Query, setFetch: Function, param: Param) {

    let data = {}

    if ((routerQuery.page != "1")) {
        setFetch(null)

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

            if (!!routerQuery.page) {
                data = await
                    fetch(`https://api.jikan.moe/v4/manga?${param}=${query()}&page=${routerQuery.page}`)
                        .then(r => r.json())
                console.log(`https://api.jikan.moe/v4/manga?${param}=${query()}&page=${routerQuery.page}`);
            } else {
                data = await
                    fetch(`https://api.jikan.moe/v4/manga?${param}=${query()}`)
                        .then(r => r.json())
            }


            setFetch(data)

        }
    }
}