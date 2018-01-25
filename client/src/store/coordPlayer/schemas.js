import { schema } from 'normalizr';

const coordinateSchema = new schema.Entity('coordinates');

const coordSchema = new schema.Entity('coord', {
  coordinates: [coordinateSchema]
});


export { coordSchema, coordinateSchema };
