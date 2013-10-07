#sticky.jquery

jQuery Plugin for making sticky table headers and sticky elements

###How to use this plugin on a table?
* Make a table and use the table header (TH) elements to define your column names
* Make sure you have pulled jquery in your HTML and add a script tag to include the sticky.jquery plugin
* Initialize the plugin on your table $('#tableId').sticky()
* Boom! Sticky Table Headers :)

###How to use this plugin on a div element?
* Make a div (or any other block level element) and assign it an id
* Make sure you have pulled jquery in your HTML and add a script tag to include the sticky.jquery plugin
* Initialize the plugin on your div $('#divId').sticky()
* Boom! Sticky Div :)

###How to use this plugin on a h3 element and bind it's sticky to a div?
* Make a h3 element and a div and assign them both an id
* Make sure you have pulled jquery in your HTML and add a script tag to include the sticky.jquery plugin
* Initialize the plugin on your h3 element and specify the div you want it's sticky to be bound with $('#h3Id').sticky({bindWith: '#divId'})
* Boom! Sticky H3 bound to a Div :)

[Demo](http://walmik.info/demos/sticky.jquery/)