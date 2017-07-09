SVG.Point = SVG.invent({
  // Initialize
  create: function(x,y) {
    var i, source, base = {x:0, y:0}

    // ensure source as object
    source = Array.isArray(x) ?
      {x:x[0], y:x[1]} :
    typeof x === 'object' ?
      {x:x.x, y:x.y} :
    x != null ?
      {x:x, y:(y != null ? y : x)} : base // If y has no value, then x is used has its value

    // merge source
    this.x = source.x
    this.y = source.y
  }

  // Add methods
, extend: {
    // Clone point
    clone: function() {
      return new SVG.Point(this)
    }
    // Morph one point into another
  , morph: function(x, y) {
      // store new destination
      this.destination = new SVG.Point(x, y)

      return this
    }
    // Get morphed point at a given position
  , at: function(pos) {
      // make sure a destination is defined
      if (!this.destination) return this

      // calculate morphed matrix at a given position
      var point = new SVG.Point({
        x: this.x + (this.destination.x - this.x) * pos
      , y: this.y + (this.destination.y - this.y) * pos
      })

      return point
    }
    // Convert to native SVGPoint
  , native: function() {
      // create new point
      var point = SVG.parser.native.createSVGPoint()

      // update with current values
      point.x = this.x
      point.y = this.y

      return point
    }
    // transform point with matrix
  , transform: function(matrix) {
      return new SVG.Point(this.native().matrixTransform(matrix.native()))
    }

  , distance: function(pt) {
      var dx = this.x - pt.x;
      var dy = this.y - pt.y;
      return Math.sqrt(dx*dx + dy*dy);
  }
  
  ,distanceToLine: function(pt1, pt2) {
        return Math.abs((pt2.y-pt1.y)*this.x - (pt2.x-pt1.x)*this.y + pt2.x*pt1.y - pt2.y*pt1.x)/Math.sqrt((pt2.y-pt1.y)*(pt2.y-pt1.y) + (pt2.x-pt1.x)*(pt2.x-pt1.x));
    }
  , withinLineRange: function(pt1, pt2) {
        var minX = Math.min(pt1.x, pt2.x);
        var minY = Math.min(pt1.y, pt2.y);
        var maxX = Math.max(pt1.x, pt2.x);
        var maxY = Math.max(pt1.y, pt2.y);

        return this.x >= minX - Trig.CLOSE_ENOUGH_DISTANCE &&
                this.x <= maxX + Trig.CLOSE_ENOUGH_DISTANCE &&
                this.y >= minY - Trig.CLOSE_ENOUGH_DISTANCE &&
                this.y <= maxY + Trig.CLOSE_ENOUGH_DISTANCE; 
    }
  , onArc: function(arc) {
    //x = cx + rx*cos(theta)
    //y = cy + ry*sin(theta)  
    if (arc.bbox().contains(this)) {
      x = arc.cx() + arc.r*Math.cos(arc.ang);
      y = arc.cy() + arc.r*Math.sin(arc.ang);
      return (this.x-x) * (this.x-x) + (this.y-y) * (this.y-y) <= Trig.TOLERANCE_DISTANCE_SQR
    }
    return false;
  }
  ,translate: function(x, y) {
    this.x = this.x +x;
    this.y = this.y + y;
    return this;
  }
  ,equals: function(p) {
    return this.x==p.x && this.y==p.y;
  }
  ,closeEnough: function(x, y) {
        return Math.abs(this.x - x) <= Trig.CLOSE_ENOUGH_DISTANCE && Math.abs(this.y - y) <= Trig.CLOSE_ENOUGH_DISTANCE;
  }  

  }
  // Add parent method
, construct: {
    // Create a line element
    point: function(x, y) {
      return this.put(new SVG.Point(x, y));
    }
  }

})

SVG.extend(SVG.Element, {

  // Get point
  point: function(x, y) {
    return new SVG.Point(x,y).transform(this.screenCTM().inverse());
  }

})
