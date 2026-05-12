export interface ISocialLinks {
  github: string
  linkedin: string
}

export interface IProfile {
  name: string
  nameShort: string
  email: string
  avatar: string
  brand: string
  careerStart: string
  social: ISocialLinks
}
