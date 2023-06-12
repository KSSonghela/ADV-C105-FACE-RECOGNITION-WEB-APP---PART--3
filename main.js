Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:100,
    flip_horiz:true
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML ='<img id="captured_image" src="'+data_uri+'">';
    });
}

console.log('ml5 version- ', ml5.version);

function modelLoaded()
{
    console.log('model is loaded');
}

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/q2CufJjyS/model.json',modelLoaded);

function check()
{
    image=document.getElementById("captured_image");
    classifier.classify(image,gotResults);
}

function gotResults(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_object_name").innerHTML=results[0].label;
        document.getElementById("result_object_accuracy").innerHTML=results[0].confidence.toFixed(2);
    }
}