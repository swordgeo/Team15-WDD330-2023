import { getLocalStorage} from "./utils.mjs";

function mySearchFunction() {
    


        let input, filter, ul, li, a, i;
        input = document.getElementById("searchBar");
        filter = input.ariaValueMax.toUpperCase();
        ul = document.getElementById("mySearch");
        li = ul.getElementsByTagName("li");
        for (i = 0; i< li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > - 1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }

        }
}

mySearchFunction();