export function capitalize (name: string) {
    return name[0].toUpperCase() + name.substring(1)
}

export function millisToHHMMSS (ms: number)  {
    // credits - https://stackoverflow.com/a/37096512
    const seconds = Number(ms) / 1000
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor((seconds % 3600) % 60)

    const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : ''
    const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:'
    const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : '00'

    return `${hrs}${mins}${scnds}`;
    
}