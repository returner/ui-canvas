
import * as $ from "jquery";
import "bootstrap";
import "jquery-ui/ui/core";
import "jquery-ui/ui/data";
import "jquery-ui/ui/disable-selection";
import "jquery-ui/ui/effect";
import "jquery-ui/ui/escape-selector";
import "jquery-ui/ui/focusable";
import "jquery-ui/ui/form";
import "jquery-ui/ui/form-reset-mixin";
import "jquery-ui/ui/ie";
import "jquery-ui/ui/keycode";
import "jquery-ui/ui/labels";
import "jquery-ui/ui/plugin";
import "jquery-ui/ui/position";
import "jquery-ui/ui/safe-active-element";
import "jquery-ui/ui/safe-blur";
import "jquery-ui/ui/scroll-parent";
import "jquery-ui/ui/tabbable";
import "jquery-ui/ui/unique-id";
import "jquery-ui/ui/version";
import "jquery-ui/ui/widget";
import "jquery-ui/ui/effects/effect-drop";
import "jquery-ui/ui/widgets/mouse";
import "jquery-ui/ui/widgets/controlgroup";
import "jquery-ui/ui/widgets/selectable";
import "jquery-ui/ui/widgets/droppable";
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/resizable";
import { DrawControlElement } from "./drawControlElements";
import { Constants } from "./constants";
import { DrawDragElement } from "./drawDragElement";

export class ControlSize {
    public left : number = 0;
    public top : number = 0;
    public right : number = 0;
    public bottom : number = 0;

    public toArray() : Array<number> {
        return [this.left, this.top, this.right, this.bottom];
    }
}

class Main {
    isDebug : boolean = true;
    canvasSize : ControlSize;
    
    constructor() {
        this.canvasSize = new ControlSize();
    }

    public registerDraggableItems() {
        let canvasRect = document.getElementById("canvas")?.getBoundingClientRect();
        if (canvasRect !== null && canvasRect !== undefined){
            this.canvasSize.left = canvasRect.left;
            this.canvasSize.top = canvasRect.top;
            this.canvasSize.right = canvasRect.right;
            this.canvasSize.bottom = canvasRect.bottom;
        }
        $("#canvas").droppable({
            accept: '.component',
            drop : (event,ui) => {
                //design change when dropped
                if (!ui.draggable.hasClass(Constants.CONTROL_ITEM_IN_CANVAS_CLASS))
                {
                    this.log(`ui:${ui.position.left} ut:${ui.position.top} l:${this.canvasSize.left} t:${this.canvasSize.top} r:${this.canvasSize.right} b:${this.canvasSize.bottom}`)
                    let uiSize = new ControlSize();
                    uiSize.left = ui.position.left;
                    uiSize.top = ui.position.top;
                    
                    let cloneElement = this.createControlInCanvas($(ui.draggable).clone(), uiSize);
                    $("#canvas").append(cloneElement);
                }
            },
            out : (event, ui) => {
                console.log(ui);
            },
        });
        let rootThis = this;
        $(".component").draggable({
            helper: function () {
                let clonedControl = $(this).clone();
                let dataType = clonedControl.attr("data-type");
                console.log(dataType);
                let controlElement = new DrawDragElement();
                switch(dataType) {
                    case "image":
                        return controlElement.createImageControl(clonedControl);
                    
                    default:
                        return controlElement.createImageControl(clonedControl);
                }
            },
            cursor: 'move',
            containment: "document",
            start:(event,ui)=>{
                //$(this).css("background-color","dodgerblue");
            },
            stop : (event, ui) => {
                //$(this).css("background-color","black");
            }
        });
    }

    private createControlInCanvas(item : JQuery<HTMLElement>, uiSize : ControlSize) : JQuery<HTMLElement> {
        let dataType = item.attr("data-type");
        this.log(`createDroppedItem dataType:${dataType}`);
        let controlElement = new DrawControlElement(this.canvasSize);

        switch(dataType) {
            case "image":
                return controlElement.createImageControl(item, uiSize);
            case "text":
                return controlElement.createTextControl(item, uiSize)
            case "position":
                return controlElement.createPositionControl(item, uiSize)
            default:
                let cloneElement = item.addClass(Constants.CONTROL_ITEM_IN_CANVAS_CLASS).draggable({
                    cursor : "move",
                    containment : this.canvasSize.toArray()
                });
                cloneElement.resizable();
                cloneElement.css({
                    'left':uiSize.left - this.canvasSize.left,
                    'top':uiSize.top - this.canvasSize.top,
                    "width":"200px",
                    "height":"150px",
                    "background-color":"dodgerblue"
                });
                return cloneElement;
        }
  
    }

    private log(logMessage : any) {
        if (this.isDebug){
            console.log(logMessage);
        }
    }
}


let main =  new Main();
$(function() {
    main.registerDraggableItems();
});
