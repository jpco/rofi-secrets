#!/usr/local/bin/es

if {~ $PINENTRY_USER_DATA 'rofi'} {
	/home/jpco/.local/bin/pinentry-rofi.es
} {
	/usr/bin/pinentry-tty
}
