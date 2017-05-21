module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            initialAutoIncrement: 1,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: DataTypes.STRING,
        shareId: DataTypes.STRING,
    }, {
        tableName: 'users',
        timestamps: true,
    });

    return User;
};
