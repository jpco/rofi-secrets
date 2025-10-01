#!/usr/local/bin/es --

# rofi-emoji is the script that lets me use rofi to copy/paste emojis!
# requires xmllint for downloading and xsel for the copying

emoji-file = $HOME/.cache/emoji.txt

sources = https://emojipedia.org/^(
	people
	nature
	food-drink
	activity
	travel-places
	objects
	symbols
	flags
)^/

fn download {
	echo > $emoji-file
	for (source = $sources) {
		echo Downloading: $source
		{  # this could benefit from some awk, but I'm not clever or patient enough
			curl -s $source \
				| xmllint --html --xpath '//ul[@class="emoji-list"]' - >[2] /dev/null \
				| head -n -1 \
				| tail -n +1 \
				| sed -rn 's/.*<span class="emoji">(.*)<\/span> (.*)<\/a><\/li>/\1 \2/p' \
				| sed 's/&amp;/\&/g'
		} >> $emoji-file
	}
}

if {~ $*(1) (--download)} {
	download
	exit 0
} {!~ $* ()} {
	let (f = <={%fsplit ' ' $*(1)})
		echo -n $f(1) | xsel -i -b
} {
	grep -v '#' $emoji-file | grep -v '^[[:space:]]*$'
}
