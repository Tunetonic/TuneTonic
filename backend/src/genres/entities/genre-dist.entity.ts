import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('genre_dist')
export class GenreDist {
  @Column()
  @PrimaryColumn()
  user_id: string
  @CreateDateColumn({ type: 'datetime' })
  created_at?: Date = new Date(Date.now())
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  acoustic: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  afrobeat: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  alt_rock: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  alternative: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  ambient: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  anime: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  black_metal: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  bluegrass: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  blues: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  bossanova: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  brazil: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  breakbeat: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  british: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  cantopop: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  chicago_house: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  children: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  chill: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  classical: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  club: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  comedy: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  country: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  dance: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  dancehall: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  death_metal: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  deep_house: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  detroit_techno: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  disco: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  disney: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  drum_and_bass: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  dub: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  dubstep: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  edm: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  electro: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  electronic: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  emo: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  folk: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  forro: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  french: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  funk: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  garage: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  german: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  gospel: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  goth: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  grindcore: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  groove: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  grunge: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  guitar: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  happy: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  hard_rock: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  hardcore: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  hardstyle: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  heavy_metal: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  hip_hop: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  holidays: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  honky_tonk: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  house: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  idm: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  indian: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  indie: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  indie_pop: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  industrial: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  iranian: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  j_dance: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  j_idol: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  j_pop: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  j_rock: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  jazz: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  k_pop: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  kids: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  latin: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  latino: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  malay: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  mandopop: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  metal: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  metal_misc: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  metalcore: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  minimal_techno: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  movies: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  mpb: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  new_age: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  new_release: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  opera: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  pagode: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  party: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  philippines_opm: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  piano: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  pop: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  pop_film: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  post_dubstep: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  power_pop: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  progressive_house: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  psych_rock: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  punk: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  punk_rock: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  r_n_b: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  rainy_day: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  reggae: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  reggaeton: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  road_trip: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  rock: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  rock_n_roll: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  rockabilly: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  romance: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  sad: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  salsa: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  samba: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  sertanejo: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  show_tunes: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  singer_songwriter: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  ska: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  sleep: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  songwriter: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  soul: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  soundtracks: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  spanish: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  study: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  summer: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  swedish: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  synth_pop: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  tango: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  techno: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  trance: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  trip_hop: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  turkish: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  work_out: number
  @Column({ type: 'decimal', precision: 10, scale: 7, default: 0 })
  world_music: number
}
