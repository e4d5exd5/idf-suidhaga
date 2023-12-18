import { DataTypes, Model } from "sequelize";
import sequelize from '@/lib/db'
import { ForeignKey } from "sequelize-typescript";
import { UserAuth } from "@/models/User";

export class Bugs extends Model {

}

Bugs.init({
    id: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    ownerId: {
        type: DataTypes.STRING(255),
        references: {
            model: UserAuth,
            key: 'id'
        }
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    sequelize, paranoid: true, timestamps: true , modelName: 'Bugs', 
    tableName: 'bugs'
})


// UserAuth.hasMany(Bugs, {
//     foreignKey: 'ownerId',
//     sourceKey: 'id',
//     primaryKey: false
// })

module.exports = { Bugs }

