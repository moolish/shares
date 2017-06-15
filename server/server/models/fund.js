module.exports = function (sequelize, DataTypes) {
    const Fund = sequelize.define('Fund', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            initialAutoIncrement: 1,
        },
        code: DataTypes.STRING,
        fundName: {
            type: DataTypes.STRING,
            character: 'utf-8'
        },
        dwjz: DataTypes.STRING,
        ljjz: DataTypes.STRING,
        date: DataTypes.STRING,
    }, {
        tableName: 'funds',
        timestamps: false,
    });

    return Fund;
};
