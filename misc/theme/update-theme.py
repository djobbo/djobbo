import os
import pathlib
import re

ignore_dirs = ['.git', '.tmp']

file_path = pathlib.Path(__file__).parent.resolve()
palette_path = f'{file_path}/theme.json'

color_regex=r'#[0-9a-fA-F]{6}'

with open(palette_path, 'r') as palette_file:
    palette = re.findall(color_regex, palette_file.read())
    palette = list(set([color.upper() for color in palette]))
    palette.sort()

    print('palette:')
    print(palette)
    print('\n')

    with open(f'{file_path}/palette.txt', 'w') as colors_file:
        for color in palette:
            colors_file.write(f'{color}\n')

    for path, dirs, files in os.walk(file_path):
        dirs[:] = [d for d in dirs if d not in ignore_dirs]
        for file in files:
            print(os.path.join(path, file))
            try:
                with open(os.path.join(path, file), 'r') as f:
                    colors = re.findall(color_regex, f.read())
                    wrong_colors=list(filter(lambda x: x not in palette, colors))
                    print(colors)
                    break
            except:
                print('Not a text file')