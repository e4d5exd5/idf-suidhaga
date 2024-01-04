import { DataTypes, Model } from "sequelize";
import sq from '@/lib/db'
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
    sequelize: sq, paranoid: true, timestamps: true
})


UserAuth.init({
    id: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    mobile: {
        type: DataTypes.BIGINT(10),
        unique: true,
        allowNull: false
    },
    hash: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.INTEGER(255),
        references: {
            model: UserRole,
            key: 'id'
        }
    }
}, {
    sequelize: sq, paranoid: true, timestamps: true, modelName: 'UserAuth', // Set the model name
    tableName: 'UserAuths',
})

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
        type: DataTypes.BIGINT(12),
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
    sequelize: sq, paranoid: true, timestamps: true
})

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

// sequelize.sync({ force: true }) // { force: true }

UserRole.findOrCreate({
    where: {
        id: 0
    },
    defaults: {
        name: 'Super User'
    }
})
UserRole.findOrCreate({
    where: {
        id: 1
    },
    defaults: {
        name: 'Admin'
    }
})
UserRole.findOrCreate({
    where: {
        id: 2
    },
    defaults: {
        name: 'Employer'
    }
})
UserRole.findOrCreate({
    where: {
        id: 3
    },
    defaults: {
        name: 'Employee'
    }
})



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

module.exports = { UserRole, UserAuth, User }