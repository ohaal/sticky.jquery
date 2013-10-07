/*!
 * jQuery sticky table headers plugin: take a valid table element with <th> tags and make em sticky
 * Examples and documentation at: http://walmik.info/demos/sticky.jquery
 * version 1.3
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
    $.fn.sticky = function(options) {
        var settings = $.extend({
            bindWith: ''
        }, options);
        return this.each(function() {
            var $el = $(this);
            var elWidth = $el.width();
            //get the element height to stop sticky after table has been scrolled
            var elHeight = 0;

            var pos = $el.offset();
            //get the current distance of the table from the top
            var thTop = pos.top + "px";
            var thLeft = pos.left;

            //sticky works a bit differently for tables
            var isTable = $el.prop('tagName').toLowerCase() == 'table';

            if(isTable) {
                //since this is a table, we ll use the table's height to monitor sticky
                elHeight = $el.height();
                //collect widths of all the <th> elements
                var thWidthsArr = [];
                $el.find("th").each(function(){
                    thWidthsArr.push($(this).css("width"));
                });

                //get the height of the table header row to offest it from the stop-sticky-after-table-scroll feature
                var thHeight = $el.find("th:first").parent().height();

                //subtract the th height from elHeight
                elHeight -= thHeight;

                //identify first table row
                var $firstRow = $el.find('tr:first-child');

                //change firstRow in case there is a thead tag used
                var hasTHead = $el.find('thead').length;    
                if(hasTHead) $firstRow = $el.find('thead tr:first-child');

                //set the widths of the first and last tr's ths/tds...
                //this is done coz in some cases,
                //the widths will get messed up if the data was generated dynamically
                var count = 0;
                $firstRow.find('th').each(function(){
                    $(this).css('width', thWidthsArr[count]);
                    count++;
                });
                count = 0;

                //assign the widths to td elements of a tr row
                //choose the last tr coz the first tr has th elements
                var $lastRow = $el.find('tr:last-child');
                $lastRow.find('td').each(function(){
                    $(this).css('width', thWidthsArr[count]);
                    count++;
                });

                $firstRow.css('width', elWidth+'px');
                $firstRow.css('left', thLeft+ 'px');
                $lastRow.css('width', elWidth+'px');

                //on tables with border-collapse set to the default 'separate', 
                //a small spacing is seen on the top of the element when its sticky
                //get the Y value of that spacing and subtract it later during sticky
                var borderSpacing = 0;
                //check border collapse to sort issues of a minor spacing on the top of the table when sicky
                if($el.css('border-collapse') == 'separate') {
                    var borderSpacingStr = $el.css('border-spacing'); //sample: 2px 2px 
                    //get the Y value from the sample
                    var yBorderSpacing = borderSpacingStr.split(' ')[1];    //returns: 2px
                    //get rid of the 'px'
                    borderSpacing = parseInt(yBorderSpacing.substring(0,yBorderSpacing.indexOf('px')), 10);
                }

                //init sticky on window scroll
                $(window).on('scroll', function(){
                    if($(window).scrollTop() > pos.top && $(window).scrollTop() < pos.top + elHeight)
                    {
                        $firstRow.css('position', 'absolute');
                        $firstRow.css('top', ($('body')[0].scrollTop - borderSpacing) + 'px');
                    }
                    else
                    {
                        $firstRow.css('position', 'relative');
                        $firstRow.css('top', thTop);
                    }
                });
            } else {
                //its not a table
                var marginTop = 0;
                var marginTopStr = $el.css('margin-top'); //sample: 10px 
                //get rid of the 'px'
                marginTop = parseInt(marginTopStr.substring(0,marginTopStr.indexOf('px')), 10);

                $el.css('width', elWidth+'px');

                //init sticky on window scroll
                //check if there s a bindWith element
                if(settings.bindWith !== '') {
                    elHeight = $(settings.bindWith).height();
                    $(window).on('scroll', function(){
                        if($(window).scrollTop() > pos.top && $(window).scrollTop() < pos.top + elHeight)
                        {
                            $el.css('top',  (0 - marginTop) +'px');
                            $el.css('position', 'fixed');
                        }
                        else
                        {
                            $el.css('position', 'static');
                            
                        }
                    });
                } else {
                    $(window).on('scroll', function(){
                        if($(window).scrollTop() > pos.top)
                        {
                            $el.css('top',  (0 - marginTop) +'px');
                            $el.css('position', 'fixed');
                        }
                        else
                        {
                            $el.css('position', 'static');
                            
                        }
                    });
                }
                
            }  
        });
    };
})(jQuery);
