import { schema } from 'normalizr';

const jumpSchema = new schema.Entity('jumps');

const coordinateSchema = new schema.Entity('coordinates', {
  jumps: [jumpSchema]
});

const coordSchema = new schema.Entity('coord', {
  coordinates: [coordinateSchema]
});


export { coordSchema, coordinateSchema, jumpSchema };
