import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import test from './scenes/test?scene';
import { Code, LezerHighlighter } from '@motion-canvas/2d';
import { parser } from '@lezer/javascript';
import audio from '../audio/tt.mp3'

Code.defaultHighlighter = new LezerHighlighter(parser);

export default makeProject({
  scenes: [test],
  // audio: audio,
});
