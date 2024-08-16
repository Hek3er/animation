import {makeScene2D,Latex, Layout, Txt, Circle, Rect, is, Line} from '@motion-canvas/2d';
import {all, Origin, range, map, makeRef, Logger, waitFor, textLerp, createRef} from '@motion-canvas/core';
import { TimeEstimator } from '@motion-canvas/core/lib/app/TimeEstimator';

export default makeScene2D(function* (view) {
//   view.add(
//     <Layout layout gap={20} alignItems={'center'}>
//       <Txt fill={'white'}>Example</Txt>
//       <Rect fill={'#f3303f'} padding={20} gap={20}>
//         <Txt fill={'white'}>42</Txt>
//         <Circle size={60} fill={'#FFC66D'} />
//         <Txt fill={'white'}>!!!</Txt>
//       </Rect>
//     </Layout>,
//   );

  const lines:Line[] = [];
  const tex = createRef<Latex>();
  const postex = createRef<Latex>();
  const xtex = createRef<Latex>();
  const triangleline = createRef<Line>();

  view.add(
	range(11).map( i => <Line
		ref={makeRef(lines, i)}
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

	yield* waitFor(1);
	yield* tex().tex(['a^2', '+', 'b^2', '=', 'c^2'], 1);
	// yield* tex().tex(['\\frac{a^2}{b^2}'], 2);
	// yield* lines[5].scale(2, 2).to(1, 1);
	yield* lines[5].scale(1, 1);
	yield* postex().fontSize(32, 1);
	yield* lines[0].scale(1, 1);
	yield* triangleline().scale(1, 1);
	yield* xtex().fontSize(32,1);
	
	yield* tex().tex(['tan(α)', '=', '\\frac{x}{1}'], 1);
	yield* xtex().tex(['x', '=','tan(α)'], 1);
	yield* postex().fontSize(0, 1);
	
	
	yield* lines[10].scale(1, 1);
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

	for (let i = 0; i < lines.length; i++) {
		const theline = lines[i]
		if (i == 5 || i == 10 || i == 0)
			continue;
		yield* all(
			theline.scale(2, 2).to(1, 1),
			theline.stroke('red', 1).to('blue', 2),
		)
	}
	// yield* all(...lines.map(l => l.rotation(180, 1)));
//   const texts = view.findAll(is(Txt));

//   yield* all(...texts.map(text => text.fill('#FFC66D', 1).back(1)));
});