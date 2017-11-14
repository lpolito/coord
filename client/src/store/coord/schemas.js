import { schema } from 'normalizr';

const jumpSchema = new schema.Entity('jumps');

const coordinateSchema = new schema.Entity('coordinates', {
  jumps: [jumpSchema]
});

const angleSchema = new schema.Entity('angles', {
  coordinates: [coordinateSchema]
});

const coordSchema = new schema.Entity('coord', {
  angles: [angleSchema]
});


export { coordSchema, angleSchema, coordinateSchema, jumpSchema };
