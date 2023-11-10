# File modified by BEA.
# Copyright 2023, Battelle Energy Alliance, LLC All Rights Reserved

import json  
import os

relative_path = '~/.config/Code/User/settings.json' 

# Expand the tilde to the home directory  
absolute_path = os.path.expanduser(relative_path)  

# check if the file exists  
if os.path.exists(absolute_path):  
    with open('vscode.json', 'r') as f1, open(absolute_path, 'r') as f2:  
        data1 = json.load(f1)  
        data = json.load(f2)  

        data.update(data1)


else:
    with open('vscode.json', 'r') as f1:  
        data = json.load(f1)  

with open(absolute_path, 'w') as out:  
    json.dump(data, out, indent=2)