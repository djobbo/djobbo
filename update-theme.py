import os
import pathlib
import re
import json
import sys


COLOR_REGEX=r'#[0-9a-fA-F]{6}'
COLOR_PATTERN = re.compile(COLOR_REGEX)

check_only = '--check-only' in sys.argv

file_path = pathlib.Path(__file__).parent.resolve()
log_path = f'{file_path}/palette.log'

# delete previous log file
if os.path.exists(log_path):
    os.remove(log_path)


def log(*message):
    print(*message)
    with open(log_path, 'a') as log_file:
        log_file.write(' '.join(message) + '\n')


def read_palette(palette_path):
    palette = []

    with open(palette_path, 'r') as palette_file:
        palette = palette_file.read().split('\n')

        log('Color palette:')
        for color in palette:
            log(' ↳', color)

    return palette


def read_palette_update_map(palette_update_map_path):
    palette_update_map = {}

    if not os.path.exists(palette_update_map_path):
        return {}
    
    with open(palette_update_map_path, 'r') as palette_update_file:
        palette_update_map = json.load(palette_update_file)

    return palette_update_map


def check_color(palette, color):
    return color in palette


def update_colors_in_file(file_path, palette, palette_update_map, **kwargs):
    check_only = kwargs.get('check_only', False)

    log('\nChecking:', file_path)

    with open(file_path, 'r') as file:
        content = file.read()

    remaining_colors = []

    colors = re.findall(COLOR_REGEX, content)

    if len(colors) <= 0:
        log('\033[93m' + 'Skipped' + '\033[0m', '- No colors found' )
        return ([], [])
    
    log(f'Found {len(colors)} colors')

    for color in colors:
        if check_color(palette, color):
            log(' ↳', color, '\033[92m✔️\033[0m')
            continue

        if check_only:
            log(' ↳', color, '\033[91m❌\033[0m')
            remaining_colors.append(color)
            continue

        updated_color = color.upper() if check_color(palette, color.upper()) else palette_update_map.get(color.upper())
        if updated_color and COLOR_PATTERN.match(updated_color) and updated_color in palette:
            log(' ↳', color, '=>', updated_color, '\033[93m✔️\033[0m')
            content = content.replace(color, updated_color)
        else:
            log(' ↳', color, '\033[91m❌\033[0m')
            remaining_colors.append(color.upper())

    with open(file_path, 'w') as file:
        file.write(content)
    
    return (colors, remaining_colors)


def update_theme(**kwargs):
    check_only = kwargs.get('check_only', False)
    palette_path = kwargs.get('palette_path')
    palette_update_map_path = kwargs.get('palette_update_map_path') if not check_only else ""
    ignored_dirs = kwargs.get('ignored_dirs', [])
    ignored_files = kwargs.get('ignored_files', [])

    palette = read_palette(palette_path)
    palette_update_map = read_palette_update_map(palette_update_map_path) if not check_only else {}

    remaining_colors = []

    for path, dirs, files in os.walk(file_path):
        dirs[:] = [d for d in dirs if d not in ignored_dirs]

        for file in files:
            if file in ignored_files:
                continue

            full_path = os.path.join(path, file)

            try:
                (colors_in_file, remaining_colors_in_file) = update_colors_in_file(full_path, palette, palette_update_map, check_only=check_only)
                remaining_colors.extend(remaining_colors_in_file)

                if len(colors_in_file) <= 0:
                    continue
                
                if len(remaining_colors_in_file) > 0:
                    has_remaining_colors = True
                    log('\033[91m' + 'Error' + '\033[0m', f'- Found \033[91m{len(remaining_colors_in_file)}\033[90m/{len(colors_in_file)}\033[0m out of sync colors.')    
                else:
                    log('\033[92m' + 'OK' + '\033[0m', f'- Matched \033[92m{len(colors_in_file)}\033[90m/{len(colors_in_file)}\033[0m colors.')
            except (UnicodeDecodeError):
                log('\033[93m' + 'Skipped' + '\033[0m', '- Not a text file' )


    has_remaining_colors = len(remaining_colors) > 0

    if has_remaining_colors:
        log('\n\033[91m' + f'Found {len(remaining_colors)} out of sync colors, see above...' + '\033[0m')
        
        if not check_only:
            # copy old update map to .bak file

            bak_path = palette_update_map_path + '.bak'
            if os.path.exists(bak_path):
                os.remove(bak_path)
            if os.path.exists(palette_update_map_path):
                os.rename(palette_update_map_path, bak_path)

            new_palette_update_map = palette_update_map.copy()
            for color in remaining_colors:
                new_palette_update_map[color] = palette_update_map.get(color) or ""
            
            with open(palette_update_map_path, 'w') as palette_update_file:
                palette_update_file.write(json.dumps(new_palette_update_map, indent=4, sort_keys=True))
            
            log('Check', '\033[93m' + palette_update_map_path + '\033[0m')

        raise Exception('Out of sync colors')
    else:
        log('\n\033[92m' + 'Successfully checked all colors!' + '\033[0m')
        exit(0)

update_theme(
    check_only=check_only,
    palette_path=f'{file_path}/palette.txt',
    palette_update_map_path=f'{file_path}/palette.update.json',
    ignored_dirs=['.git', '.tmp', 'node_modules', '.next', '.bin'],
    ignored_files=['palette.update.json', 'palette.txt', 'palette.update.json.bak', 'palette.log', 'nohup.out']
)