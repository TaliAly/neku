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
    status: string,
    synopsis: string,
    chapters: number,
    volumes: number,
    genres: {
        mal_id: string,
        name: string
    }[],
}

export interface Target {
    mal_id: string,
    title: string,
    images: {
        webp: {
            image_url: string,
            small_image_url: string,
        }
    }
}

export interface PropsData {
    data: {
        data: BookInfo,
        status: number,

        pagination: {
            last_visible_page: number,
            has_next_page?: boolean,
            current_page: number,
            items: {
                "count": number,
                "total": number,
                "per_page"?: number
            },
        },
    },

}