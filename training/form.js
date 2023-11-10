// File modified by BEA.
// Copyright 2023, Battelle Energy Alliance, LLC All Rights Reserved

$(document).ready(function() {
    if ($('#batch_connect_session_context_group_training').val() !== 'true'){
        $("#new_batch_connect_session_context").find(".btn").hide();
        $("p.small").hide();
    }
})
