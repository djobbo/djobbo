import os
import pathlib
import re

ignore_dirs = ['.git', '.tmp']

file_path = pathlib.Path(__file__).parent.resolve()
palette_path = f'{file_path}/palette.txt'

color_regex=r'#[0-9a-fA-F]{6}'

has_wrong_colors = False

with open(palette_path, 'r') as palette_file:
    palette = palette_file.read().split('\n')
    print('palette:', palette)

    for path, dirs, files in os.walk(file_path):
        dirs[:] = [d for d in dirs if d not in ignore_dirs]
        for file in files:
            full_path = os.path.join(path, file)
            print('\nChecking:', full_path)
            try:
                with open(full_path, 'r') as f:
                    colors = re.findall(color_regex, f.read())
                    if len(colors) > 0:
                        print(f'Found {len(colors)} colors')
                        
                        wrong_colors=list(filter(lambda x: x not in palette, colors))
                        if len(wrong_colors) > 0:
                            has_wrong_colors = True

                            print('\033[91m' + 'Error' + '\033[0m', f'- Found \033[91m{len(wrong_colors)}\033[90m/{len(colors)}\033[0m wrong colors')
                            
                            for color in colors:
                                if color in wrong_colors:
                                    print(f'\033[90m{color}\033[0m')
                                else:
                                    print(f'\033[92m{color}\033[0m')
                        else:
                            print('\033[92m' + 'OK' + '\033[0m')
                    else:
                        print('\033[93m' + 'Skipped' + '\033[0m', '- No colors found' )
                    break
            except:
                print('\033[93m' + 'Skipped' + '\033[0m', '- Not a text file' )

if has_wrong_colors:
    print('\n\033[91m' + 'Found wrong colors, see above' + '\033[0m')
    raise Exception('Found wrong colors')