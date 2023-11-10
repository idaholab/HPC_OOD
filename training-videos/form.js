// File modified by BEA.
// Copyright 2023, Battelle Energy Alliance, LLC All Rights Reserved

$(document).ready(function() {
    inl_systems_video_list = "#batch_connect_session_context_inl_systems_video_list";

    computing_culture_video_list = "#batch_connect_session_context_computing_culture_video_list";

    fun_and_theory_video_list = "#batch_connect_session_context_fun_and_theory_video_list";

    video = "#batch_connect_session_context_video";

    // Change handler for inl systems videos
    $(document).on('change',inl_systems_video_list,function(){
        create_video(video, $(inl_systems_video_list).val());
    });

    // Change handler for computing culture videos
    $(document).on('change',computing_culture_video_list,function(){
        create_video(video, $(computing_culture_video_list).val());
    });

    // Change handler for fundamentals and theory videos
    $(document).on('change',fun_and_theory_video_list,function(){
        create_video(video, $(fun_and_theory_video_list).val());
    });

    // Hide stuff we don't want to see
    $("#new_batch_connect_session_context").find(".btn").hide();
    $("p.small").hide();
});

function create_video(div, video_url) {
    $('video').remove();
    $(div).parent().append('<video width="640" height="360" controls><source src="' + video_url + '" type="video/mp4" /></video>');
}
