export class DrawDragElement
{
    public createImageControl (item : JQuery<JQueryUI.DraggableOptions>) : JQuery<JQueryUI.DraggableOptions> {
        //let opt = item.appendTo('body').css("zIndex",99).css("background-color","yellow").css("width","100px").css("height","700px").text("dragging..");
        // let dataPath = item.attr("data-path");
        // if (dataPath === undefined)
        //     dataPath = "";
        // let createContainer = $(document.createElement("div"))
        // createContainer.css(
        //     {
        //         "display":"inline-block",
        //         "width":"100px",
        //         "height":"70px",
        //         "zIndex":99
        //     }
        // );

        // let imageContainer = $(document.createElement("img"));
        // if (dataPath !== undefined)
        // {
        //     imageContainer.attr("src", dataPath)
        //     .css({
        //         "width":"100%",
        //         "height":"100%"
        //     })
        //     ;
        //     createContainer.append(imageContainer);
        // }
        // let opt = createContainer.appendTo('body')
        let opt = item.appendTo('body').css("zIndex",99).css("width","150px").css("height","100px");
        return opt;
    }
}