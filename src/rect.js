SVG.Rect = SVG.invent({
  // Initialize node
  create: 'rect'

  // Inherit from
, inherit: SVG.Shape

, extend: {
    leftTopX: function() {
        return this.x();
    }
    ,leftTopY: function() {
        return this.y();
    }
    ,rightBottomX: function() {
        return this.x()+this.width();
    }
    ,rightBottomY: function() {
        return this.y() + this.height();
    }
    ,inside: function(x, y) {
        return x >= this.x() && x <= this.x() + this.width() && y >= this.y() && y <= this.y() + this.height();
    }  
} 
  // Add parent method
, construct: {
    // Create a rect element
    rect: function(width, height) {
      return this.put(new SVG.Rect()).size(width, height)
    }
  }
})