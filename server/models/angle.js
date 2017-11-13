const path = require('path');
const objection = require('objection');
const Coordinate = require('./coordinate');

class Angle extends objection.Model {
  static get tableName() {
    return 'angles';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['author'],

      properties: {
        id: { type: 'integer' },
        author: { type: 'string', minLength: 1, maxLength: 255 },
        coordId: { type: 'integer' }
      }
    };
  }

  static get relationMappings() {
    return {
      // angle has many coordinates
      coordinates: {
        relation: objection.Model.HasManyRelation,
        modelClass: Coordinate,
        join: {
          from: 'angles.id',
          to: 'coordinates.angleId'
        }
      },
      // angle belongs to one coord
      coord: {
        relation: objection.Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/coord'),
        join: {
          from: 'angles.coordId',
          to: 'coords.id'
        }
      }
    };
  }
}

module.exports = Angle;
