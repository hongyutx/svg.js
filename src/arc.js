SVG.Arc = SVG.invent({
  // Initialize node
  create: 'path'

  // Inherit from
, inherit: SVG.Path

  // Add class methods
, extend: {
  plotRadius: function(x1, y1, r, largeArcFlag, sweepFlag, x2, y2) {
        var p = 'M {0},{1} A {2},{2} 0 {3},{4} {5},{6}'.format(x1.toFixed(2), 
                                        y1.toFixed(2),
                                        r.toFixed(2),
                                        largeArcFlag.toFixed(0),
                                        sweepFlag.toFixed(0),
                                        x2.toFixed(2),
                                        y2.toFixed(2));
      this.r = r;                                   
      this.largeArcFlag = largeArcFlag;
      this.sweepFlag = sweepFlag;
      this.x11 = x1;
      this.y11 = y1;
      this.x12 = x2;
      this.y12 = y2;
      this.ang = Math.PI;
      return this.attr('d', (this._array = new SVG.PathArray(p)));
    }
    
  , plot: function(x1, y1, h, sweepFlag, x2, y2) {
      //cord length
      var lc = Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
      //cord lineAngle
      var ac = this.lineAngle(x1, y1, x2, y2);
      //now calculate radius of the arc
      this.r = (lc/2.0 * lc/2.0 + h*h) / (2.0*h);
      //arc lineAngle
      if (h*2 <= lc)
        this.ang = Math.PI - 2.0 * Math.acos(lc/(2.0*this.r));
      else
        this.ang = Math.PI + 2.0 * Math.acos(lc/(2.0*this.r));

      var phi = Math.PI*0.5 + ac - this.ang*0.5;
      this.center.x = x1 + this.r * Math.cos(phi);
      this.center.y = y1 + this.r * Math.sin(phi);
      
      this.largeArcFlag = h > this.r ? 1 : 0;
      this.sweepFlag = sweepFlag;
      this.x11 = x1;
      this.y11 = y1;
      this.x12 = x2;
      this.y12 = y2;
      var p = 'M {0},{1} A {2},{2} 0 {3},{4} {5},{6}'.format(x1.toFixed(2), 
                                        y1.toFixed(2),
                                        this.r.toFixed(2),
                                        this.largeArcFlag.toFixed(0),
                                        this.sweepFlag.toFixed(0),
                                        x2.toFixed(2),
                                        y2.toFixed(2));
      return this.attr('d', (this._array = new SVG.PathArray(p)));
    }
, lineAngle: function(x1, y1, x2, y2) {
      var t = Math.atan2(y2 - y1, x2 - x1);
      while (t < 0)
        t += 2*Math.PI;
       
      return t;
}
, ptOnArc: function(pt) {
  //x = cx + rx*cos(theta)
  //y = cy + ry*sin(theta)  
  if (this.bbox().contains(pt)) {
    var theta = this.lineAngle(this.cx(), this.cy(), pt.x, pt.y);

    x = this.cx() + this.r*Math.cos(theta);
    y = this.cy() + this.r*Math.sin(theta);
    return (pt.x-x) * (pt.x-x) + (pt.y-y) * (pt.y-y) <= Trig.TOLERANCE_DISTANCE_SQR
  }
  return false;
}
, mid: function() {
      var cordMidX = (this.x11 + this.x12)/2.0;
      var cordMidY = (this.y11 + this.y12)/2.0;
      var h = this.r - this.r * Math.cos(this.ang/2.0);
      var sign = this.sweepFlag === 0 ? 1 : -1;
      var theta = this.lineAngle(this.x11, this.y11, this.x12, this.y12);
      var cx = cordMidX - Math.sin(theta) * h * sign;
      var cy = cordMidY + Math.cos(theta) * h * sign; 
      return new SVG.Point(cx, cy);
    }
, length: function() {
  return this.r*this.ang;
}
, cx: function() {
  return this.center.x;
}
, cy: function() {
  return this.center.y;
}
, x1: function() {
  return this.x11;
}  
, y1: function() {
  return this.y11;
}  
, x2: function() {
  return this.x12;
}  
, y2: function() {
  return this.y12;
}
, h: function() {
  return this.r - this.r * Math.cos(this.ang/2.0);
} 
, angle: function() {
  return this.ang;
}
, flag: function() {
  return this.largeArcFlag;
} 
, sweep: function(f) {
  if(f != undefined) {
    this.sweepFlag = f;
    this.plot(this.x1(), this.y1(), this.h(), this.sweepFlag, this.x2(), this.y2());
  }
  else
    return this.sweepFlag;
}
}
  // Add parent method
, construct: {
    // Create a line element
    arc: function(x1, y1, r, sweepFlag, x2, y2) {
      return this.put(new SVG.Arc).plot(x1, y1, r, sweepFlag, x2, y2)
    }
  }
})