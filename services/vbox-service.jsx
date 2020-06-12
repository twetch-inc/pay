

const isNonWindow = typeof window === 'undefined';
var VBox = null;
if (!isNonWindow) {
    VBox = window['VBox'];
}
export default VBox;