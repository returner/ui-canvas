import * as $ from "jquery";
import { Constants } from "./constants";
import { ControlSize } from "./main";


export class DrawControlElement {
    canvasSize : ControlSize;

    constructor(canvasSize : ControlSize) {
        this.canvasSize = canvasSize;
    }
    public createImageControl(item : JQuery<HTMLElement>, uiSize : ControlSize) : JQuery<HTMLElement>{
        let dataPath = item.attr("data-path");
        if (dataPath === undefined)
            dataPath = "";
        let createContainer = $(document.createElement("div"))

        let defaultCss = item.attr("class");
        if (defaultCss !== undefined)
        {
            createContainer.addClass(defaultCss);
        }
        createContainer.addClass(Constants.CONTROL_ITEM_IN_CANVAS_CLASS);
        createContainer.css(
            {
                "position" : "absolute",
                'left':uiSize.left - this.canvasSize.left,
                'top':uiSize.top - this.canvasSize.top,
                "display":"inline-block",
                //"border":"1px dotted",
                "width":"100",
                "height":"80"
            }
        ).draggable({
            cursor : "move",
            containment : this.canvasSize.toArray()
        }).resizable();

        let imageContainer = $(document.createElement("img"));
        if (dataPath !== undefined)
        {
            imageContainer.attr("src", dataPath)
            .css({
                "width":"100%",
                "height":"100%"
            })
            ;
            createContainer.append(imageContainer);
        }
        return createContainer;
    }

    public createTextControl(item : JQuery<HTMLElement>, uiSize : ControlSize) : JQuery<HTMLElement>{
        let dataPath = item.attr("data-path");
        if (dataPath === undefined)
            dataPath = "";
        let createContainer = $(document.createElement("div"))

        let defaultCss = item.attr("class");
        if (defaultCss !== undefined)
        {
            createContainer.addClass(defaultCss);
        }
        createContainer.addClass(Constants.CONTROL_ITEM_IN_CANVAS_CLASS);
        createContainer.css(
            {
                "position" : "absolute",
                'left':uiSize.left - this.canvasSize.left,
                'top':uiSize.top - this.canvasSize.top,
                //"display":"inline-block",
                "width":"100%",
                "height":"100%",
                "background-color":"dodgerblue",
                "vertical-align":"middle",
                "text-align":"center",
                "border-radius":"3px"
            }
        )
        .draggable({
            cursor : "move",
            containment : this.canvasSize.toArray()
        }).resizable();

        let inputContainer = $(document.createElement("input"));
        inputContainer.attr("id","input")
        if (dataPath !== undefined)
        {
            inputContainer
                .attr("type","text")
                .attr("value","text")
                .css({
                    "position":"relative",
                    "z-index":1
                }).on("changed",()=>{
                    $("#input").css("z-index",1);
                    $(this).css("z-index",2);
                });
                
                
            createContainer.append(inputContainer);
        }
        return createContainer;
    }
}