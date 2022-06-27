local LC_ALL="" LC_CTYPE="en_US.UTF-8"

#Load Colors
load_colors() {
  autoload colors && colors
  for color in red green yellow blue magenta cyan black white; do
      eval $color='%F{$color}'
      eval bg_$color='%K{$color}'
  done
  eval reset_fg='%f'
  eval reset_bg='%k'
  eval reset_colors='%f%k'
}

prompt_user() {
    echo -n $yellow
    echo -n "%n@%m"
}

prompt_dir() {
  echo -n $white
  echo -n "$reset_colors:%~"
}

prompt_return_status() {
  RPROMPT='%(?.✔.%{$fg[red]%}✘%f)'
}

prompt_git() {
  setopt prompt_subst
  autoload -Uz vcs_info

  zstyle ':vcs_info:*' enable git
  zstyle ':vcs_info:git:*' check-for-changes true
  zstyle ':vcs_info:git:*' stagedstr "$green➕"
  zstyle ':vcs_info:git:*' unstagedstr "$yellow●"
  zstyle ':vcs_info:*' formats "$magenta::$reset_colors%b%u%c"
  vcs_info

  echo -n ${vcs_info_msg_0_}$reset_colors
}

build_prompt() {
  load_colors
  RETVAL=$?
  prompt_user
  prompt_dir
  prompt_git
  echo -n "$reset_colors› "
}

PROMPT='$(build_prompt)'
RPROMPT='%(?.✔.%{$fg[red]%}✘%f)'