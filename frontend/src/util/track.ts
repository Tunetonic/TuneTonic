export interface Track {
  uri: string
  type: string
  track_number: number
  preview_url?: string
  name: string
  id: string
  image: string
  // album_name: string
  artist_name: string
  duration_ms: number
}

export const trackItemMapper = (arr: any[]): Track[] => {
  return arr.map((item) => ({
    uri: item.uri,
    type: item.type,
    track_number: item.track_number,
    preview_url: item.preview_url,
    name: item.name,
    image: item.album.images[0].url,
    // album_name: item.track.album.name,
    artist_name: item.artists[0].name,
    id: item.id,
    duration_ms: item.duration_ms
  }))
}