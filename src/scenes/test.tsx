import {makeScene2D,Latex,lines, Code,CODE, Layout, Txt, Circle, Rect, is, Line} from '@motion-canvas/2d';
import {all, Origin, range, map, makeRef, Logger, waitFor, textLerp, createRef, DEFAULT, AudioManager} from '@motion-canvas/core';
import { TimeEstimator } from '@motion-canvas/core/lib/app/TimeEstimator';



export default makeScene2D(function* (view) {

  view.fill('#242424');
  const logger = new Logger();
  const manager = new AudioManager(logger);

  const arrows:Line[] = [];
  const tex = createRef<Latex>();
  const postex = createRef<Latex>();
  const xtex = createRef<Latex>();
  const triangleline = createRef<Line>();
  const name = Code.createSignal('World');
  const code = createRef<Code>();

  view.add(
	range(11).map( i => <Line
		ref={makeRef(arrows, i)}
		points={[[0, 0],
			   [-250 + 50 * i, -200]]}
		// fill={'green'}
		arrowSize={10}
		stroke={'green'}
		lineWidth={5}
		scale={0}
		// lineHeight={10}

		// radius={40}
		// endArrow
	/>,));
	view.add(
		<Latex
			ref={tex}
			tex={['a^2', '+', 'b^2']}
			fill="red"
			fontSize={32}
			y={100}
		/>
	)

	view.add(
		<Latex
		ref={postex}
		tex={['1']}
		fill="red"
		fontSize={0}
		x = {50}
		y = {-100}
		/>
	)

	view.add(
		<Latex
		ref={xtex}
		tex={['x']}
		fill="red"
		fontSize={0}
		x = {-125}
		y = {-225}
		/>
	)

	view.add(
		<Line
			ref = {triangleline}
			points={[[0, -200], [-250, -200]]}
			stroke={'red'}
			lineWidth={5}
			scale={0}
			
		/>
	)

	view.add(
		<Code
		ref={code}
			fontSize={28}
			code={CODE`	printf("Hello ${name}\\n");\n`}
			y={400}
		/>
	)

	yield* waitFor(1);
	yield* all (
		code().code.prepend(`int main() {\n`, 1),
		code().code.append(`	return 0;\n`, 1),
		code().code.append(`}`, 1),
	);
	yield* name('Aymen Zainabi', 1);
	yield* code().selection(code().findAllRanges(/hello/gi), 1);
	yield* code().selection(lines(1), 1);
	yield* all (
		code().selection(code().findAllRanges(/{/gi), 1),
		code().selection(code().findAllRanges(/}/gi), 1),
	)
	yield* code().selection(DEFAULT, 1);
	// manager.setSource('../../audio/tt.mp3');
	// manager.setPaused(false);
	yield* tex().tex(['a^2', '+', 'b^2', '=', 'c^2'], 1);
	// yield* tex().tex(['\\frac{a^2}{b^2}'], 2);
	// yield* arrows[5].scale(2, 2).to(1, 1);
	yield* arrows[5].scale(1, 1);
	yield* postex().fontSize(32, 1);
	yield* arrows[0].scale(1, 1);
	yield* triangleline().scale(1, 1);
	yield* xtex().fontSize(32,1);
	
	yield* tex().tex(['tan(α)', '=', '\\frac{x}{1}'], 1);
	yield* xtex().tex(['x', '=','tan(α)'], 1);
	yield* postex().fontSize(0, 1);
	
	
	yield* arrows[10].scale(1, 1);
	yield* all(
		triangleline().points([[0, -200], [250, -200]], 1),
		xtex().x(125, 1),
		xtex().tex(['x', '=','tan(α)'], 1)
	)
	
	yield* triangleline().points([[-250, -200], [250, -200]], 1);
	yield* all(
		xtex().x(0, 1),
		xtex().tex([' 2x'], 1)
	)
	
	for (let i = 0; i < arrows.length; i++) {
		const theline = arrows[i]
		if (i == 5 || i == 10 || i == 0)
			continue;
		yield* all(
			theline.scale(2, 0.3).to(1, 0.2),
			theline.stroke('red', 0.3).to('blue', 0.2),
		)
	}
	yield* waitFor(20)
	// yield* all(...arrows.map(l => l.rotation(180, 1)));
//   const texts = view.findAll(is(Txt));

//   yield* all(...texts.map(text => text.fill('#FFC66D', 1).back(1)));
});