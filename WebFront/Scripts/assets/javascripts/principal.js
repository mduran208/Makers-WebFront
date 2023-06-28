$(function () {
    "use strict";

    function option_drop() {
        $("select").select2({
            allowClear: true,
            minimumResultsForSearch: Infinity
        });
        return false;
    }

    $(document).on("ready", function () {
        //debugger;
    });
});