const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('size', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique:true,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        counter: {
            type: DataTypes.INTEGER,
        }

    }, { timestamps: false })
}