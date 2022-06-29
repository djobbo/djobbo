export ZSH=~/.oh-my-zsh

# Theme
ZSH_THEME="aki"
export AKI_PATH="$HOME/.aki"

# Config
HYPHEN_INSENSITIVE="true"
DISABLE_UPDATE_PROMPT="true"
DISABLE_UNTRACKED_FILES_DIRTY="true"

# Aliases
alias c="clear"
alias aki="cd $AKI_PATH"

# Functions
$ ld() { cd "$@" && ls --color=auto; }
$ ga() { git add "$@"; }
$ gs() { git status; }
$ gc() { git commit "$@"; }
$ gp() { git push; }

# Source
source $ZSH/oh-my-zsh.sh

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

[ -s "$AKI_PATH/.user.zshrc" ] && \. "$AKI_PATH/.user.zshrc"