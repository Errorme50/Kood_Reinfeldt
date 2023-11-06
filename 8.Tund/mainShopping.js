document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("addItem").onclick = function(){
        document.createElement("ul").textContent = document.getElementById("item").value;

    }
})