$(document).ready(function() {

    let digitLimitError = 'Digit Limit Met';
    let displayMaxSize = 11;
    let displayPreviewMaxSize = 27;
    let dot = '.';

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

    // Clear displays
    function clearDisplays () {
        $("#calc-display-id").text('0');
        $("#calc-display-preview-id").text('0');
    }

    // Number buttons action
    $(".button-number").on("click", function() {
        clearError();

        let number = $("#" + this.id).text();
        let display = $("#calc-display-id").text();
        let displayPreview = $("#calc-display-preview-id").text();

        if (number === '0' && display.length === 1 && display === '0') {
            return;
        }

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
        let patt = new RegExp("[x+-]");

        if (display.length === 1 && display === '0') {
            return;
        }

        console.log(patt.test(display));
        if (patt.test(display) || display.indexOf("\xF7") >= 0)
            return;

        // Add operator to display
        $("#calc-display-id").text(operation);
/*
        // Add number to display preview
        if (!displayAdd(displayPreview, operation, displayPreviewMaxSize, "#calc-display-preview-id")){
            console.error(digitLimitError);
            return;
        }*/

    });

    // AC button action
    $("#button-ac-id").on("click", function() {
        clearDisplays();
    });

    // CE button action
    $("#button-ce-id").on("click", function() {
        $("#calc-display-id").text('0');

        clearError();
    });

    // Dot button action
    $("#button-dot-id").on("click", function() {
        clearError();

        let display = $("#calc-display-id").text();
        let displayPreview = $("#calc-display-preview-id").text();

        if(display.indexOf(dot) < 0){

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
