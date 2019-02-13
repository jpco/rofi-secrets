# rofi secrets

You might want a slightly prettier way to put secrets into your computer.

## sudo

Put the rofi-askpass.sh script somewhere useful, and add to your login script

```bash
SUDO_ASKPASS="<location of rofi-askpass.sh>"

function asudo {
    if [[ -n $DISPLAY ]]; then
        sudo -A $*
    else
        sudo $*
    fi
}

alias sudo=asudo
```

## password-store modi

To add a nice modi for your rofi, put `rofi-pass.es` somewhere in your `$PATH` (TODO: maybe rewrite this in a language people actually use) and call rofi like `rofi ... -modi '...,pass:rofi-pass.es,...`

## gpg pinentry

To use rofi as a pinentry tool when called from rofi (e.g., from the `pass` modi), put the `pinentry-rofi.sh` and `pinentry-switch` scripts somewhere useful, edit the latter to properly point to the former, and add the following line to your `~/.gnupg/gpg-agent.conf`:

```
pinentry-program <location of pinentry-switch>
```

Using `pinentry-switch` lets you use the normal `pinentry-tty` method when calling `pass` (or whatever else) from the terminal (or wherever else).

## emoji

This one isn't secrets, but good stuff happens when you use `rofi-emoji.es`.

## TODO

 - ssh?
 - make this more easily installable
 - port away from es, if this is to be useful to anybody
