const path = require('path');
const objection = require('objection');

class Jump extends objection.Model {
  static get tableName() {
    return 'jumps';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['xCoord'],

      properties: {
        id: { type: 'integer' },
        xCoordRel: { type: 'integer' },
        coordinateId: { type: 'integer' }
      }
    };
  }

  static get relationMappings() {
    return {
      // jumps belongs to one coordinate
      coordinate: {
        relation: objection.Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/coordinate'),
        join: {
          from: 'jumps.coordinateId',
          to: 'coordinates.id'
        }
      }
    };
  }
}

module.exports = Jump;
