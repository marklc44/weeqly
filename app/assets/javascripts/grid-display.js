Handlebars.registerHelper('everyNth', function(context, every, options) {
  var fn = options.fn, inverse = options.inverse;
  var ret = "";
  if(context && context.length > 0) {
    for(var i=0, j=context.length; i<j; i++) {
      var modZero = i % every === 0;
      ret = ret + fn(_.extend({}, context[i], {
        isModZero: modZero,
        isModZeroNotFirst: modZero && i > 0,
        isLast: i === context.length - 1
      }));
    }
  } else {
    ret = inverse(this);
  }
  return ret;
});

//handlebar helper for large image
Handlebars.registerHelper('getLargeImage', function(imageUrlsBySize) {
  if(imageUrlsBySize) {
    return imageUrlsBySize["90"];
  }else{
    return '';
  }
});

//handlebar helper for cook time
Handlebars.registerHelper('parseCookTime', function(cookTime) {
  var time = cookTime/60;
  return time;
});
//handlebars helper for number of ingredients
//this doesn't work yet 11-11-2013
Handlebars.registerHelper('numIngredients', function(ingredients) {
  return ingredients.length;
});

//handlebar helper for listing ingredients
//this doesn't work yet 11-11-2013
Handlebars.registerHelper('listIngredients', function(ingredients) {
  var textIngredients = '';
  for(var i=0;i<ingredients.length;i++) {
    textIngredients = ingredients[i] + ', ';
  }
  return textIngredients;
});
//error handling for ajax call

//handlebars helper for star rating
Handlebars.registerHelper('insertStars', function(rating) {
  var html = '';
  var star =  '<i class="icon-star"></i>';
  var emptyStar = '<i class="icon-star-empty"></i>';
  if(rating === 0) {
    html = emptyStar +
            emptyStar +
            emptyStar +
            emptyStar +
            emptyStar;
  }else if(rating === 1) {
    html = star +
            emptyStar +
            emptyStar +
            emptyStar +
            emptyStar;
  }else if(rating === 2) {
    html = star +
            star +
            emptyStar +
            emptyStar +
            emptyStar;
  }else if(rating === 3) {
    html = star +
            star +
            star +
            emptyStar +
            emptyStar;
  }else if(rating === 4) {
    html = star +
            star +
            star +
            star +
            emptyStar;
  }else if(rating === 5) {
    html = star +
            star +
            star +
            star +
            star;
  }
  return html;
});

function displayGrid(results) {
	console.log(results);
	var source = $("#grid-tpl").html();
	var template = Handlebars.compile(source);
	var context = results;
	var html = template(context);
	$('#results-grid').html(html);
}
