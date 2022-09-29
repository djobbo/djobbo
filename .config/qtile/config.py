from libqtile.config import Key, Screen, Group, Drag, Click
from libqtile.command import lazy
from libqtile import layout, bar, widget

try:
    from typing import List  # noqa: F401
except ImportError:
    pass

mod = "mod4"

keys = [
    Key([mod], "Return", lazy.spawn("kitty")),
    Key([mod, "shift"], "e", lazy.shutdown()),
]

layouts = [
    layout.Max(),
    layout.Stack(num_stacks=2)
]

widget_defaults = dict(
    font="sans",
    fontsize=12,
    padding=3,
)
extension_defaults = widget_defaults.copy()

screens = [
    Screen(
        bottom=bar.Bar(
            [
                widget.GroupBox(),
                widget.Prompt(),
                widget.WindowName(),
                widget.TextBox("default config", name="default"),
                widget.Systray(),
                widget.Clock(format="%Y-%m-%d %a %I:%M %p"),
            ],
            24,
        ),
    ),
]

# Drag floating layouts.
mouse = [
    Drag([mod], "Button1", lazy.window.set_position_floating(),
          start=lazy.window.get_position()),
    Drag([mod], "Button3", lazy.window.set_size_floating(),
          start=lazy.window.get_size()),
    Click([mod], "Button2", lazy.window.bring_to_front())
]

dgroups_key_binder = None
dgroups_app_rules = []  # type: List
main = None
follow_mouse_focus = True
bring_front_click = False
cursor_warp = False
floating_layout = layout.Floating(float_rules=[
    {"wmclass": "confirm"},
    {"wmclass": "dialog"},
    {"wmclass": "download"},
    {"wmclass": "error"},
    {"wmclass": "file_progress"},
    {"wmclass": "notification"},
    {"wmclass": "splash"},
    {"wmclass": "toolbar"},
    {"wmclass": "confirmreset"},  # gitk
    {"wmclass": "makebranch"},  # gitk
    {"wmclass": "maketag"},  # gitk
    {"wname": "branchdialog"},  # gitk
    {"wname": "pinentry"},  # GPG key password entry
    {"wmclass": "ssh-askpass"},  # ssh-askpass
])
auto_fullscreen = True
focus_on_window_activation = "smart"

# XXX: Gasp! We"re lying here. In fact, nobody really uses or cares about this
# string besides java UI toolkits; you can see several discussions on the
# mailing lists, github issues, and other WM documentation that suggest setting
# this string if your java app doesn"t work correctly. We may as well just lie
# and say that we"re a working one by default.
#
# We choose LG3D to maximize irony: it is a 3D non-reparenting WM written in
# java that happens to be on java"s whitelist.
wmname = "LG3D"

dpi_scale = 1.0
