document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("addItem").onclick = function() {
        const newParagraph = document.createElement('p');
        let myul = document.getElementById("shopping-list");
        
        newParagraph.textContent = document.getElementById("item").value;
        myul.appendChild(newParagraph);
    }
})