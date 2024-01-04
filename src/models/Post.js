import { DataTypes, Model } from "sequelize";
import sq from '@/lib/db'
import { ForeignKey } from "sequelize-typescript";
import { UserAuth } from "@/models/User";

export class Post extends Model {

}

Post.init({
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

    attachments: {
        type: DataTypes.JSON,
        allowNull: true
    },
}, {
    sequelize: sq, paranoid: true, timestamps: true
})


UserAuth.hasMany(Post, {
    foreignKey: 'ownerId',
    sourceKey: 'id',
    primaryKey: false
})

module.exports = { Post }