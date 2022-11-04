const Sequelize = require('sequelize')
const connect = require('../../db')
const sequelize = connect()
const { enCode } = require('../../utils/util')
const Store = require('../Store/Store')
const productModelFood = require('./productFood')

sequelize.sync()

const ExtraProductModel = sequelize.define('extrasproducts', {
    exPid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get(x) { return enCode(this.getDataValue(x)) },
    },

    pId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: productModelFood,
            key: 'pId'
        },
        get(x) { return enCode(this.getDataValue(x)) }
    },
    idStore: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: Store,
            key: 'idStore'
        },
        get(x) { return enCode(this.getDataValue(x)) }
    },
    exState: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    extraName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    extraPrice: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    // state
    state: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1
    },
    pDatCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    pDatMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = ExtraProductModel