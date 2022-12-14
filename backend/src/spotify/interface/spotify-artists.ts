export interface SpotifyArtists {
    artists: {
        href: string,
        items: [
            {}
        ],
        limit: number,
        next: string,
        cursors: {
            after: string
        },
        total: number
    }
}
