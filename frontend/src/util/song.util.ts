export interface SongProps {
  id: string
  name: string
  artist: string
  href: string
  length: string
  image: string
}

function millisToMinutesAndSeconds(millis: number) {
  var minutes = Math.floor(millis / 60000)
  var seconds = Math.floor((millis % 60000) / 1000)
  return seconds == 60
    ? minutes + 1 + ':00'
    : minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

export const songMapper = (arr: any[]): SongProps[] => {
  return arr.map((item) => ({
    id: item.track.id,
    name: item.track.name,
    artist: item.track.artists.map((a) => a.name).join(', '),
    href: item.track.href,
    length: millisToMinutesAndSeconds(item.track.duration_ms),
    image: item.track.album.images[0]?.url,
  }))
}
