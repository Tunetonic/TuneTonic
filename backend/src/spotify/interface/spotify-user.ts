export interface SpotifyUser {
  country: string
  display_name: string
  email: string
  explicit_content: {
    filter_enabled: boolean
    filter_locked: boolean
  }
  external_urls: {
    spotify: string
  }
  followers: {
    href: string | null
    total: number
  }
  href: string | null
  id: string
  images: [
    {
      height: any
      url: string
      width: any
    },
  ]
  product: string
  type: string
  uri: string
}
