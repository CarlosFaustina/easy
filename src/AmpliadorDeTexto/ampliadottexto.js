$(function () {
    function getWordUnderCursor(event) {
        var range, textNode, offset;

        if (document.body.createTextRange) {           // Internet Explorer
            try {
                range = document.body.createTextRange();
                range.moveToPoint(event.clientX, event.clientY);
                range.select();
                range = getTextRangeBoundaryPosition(range, true);
  
                textNode = range.node;
                offset = range.offset;
            } catch(e) {
                return "";
            }
        }
        else if (document.caretPositionFromPoint) {    // Firefox
            range = document.caretPositionFromPoint(event.clientX, event.clientY);
            textNode = range.offsetNode;
            offset = range.offset;
        } else if (document.caretRangeFromPoint) {     // Chrome
            range = document.caretRangeFromPoint(event.clientX, event.clientY);
            textNode = range.startContainer;
            offset = range.startOffset;
        }else{

        }

        //data contem a frase completa
        //offset representa a posiçao do cursor
        var data = textNode.data,
            i = offset,
            begin,
            end;

        //Fdeterminar o inicio da frase
        //console.log(data);
        try {
          while (i > 0  && (data[i] !== " " && data[i] !== "." )) { --i; };
          begin = i;
  
          //determinar o fim da frase
          i = offset;
          while (i < data.length && (data[i] !=="," && data[i] !== "."  )  ) { ++i; };
          end = i;
  
         
          return data.substring(begin, end);
          
        } catch (error) {
          
        }
      
    }

    
    var $hoverText = $("body").find('#hoverText');
    $hoverText.mousemove(function (e) {
        var word = getWordUnderCursor(e);
      //  var $this = $(this)[0].lastElementChild;
     /// elimarn virgulas e pontos nas frases
      var regex = /[.,\s]/g;

     /*try {
      word = word.replace(regex,' ');
     } catch (error) {
       
     }*/
  
       
        
      
        if (word !== "") 
        
          
            if( $(this).find('span').length > 0 ){
              //remover as classes nos filhos de span
             if($(this).find('span').children().length>0){
              $(this).find('span').children().each(function(i,el){
                $(el).removeClass('tool-tip');
                $(el).parent().addClass('tool-tip');
              })
             }else{
              // console.log($(this));
              $(this).find('span').addClass('tool-tip');
             }
              
              //$('.tool-tip').attr('title-new',word)
              //console.log($(this));
            }else{
              // se for uma colleçao 
              try {
              if($(this).length >1 ){

               
                  $(this).each(function(index,item){
                    if( $(item).parent()){
                      $(item).parent().each(function(index,el){
                        $(item).parent(el).removeClass('tool-tip');
                        //console.log(el);
                      });
                      // se o elemento tiver parent adicionar classe nos filhos
                      $(item).children().addClass('tool-tip');
                      
                     
                    }else{
                     // adicionar o elemento a classe mais proximo
                      $(item).closest().addClass('tool-tip');
                    }
                    
                   
                  })
                 // $(this).addClass('tool-tip');
                 
                }else{
                  //se for elemento com filho
                  if($(this).children().length > 0 ){
                    $(this).children().each(function(index,item){
                    $(this).parent(item).removeClass('tool-tip');
                      // console.log($(this.children().length > 0));
                    })

                  }else{
                    //console.log('esta aqui');
                    $(this).addClass('tool-tip');
                  }
                //  console.log(this);
                  
                  
                  
                
                }
                  
                } catch (error) {
                  
                }
                
              //$(this).addClass('tool-tip');
           
            }
            $('.tool-tip').attr('title-new',word);
       
            
    });
});

// Para Internet explorer 
//
function getTextRangeBoundaryPosition(textRange, isStart) {
  var workingRange = textRange.duplicate();
  workingRange.collapse(isStart);
  var containerElement = workingRange.parentElement();
  var workingNode = document.createElement("span");
  var comparison, workingComparisonType = isStart ?
    "StartToStart" : "StartToEnd";

  var boundaryPosition, boundaryNode;


  do {
    containerElement.insertBefore(workingNode, workingNode.previousSibling);
    workingRange.moveToElementText(workingNode);
  } while ( (comparison = workingRange.compareEndPoints(
    workingComparisonType, textRange)) > 0 && workingNode.previousSibling);

  boundaryNode = workingNode.nextSibling;
  if (comparison == -1 && boundaryNode) {
   
    workingRange.setEndPoint(isStart ? "EndToStart" : "EndToEnd", textRange);

    boundaryPosition = {
      node: boundaryNode,
      offset: workingRange.text.length
    };
  } else {
 
    boundaryPosition = {
      node: containerElement,
      offset: getChildIndex(workingNode)
    };
  }

  // Clean up
  workingNode.parentNode.removeChild(workingNode);

  return boundaryPosition;
}