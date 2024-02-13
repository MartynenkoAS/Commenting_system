
export interface commObject {
    author_avatar: string,
    author_name: string,
    date_time: string,
    text: string,
    isFavorite: boolean,
    raiting: number,
    replay_author_name?: string
}

export interface MainComment extends commObject {
    answers?: commObject[]
}