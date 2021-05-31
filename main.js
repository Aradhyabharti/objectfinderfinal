video = ""
 status=""
 object = []
 percent = ""

function setup(){
    canvas=createCanvas(400,300)
    canvas.center()
    video = createCapture(400,300)
    video.center()
    video.hide()
}


function draw(){
    image(video,0,0,400,300)
    if (status != "") {
     od.detect(video,gotResults)
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "status: object detected"+object.length;
            fill("#ff0000")
            percent = floor(object[i].confidence * 100)
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15)
            noFill()
            stroke("#ff0000")
            rect(object[i].x,object[i].y,object[i].width,object[i].height)

            if(object[i].label == objectname){
                video.stop()
                od.detect(gotResults)
                document.getElementById("objectfound").innerHTML = objectname+" found";
                synth=window.speechSynthesis;
                utterthis=new SpeechSynthesisUtterance(objectname+" found")
                synth.speak(utterthis)
            }
            else{
                document.getElementById("objectfound").innerHTML = objectname+" not found";  
            }
        }
    }
}

function start(){
    od=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML="Detecting objects "
    objectname = document.getElementById("name").value
}


function modelLoaded(){
    console.log('model is loaded')
   status=true
}


function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results)
        object = results
    }
}