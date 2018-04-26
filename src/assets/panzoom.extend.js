SVG.extend(SVG.Doc, SVG.Nested, {
	zoomTo: function(level, point) {
		var style = window.getComputedStyle(this.node)
		  , width = parseFloat(style.getPropertyValue('width'))
		  , height = parseFloat(style.getPropertyValue('height'))
		  , v = this.viewbox()
		  , zoomX = width / v.width
		  , zoomY = height / v.height
		  , zoom = Math.min(zoomX, zoomY)

		if(level == null) {
		  return zoom
		}

		var zoomAmount = zoom / level
		if(zoomAmount === Infinity) zoomAmount = Number.MIN_VALUE

		point = point || new SVG.Point(width/2 / zoomX + v.x, height/2 / zoomY + v.y)

		var xDif = (point.x - (v.width/2)) - v.x;
		var yDif = (point.y - (v.height/2)) - v.y;
		var frameNum = this.fx.animationFrame || 0;

		// fps is 60, plus end frame (61)
		var fpa = 61;
		var framesLeft = ((Math.floor(frameNum / fpa) * fpa) + fpa) - frameNum;

		var xStep = xDif < 0 ? -(Math.abs(xDif)/framesLeft) : xDif/framesLeft;
		var yStep = yDif < 0 ? -(Math.abs(yDif)/framesLeft) : yDif/framesLeft;

		var box = new SVG.Box(v)
		    .transform(new SVG.Matrix()
		     	.translate(xStep, yStep)
		        .scale(zoomAmount,point.x,point.y)
		    )

		if(this.fire('zoomTo', {box: box, point: point}).event().defaultPrevented)
		  return this

		return this.viewbox(box)
	},
	panTo: function(dir) {
		var style = window.getComputedStyle(this.node)
		  , width = parseFloat(style.getPropertyValue('width'))
		  , height = parseFloat(style.getPropertyValue('height'))
		  , v = this.viewbox()
		  , x = 0
		  , y = 0
		  , panAmt = 50/v.zoom;

		// 1 is left, 2 is up, 3 is right, 4 is down
		if (dir === 1) {
			x -= panAmt;
		} else if (dir === 2) {
			y -= panAmt;
		} else if (dir === 3) {
			x += panAmt;
		} else {
			y += panAmt;
		}

		var box = new SVG.Box(v)
		    .transform(new SVG.Matrix()
		     	.translate(x, y)
		    )

		if(this.fire('panTo', {dir: dir}).event().defaultPrevented)
		  return this

		return this.viewbox(box)
	}	
});

SVG.extend(SVG.FX, {
	zoomTo: function(level, point) {
	return this.add('zoomTo', [new SVG.Number(level)].concat(point || []))
	},
	panTo: function(dir) {
		return this.add('panTo', [new SVG.Number(dir)])
	}
});
