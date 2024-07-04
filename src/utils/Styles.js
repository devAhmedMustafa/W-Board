
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

}