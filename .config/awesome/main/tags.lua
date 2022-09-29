local awful = require("awful")
local layouts = require('main.layouts')

local tagNames = {"main", "web", "code", "misc", "discord", "spotify"}
local tagLayouts = {layouts.floating, layouts.tile, layouts.tile, layouts.tile, layouts.tile, layouts.tile}

return function()
  local tags = {}

  awful.screen.connect_for_each_screen(function(s)
    -- Each screen has its own tag table.
    tags[s] = awful.tag(tagNames, s, tagLayouts[s])
  end)

  return tags
end
