// File modified by BEA. Adds substantial capabilities to select different
//      desktop environments/settings.
// Copyright 2023, Battelle Energy Alliance, LLC All Rights Reserved

// Variables for outages to handle queue drain times
var drain_time_lemhi = 720;
var drain_time_sawtooth = 720;
var drain_time_hoodoo = 720;

var MAX_TIME_LEMHI_DESKTOP = 336;
var MAX_TIME_LEMHI_COMPUTE = 72;
var MAX_TIME_SAWTOOTH_DESKTOP = 336;
var MAX_TIME_SAWTOOTH_COMPUTE = 168;
var MAX_TIME_SAWTOOTH_VIZ = 12;
var MAX_TIME_HOODOO_VIZ = 72;

$(document).ready(function() {
    // Set the max times for each system. If drain time >= MAX_TIME, leave the MAX_TIME alone, otherwise change the max time to drain_time
    let queue = $('#batch_connect_session_context_queue').val();
    var outage = false;

    if (queue == 'desktop') {
        if (MAX_TIME_LEMHI_COMPUTE > drain_time_lemhi ){
        $('#batch_connect_session_context_bc_num_hours').parent().find(".help-block table tr:contains('Lemhi') td:nth-child(2)").html(drain_time_lemhi);
        $('#batch_connect_session_context_bc_num_hours').parent().find(".help-block table tr:contains('Lemhi') td:nth-child(1)").append('*');
        outage = true;
        }
        if (MAX_TIME_SAWTOOTH_COMPUTE > drain_time_sawtooth) {
        $('#batch_connect_session_context_bc_num_hours').parent().find(".help-block table tr:contains('Sawtooth') td:nth-child(2)").html(drain_time_sawtooth);
        $('#batch_connect_session_context_bc_num_hours').parent().find(".help-block table tr:contains('Sawtooth') td:nth-child(1)").append('*');
        outage = true;
        }
    }
    else {
        if (MAX_TIME_SAWTOOTH_VIZ > drain_time_sawtooth) {
        $('#batch_connect_session_context_bc_num_hours').parent().find(".help-block table tr:contains('Sawtooth') td:nth-child(2)").html(drain_time_sawtooth);
        $('#batch_connect_session_context_bc_num_hours').parent().find(".help-block table tr:contains('Sawtooth') td:nth-child(1)").append('*');
        outage = true;
        }
        if (MAX_TIME_HOODOO_VIZ > drain_time_hoodoo) {
        $('#batch_connect_session_context_bc_num_hours').parent().find(".help-block table tr:contains('Viz') td:nth-child(2)").html(drain_time_hoodoo);
        $('#batch_connect_session_context_bc_num_hours').parent().find(".help-block table tr:contains('Viz') td:nth-child(1)").append('*');
        outage = true;
        }
    }

    if (outage) {
        $('#batch_connect_session_context_bc_num_hours').parent().find(".help-block table").append("* This system has an upcoming outage");
    }

    var form_type = document.getElementById("batch_connect_session_context_form_type");

    if (form_type.value == "visualization") {
        visualization_form();
    }
    else {
        desktop_form();
    }
});

function hide_forms_at_start(form) {
  // Hide form list elements when the page loads
    for (i = 0; i < form.length; i++) {
        // Get the parent of the element and hide that
        let form_element = $(form[i]);
        form_element.value = "";
        let parent = form_element.parent();
        parent.hide();
    }
}

function toggle_visibility_of_form_item(form_id, show) {
    /**
     * Toggle the visibility of a form group
     *
     * @param      {string}    form_id  The form identifier
     * @param      {boolean}   show     Whether to show or hide
     */
    let form_element = $(form_id);
    let parent = form_element.parent();

    // kick out if you didn't find what you're looking for
    if(parent.size() <= 0) {
        return;
    }

    if(show) {
        parent.show();
    } else {
        parent.hide();
    }
}

function toggle_advanced_visibility() {
    // Toggle the visibility of the advanced form
    const advanced_checked = document.getElementById(advanced_checkbox).checked;

    for (i = 0; i < advanced_form.length; i++) {
        const form_element = $(advanced_form[i]);
        toggle_visibility_of_form_item(form_element, advanced_checked);
    }
}

function toggle_form_type_visibility() {
    var job_type = $("#batch_connect_session_context_job_type").val();
    advanced_checkbox_element = $('#' + advanced_checkbox);

    if (job_type == "login") {
        set_value('batch_connect_session_context_num_of_cpus', 1);
        show_form(compute_form, false);
        show_form(gpu_form, false);
        show_advanced_form_item(advanced_checkbox_element, false);
    }
    else if (job_type == "cpu") {
        $("select option[value*='lemhipbs']").prop('disabled',false);
        show_form(gpu_form, false);
        show_form(compute_form, true);
        show_advanced_form_item(advanced_checkbox_element, true);
    }
    else if (job_type == "gpu") {
        $("select option[value*='lemhipbs']").prop('disabled',true);
        $("#batch_connect_session_context_cluster").val('sawtoothpbs');
        show_form(compute_form, false);
        show_form(gpu_form, true);
        show_advanced_form_item(advanced_checkbox_element, true);
    }

    update_max_hours();
}

function toggle_viz_form() {
    var cluster = document.getElementById("batch_connect_session_context_cluster");

    if (cluster.value == "sawtoothpbs") {
        show_form(viz_form, false);
        show_form(sawtooth_form, true);
    }
    else {
        show_form(sawtooth_form, false);
        show_form(viz_form, true);
    }
}

function show_form(form, toggle) {
    for (i = 0; i < form.length; i++) {
        toggle_visibility_of_form_item(form[i], toggle);
    }
}

function show_advanced_form_item(form_element, visible) {
    let parent = form_element.closest(".form-group");

    if(visible) {
        parent.show();
    }
    else {
        parent.hide();
    }
}

function update_max_cores() {
    // Update the max core value based on cluster
    let cluster = $('#batch_connect_session_context_cluster').val();
    let bc_num_slots_input = $('#batch_connect_session_context_num_of_cpus');

    switch (cluster) {
        case 'lemhipbs':
            set_max_cluster_cores(bc_num_slots_input, 40);
            break;
        case 'sawtoothpbs':
            set_max_cluster_cores(bc_num_slots_input, 48);
            break;
        default:
            return;
    }
}

function update_max_hours() {
    // Update the number of hours value based on cluster
    let cluster = $('#batch_connect_session_context_cluster').val();
    let queue = $('#batch_connect_session_context_queue').val();
    let job_type = $('#batch_connect_session_context_job_type').val();
    let bc_num_hours_input = $('#batch_connect_session_context_bc_num_hours').val();

    switch (cluster) {
        case 'lemhipbs':
            if (job_type == 'login') {
                set_max_cluster_hours(bc_num_hours_input, Math.min(MAX_TIME_LEMHI_DESKTOP, drain_time_lemhi), true);
            }
            else {
                set_max_cluster_hours(bc_num_hours_input, Math.min(MAX_TIME_LEMHI_COMPUTE, drain_time_lemhi));
            }
            break;

        case 'sawtoothpbs':
            if (queue == 'desktop_viz') {
                set_max_cluster_hours(bc_num_hours_input, Math.min(MAX_TIME_SAWTOOTH_VIZ, drain_time_sawtooth));
            }
            else if (job_type == 'login') {
                set_max_cluster_hours(bc_num_hours_input, Math.min(MAX_TIME_SAWTOOTH_DESKTOP, drain_time_sawtooth), true);
            }
            else {
                set_max_cluster_hours(bc_num_hours_input, Math.min(MAX_TIME_SAWTOOTH_COMPUTE, drain_time_sawtooth));
            }
            break;

        case 'hoodoo':
            if (queue == 'desktop_viz') {
                set_max_cluster_hours(bc_num_hours_input, Math.min(MAX_TIME_HOODOO_VIZ, drain_time_hoodoo));
            }
            break;

        default:
            break;
    }
}

function set_max_cluster_cores(bc_num_slots_input, max_cores) {
    /**
     *  * Sets the max core limit for the provided cluster
     *  * @param      {element}  bc_num_slots_input  The input for the form field bc_num_slots
     *  * @param      {int}      max_cores           The max_cores for the provided cluster
     *  */
    if (bc_num_slots_input.val() > max_cores) {
        bc_num_slots_input.val(max_cores);
    }

    bc_num_slots_input.attr('max', max_cores);
}

function set_max_cluster_hours(bc_num_hours_input, max_hours, reset_value_to_max = false) {
    /**
     * Sets the max time limit for the provided bc_num_hours
     *
     * @param      {element}  bc_num_hours_input  The input for the form field bc_num_hours
     * @param      {int}      max_hours           The max_hours for the provided pbs_cluster
     */
    if (bc_num_hours_input > max_hours || reset_value_to_max) {
        $('#batch_connect_session_context_bc_num_hours').val(max_hours);
    }

    $('#batch_connect_session_context_bc_num_hours').attr('max', max_hours);
}

function set_value(element_id, value) {
    document.getElementById(element_id).value = value;
}

function set_advanced_change_handler() {
    // Sets the change handler for the advanced section of the form.
    let advanced_input = $('#' + advanced_checkbox);
    advanced_input.change((event) => toggle_advanced_visibility());
}

function set_job_type_change_handler() {
    // Sets the change handler for the advanced section of the form.
    let type_input = $('#' + job_type);
    type_input.change((event) => toggle_form_type_visibility());
}

function set_cluster_change_handler() {
    // Sets the change handler for the cluster select.
    $('#batch_connect_session_context_cluster').change(function() {
        update_max_cores();
        update_max_hours();
    });
}

function set_viz_form_cluster_change_handler() {
    // Sets the change handler for the cluster select on viz sessions.
    $('#batch_connect_session_context_cluster').change(function() {
        toggle_viz_form();
        update_max_hours();
    });
}

function desktop_form() {
    // Called when the user is using the basic linux desktop form
    advanced_checkbox = 'batch_connect_session_context_advanced';
    compute_form = [
        '#batch_connect_session_context_num_of_cpus',
        '#batch_connect_session_context_bc_num_hours',
        advanced_checkbox,
    ];
    gpu_form = [
        '#batch_connect_session_context_num_of_gpus',
        '#batch_connect_session_context_bc_num_hours',
        advanced_checkbox,
    ];
    job_type = "batch_connect_session_context_job_type";
    advanced_form = [
        '#batch_connect_session_context_node_select',
    ];

    // Set the default value of the modules to be empty
    document.getElementById('batch_connect_session_context_bc_num_hours').value = "720";
    document.getElementById('batch_connect_session_context_num_of_cpus').value = "1";
    document.getElementById('batch_connect_session_context_num_of_gpus').value = "0";
    document.getElementById('batch_connect_session_context_job_type').value = "login";
    document.getElementById('batch_connect_session_context_node_select').value = "";

    // form controls
    hide_forms_at_start(compute_form);
    hide_forms_at_start(gpu_form);
    hide_forms_at_start(advanced_form);

    update_max_cores();
    update_max_hours();
    set_cluster_change_handler();
    set_job_type_change_handler();

    var advanced_checkbox_element = document.getElementById(advanced_checkbox);
    advanced_checkbox_element.checked = false;
    advanced_checkbox_element = $('#' + advanced_checkbox);

    show_advanced_form_item(advanced_checkbox_element, false);
    set_advanced_change_handler();
}

function visualization_form() {
    cluster = "batch_connect_session_context_cluster";
    sawtooth_form = [
        '#batch_connect_session_context_memory_requested',
    ];
    viz_form = [
        '#batch_connect_session_context_num_of_gpus',
        '#batch_connect_session_context_gpu_list',
    ];

    document.getElementById('batch_connect_session_context_num_of_gpus').value = "1";

    hide_forms_at_start(sawtooth_form);
    hide_forms_at_start(viz_form);
    set_viz_form_cluster_change_handler();
    toggle_viz_form();
    update_max_hours();
}
