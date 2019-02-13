#!/bin/sh

echo "OK"
while read cmd rest; do
    cmd=$(printf "%s" "$cmd" | tr 'A-Z' 'a-z')
    if [ -z "$cmd" ]; then
        continue;
    fi
    case "$cmd" in
        \#*)
        ;;
        getpin)
            _PP=$(echo -n '' | DISPLAY=:0 /home/jpco/bin/rofi-askpass.sh 'Password')
            echo "D $_PP"
            echo "OK"
            ;;
        bye)
            echo "OK"
            exit 0
            ;;
        *)
            echo "OK"
            ;;
    esac
done
