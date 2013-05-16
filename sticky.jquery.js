/*!
 * jQuery sticky table headers plugin: take a valid table element with th tags and make em sticky
 * Examples and documentation at: http://walmik.info/demos/sticky.jquery
 * version 1 (05-APR-2012)
 * Requires jQuery v1.3.2 or later
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Author: Walmik Deshpande
 
 usage:
 $("#tbl").sticky();
 $(".tbl").sticky();
  
*/
;(function($)
{
    $.fn.sticky = function()
    {
        var tableId = this;

        //set border collapse
        //$(tableId).css("border-collapse", "collapse");
        //collect widths of all the <th> elements
        var tableWidth = $(tableId).width();
        var thWidthsArr = [];
        $(tableId).find("th").each(function(){
            thWidthsArr.push($(this).css("width"));
        });
        var pos = $(tableId).offset();
        //set the distance of the table from the top,
        //we ll need to make the headers sticky when this distance is 0  
        var thTop = pos.top + "px";
        var thLeft = pos.left;

        //identify first table row
        var firstRow = "tr:first-child";

        //change firstRow in case there is a thead tag used
        var hasTHead = $(tableId).find("thead").length;    
        if(hasTHead) firstRow = "thead tr:first-child";

        //set the widths of the first and last tr's ths/tds...
        //this is done coz in some cases,
        //the widths will get messed up if the data was generated dynamically
        var count = 0;
        $(tableId).find(firstRow + ">th").each(function(){
            $(this).css("width", thWidthsArr[count]);
            count++;
        });
        count = 0;

        //assign the widths to td elements of a tr row
        //choose the last tr coz the first tr has th elements
        var lastRow = "tr:last-child";
        $(tableId).find(lastRow + ">td").each(function(){
            $(this).css("width", thWidthsArr[count]);
            count++;
        });


        $(window).scroll(function(){
            if($(window).scrollTop() > pos.top)
            {
                $(tableId).find(firstRow).css("width", tableWidth+"px");
                $(tableId).find(lastRow).css("width", tableWidth+"px");
                $(tableId).find(firstRow).css("position", "absolute");
                $(tableId).find(firstRow).css("top", $("body")[0].scrollTop + "px");
                $(tableId).find(firstRow).css("left", thLeft+ "px");
                console.log($(tableId).scrollTop());
            }
            else
            {
                $(tableId).find(firstRow).css("position", "relative");
                $(tableId).find(firstRow).css("top", thTop);
            }
        });
        
    }
})(jQuery);
