export interface BookInfo {
    title: string,
    mal_id: string,
    background: string,
    images: {
        webp: {
            image_url: string,
            small_image_url: string,
        }
    }
    synopsis: string,
    genres: {
        mal_id: string,
        name: string
    }[]
}

export interface Target {
    mal_id: string,
    title: string,
    images: {
        webp: {
            image_url:string,
            small_image_url:string,
        }
    }
}