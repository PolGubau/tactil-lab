import os
import sys

base = r'C:\Users\pol.gubau\dev\projects\tactil-lab'

def write(path, content):
    full = os.path.join(base, path.replace('/', os.sep))
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Written:', path)

print('setup loaded')
