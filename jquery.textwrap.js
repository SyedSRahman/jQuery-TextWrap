/*!
* TextWrap - Match & Wrap text
* http://shikeb.net/2010/11/introducing-jquery-textwrap/
*
* Copyright (c) 2010 syedsrahman (http://shikeb.net)
* Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
* and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
*
* Built on top of the jQuery library
* http://jquery.com
*
*/

(function($){
  $.fn.textwrap = function( options ){

    var settings = {
      attr : '',
      match : '',
      put   : '',
      skip  : ['iframe','script','style'],
      wrap  : 'span'
    };

    var klass = 'textwrap'; // for referencing the modified nodes later on

    var dress = function(node){
      var dressd=0,begin,end;
      if(node.nodeType==3 && settings.match.test && settings.match.test(node.nodeValue)){

        if(settings.put && (typeof settings.put == 'string')){
          node.nodeValue = node.nodeValue.replace(settings.match,settings.put);
          begin = node.nodeValue.indexOf(settings.put);
          end = settings.put.length;
        } else {
          var match = node.nodeValue.match(settings.match)[0];
          begin = node.nodeValue.indexOf(match);
          end = match.length;
        }
        
        if(begin>=0){
          var wrap = document.createElement(settings.wrap);
          var text = node.splitText(begin);
          text.splitText(end);
          wrap.appendChild(text.cloneNode(true));
          text.parentNode.replaceChild(wrap,text);
          $.each(settings.attr,function(i,v){
            $(wrap).attr(i,v);
          });
          $(wrap).addClass(klass)
          dressd = 1
        }
      }else{
        if((node.nodeType==1) && node.childNodes && !settings.skip.test(node.tagName) && (node.className.indexOf(klass) == -1) ){
          for(var i=0;i<node.childNodes.length;++i){
            i+=dress(node.childNodes[i]);
          }
        }
      }
      return dressd;
    };

    return this.each(function(){

      if(options){
        $.extend(settings,options);
      }
      if(typeof settings.skip == 'object'){
        settings.skip = new RegExp('('+ settings.skip.join('|')+')','i');
      }
      //convert the matching pattern to regex if not already one
      if(settings.match && (typeof settings.match == 'string')){
        settings.match = new RegExp(settings.match,'i');
      }
      
      if(settings.match){
        dress(this);
      }
      
    });
  }  
})(jQuery);