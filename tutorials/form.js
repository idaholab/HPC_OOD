// File modified by BEA.
// Copyright 2023, Battelle Energy Alliance, LLC All Rights Reserved

'use strict'
$(document).ready(function() {
    var tutorial = $("#batch_connect_session_context_tutorial");

    if (tutorial.val() == "mit-summer-2021"){
        $(".ood-appkit > p").first().prepend('<img id="posterImage" src="/public/mit-symposium-2021.jpg" />');
    }
});
