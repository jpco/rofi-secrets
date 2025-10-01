#!/usr/local/bin/es

fn rec-ls base prefix {
	for (ff = $base/*) let (f = <={~~ $ff $base/*}) {
		if {!access $ff} {  # probably a globbing problem
			return
		}
		if {access -d $ff} {
			rec-ls $ff $^prefix/$f
		} {
			echo <={~~ $^prefix/$f /*.gpg}
		}
	}
}

fn get-pass path {
	while {pgrep -x rofi > /dev/null >[2] /dev/null} {
		sleep 0.1
	}

	local (PINENTRY_USER_DATA = rofi)
		pass -c $path
}

if {!~ $* ()} {
	get-pass $* > /dev/null >[2=1] &
} {
	rec-ls ~/.password-store
}
