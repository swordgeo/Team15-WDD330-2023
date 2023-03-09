export function mySearchFunction() {
    
    //console.log("I was clicked.")//This is for testing purposes. 
    


       let input, filter, ul, li, a, i;
       input = document.getElementById("searchBar");
       filter = input.value.toUpperCase();
       ul = document.getElementById("mySearch");
       input.addEventListener("change", () =>{
           alert("I was clicked...")
           const serchParm = input.value;
           console.log(serchParm)
           li = ul.getElementsByTagName("li");
       for (i = 0; i< li.length; i++) {
           a = li[i].getElementsByTagName("a")[0];
           if (a.innerHTML.toUpperCase().indexOf(serchParm.toUpperCase()) > - 1) {
               li[i].style.display = "";
           } else {
               li[i].style.display = "none";
           }

       }
       });

       // li = ul.getElementsByTagName("li");
       // for (i = 0; i< li.length; i++) {
       //     a = li[i].getElementsByTagName("a")[0];
       //     if (a.innerHTML.toUpperCase().indexOf(filter) > - 1) {
       //         li[i].style.display = "";
       //     } else {
       //         li[i].style.display = "none";
       //     }
       //     console.log(i);

       // }
}

mySearchFunction();