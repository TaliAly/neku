
interface pagProps {
    last_visible_page: number,
    has_next_page: boolean,
    current_page: number,
    items: {
        "count": number,
        "total": number,
        "per_page": number
    }
}

function Pagination(Props:pagProps) {

    const pages:number[] = [];

    for (let index = 0; index < (Props.items.count / Props.items.total); index++) {
        pages.push(index);
        
    }

    return (
        <div>
            {}
        </div>
    )
}

export default Pagination