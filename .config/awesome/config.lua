return {
  terminal = "kitty",

  editor = "code" or "vim",

  file_manager = "thunar",

  modkey = "Mod4",

  username = os.getenv("USER"):gsub("^%l", string.upper),

  font = "FiraCode Nerd Font 10",

  -- Colors
  -- TODO: change
  -- theme_primary = gmc.color['blue500'],
  -- theme_bg_1 = gmc.color['gray900'],
  -- theme_bg_2 = gmc.color['gray800'],
  -- theme_fg = gmc.color['white'],
}
