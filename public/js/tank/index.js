function Transport(params){
    //    console.log(arguments);
    var self=this;
    self.maxWidth=600;
    self.maxHeight=300;
    self.speed=5;
    self.context=undefined;
    self.x = params.x || 0;
    self.y = params.y || 0;
    self.w = params.w || 200;
    self.h = params.h || 100;
    self.fill = params.fill || 'rgba(255, 255, 255, 0.5)';
    
    self.init=function(){
        self.initContext();
        self.draw();
    }
    self.initContext=function(){
        var c = document.getElementById("canvasId");
        self.context=c.getContext("2d");
    }
    self.draw=function(direction){
        self.context.fillStyle = self.fill;
        //        this.context.fillRect(this.x, this.y, this.w, this.h);
        self.context.beginPath();
        self.context.arc(self.x, self.y, self.w, 0 , 2 * Math.PI, false);
        self.context.fill();
        self.context.lineWidth = 5;
        self.context.strokeStyle = "black";
        self.context.stroke();
    //        this.drawMuzzle(direction);
    }
    this.drawMuzzle=function(direction){
        switch(direction){
            case 'LEFT':
                self.context.fillRect(self.x-10, self.y+self.h/2-2.5, 10, 5);
                break;
            case 'RIGHT':
                self.context.fillRect(self.x+self.w, self.y+self.h/2-2.5, 10, 5);
                break;
            case 'UP':
                self.context.fillRect(self.x+self.w/2-2.5, self.y-10, 5, 10);
                break;
            case 'DOWN':
                self.context.fillRect(self.x+self.w/2-2.5, self.y+self.h, 5, 10);
                break;
            default:
                break;
        }
    }
    self.clear=function(){
        self.context.clearRect(self.x-10, self.y-10, self.w+20, self.h+20);
    }
    self.moveLeft = function(){
        self.clear();
        if(self.x-self.speed-10>0){
            self.x-=self.speed;
        }
        self.draw('LEFT');
    }
    self.moveRight = function(){
        self.clear();
        if(self.x+self.speed+self.w+10<self.maxWidth){
            self.x+=self.speed;
        }
        self.draw('RIGHT');
    }
    self.moveUp = function(){
        self.clear();
        if(self.y-self.speed-10>0){
            self.y-=self.speed;
        }
        self.draw('UP');
    }
    self.moveDown = function(){
        self.clear();
        if(self.y+self.speed+self.h+10<self.maxHeight){
            self.y+=self.speed;
        }
        self.draw('DOWN');
    }
    self.init(); 
}

$(function(){
    var Tank=function(params) {
        Transport.apply(this, arguments);
    }
    Tank.prototype=new Transport({});

    var xMax=599;
    var yMax=399;
    var rMax=40;
    var colors=['red','green','yellow','blue','orange','lime','black','white'];
    var colorsCount=colors.length;
    var count=0;

    var interbalId= setInterval(function(){
        var x=Math.floor(Math.random()*xMax+1);
        var y=Math.floor(Math.random()*yMax+1);
        var r=Math.floor(Math.random()*rMax+1);
        
        var colorIndex=Math.floor(Math.random()*colorsCount);
    
        new Tank({
            x:x,
            y:y,
            w:r,
            h:r,
            fill:colors[colorIndex]
        });
        count++;
        if(count>10000){
            clearInterval(interbalId);
        }
    }, 5);

    
    $("#target").keypress(function(event) {
        if ( event.which == 13 ) {
            event.preventDefault();
        }
        if(event.keyCode){
            switch(event.keyCode){
                case 37:
                    t34.moveLeft();
                    break;
                case 39:
                    t34.moveRight();
                    break;
                case 38:
                    t34.moveUp();
                    break;
                case 40:
                    t34.moveDown();
                    break;
                default:
                    break;
            }
        }else if(event.charCode){
            switch(event.charCode){
                case 97:
                    t72.moveLeft();
                    t92.moveLeft();
                    break;
                case 100:
                    t72.moveRight();
                    t92.moveRight();
                    break;
                case 119:
                    t72.moveUp();
                    t92.moveUp();
                    break;
                case 115:
                    t72.moveDown();
                    t92.moveDown();
                    break;
                default:
                    break;
            }
        }
    });
});