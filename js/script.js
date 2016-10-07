/* module
----------------------------------------------------------------*/
$(function () {
    $('.m-module-code').each(function () {
        if (!$(this).next('textarea').length) {
            // html
            var $parentBlock = $(this).wrap('<div class="m-module-block">').parent();
            $parentBlock.append('<textarea class="htmlCode"></textarea><textarea class="jadeCode"></textarea>');
            var $html = $(this).html();
            $html = $html.replace(/</g, '&lt;');
            $html = $html.replace(/>/g, '&gt;');
            $html = $html.replace(/^\n/, '');

            if (!$(this).html().length) {
                $(this).next('textarea').hide()
            }
            if (!$parentBlock.find('.htmlCode').text().length) {
                $parentBlock.find('.htmlCode').html($html);
            }

            // jade
            var $htmlCode = $parentBlock.find('.htmlCode');
            var html = $htmlCode.text();
            var aryJade = Html2Jade.convertHtml(html, { bodyless: true, nspaces: 2, donotencode: true });
            var i = 0, jade = [];
            for (var ind in aryJade) {
                if (i > 0) {
                    jade.push(aryJade[ind]);
                }
                i++;
            }
            $parentBlock.find('.jadeCode').val(jade.join(''));
        }
    });
    (function () {
        var $textareas = $('textarea');

        // store init (default) state   
        $textareas.data('x', $textareas.outerWidth());
        $textareas.data('y', $textareas.outerHeight());

        $textareas.mousemove(function () {
            var $this = $(this);

            if ($this.outerWidth() != $this.data('x')
                || $this.outerHeight() != $this.data('y')) {
                // Resize Action Here
                var $textarea = $this;
                if($textarea.hasClass('htmlCode')){
                    $textarea = $this.next('textarea');
                }else{
                    $textarea = $this.prev('textarea');
                }
                $textarea.outerWidth($this.outerWidth());
                $textarea.outerHeight($this.outerHeight());
                
            }

            // store new height/width
            $this.data('x', $this.outerWidth());
            $this.data('y', $this.outerHeight());
        });
    })();
});


