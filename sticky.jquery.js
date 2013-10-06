/*!
 * jQuery sticky table headers plugin: take a valid table element with <th> tags and make em sticky
 * Examples and documentation at: http://walmik.info/demos/sticky.jquery
 * version 1.2 (Sep 12 2013)
 * Requires jQuery v1.3.2 or later
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Author: Walmik Deshpande (walmik.info)
 
 usage:
 $("#tbl").sticky();
 $(".tbl").sticky();
  
*/
;(function($)
{
    $.fn.sticky = function()
    {
        return this.each(function() {
            var $el = $(this);

            //set border collapse
            //$el.css("border-collapse", "collapse");
            //collect widths of all the <th> elements
            var elWidth = $el.width();

            //get the table height to stop sticky after table has been scrolled
            var elHeight = $el.height();

            //get the height of the table header row to offest it from the stop-sticky-after-table-scroll feature
            var thHeight = $el.find("th:first").parent().height();

            var thWidthsArr = [];
            $el.find("th").each(function(){
                thWidthsArr.push($(this).css("width"));
            });
            var pos = $el.offset();
            //set the distance of the table from the top,
            //we ll need to make the headers sticky when this distance is 0  
            var thTop = pos.top + "px";
            var thLeft = pos.left;

            //identify first table row
            var firstRow = "tr:first-child";

            //change firstRow in case there is a thead tag used
            var hasTHead = $el.find("thead").length;    
            if(hasTHead) firstRow = "thead tr:first-child";

            //set the widths of the first and last tr's ths/tds...
            //this is done coz in some cases,
            //the widths will get messed up if the data was generated dynamically
            var count = 0;
            $el.find(firstRow + ">th").each(function(){
                $(this).css("width", thWidthsArr[count]);
                count++;
            });
            count = 0;

            //assign the widths to td elements of a tr row
            //choose the last tr coz the first tr has th elements
            var lastRow = "tr:last-child";
            $el.find(lastRow + ">td").each(function(){
                $(this).css("width", thWidthsArr[count]);
                count++;
            });


            $(window).scroll(function(){
                if($(window).scrollTop() > pos.top && $(window).scrollTop() < pos.top + elHeight - thHeight)
                {
                    $el.find(firstRow).css("width", elWidth+"px");
                    $el.find(lastRow).css("width", elWidth+"px");
                    $el.find(firstRow).css("position", "absolute");
                    $el.find(firstRow).css("top", $("body")[0].scrollTop + "px");
                    $el.find(firstRow).css("left", thLeft+ "px");
                    //console.log($el.scrollTop());
                }
                else
                {
                    $el.find(firstRow).css("position", "relative");
                    $el.find(firstRow).css("top", thTop);
                }
            });
        });
    }
})(jQuery);
