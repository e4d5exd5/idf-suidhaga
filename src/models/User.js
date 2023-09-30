import { DataTypes, Model } from "sequelize";
import sequelize from '@/lib/db'
import { ForeignKey } from "sequelize-typescript";

export class UserRole extends Model {
    static async getRoleNameById(id) {
        let role = await UserRole.findOne({ where: { id } })
        return role.name
    }
}
export class UserAuth extends Model {
    static async getRoleName() {
        return await UserRole.getRoleNameById(this.role)
    }
}
export class User extends Model {

}

UserRole.init({
    id: {
        type: DataTypes.INTEGER(255),
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
}, {
    sequelize, paranoid: true, timestamps: true
})


UserAuth.init({
    id: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    mobile: {
        type: DataTypes.INTEGER(10),
        unique: true,
        allowNull: false
    },
    hash: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    // role: {
    //     type: DataTypes.INTEGER(255),
    //     references: {
    //         model: UserRole,
    //         key: 'id'
    //     }
    // }
}, {
    sequelize, paranoid: true, timestamps: true, modelName: 'UserAuth', // Set the model name
    tableName: 'UserAuths', })

User.init({
    id: {
        type: DataTypes.STRING(255),
        references: {
            model: UserAuth,
            key: 'id'
        },
        unique: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    firstName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    middleName: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    aadharNumber: {
        type: DataTypes.INTEGER(12),
        unique: true,
        allowNull: false,
    },
    rollNumber: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    batchMonth: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    batchNo: {
        type: DataTypes.STRING(20),
        allowNull: true,
    }

}, {
    sequelize, paranoid: true, timestamps: true})

// UserAuth.associate = models => {
//     console.log("Associated 1");
//     UserAuth.hasOne(models.User, { foreignKey: { name: 'id', type: DataTypes.STRING(255), allowNull: false } })
//     UserAuth.belongsTo(models.UserRole, { foreignKey: { name: 'role', type: DataTypes.INTEGER(255), allowNull: false } })
// }

// UserRole.associate = models => {
//     console.log("Associated 2");
//     UserRole.hasOne(models.UserAuth, { foreignKey: { name: 'role', type: DataTypes.INTEGER(255), allowNull: false } })
// }

// User.associate = models => {
//     console.log("Associated 3");
//     User.belongsTo(models.UserAuth, { foreignKey: { name: 'id', type: DataTypes.STRING(255), allowNull: false } })
// }
    console.log("Associated");
    UserAuth.hasOne(User, { foreignKey: { name: 'id', type: DataTypes.STRING(255), allowNull: false } })
    UserAuth.belongsTo(UserRole, { foreignKey: { name: 'role', type: DataTypes.INTEGER(255), allowNull: false } })
    User.belongsTo(UserAuth, { foreignKey: { name: 'id', type: DataTypes.STRING(255), allowNull: false } })
    UserRole.hasMany(UserAuth, { foreignKey: { name: 'role', type: DataTypes.INTEGER(255), allowNull: false } })

sequelize.sync() // { force: true }

UserRole.bulkCreate([
    { id: 0, name: 'Super User' },
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Employer' },
    { id: 3, name: 'Employee' }
]).then((err) => { console.log("Default Roles Created"); })
    .catch((err) => { console.log(err);; console.log("Default Roles Already Created"); })


// UserAuth.create({
//     id: 0,
//     mobile: 8369961686,
//     hash: 'qweqweqwe',
//     role: 0
// })
// User.create({
//     id: 0,
//     title: 'Mr',
//     firstName: 'Aditya',
//     middleName: 'Rajesh',
//     lastName: 'Sawant',
//     aadharNumber: 123412341234
// })

// console.log("Equals?? =======================================");
// console.log(User === sequelize.models.User);

module.exports = {UserRole, UserAuth, User}