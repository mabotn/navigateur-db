import BrowserDB from '../dist/browser-db'

BrowserDB("my-db", "people").then(async (db) => {
    let data = {
        firstName: "Mohamed Anas",
        lastName: "Ben Othman",
        country: "Tunisia"
    }

    let anas = await db.Insert(data)

    let result = await db.Find({ country: 'tunisia' }, { caseInsensitive: true, equalMatch: false })

    anas.age = 25
    anas = await db.Update(anas)
    await db.Delete(anas.id)
})