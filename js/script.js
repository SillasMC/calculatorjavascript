$(document).ready(function() {

    // Global Variables
    let digitLimitError         = 'Digit Limit Met';
    let displayMaxSize          = 11;
    let displayPreviewMaxSize   = 27;
    let dot                     = '.';
    let patt                    = new RegExp("[^0-9.]");
    let pattNumbers             = new RegExp("[0-9.]", 'g');

    // Add value to display
    function displayAdd (display, value, maxLength, displayID) {
        if (value === dot)
            display += value;
        else {
            if (display == 0 && display.indexOf(dot) < 0)
                display = value;
            else
                display += value;
        }

        if(display.length > maxLength){
            $("#calc-display-id").text('0');
            $("#calc-display-preview-id").text(digitLimitError);

            return false;
        }

        $(displayID).text(display);
        return true;
    }

    // Clear error msg after button is pressed
    function clearError () {
        if ($("#calc-display-preview-id").text() === digitLimitError) {
            clearDisplays();
        }
    }

    // Clear error msg after button is pressed
    function clearResult () {
        if ($("#calc-display-preview-id").text().indexOf('=') >= 0) {
            clearDisplays();
        }
    }

    // Clear displays
    function clearDisplays () {
        $("#calc-display-id").text('0');
        $("#calc-display-preview-id").text('0');
    }

    // Realize operation between numbers
    function doOperation (num1, num2, operator) {
        let result = 0;

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case 'x':
                result = num1 * num2;
                break;
            case '\xF7':
                result = num1 / num2;
                break;
        }

        return result;
    }

    // Number buttons action
    $(".button-number").on("click", function() {
        clearError();
        clearResult();

        let number = $("#" + this.id).text();
        let display = $("#calc-display-id").text();
        let displayPreview = $("#calc-display-preview-id").text();

        if (number === '0' && display.length === 1 && display === '0') {
            return;
        }

        if (patt.test(display))
            display = '0';

        // Add number to display
        if (!displayAdd(display, number, displayMaxSize, "#calc-display-id")){
            console.error(digitLimitError);
            return;
        }

        // Add number to display preview
        if (!displayAdd(displayPreview, number, displayPreviewMaxSize, "#calc-display-preview-id")){
            console.error(digitLimitError);
            return;
        }
    });

    // Operation buttons action
    $(".button-operation").on("click", function() {
        clearError();

        let operation = $("#" + this.id).text();
        let display = $("#calc-display-id").text();
        let displayPreview = $("#calc-display-preview-id").text();

        if ((display.length === 1 && display === '0') || patt.test(display))
            return;

        // Add operator to display
        $("#calc-display-id").text(operation);

        // Add number to display preview
        displayPreview += operation;

        if(displayPreview.length > displayPreviewMaxSize){
            $("#calc-display-id").text('0');
            $("#calc-display-preview-id").text(digitLimitError);

            return;
        }

        $("#calc-display-preview-id").text(displayPreview);

    });

    // Result button action
    $("#button-eq-id").on("click", function() {
        clearError();
        clearResult();

        let displayPreview = $("#calc-display-preview-id").text();

        let arrayOfNumbers = displayPreview.split(patt);

        let strAux = displayPreview.replace(pattNumbers, '');
        let arrayOfOperators = strAux.split('');

        console.log(arrayOfNumbers);
                console.log(arrayOfOperators);
        if ((!arrayOfNumbers.length || !arrayOfOperators.length) || (arrayOfNumbers.indexOf('') >= 0))
            return;

        let result = arrayOfNumbers[0];
        for (var i = 0; i < arrayOfOperators.length; i++) {
            result = doOperation(Number(result), Number(arrayOfNumbers[i+1]), arrayOfOperators[i]);
        }

        let display = '0';
        // Add number to display
        if (!displayAdd(display, result, displayMaxSize, "#calc-display-id")){
            console.error(digitLimitError);
            return;
        }

        let operationEnd = '=' + result;
        // Add number to display preview
        if (!displayAdd(displayPreview, operationEnd, displayPreviewMaxSize, "#calc-display-preview-id")){
            console.error(digitLimitError);
            return;
        }
    });

    // AC button action
    $("#button-ac-id").on("click", function() {
        clearDisplays();
    });

    // CE button action
    $("#button-ce-id").on("click", function() {
        $("#calc-display-id").text('0');

        clearError();
        clearResult();

        let displayPreview = $("#calc-display-preview-id").text();

        if (displayPreview != 0){
            let array = displayPreview.split(patt);
            let lastNumberSize = array[array.length - 1].length;

            displayPreview = displayPreview.slice(0, displayPreview.length - lastNumberSize);

            $("#calc-display-preview-id").text(displayPreview);
        }
    });

    // Dot button action
    $("#button-dot-id").on("click", function() {
        clearError();
        clearResult();

        let display = $("#calc-display-id").text();
        let displayPreview = $("#calc-display-preview-id").text();

        if(display.indexOf(dot) < 0){

            if (patt.test(display)){
                display = '0';
                displayPreview += display;
            }

            if (!displayAdd(display, dot, displayMaxSize, "#calc-display-id")){
                console.error(digitLimitError);
                return;
            }

            if (!displayAdd(displayPreview, dot, displayPreviewMaxSize, "#calc-display-preview-id")){
                console.error(digitLimitError);
                return;
            }
        }
    });

});
