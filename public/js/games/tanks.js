$(function(){
    APP_Significant.allTanks;       
    var $battleField= $("#canvasId");
    APP_Significant.Tank = function(params){
        //    console.log(arguments);
        if(undefined==params){
            params={};
        }
        var self=this;
        self.maxWidth=params.maxWidth;
        self.maxHeight=params.maxHeight;
        self.$html=undefined;
        self.x = params.x || 0;
        self.y = params.y || 0;
        self.w = params.w || 200;
        self.h = params.h || 100;
        self.fill = params.fill || 'rgba(255, 255, 255, 0.5)';

        self.init(); 
    }
 
    APP_Significant.Tank.prototype=(function(){
        var counter=0;
        return {
            speed:15,
            getId:function(){
                counter++;
                return counter;
            },
            init:function(){
                this.initHtml();
                this.draw();
                console.log(this.getId(),'id');
            },
            initHtml:function(){
                var $div = $('<div></div>');
                this.$html=$div;
                $battleField.append($div);

            },
            draw:function(direction){
                var cssObj = {
                    'width' : this.w+'px',
                    'height' : this.h+'px',
                    'background': this.fill,
                    'display':'inline-block',
                    'position':'absolute',
                    'top':this.y+'px',
                    'left':this.x+'px'
                }
                this.$html.css(cssObj);
            },
            drawMuzzle:function(direction){
                switch(direction){
                    case 'LEFT':
                        break;
                    case 'RIGHT':
                        break;
                    case 'UP':
                        break;
                    case 'DOWN':
                        break;
                    default:
                        break;
                }
            },
            clear:function(){
            //        self.$html.clear();
            },
            moveLeft : function(){
                var res=false;
                if(this.x-this.speed>=0){
                    this.clear();
                    this.x-=this.speed;
                    this.draw('LEFT');
                    res=true;
                }else if(this.x>0){
                    this.x=0;
                    this.draw('LEFT');
                    res=true;
                }
                return res;
            },
            moveRight : function(){
                var res=false;
                if(this.x+this.speed+this.w<=this.maxWidth){
                    this.x+=this.speed;
                    this.draw('RIGHT');
                    res=true;
                }else if(this.x+this.w<this.maxWidth){
                    this.x=(this.maxWidth-this.w);
                    this.draw('RIGHT');
                    res=true;
                } 
                return res;
            },
            moveUp : function(){
                var res=false;
                if(this.y-this.speed>=0){
                    this.clear();
                    this.y-=this.speed;
                    this.draw('UP');
                    res=true;
                }else if(this.y>0){
                    this.y=0;
                    this.draw('UP');
                    res=true;
                }
                return res;
            },
            moveDown : function(){
                var res=false;
                if(this.y+this.speed+this.h<=this.maxHeight){
                    this.clear();
                    this.y+=this.speed;
                    this.draw('DOWN');
                    res=true;
                }else if(this.y+this.h<this.maxHeight){
                    this.y=(this.maxHeight-this.h);
                    this.draw('UP');
                    res=true;
                }
                return res;
            },
            moveHaos:function(){
                if((this.x>0 ||this.y==0) && (this.y+this.h!=this.maxHeight) &&  this.moveRight()){
                //                    this.moveRight();
                }else if((this.x+this.w==this.maxWidth || this.y>0 && this.x>0)  && this.moveDown()){
                //                    this.moveDown();
                }else if(this.moveLeft()){
                //                    this.moveLeft();
                }else if(this.moveUp()){
                //                    this.moveUp();
                }       
            }
        };
        return res;
    })();

    APP_Significant.Game=function(params){
        var self=this;
        var defaults={
            enemiesCount:5,
            maxWidth:640,
            maxHeight:520
        }
        var options = $.extend(defaults, params);
        var rMax=40;
        var xMax=options.maxWidth-rMax;
        var yMax=options.maxHeight-rMax;

        var colors=['red','green','yellow','blue','orange','lime','brown'];
        var colorsCount=colors.length;
        var count=0;
    
        self.enemies=[];
        self.player={};   
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
            var r=rMax;
            var x=Math.floor(Math.random()*xMax+1);
            var y=Math.floor(Math.random()*yMax+1);
            var colorIndex=Math.floor(Math.random()*colorsCount);
            var tank= new APP_Significant.Tank({
                x:x,
                y:y,
                w:r,
                h:r,
                fill:colors[colorIndex],
                maxWidth:options.maxWidth,
                maxHeight:options.maxHeight
            });
            setInterval(function(){
                tank.moveHaos();
            }, 5);
            return tank;
        }
        self.start=function(){
            init();
            self.player=new APP_Significant.Tank({
                x:0,
                y:0,
                w:rMax,
                h:rMax,
                fill:'black',
                maxWidth:options.maxWidth,
                maxHeight:options.maxHeight
            });
            self.player.speed=10;
            self.tanks.push(self.player);
            var count=0;
            var interbalId= setInterval(function(){

                if(count>=options.enemiesCount){
                    clearInterval(interbalId);
                    return;
                }
                var tank=self.generateTank();
                self.enemies.push(tank);
                self.tanks.push(tank);
        
                count++;
            }, 5);
            console.log(self);
        }
    }
    var game1=new APP_Significant.Game({
        enemiesCount:20,
        maxWidth:640,
        maxHeight:520
        
    });
    var game2=new APP_Significant.Game({
        enemiesCount:20,
        maxWidth:600,
        maxHeight:480
        
    });
    game1.start();
    game2.start();
    $('[name=generate_tank]').click(function(){
        game1.generateTank();
    });
   
});