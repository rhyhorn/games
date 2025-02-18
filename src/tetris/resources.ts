import { ImageSource } from 'excalibur';
import blocks from '../images/blocks.png';
import field from '../images/field.png';

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = {
  Blocks: new ImageSource(blocks),
  Field: new ImageSource(field),
};

export { Resources };
