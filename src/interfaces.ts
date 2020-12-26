/* eslint-disable */
interface ICallback<T> {
    (err, result: T): Function
}


interface IFind {

    (filters: any, options: {
        caseInsensitive: boolean
        equalMatch: boolean
        onlyFirst: boolean
    }, callback?: ICallback<object[] | object>): Promise<Array<object> | object>
}

interface IInsert {
    (data: any, callback?: ICallback<object>): Promise<object>
}

interface IUpdate {
    (data: any, callback?: ICallback<object>): Promise<object>
}

interface IDelete {
    (id: number, callback?: ICallback<boolean>): Promise<boolean>
}

interface ICollection {
    Find: IFind
    Insert: IInsert
    Update: IUpdate
    Delete: IDelete
}

interface INavigateurDB {
    (dbName: string, collectionName: string, cb?: ICallback<any>): Promise<ICollection>
}

export {
    ICallback,
    IFind,
    IInsert,
    IUpdate,
    IDelete,
    ICollection,
    INavigateurDB
}