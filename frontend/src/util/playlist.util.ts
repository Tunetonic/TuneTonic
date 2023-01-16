export interface PlaylistProps {
  id: string
  name: string
  totalTracks: number
  image: string
}

export const playlistItemMapper = (arr: any[]): PlaylistProps[] => {
  return arr.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.images[0].url,
    totalTracks: item.tracks_total,
  }))
}

export const albumItemMapper = (arr: any[]): PlaylistProps[] => {
  return arr.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.images[0].url,
    totalTracks: item.total_tracks,
  }))
}
