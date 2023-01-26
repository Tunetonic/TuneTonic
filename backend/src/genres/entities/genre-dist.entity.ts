import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('genre_dist')
export class GenreDist {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
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
  @Column()
  anime: number
  @Column()
  black_metal: number
  @Column()
  bluegrass: number
  @Column()
  blues: number
  @Column()
  bossanova: number
  @Column()
  brazil: number
  @Column()
  breakbeat: number
  @Column()
  british: number
  @Column()
  cantopop: number
  @Column()
  chicago_house: number
  @Column()
  children: number
  @Column()
  chill: number
  @Column()
  classical: number
  @Column()
  club: number
  @Column()
  comedy: number
  @Column()
  country: number
  @Column()
  dance: number
  @Column()
  dancehall: number
  @Column()
  death_metal: number
  @Column()
  deep_house: number
  @Column()
  detroit_techno: number
  @Column()
  disco: number
  @Column()
  disney: number
  @Column()
  drum_and_bass: number
  @Column()
  dub: number
  @Column()
  dubstep: number
  @Column()
  edm: number
  @Column()
  electro: number
  @Column()
  electronic: number
  @Column()
  emo: number
  @Column()
  folk: number
  @Column()
  forro: number
  @Column()
  french: number
  @Column()
  funk: number
  @Column()
  garage: number
  @Column()
  german: number
  @Column()
  gospel: number
  @Column()
  goth: number
  @Column()
  grindcore: number
  @Column()
  groove: number
  @Column()
  grunge: number
  @Column()
  guitar: number
  @Column()
  happy: number
  @Column()
  hard_rock: number
  @Column()
  hardcore: number
  @Column()
  hardstyle: number
  @Column()
  heavy_metal: number
  @Column()
  hip_hop: number
  @Column()
  holidays: number
  @Column()
  honky_tonk: number
  @Column()
  house: number
  @Column()
  idm: number
  @Column()
  indian: number
  @Column()
  indie: number
  @Column()
  indie_pop: number
  @Column()
  industrial: number
  @Column()
  iranian: number
  @Column()
  j_dance: number
  @Column()
  j_idol: number
  @Column()
  j_pop: number
  @Column()
  j_rock: number
  @Column()
  jazz: number
  @Column()
  k_pop: number
  @Column()
  kids: number
  @Column()
  latin: number
  @Column()
  latino: number
  @Column()
  malay: number
  @Column()
  mandopop: number
  @Column()
  metal: number
  @Column()
  metal_misc: number
  @Column()
  metalcore: number
  @Column()
  minimal_techno: number
  @Column()
  movies: number
  @Column()
  mpb: number
  @Column()
  new_age: number
  @Column()
  new_release: number
  @Column()
  opera: number
  @Column()
  pagode: number
  @Column()
  party: number
  @Column()
  philippines_opm: number
  @Column()
  piano: number
  @Column()
  pop: number
  @Column()
  pop_film: number
  @Column()
  post_dubstep: number
  @Column()
  power_pop: number
  @Column()
  progressive_house: number
  @Column()
  psych_rock: number
  @Column()
  punk: number
  @Column()
  punk_rock: number
  @Column()
  r_n_b: number
  @Column()
  rainy_day: number
  @Column()
  reggae: number
  @Column()
  reggaeton: number
  @Column()
  road_trip: number
  @Column()
  rock: number
  @Column()
  rock_n_roll: number
  @Column()
  rockabilly: number
  @Column()
  romance: number
  @Column()
  sad: number
  @Column()
  salsa: number
  @Column()
  samba: number
  @Column()
  sertanejo: number
  @Column()
  show_tunes: number
  @Column()
  singer_songwriter: number
  @Column()
  ska: number
  @Column()
  sleep: number
  @Column()
  songwriter: number
  @Column()
  soul: number
  @Column()
  soundtracks: number
  @Column()
  spanish: number
  @Column()
  study: number
  @Column()
  summer: number
  @Column()
  swedish: number
  @Column()
  synth_pop: number
  @Column()
  tango: number
  @Column()
  techno: number
  @Column()
  trance: number
  @Column()
  trip_hop: number
  @Column()
  turkish: number
  @Column()
  work_out: number
  @Column()
  world_music: number
}
