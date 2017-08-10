import {pixelStaticGlitch, monochromePixelStaticGlitch} from './PixelStatic';
import {rowSwappingGlitch} from './RowSwapping';
import {distortedRowsGlitch} from './DistortedRows';
import {vhsTrackingGlitch} from './VHSTracking';

window['glitches'] = {
  pixelStaticGlitch,
  monochromePixelStaticGlitch,
  rowSwappingGlitch,
  distortedRowsGlitch,
  vhsTrackingGlitch
};