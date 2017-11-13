const path = require('path');
const objection = require('objection');
const Jump = require('./jump');

class Coordinate extends objection.Model {
  static get tableName() {
    return 'coordinates';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['ytId', 'xCoord'],

      properties: {
        id: { type: 'integer' },
        ytId: { type: 'string', minLength: 1, maxLength: 255 },
        xCoord: { type: 'integer' },
        angleId: { type: 'integer' }
      }
    };
  }

  static get relationMappings() {
    return {
      // coordinate has many jumps
      jumps: {
        relation: objection.Model.HasManyRelation,
        modelClass: Jump,
        join: {
          from: 'coordinates.id',
          to: 'jumps.coordinateId'
        }
      },
      // coordinate belongs to one angle
      angle: {
        relation: objection.Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/angle'),
        join: {
          from: 'coordinates.angleId',
          to: 'angles.id'
        }
      }
    };
  }
}

module.exports = Coordinate;
