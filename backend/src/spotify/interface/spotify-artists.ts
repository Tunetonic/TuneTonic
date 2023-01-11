export interface SpotifyArtists {
  artists: {
    href: string
    items: Record<string, unknown>
    limit: number
    next: string
    cursors: {
      after: string
    }
    total: number
  }
}
