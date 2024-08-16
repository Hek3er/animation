import { createRef, all, makeRef, range } from "@motion-canvas/core";
import { makeScene2D, Rect, Code, CODE } from "@motion-canvas/2d";

export default makeScene2D(function* (view) {
	const rectangle: Rect[] = [];

	view.add(
		range(5).map( i => <Rect
			ref={makeRef(rectangle, i)}
			size={100}
			x={-250 + 125 * i}
			fill={'red'}
			radius={24}
		/>,
		<Code
			fontSize={24}
			code={'hello;'}
		/>,
	)
	)

	for (const rec of rectangle) {
		yield* rec.y(-100, 1).to(0, 1);
	}

})