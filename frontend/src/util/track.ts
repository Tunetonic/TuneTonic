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
    uri: item.track.uri,
    type: item.track.type,
    track_number: item.track.track_number,
    preview_url: item.track.preview_url,
    name: item.track.name,
    image: item.track.album.images[0].url,
    // album_name: item.track.album.name,
    artist_name: item.track.artists[0].name,
    id: item.track.id,
    duration_ms: item.track.duration_ms
  }))
}