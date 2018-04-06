jQuery(document).ready(function( $ ) {

	$('.main-button').on('click', function(){

		$('#gradient').addClass('active');

		var pulse = document.createElement("div");
    	pulse.className = "pulse";
		$('.main-button').append(pulse);

		var dot = document.createElement("div");
    	dot.className = "dot";
		$('.main-button').append(dot);

		setTimeout(function(){
			listen();
		}, 3000);

    });

    function listen(){

    	$('#gradient').remove();

    	$('.app').slideUp();
    	$('.app').css('display','block');

    	$('.listen').css('display','block');

    	$('#main').on('click', function(){
    		$('.listen').css('display','none');
    		$('.main').css('display','block');
    	});

		setTimeout(function(){
			$('.broadcaster').slideDown();
		}, 5000);

    }

	//background Listen Screen

	function gradient(){

		var colors = new Array(
		  [62,35,255],
		  [60,255,60],
		  [255,35,98],
		  [45,175,230],
		  [255,0,255],
		  [255,128,0]);

		var step = 0;
		//color table indices for:
		// current color left
		// next color left
		// current color right
		// next color right
		var colorIndices = [0,1,2,3];

		//transition speed
		var gradientSpeed = 0.008;

		function updateGradient()
		{

		  if ( $===undefined ) return;

		var c0_0 = colors[colorIndices[0]];
		var c0_1 = colors[colorIndices[1]];
		var c1_0 = colors[colorIndices[2]];
		var c1_1 = colors[colorIndices[3]];

		var istep = 1 - step;
		var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
		var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
		var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
		var color1 = "rgb("+r1+","+g1+","+b1+")";

		var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
		var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
		var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
		var color2 = "rgb("+r2+","+g2+","+b2+")";

		 $('#gradient').css({
		   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
		    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

		  step += gradientSpeed;
		  if ( step >= 1 )
		  {
		    step %= 1;
		    colorIndices[0] = colorIndices[1];
		    colorIndices[2] = colorIndices[3];

		    //pick two new target color indices
		    //do not pick the same as the current one
		    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
		    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

		  }
		}

		setInterval(updateGradient,10);

	}

	gradient();

});


function keywordClick(){
  console.log("I'm in the function")
  var jsonObject = { "entities": [ { "name": "Donald Trump", "type": "PERSON", "metadata": { "wikipedia_url": "https://en.wikipedia.org/wiki/Donald_Trump", "mid": "/m/0cqt90" }, "salience": 0.467794, "mentions": [ { "text": { "content": "Donald Trump", "beginOffset": -1 }, "type": "PROPER" } ] }, { "name": "New York", "type": "LOCATION", "metadata": { "mid": "/m/02_286", "wikipedia_url": "https://en.wikipedia.org/wiki/New_York_City" }, "salience": 0.3021753, "mentions": [ { "text": { "content": "New York", "beginOffset": -1 }, "type": "PROPER" } ] }, { "name": "DACA", "type": "OTHER", "metadata": { "wikipedia_url": "https://en.wikipedia.org/wiki/Deferred_Action_for_Childhood_Arrivals", "mid": "/m/0n47q8y" }, "salience": 0.23003069, "mentions": [ { "text": { "content": "DACA", "beginOffset": -1 }, "type": "PROPER" } ] } ], "language": "en" };
  if(Array.isArray(jsonObject.entities)){
    var keywords = [], output = {};
    var result = jsonObject.entities;
    result.forEach(function(word){
      if(word.metadata.wikipedia_url){
        output.name = word.name;
        output.wiki = word.metadata.wikipedia_url;
        keywords.push(output)
      }
    })
    console.log(keywords)
    // $('#tags').text(keywords);
		for (i = 0; i < keywords.length; i++) {
			var link = '';
			 link += '<a href="#">';
			 link += '<li>' + keywords[i].name + '</li>';
			 link += '</a>';
  		$(link).appendTo('#tags');
}
  }
}

keywordClick();
