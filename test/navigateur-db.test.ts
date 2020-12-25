import auto from 'fake-indexeddb/auto'
import NavigateurDB from '../dist/navigateur-db'
describe('Navigateur DB test suite', () => {
    var db;
    beforeAll(async () => {
        db = await NavigateurDB("my-db", "people")

    })
    beforeEach(() => {

    })
    it("should return db instance", () => {
        expect(db).toBeDefined()
        expect(db).toHaveProperty('Find')
        expect(db).toHaveProperty('Insert')
        expect(db).toHaveProperty('Update')
        expect(db).toHaveProperty('Delete')

    })


    it("should Insert Successfully", async () => {
        let data = { id: 1, name: 'FakeData' }
        let result = await db.Insert({ id: 1, name: 'FakeData' })
        expect(result).not.toBeNull()
        expect(result).toEqual(data)
        let addedRow = await db.Find({ id: 1 }, { caseInsensitive: true, equalMatch: false })
        expect(addedRow).toEqual(expect.arrayContaining([data]))
    })

    it('should return Rows from Database', async () => {
        let data = await db.Find({}, { caseInsensitive: true, equalMatch: false })
        expect(Array.isArray(data)).toBeTruthy()
        expect(data).toHaveLength(1)
        expect(data.pop()).toMatchObject({ id: 1, name: 'FakeData' })

    })

    it('should return one element', async () => {
        let data = await db.Find({ id: 1 }, { caseInsensitive: true, equalMatch: true })
        expect(data).not.toBeNull()

    })
    it('should Update Row in Database', async () => {
        await db.Update({ id: 1, name: 'FakeData2' })
        let addedRow = await db.Find({ id: 1 }, { caseInsensitive: true, equalMatch: false })
        expect(addedRow).toHaveLength(1)
        expect(addedRow[0].name).toBe('FakeData2')

    })

    it('should Delete Row from Database', async () => {
        await db.Delete(1)
        let addedRow = await db.Find({ id: 1 }, { caseInsensitive: true, equalMatch: false })
        expect(addedRow).toHaveLength(0)


    })
})