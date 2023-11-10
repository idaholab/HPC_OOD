// File modified by BEA. Adds substantial capabilities to display videos
//      on the interactive apps page while hiding all of the submission elements.
// Copyright 2023, Battelle Energy Alliance, LLC All Rights Reserved

$(document).ready(function() {
    ai_ml_video_2021_list = "#batch_connect_session_context_ai_ml_video_2021_list";
    ai_ml_video_2022_list = "#batch_connect_session_context_ai_ml_video_2022_list";

    video = "#batch_connect_session_context_video";

    $(document).on('change', ai_ml_video_2021_list, function() {
        create_video(video, $(ai_ml_video_2021_list).val());
    });

    $(document).on('change', ai_ml_video_2022_list, function() {
        create_video(video, $(ai_ml_video_2022_list).val());
    });

    // Hide stuff we don't want to see
    $("#new_batch_connect_session_context").find(".btn").hide();
    $("p.small").hide();
});

function create_video(div, video_url) {
    video_url = video_url.replace(' ', '_').replace(' ', '_').replace(' ', '_');
    video_url = video_url.trim() + '.mp4';
    $('video').remove();
    $(div).parent().append('<video width="640" height="360" controls><source src="' + video_url + '" type="video/mp4" /></video>');
}
