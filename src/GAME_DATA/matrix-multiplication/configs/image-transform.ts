import { ImageTransformerInteraction } from '../interactives/interface';

const config: ImageTransformerInteraction = {
  type: 'image-transformer',
  title: 'scenes.image-transformer.title',
  ariaLabel: 'Interactive image transformer showing matrix transformations',
  initialRotation: 0,
  initialScaleX: 1,
  initialScaleY: 1,
  initialShearX: 0,
  initialShearY: 0,
  showMatrix: true,
  showPresets: true,
  allowAnimation: true,
};

export default config;
