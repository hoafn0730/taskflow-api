'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Card extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Column, { foreignKey: 'columnId', as: 'column' });
            this.hasMany(models.Checklist, { foreignKey: 'cardId', as: 'checklists' });
            this.hasMany(models.Attachment, { foreignKey: 'cardId', as: 'attachments' });
            this.belongsTo(models.Attachment, { foreignKey: 'image', as: 'cover' });
        }
    }
    Card.init(
        {
            boardId: DataTypes.INTEGER,
            columnId: DataTypes.INTEGER,
            title: DataTypes.STRING,
            description: DataTypes.TEXT,
            image: DataTypes.STRING,
            slug: DataTypes.STRING,
            uuid: DataTypes.STRING,
            dueDate: DataTypes.DATE,
            dueComplete: DataTypes.BOOLEAN,
            dueReminder: DataTypes.INTEGER,
            archived: { type: DataTypes.BOOLEAN, defaultValue: false },
        },
        {
            sequelize,
            modelName: 'Card',
        },
    );
    return Card;
};
