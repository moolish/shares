module.exports = function (sequelize, DataTypes) {
    const Share = sequelize.define('Share', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            initialAutoIncrement: 1,
        },
        shareId: {
            type: DataTypes.STRING,
            unique: true,
        },
        shareName:{
            type: DataTypes.STRING,
            unique: true,
            character: 'utf-8'
        },
        shareSecurity: DataTypes.STRING,
    }, {
        tableName: 'shares',
        timestamps: false,
    });

    return Share;
};
