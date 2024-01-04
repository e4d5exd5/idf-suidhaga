require('@/models/associations');
const { sequelize } = require("@/lib/db");
import { Job, JobApplications } from "@/models/Job";
import { UserAuth, User, UserRole } from "@/models/User";

UserAuth.hasMany(Job, {
    foreignKey: 'ownerId',
    sourceKey: 'id',
    primaryKey: false
})
Job.belongsTo(UserAuth, {
    foreignKey: 'ownerId',
    sourceKey: 'id',
    primaryKey: false
})

Job.belongsToMany(UserAuth, { through: JobApplications })
UserAuth.belongsToMany(Job, { through: JobApplications })
UserAuth.hasOne(User, { foreignKey: { name: 'id', type: DataTypes.STRING(255), allowNull: false } })
UserAuth.belongsTo(UserRole, { foreignKey: { name: 'role', type: DataTypes.INTEGER(255), allowNull: false } })
User.belongsTo(UserAuth, { foreignKey: { name: 'id', type: DataTypes.STRING(255), allowNull: false } })
UserRole.hasMany(UserAuth, { foreignKey: { name: 'role', type: DataTypes.INTEGER(255), allowNull: false } })


console.log("Associated");
sequelize.sync({ force: true })