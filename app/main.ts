
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


class Main {
    isDebug : boolean = true;
    
    canvasLeft : number = 0;
    canvasTop :number = 0;
    canvasRight : number = 0;
    canvasBottom : number = 0;

    constructor() {
    }

    public registerDraggableItems() {
        let canvasRect = document.getElementById("canvas")?.getBoundingClientRect();
        if (canvasRect !== null && canvasRect !== undefined){
            this.canvasLeft = canvasRect.left;
            this.canvasTop = canvasRect.top;
            this.canvasRight = canvasRect.right;
            this.canvasBottom = canvasRect.bottom;
        }
        
        $("#canvas").droppable({
            accept: '.component',
            drop : (event,ui) =>{
                //design change when dropped
                if (!ui.draggable.hasClass("dropped"))
                {
                    this.log(`ui:${ui.position.left} ut:${ui.position.top} l:${this.canvasLeft} t:${this.canvasTop} r:${this.canvasRight} b:${this.canvasBottom}`)
                    let cloneElement = this.createDroppedItem($(ui.draggable).clone());
                    cloneElement.css({
                        'left':ui.position.left - this.canvasLeft,
                        'top':ui.position.top - this.canvasTop,
                        "width":"200px",
                        "height":"150px",
                        "background-color":"dodgerblue"
                    });
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
                return $(this).clone().appendTo('body').css("zIndex",99).css("background-color","red").css("width","100px").css("height","100px").text("dragging..");
                //let rootThis = this;
                //return rootThis.helperr(rootThis, this);
                //return $(this).clone();
            },
            cursor: 'move',
            containment: "document",
            // start:(event,ui)=>{
            //     $(this).css("width","500px").css("height","500px").css("color","red").text("dragging..");
            // },
            //start : this.createDragStartItem,
        });
    }

    private createDragStartItem(event, ui)
    {
        return $(this).css("width","500px").css("height","500px").css("color","red").css("zIndex",99).text("dragging..");
    }

    private helperr(rootThis, thisParm) : JQuery<this> {
        // let clone = $(thisParm).clone()
        // return this.createDragItem($(thisParm));
        return $(thisParm).clone();
    }


    private createDragItem(dragItem : JQuery<this>) : JQuery<this> {
        let item = dragItem.clone().appendTo('body').css({
            'zIndex': 5,
            "height":"500px",
            "width":"500px",
            "background-color":"red"
        });

        return item;
    }

    private createDroppedItem(item : JQuery<HTMLElement>) : JQuery<HTMLElement> {
        let cloneElement = item.addClass("dropped").draggable({
            cursor : "move",
            containment : [this.canvasLeft, this.canvasTop, this.canvasRight, this.canvasBottom]
        });
        return cloneElement;
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
