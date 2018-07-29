# Simple example of using Loki with API in Vue web page

Using node as a backend, allow the creation and display of document objects in a persisted in memory DB (Loki).

When the main page is requested, a new record is created and then the list of persisted records is displayed in a table. If the node server is stopped and restarted one can see the records return as expected.

```javascript
import loki from 'lokijs'

...

function databaseInitialize () {
  projects = db.getCollection('projects')
  if (projects === null) {
    projects = db.addCollection('projects')
  }

...
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

...
```
