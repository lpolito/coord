const path = require('path');
const objection = require('objection');

class Coord extends objection.Model {
  static get tableName() {
    return 'coords';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title'],

      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        defaultCoordinateId: { type: 'integer' }
      }
    };
  }

  static get relationMappings() {
    return {
      // coord has many coordinates
      coordinates: {
        relation: objection.Model.HasManyRelation,
        modelClass: path.join(__dirname, '/coordinate'),
        join: {
          from: 'coords.id',
          to: 'coordinates.coordId'
        }
      }
    };
  }
}

module.exports = Coord;
