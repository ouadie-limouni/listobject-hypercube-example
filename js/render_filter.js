// RENDER LIST
const renderFilter = (element, layout, genericObject) => {
    var titleDiv = element.querySelector(".filter-title");
    var ul = element.querySelector("ul");
    ul.innerHTML = "";

    // Get data from the List Object
    var data = layout.qListObject.qDataPages[0].qMatrix;

    // Loop through the data and create the filter list
    data.forEach(function(e) {
        var li = document.createElement("li");
        li.innerHTML = e[0].qText;
        li.setAttribute("class", e[0].qState);

        // Click function to make selection
        li.addEventListener("click", function(evt) {
            genericObject.selectListObjectValues("/qListObjectDef", [e[0].qElemNumber], true);
        });

        ul.appendChild(li);
    });
};
