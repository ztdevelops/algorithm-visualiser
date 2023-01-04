import { TEMPLATE_SORT_MESSAGE, TIMEOUT_DURATION } from "./config";
import { temporaryButtonDisable } from "./temporaryButtonDisable";

function disableSortButtonsAndUpdateInformationDOM(runtime, sortType, i) {
    // Update runtime
    document.getElementById('runtime').innerHTML = '<div> Runtime: ' + '<b>' + `${runtime.toFixed(3)}` + '</b> ms.' + '<div>';
    // Update sortType
    document.getElementById('sortType').innerHTML = '<div>' + TEMPLATE_SORT_MESSAGE + '<b>' + sortType + '</b>' + '<div>';
    // Temporarily disable buttons
    temporaryButtonDisable(i, 'sort', TIMEOUT_DURATION);
}

export {
    disableSortButtonsAndUpdateInformationDOM,
}