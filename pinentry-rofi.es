#!/usr/local/bin/es

desc	= ()
error	= ()
prompt	= ()

command- = {throw continue}

command-BYE = {exit}

command-GETINFO = @ info {
	match $info (
		flavor	{echo D rofi}
		version	{echo D 0.1}
		ttyinfo	{echo D - - -}
		pid	{echo D $pid}
	)
}

command-GETPIN = {
	let (message = `` \n {sed (
		-e 's|%0A|\n|g'
		-e 's|%22||g'
		-e 's|key:|key:\n|g'
		-e 's|>|>\n|g'
		-e 's|<|\&lt;|g'
		-e 's|>|\&gt;|g'
		-e 's|,created|,\ncreated|g'
		-e 's|_ERO_|<span fgcolor=''#ab4642''>|g'
		-e 's|_ERC_|</span>\n|g'
	) <<< $^error^$^desc^\n})
	let (password = `` \n {
		rofi -dmenu -input /dev/null -password -lines 0 \
			-p $^prompt -mesg <={%flatten \n $message}
	}) {
		if {!~ $^password ''} {
			echo D $password
		}
	}
}

command-SETPROMPT = @ {
	prompt = <={~~ $* *:}
}

command-SETDESC = @ {
	desc = $*
}

command-SETERROR = @ {
	error = $*^\n
}

echo OK get to it

let ((line cmd rest) = ())
while {!~ <={line = <=%read} ()} {
	if {~ $line *^$ifs^*} {
		(cmd rest) = <={~~ $line *^$ifs^*}
	} {
		cmd = $line
	}
	catch @ e rest {
		if {~ $e exit} {
			echo OK bye now
		} {~ $e continue} {
			throw retry
		}
		throw $e $rest
	} {
		if {!~ $#(command-^$cmd) 0} {
			$(command-^$cmd) $rest
		}
		echo OK
	}
}
