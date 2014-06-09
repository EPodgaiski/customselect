//******************************
// customSelect, 2014, jQuery script
// Creater: Egor Podgaiski, http://gorik.name/
// Dual licensed under the MIT and GPL licenses:
// http://www.opensource.org/licenses/mit-license.php
// http://www.gnu.org/licenses/gpl.html
// I Am ...
//******************************
function customSelect(selector){
    $(selector).each(function(){
        var $this = $(this),
            selOption = $this.find('option:selected'),
            selVal = selOption.text() || ' ',
            selWrap = $('<span />',{'class':'select'}).addClass($this.attr('class')),
            customSelVal = $('<span>',{'class':'select_val','text':selVal}),
            selLabel = $this.attr('data-label') || 0,
            selPlaceholder = $this.attr('data-placeholder') || 0,
            selStyle = $this.attr('style') || 0,
            selWidth = $this.attr('width') || 0;

        if($this.prop('disabled')){
            selWrap.addClass('disabled');
        }
        if (selPlaceholder.length){
            $this.attr('autocomplete','off')
            if(selPlaceholder == 'optionFirst'){/*TODO убрать/заменить значени селекта null*/
                $this.find('option').eq(0).attr('disabled','disabled').hide();
            }else{
                customSelVal.text(selPlaceholder);
            }
        }
        if (selLabel.length){
            customSelVal.attr('data-label', selLabel + ' ');
        }
        if (selStyle.length){
            selWrap.attr('style', selStyle);
        }
        if (selWidth.length){
            selWrap.css('width', selWidth);
        }

        $this.wrap(selWrap);
        customSelVal.prependTo($this.parent());
        // console.log($this, $this.val());
    })

    $('select').on({
        change: function(){
            customSelectChange(this);
        },
        focus: function(){
            if (!$(this).prop('disabled'))
                $(this).closest('.select').addClass('in_focus');
        },
        blur: function(){
            $(this).closest('.select').removeClass('in_focus');
        }
    })
}

function customSelectChange(el){
    var el = $(el),
        tSelVal = el.find('option:selected').text();

    el.closest('.select').find('.select_val').text(tSelVal);
    el.closest('.select').attr('class', el.attr('class'));
}