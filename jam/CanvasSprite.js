jam.CanvasSprite = jam.extend(jam.Sprite, function(self){
	
	self.makeCanvas = function(w,h){
		self.image = document.createElement("canvas"); 
		self.image.height = h;
		self.image.width = w;
		self.context = self.image.getContext("2d");
		self.width = w;
		self.height = h;
	}
	
	self.clear = function(color){
		if(!color) { color = "rgba(255,255,255,1)"; }
		self.context.fillStyle = color;
		self.context.fillRect(0, 0, self.width, self.height);
	}
	
	self.line = function(x1, y1, x2, y2, color, width){
		if(!color) { color = "rgba(0,0,0,1)"; }
		if(!width) { width = 1; }
		self.context.lineStyle = color;
		self.context.lineWidth = width;
		self.context.lineCap = "round";
		self.context.beginPath();
		self.context.moveTo(x1,y1);
		self.context.lineTo(x2,y2);
		self.context.stroke();
	}
	
	self.rect = function(x, y, w, h, color){
		self.context.fillStyle = color;
		self.context.fillRect(x,y,w,h);
	}
	
	return self;
},true, true);