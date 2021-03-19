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
        createContainer.addClass(Constants.CANVAS_CONTROL_CONTAINER);
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
        createContainer.addClass(Constants.CANVAS_CONTROL_CONTAINER);
        createContainer.css(
            {
                "position" : "absolute",
                'left':uiSize.left - this.canvasSize.left,
                'top':uiSize.top - this.canvasSize.top,
                "width":"52",
                "height":"45",
                "background-color":"dodgerblue",
                //"vertical-align":"middle",
                //"text-align":"center",
                "border-radius":"3px",
                "display":"flex",
                "align-items":"center",
                "justify-content":"center"
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
                    "width": function (){
                        return "text".length * 8
                    },
                    "font-family":"Segoe UI, Arial, sans-serif",
                    "font-size":"14px"
                })
                .on("keydown", function() {
                    let len = $(this).val()?.toString().length;
                    if (len !== undefined)
                    {
                        $(this).css("width",len * 8);
                    }
                });
                
                
                
                
            createContainer.append(inputContainer);
        }
        return createContainer;
    }

    public createPositionControl(item : JQuery<HTMLElement>, uiSize : ControlSize) : JQuery<HTMLElement>{
        let dataPath = item.attr("data-path");
        if (dataPath === undefined)
            dataPath = "";
        let createContainer = $(document.createElement("div"))

        let defaultCss = item.attr("class");
        if (defaultCss !== undefined)
        {
            createContainer.addClass(defaultCss);
        }
        createContainer.addClass(Constants.CANVAS_CONTROL_CONTAINER);
        createContainer.css(
            {
                "position" : "absolute",
                'left':uiSize.left - this.canvasSize.left,
                'top':uiSize.top - this.canvasSize.top,
                "width":"65",
                "height":"34",
                "background-color":"transparent",
                "border-radius":"3px",
                "display":"flex",
                "align-items":"center",
                "justify-content":"center",
                "border":"1px dotted"
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
                .attr("value","000000")
                .css({
                    "width": "48px",
                    "font-family":"fixedsys",
                    "font-size":"10px",
                })
                .on("change", function() {
                    let len = $(this).val()?.toString().length;
                    if (len !== undefined)
                    {
                        $(this).css("width",len * 8);
                    }
                });
            createContainer.append(inputContainer);
        }
        return createContainer;
    }

    public createDeviceControl(item : JQuery<HTMLElement>, uiSize : ControlSize) : JQuery<HTMLElement>{
        let dataPath = item.attr("data-path");
        if (dataPath === undefined)
            dataPath = "";
        let createContainer = $(document.createElement("div"))

        let defaultCss = item.attr("class");
        if (defaultCss !== undefined)
        {
            createContainer.addClass(defaultCss);
        }
        createContainer.addClass(Constants.CANVAS_CONTROL_CONTAINER);
        createContainer.css(
            {
                "position" : "absolute",
                'left':uiSize.left - this.canvasSize.left,
                'top':uiSize.top - this.canvasSize.top,
                "width":"70",
                "height":"128",
                "background-color":"transparent",
                "border-radius":"3px",
                //"display":"flex",
                "align-items":"center",
                "justify-content":"center",
                "border":"1px dotted",
                "display":"table-cell",
                "vertical-align":"middle"
            }
        )
        .draggable({
            cursor : "move",
            containment : this.canvasSize.toArray()
        })

        let title = $(document.createElement("span"))
        title.text("aasName")
        .css({
            "font-family":"fixedsys",
            "font-size":"12px",
            "font-weight":"bold"
        });
        let rect = $(document.createElement("div"))
        rect.css({
            "width":"100%",
            "height":"15px",
            "background-color":"dodgerblue",
        });
        let deviceImage = $(document.createElement("img"));
        deviceImage.attr("src","https://dev.kopenmos.com/thumbnail/NewOHT_Type")
        .css({
            "width":"100%",
            "height":"90px"
        })
        createContainer.append(title);
        createContainer.append(rect);
        createContainer.append(deviceImage);
        return createContainer;
    }
}