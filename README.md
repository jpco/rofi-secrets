# rofi secrets

A collection of es scripts to get rofi to do more for us.  No warranty.

Installation: just copy these scripts to somewhere in your PATH.
Something like
```
cp *.es ~/.local/bin
```

## password-store modi

The `rofi-pass.es` script allows you to use [`pass`](www.passwordstore.org) with rofi instead of a terminal. It makes use of the `rofi-pass.es` script, and probably requires the configuration in the up-next "gpg pinentry" section as well.

To add this modi for your rofi, either call rofi like
```
rofi ... -modi '...,pass:rofi-pass.es,...
```
or set in your `.config/rofi/config.rasi`
```
configuration {
    modes: [..., "pass:rofi-pass.es", ...];
}
```

## gpg pinentry

To use rofi as a pinentry tool when called from rofi (like from the `pass` modi just above), add the following line to your `~/.gnupg/gpg-agent.conf`:

```
pinentry-program <full path of pinentry-switch.es>
```

Then you'll need to edit your `pinentry-switch.es` script to point to the right `pinentry-rofi.es`. (Maybe these should all just get installed to /usr/local/bin?)

Using `pinentry-switch.es` lets you use the normal `pinentry-tty` method when calling `pass` (or whatever else) from the terminal (or wherever else).

If you want to use `pinentry-rofi.es` in all cases, then just set it directly as your `pinentry-program`.

## sudo

To get sudo password prompting into rofi, throw something like this to your login script:

```bash
SUDO_ASKPASS="<path to rofi-askpass.sh>"

function asudo {
    # Assuming you have a rofi that handles Wayland
    if [[ -n $DISPLAY || -n $WAYLAND_DISPLAY ]]; then
        sudo -A $*
    else
        sudo $*
    fi
}

alias sudo=asudo
```

Note that wrapping sudo in functions to change its default behavior is probably a bad idea.

## emoji

This one doesn't have to do with passwords, but if you run
```shell
$ rofi-emoji.es --download
```
and then configure in your `~/.config/rofi/config.rasi`
```
configuration {
    modes: [..., "emoji:rofi-emoji.es", ...];
}
```
you can get emoji in your rofi.

Uses `xmllint` and `xsel`.  Probably need to swap out that `xsel` for Wayland.
