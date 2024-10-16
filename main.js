const canvas=document.getElementById("myCanvas");
canvas.width=200;

const ctx = canvas.getContext("2d");
const road=new Road(canvas.width/2,canvas.width*0.9);
const car=new Car(road.getLaneCenter(1),100,30,50,"KEYS");
const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2.8),
    new Car(road.getLaneCenter(2),-400,30,50,"DUMMY",2.8),
    new Car(road.getLaneCenter(0),-700,30,50,"DUMMY",2.8),
    new Car(road.getLaneCenter(1),-900,30,50,"DUMMY",2.8),
    new Car(road.getLaneCenter(0),-1000,30,50,"DUMMY",2.8),
    new Car(road.getLaneCenter(2),-1100,30,50,"DUMMY",2.8)
];

animate();

function animate(){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    car.update(road.borders,traffic);

    canvas.height=window.innerHeight;

    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.7);

    road.draw(ctx);
    for(let i=0;i<traffic.length;i++){
        if((i+1)%4==1){
            traffic[i].draw(ctx,"red");
        }
        else if((i+1)%4==2){
            traffic[i].draw(ctx,"green");
        }
        else if((i+1)%4==3){
            traffic[i].draw(ctx,"brown");
        }
        else{
            traffic[i].draw(ctx,"purple");
        }

    }
    car.draw(ctx,"blue");

    ctx.restore();
    requestAnimationFrame(animate);
}