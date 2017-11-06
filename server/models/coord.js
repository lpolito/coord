const objection = require('objection');
const Angle = require('./angle');

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
        title: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }

  static get relationMappings() {
    return {
      // coord has many angles
      angles: {
        relation: objection.Model.HasManyRelation,
        modelClass: Angle,
        join: {
          from: 'coords.id',
          to: 'angles.coordId'
        }
      }
    };
  }
}

module.exports = Coord;
