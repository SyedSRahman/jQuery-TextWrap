(function($){
  $.fn.textwrap = function( options ){

    var settings = {
      match : '',
      put : '',
      wrap : 'span',
      klass : 'textwrap',
      skip : 'iframe,script,style'
    };

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
          wrap.className = settings.klass;
          var text = node.splitText(begin);
          text.splitText(end);
          wrap.appendChild(text.cloneNode(true));
          text.parentNode.replaceChild(wrap,text);
          dressd = 1
        }
      }else{
        if((node.nodeType==1) && node.childNodes && !settings.skip.test(node.tagName) && (node.className.indexOf(settings.klass) == -1) ){
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
      if(typeof settings.skip == 'string'){
        settings.skip = new RegExp('('+ settings.skip.split(',').join('|')+')','i');
      }
      //convert the matching pattern to regex if not already
      if(settings.match && (typeof settings.match == 'string')){
        settings.match = new RegExp(settings.match,'i');
      }
      
      if(settings.match){
        dress(this);
      }
      
    });

  }

  
})(jQuery);