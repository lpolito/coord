const path = require('path');
const objection = require('objection');

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
        coordId: { type: 'integer' }
      }
    };
  }

  static get relationMappings() {
    return {
      // coordinate has many jumps
      jumps: {
        relation: objection.Model.HasManyRelation,
        modelClass: path.join(__dirname, '/jump'),
        join: {
          from: 'coordinates.id',
          to: 'jumps.coordinateId'
        }
      },
      // coordinate belongs to one coord
      coord: {
        relation: objection.Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/coord'),
        join: {
          from: 'coordinates.coordId',
          to: 'coords.id'
        }
      }
    };
  }
}

module.exports = Coordinate;
