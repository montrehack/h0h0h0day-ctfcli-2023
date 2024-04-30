#!/bin/sh

md="$1"
pdf="$2"
shift
shift

cat <<EOF > "$md"
---
header-includes:
  - \\usepackage{minted}
---

Dear Santa, this year I would like the following gifts:

EOF

for arg in "$@"; do
  echo "- $arg" >> "$md"
done

cat <<EOF >> "$md"

\\vfill\\hfill\\inputminted{c}{signature.c}
EOF

# Helpful to debug in case we encounter some errors:
# cat "$md"

pandoc -s "$md" --template template.tex -o "$pdf" --pdf-engine-opt=-shell-escape --filter=capitalize.py
