document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("addItem").onclick = function(){
        document.createElement("shopping-list") = document.getElementById("item").value;
        document.appendChild("shopping-list");
    }
})