[//]: # (File modified by BEA.)
[//]: # (Copyright 2023, Battelle Energy Alliance, LLC All Rights Reserved)

## AI/ML Tutorial Series Application
This app is a derivative of the Jupyter notebook interactive app that was customized to provide a specific Jupyter
notebook on launch. We also wanted it to be a different name as it servers a different purpose.

### TODO - 
1. Look into adding a checkbox for "start from scratch or from where I left off"
2. Look into a `cp -fr` instead of just `cp -r` for copying tutorials

### General Information
Access a variable from the submission with `<%= context.variable %>`. This is the eruby way of passing variables between
the forms.

### form.yml
This is the default location for the submission form that people see. Variables to define go in this location and can be
change in the /etc/form.yml version, but this is the parent that /etc/form.yml inherits from. This is less than the 
jupyter app as we don't need a lot to go into this form, so I cut out the things that weren't necessary.

### icon.png
This is the icon that gets displayed for the interactive app on the ondemand web interface.

### manifest.yml
This defines how the app gets categorized. I believe form.yml inherits from this and can change these variables as desired.

### submit.yml.erb
Default submission script that can be altered by the /etc/submit/submit.yml.erb file. This is also different from the
default jupyter as we didn't need unneccesary variables in here.

There's also an addition `conn_params`. This is how we pass the jupyter notebook from the submission script to `view.html.erb` 
that then runs some code to open the specific jupyter notebook that the user defines in the submission form. Using these
`conn_params` would allow us to pass other things too if we desired.

### view.html.erb
This is the almost the default jupyter app `view.html.erb`. The only change is the `next_url` has been changed to our 
specific location for where the jupyter notebook exists. We don't have to d it this way. We could have left the default
and just specified the entire path after `base_url' in the form file.

### etc/ai-ml-tutorial.yml
This the the final form that users see. It inherits from form.yml. It's configured with variables that allow the jupyter
to open the intended notebooks.

### etc/submit/submit.yml.erb
Submission script that contains the variables from `etc/ai-ml-tutorial.yml` as well as other PBS submission information
that allows the job to run.

### template/after.sh
Default script mostly used for debugging. Gets ran at the very end of the process after submitting the app.

### template/before.sh.erb
This script is pretty well documentated. Most of it is the default jupyter app script except for the addition of `notebook=`. 
This was a change that was added to export the specific jupyter notebook to `view.html.erb` when the app launches.

### template/script.sh.erb
This is also a mostly default file. The biggest change here was with copying the ondemand tutorials from the ondemand
tutorials directory located in `/apps/tutorials` to the user's home directory when submitting the job. This copy is vital
so the user can edit and save the files without impacting the default tutorial files.

