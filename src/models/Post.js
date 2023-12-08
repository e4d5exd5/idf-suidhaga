import { DataTypes, Model } from "sequelize";
import sequelize from '@/lib/db'
import { ForeignKey } from "sequelize-typescript";
import {UserAuth} from "@/models/User";

export class Post extends Model {

}
export class PostApplies extends Model {

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
    cost: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    material: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    noOfApplicants: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1
    },
    images: {
        type: DataTypes.JSON,
        allowNull: true
    },
}, {
    sequelize, paranoid: true, timestamps: true
})

PostApplies.init({
    id: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    postId: {
        type: DataTypes.STRING(255),
        references: {
            model: Post,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.STRING(255),
        references: {
            model: UserAuth,
            key: 'id'
        }
    },
})




module.exports = { Post, PostApplies }