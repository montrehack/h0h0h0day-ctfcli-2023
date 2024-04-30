FROM debian:12-slim
RUN apt-get update && apt-get install -y pandoc fonts-font-awesome texlive-xetex texlive-fonts-extra texlive-science python3-pygments
RUN apt-get update && apt-get install -y opam libev-dev libssl-dev pkg-config python3.11 python-is-python3 python3-pandocfilters
RUN opam init --disable-sandboxing
RUN opam install -y dream dune

WORKDIR /app
COPY letter.sh template.tex signature.c capitalize.py /app/
COPY dune dune-project letter.opam index.eml.ml letter.ml /app/
COPY start.sh flag /
RUN chmod +x /flag /start.sh

RUN eval $(opam env) && dune build

EXPOSE 8080

ENV FLAG 'FLAG{DontUseLatexShellEscapeLightly}'
CMD ["/start.sh"]
