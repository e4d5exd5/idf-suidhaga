import { DataTypes, Model } from "sequelize";
import sq from '@/lib/db'
import { ForeignKey } from "sequelize-typescript";
import { UserAuth } from "@/models/User";

export class Job extends Model {

}
export class JobApplications extends Model {

}

Job.init({
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
    attachments: {
        type: DataTypes.JSON,
        allowNull: true
    },
}, {
    sequelize: sq, paranoid: true, timestamps: true
})

JobApplications.init({
    id: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    // jobId: {
    //     type: DataTypes.STRING(255),
    //     references: {
    //         model: Job,
    //         key: 'id'
    //     },
    //     unique: false,
    //     primaryKey: false,
    // },
    // userId: {
    //     type: DataTypes.STRING(255),
    //     references: {
    //         model: UserAuth,
    //         key: 'id'
    //     },
    //     unique: false,
    //     primaryKey: false,
    // },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
}, {
    sequelize: sq, paranoid: true, timestamps: true
})



module.exports = { Job, JobApplications }