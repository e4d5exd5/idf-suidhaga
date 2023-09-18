import executeQuery from "@/lib/db";

export default class Base {
    
    constructor(tableName) {
        this.__tablename__ = tableName
    }

    
    async execute(query, values){
        return await executeQuery({query, values})
    }
    
    all(){
        let query = `SELECT * from ${this.__tablename__}`
        let values = []
        return this.execute(query, values)
    }
    
    findById(id){
        let query = `SELECT * from ${this.__tablename__} where ${this.__tablename__}_id = ?`
        let values = [id]
        return this.execute(query, values)
    }
    
    deleteById(id){
        let query = `DELETE from ${this.__tablename__} where ${this.__tablename__}_id = ?`
        let values = [id]
        return this.execute(query, values)
    }
}