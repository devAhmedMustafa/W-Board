
export default class Styles{
    
    static addGrayBackground(element){
        element.style.backgroundColor = "#e6e6e6";
    }

    static transparent(element){
        element.style.backgroundColor = "transparent";
    }

    static addStyles(element, stylesObject){
        Object.keys(stylesObject).forEach((key) => {
            element.style[key] = stylesObject[key];
        });
    }

    static ChangeParent(element, newParent){
        element.parentNode.removeChild(element);
        newParent.appendChild(element);
    }

    static setCursor(element, cursorType){
        element.style.cursor = cursorType;
    }

    static moveElement(element, targetPosition){
        element.style.left = targetPosition.x + "px";
        element.style.top = targetPosition.y + "px";
    }

    static resizeBox(element, {width, height}){
        element.style.width = width + "px";
        element.style.height = height + "px";
    }

    static addBorder(element, {thick, type, color}){
        element.style.border = thick + "px " + type + " " + color;
    }

    static addOutline(element, {thick, type, color}){
        element.style.outline = thick + "px " + type + color;
    }

    static getPosition(element){
        return {x: element.offsetLeft, y: element.offsetTop};
    }

    static getGlobalPosition(el) {
        var rect = el.getBoundingClientRect();
        return {x:rect.left,y:rect.top};
    }

    static getDimensions(element){
        return {width: element.offsetWidth, height: element.offsetHeight};
    }

}