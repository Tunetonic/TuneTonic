export interface UserProps {
    id: string
    name: string
    image: string
  }
  
export const userItemMapper = (arr: any[]): UserProps[] => {
return arr.map((item) => ({
    id: item.id,
    name: item.display_name,
    image: item.images[0].url,
}))
}
