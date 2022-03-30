let chk='false'; //sentinela para ativar o efeito Focus com o btn .
function focar()
  {


     
      var divFocus = document.createElement("DIV");
      divFocus.id = 'cursor';
      divFocus.className = "cursor";

      var divMascara = document.createElement("DIV");
      divMascara.id = 'divMascara';
      divMascara.className = "divMascara";


      var divMascara2 = document.createElement("DIV");
      divMascara2.id = 'divMascara2';
      divMascara2.className = "divMascara2";


    


  
      

             document.getElementsByTagName("body")[0].appendChild(divFocus);
             document.getElementsByTagName("body")[0].appendChild(divMascara);
             document.getElementsByTagName("body")[0].appendChild(divMascara2);

     

             document.getElementById("divMascara").style.opacity = "75%";
             document.getElementById("divMascara2").style.opacity = "75%";
      
             document.getElementById("divMascara").style.background = "rgb(95, 95, 95)"; 
             document.getElementById("divMascara2").style.background = "rgb(95, 95, 95)"; 
      
             document.getElementById("divMascara").style.zIndex = "222";
             document.getElementById("divMascara2").style.zIndex = "222";
            
             document.getElementById("divMascara").style.borderBottomLeftRadius = 10+"px";
             document.getElementById("divMascara").style.borderBottomRightRadius= 10+"px";
             document.getElementById("divMascara2").style.borderTopLeftRadius = 10+"px";
             document.getElementById("divMascara2").style.borderTopRightRadius= 10+"px";

             document.getElementById("divMascara").style.width = "100%";
             document.getElementById("divMascara2").style.width = "100%";
             document.getElementById("divMascara").style.width = "100%";

             document.getElementById("divMascara").style.top = "0";
             document.getElementById("divMascara").style.left = "0";
             document.getElementById("divMascara2").style.left = "0";
            
             document.getElementById("divMascara2").style.display = "flex";
             document.getElementById("divMascara2").style.flexFlow = "wrap";
             document.getElementById("divMascara2").style.position = "fixed"; 
      
            
             document.getElementById("divMascara").style.display =  "flex";
             document.getElementById("divMascara").style.flexFlow = "wrap";
             document.getElementById("divMascara").style.position = "fixed"; 

             document.getElementById("divMascara").style.cursor = "mouse";
      
             document.getElementById("divMascara").style.height = "42%" ;
             document.getElementById("divMascara2").style.top = "58%" ;
             document.getElementById("divMascara2").style.height = "100%" ;


    
       // const cursor = document.querySelector(".cursor");
        


       window.addEventListener("mousemove", e =>{
          
        // cursor.style.left = (e.x-100)+"px";// para poder mover no eixo X.

          // document.getElementById("divMascara").style.transition = "200ms";
          // document.getElementById("divMascara2").style.transition = "200ms";

          //cursor.style.top = (e.y-50)+"px";

          document.getElementById("divMascara").style.height = (e.y-60)+"px" ;
          document.getElementById("divMascara2").style.top = (e.y+75)+"px" ;

       });
       
       if(chk=='false')
       {

        chk = 'true'  
      document.getElementById("divMascara").style.visibility = "visible";
      document.getElementById("divMascara2").style.visibility = "visible";


      document.getElementById("btn1").value = 'Desfocar'; // mudar o value do btn.
     
       }
        else if(chk == 'true')
          {
            chk='false'
            document.getElementById("divMascara").style.visibility = "hidden";
            document.getElementById("divMascara2").style.visibility = "hidden";
            window.removeEventListener("mousemove");
            document.getElementById("btn1").value = 'Focar';
          }  

   }
