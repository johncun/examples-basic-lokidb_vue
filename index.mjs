import loki from 'lokijs'
import express from 'express'
import path from 'path'

const app = express()
const PORT = process.env.PORT || 8188

let projects
let db

function runProgramLogic () {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] === 'http' && process.env.NODE_ENV === 'production') {
      const secureUrl = `https://${req.headers.host}${req.url}`
      res.writeHead(301, {
        Location: secureUrl
      })
      res.end()
    }
    next()
  })

  const promiseWrapper = fn => (req, res) => {
    Promise.resolve(fn(req, res))
  }

  app.get('/api/items', promiseWrapper(async (req, res) => {
    projects.insert({
      id: Math.floor(Math.random() * 10000000),
      name: 'Some arbitrary entry',
      dt: (new Date()).getTime()
    })

    const results = projects.chain().data().map((it) => {
      const {
        meta,
        $loki,
        ...others
      } = it
      return others
    })
    res.status(200)
      .header('max-age', 1800)
      .header('Cache-Control', 'public')
      .send(results)
  }))

  app.use(express.static(path.resolve('.', 'dist')))
  app.listen(PORT, () => console.log(`listening on port ${PORT}!`))
}

function databaseInitialize () {
  projects = db.getCollection('projects')
  if (projects === null) {
    projects = db.addCollection('projects')
  }

  // kick off any program logic or start listening to external events
  runProgramLogic()
}


db = new loki('__data.json', {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 1000
})
