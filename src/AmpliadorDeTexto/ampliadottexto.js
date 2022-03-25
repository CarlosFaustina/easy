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
        while (i > 0 && (data[i] !== "," )) { --i; };
        begin = i;

        //determinar o fim da frase
        i = offset;
        while (i < data.length && data[i] !== ",") { ++i; };
        end = i;

       
        return data.substring(begin, end);
    }

    
    var $hoverText = $("body").find('p,span');
    $hoverText.mousemove(function (e) {
        var word = getWordUnderCursor(e);
      //  var $this = $(this)[0].lastElementChild;
     /// elimarn virgulas e pontos nas frases
      var regex = /[.,\s]/g;

      word = word.replace(regex,' ');
  
       
        
      
        if (word !== "") 
          
            if( $(this).find('span').length > 0 ){
              $(this).find('span').addClass('tool-tip');
            }else{
              $(this).addClass('tool-tip');
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