export const checkBrowser = () => {

    const response = {};

    // Get the user-agent string
    let userAgentString =
        navigator.userAgent;

    // Detect Chrome
    response.isChrome =
        userAgentString.indexOf("Chrome") > -1;

    // Detect Internet Explorer
    response.isExplorer =
        userAgentString.indexOf("MSIE") > -1 ||
        userAgentString.indexOf("rv:") > -1;

    // Detect Firefox
    response.isFirefox =
        userAgentString.indexOf("Firefox") > -1;

    // Detect Safari
    response.isSafari =
        userAgentString.indexOf("Safari") > -1;

    // Discard Safari since it also matches Chrome
    if ((response.isChrome) && (response.isSafari))
        response.isSafari = false;

    // Detect Opera
    response.isOpera =
        userAgentString.indexOf("OP") > -1;

    // Discard Chrome since it also matches Opera     
    if ((response.isChrome) && (response.isOpera))
        response.isChrome = false;


    return response;
}