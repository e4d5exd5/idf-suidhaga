
import { DataTypes } from "sequelize";
// const sq = require("@/lib/db");
import sq from "@/lib/db";
console.log(sq);
import { Job, JobApplications } from "@/models/Job";
import { UserAuth, User, UserRole } from "@/models/User";
import { Bugs } from "@/models/Bugs";

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
sq.sync({ force: true })

export default sq
export { Job, JobApplications, UserAuth, User, UserRole, Bugs };
