
export interface IGame {
  id: string
  title: string
  platform: string
  thumbnail: string
  genre: string
  publisher: string
  developer: string
  releaseDate: string
  shortDescription: string
}

export interface IScreenshot {
  id: number
  image: string
}
export interface IGameDetails extends IGame {
  screenshots: IScreenshot[]
  description: string
  minimumSystemRequirements: {
    os: string
    processor: string
    memory: string
    graphics: string
    storage: string
  }
  status: string
}
