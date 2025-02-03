import { Express, Request, Response } from 'express'
import { IGame, IGameDetails, IScreenshot } from './interface'

const apiBaseUrl = 'https://api.dev.cloud.barbooksaustralia.com/code-challenge'
class GameController {
  init = (app: Express) => {
    console.info('Initialising Game Controller.')
    app.get('/api/games', this.getGames)
    app.get('/api/games/:gameId', this.getGameByGameId)
  }

  getGames = async(req: Request, res: Response) => {
    const platform = req.query.platform || 'browser' as string
    const category = req.query.category  || 'mmorpg' as string
    const sortBy = req.query.sortBy || 'release-date' as string
    
    try {
      const response = await fetch(`${apiBaseUrl}/api/games?platform=${platform}&category=${category}&sortBy=${sortBy}`)
      const games = await response.json()

      if (!games || games.length === 0) {
        res.send([])
        return
      }

      // process the thumbnail images
      const processedGames = games.map((game: IGame) => {
        game.thumbnail = `${apiBaseUrl}${game.thumbnail}`
        return game
      })

      res.send(processedGames).status(200)
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  }

  getGameByGameId = async(req: Request, res: Response) => {

    try {
      const gameId = req.params.gameId as string
      const response = await fetch(`${apiBaseUrl}/api/game?id=${gameId}`)
      const game = await response.json() as IGameDetails

      if (!game) {
        res.status(404).send('Game not found')
        return
      }
      // process the thumbnail images
      game.thumbnail = `${apiBaseUrl}${game.thumbnail}`
      game.screenshots = game.screenshots.map((screenshot: IScreenshot) => {
        screenshot.image = `${apiBaseUrl}${screenshot.image}`
        return screenshot
      })
      
      res.send(game).status(200)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

export const gameController = new GameController()