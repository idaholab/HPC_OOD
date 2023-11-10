# INL HPC Open OnDemand Applications

Note - These have only been tested on OOD 1.8. When we upgrade to 3.0 we will test them on that version.

## Applications

### ai-ml-videos
Application to show videos on the ondemand app page.

### desktop
INL's version of the OSC bc_desktop app with numerous customizations and handling outages.

### firefox-hpc_urls
Simple app for launching an interactive desktop session to a specific internal URL in firefox.

### jupyter
INL's version of the OSC jupyter app with various customizations, such as allowing for containers, working directory changes, custom module locations, and our method of jupyter kernels.

### links
Simple app that creates weblinks to HPC resources in the Open OnDemand interface.

### NEAMS Workbench
https://www.ornl.gov/onramp/neams-workbench

### rdm
Research Data Management allows for users to upload data to a WORM location and provide metadata about the upload along with an embargo date if needed.

### training
Application that launches an app if the user is in the correct group. If they are not in the correct group, hide the form from the user.

### Training Videos
The `training-videos` repository contains an application that can be used to show user-selected locally stored videos from the ondemand interface.

### Tutorials
This application provides users with access to tutorials, such as AI/ML series or application specific ones.

### VSCode
This uses Microsoft's VSCode installed locally on linux rather than codeserver.
