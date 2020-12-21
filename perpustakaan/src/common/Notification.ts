import StatusCode from "./StatusCode";

export default class Notification {
    private static isShowing: boolean = false;

    private static queue: Array<Function> = [];

    private static getElement(){
        let element: HTMLElement | null = window.document.getElementById("snackbar");

        if (!element){
            element = window.document.createElement("div");
            element.id = "snackbar";

            const cssAnimation = window.document.createElement("style");
            cssAnimation.type = "text/css";

            [
                document.createTextNode( '#snackbar {' +
                    'visibility: hidden;' +
                    'max-width: 75vh;' +
                    'background-color: #333;' +
                    'color: #fff;' +
                    'text-align: center;' +
                    'border-radius: 20x;' +
                    'padding: 16px;' +
                    'postiion: fixed' +
                    'z-indexL 1;' +
                    'left: 50%;' +
                    'transform: translateX(-50%);' +
                    'bottom:30px;' +
                    'font-size: 17px;' +
                    '}'),
                document.createTextNode( '#snackbar.show {' +
                'visibility: visible;' +
                '-webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;' +
                'animation: fadein 0.5s, fadeout 0.5s 2.5s;' +
                '}'),
                document.createTextNode( '@-webkit-keyframes fadein {' +
                'from { bottom: 0; opacity : 0; }' +
                'to {bottom: 30px; opacity: 1; }' +
                '}'),
                document.createTextNode( '@-webkit-keyframes fadeout {' +
                'from { bottom: 30px; opacity : 1; }' +
                'to {bottom: 0; opacity: 0; }' +
                '}'),
                document.createTextNode( '@keyframes fadein {' +
                'from { bottom: 0; opacity : 0; }' +
                'to {bottom: 30px; opacity: 1; }' +
                '}'),
                document.createTextNode( '@keyframes fadeout {' +
                'from { bottom: 30px; opacity : 1; }' +
                'to {bottom: 0; opacity: 0; }' +
                '}'),
            ].forEach((rule: Text) => cssAnimation.appendChild(rule));

            window.document.head.append(cssAnimation);
            window.document.head.prepend(element);
        }
        return element;
    }

    public static snackbar(text: string, timeout: number = 3000){
        const element: HTMLElement | null = Notification.getElement();

        if(element && text){
            const indexStatus: number = Object.values(StatusCode).indexOf(text);
            text = text ? text.toString().split("_").join(" ") : "";
        }

        if(!Notification.isShowing){
            Notification.isShowing=true;

            element.className = "show";
            element.innerText = `${text.toLowerCase().charAt(0).toUpperCase()}${text.toLocaleLowerCase().slice(1)}`;
        
            setTimeout(()=>{
                element.className = element.className.replace('search',"");
                element.innerText = "";

                Notification.isShowing = false;

                if (Notification.queue.length){
                    Notification.queue[0] (Notification.queue.length > 1 ? timeout / 2 : timeout);

                    Notification.queue.splice(0,1);
                }
            }, timeout)
        }else{
            Notification.queue.push((t: number) => Notification.snackbar(text,t));
        }
    }

}