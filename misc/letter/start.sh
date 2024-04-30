#!/bin/sh
eval $(opam env) && dune exec -- ./letter.exe
