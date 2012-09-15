var allTanks;
var Transport = function(params){
    //    console.log(arguments);
    if(undefined==params){
        params={};
    }
    var self=this;
    self.maxWidth=640;
    self.maxHeight=520;
    self.speed=10;
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
        self.context.fillRect(self.x, self.y, self.w, self.h);
    //        self.context.beginPath();
    //        self.context.arc(self.x, self.y, self.w, 0 , 2 * Math.PI, false);
    //        self.context.fill();
    //        self.context.lineWidth = 5;
    //        self.context.strokeStyle = "black";
    //        self.context.stroke();
    //        this.drawMuzzle(direction);
    }
    self.drawMuzzle=function(direction){
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
        self.context.clearRect(self.x, self.y, self.w, self.h);
    }
    self.canMoveLeft = function(){
        return (self.x-self.speed>=0);
    }
    self.canMoveRight = function(){
        return (self.x+self.speed+self.w<=self.maxWidth);
    }
    self.canMoveUp = function(){
        return (self.y-self.speed>0);
    }
    self.canMoveDown = function(){
        return (self.y+self.speed+self.h<=self.maxHeight);
    }
    self.moveLeft = function(){
        var res=false;
        if(self.canMoveLeft()){
            self.clear();
            self.x-=self.speed;
            self.draw('LEFT');
            res=true;
        }
        return res;
    }
    self.moveRight = function(){
        var res=false;
        if(self.canMoveRight()){
            self.clear();
            self.x+=self.speed;
            self.draw('RIGHT');
            res=true;
        } 
        return res;
    }
    self.moveUp = function(){
        var res=false;
        if(self.canMoveUp()){
            self.clear();
            self.y-=self.speed;
            self.draw('UP');
            res=true;
        }
        return res;
    }
    self.moveDown = function(){
        var res=false;
        if(self.canMoveDown()){
            self.clear();
            self.y+=self.speed;
            self.draw('DOWN');
            res=true;
        } 
        return res;
    }
    self.moveHaos=function(){
        if(self.canMoveRight() && self.canMoveDown() && (self.x>=3 || self.y<=3)){
            self.moveRight()
        }else if(self.canMoveDown() &&  self.x>=3){
            self.moveDown()
        }else if(self.canMoveLeft()){
            self.moveLeft()
        }else if(self.canMoveUp()){
            self.moveUp()
        }       
    }
    self.init(); 
}
var Tank=function(params) {
    Transport.apply(this, arguments);
}
var Game=function(params){
    var self=this;
    var c = document.getElementById("canvasId");
    self.context=c.getContext("2d");
    var defaults={
        enemiesCount:5
    }
    var options = $.extend(defaults, params);
    var rMax=40;
    var xMax=640-rMax;
    var yMax=520-rMax;

    var colors=['red','green','yellow','blue','orange','lime','brown'];
    var colorsCount=colors.length;
    var count=0;
    
    self.enemies=[];
    self.player=[];   
    self.tanks=[];
       
    var init=function(){           
        $("#target").keypress(function(event) {
            if ( event.which == 13 ) {
                event.preventDefault();
            }
            if(event.keyCode){
                switch(event.keyCode){
                    case 37:
                        self.player.moveLeft();
                        break;
                    case 39:
                        self.player.moveRight();
                        break;
                    case 38:
                        self.player.moveUp();
                        break;
                    case 40:
                        self.player.moveDown();
                        break;
                    default:
                        break;
                }
            }else if(event.charCode){
                switch(event.charCode){
                    case 97:
                        self.player.moveLeft();
                        break;
                    case 100:
                        self.player.moveRight();
                        break;
                    case 119:
                        self.player.moveUp();
                        break;
                    case 115:
                        self.player.moveDown();
                        break;
                    default:
                        break;
                }
            }
        });
    }
    /**
 * Create a tank randomly. New tank should not
 * overlaps existing ones.
 *
 * @return {Tank} New tank.
 */
    self.generateTank=function(){
        var drawn = true;
        var r=rMax;
        var x=Math.floor(Math.random()*xMax+1);
        var y=Math.floor(Math.random()*yMax+1);
        var attempts=0;
        while(drawn) {
            attempts++;
            if(attempts>10){
                break;
            }
            //check if is drown
            var d  = self.context.getImageData(x, y, r, r); 
            var len     = d.data.length;
            for(var i =0; i< len; i++) {
                if(!d.data[i]) {
                    drawn = false;
                }else if(d.data[i]) {
                    drawn = true;
                    x=Math.floor(Math.random()*xMax+1);
                    y=Math.floor(Math.random()*yMax+1);
                    break;
                }
            }
        }
  
        var colorIndex=Math.floor(Math.random()*colorsCount);
        var tank= new Tank({
            x:x,
            y:y,
            w:r,
            h:r,
            fill:colors[colorIndex]
        });
        setInterval(function(){
            tank.moveHaos();
        }, 5);
        return tank;
    }
    self.start=function(){
        init();
        self.player.push(new Tank({
            x:0,
            y:0,
            w:rMax,
            h:rMax,
            fill:'black'
        }));
        self.tanks.push(self.player);
        var interbalId= setInterval(function(){
            var tank=self.generateTank();
            self.enemies.push(tank);
            self.tanks.push(tank);
        
            count++;
            if(count>=options.enemiesCount){
                clearInterval(interbalId);
            }
        }, 5);
        console.log(self);
    }
}
$(function(){
    var game=new Game({
        enemiesCount:100
    });
    game.start();
    $('[name=generate_tank]').click(function(){
        game.generateTank();
    });
   
});
var c1={};
var c2=[];
console.log(typeof c1);
console.log(typeof c2);
console.log( c1);
console.log( c2);