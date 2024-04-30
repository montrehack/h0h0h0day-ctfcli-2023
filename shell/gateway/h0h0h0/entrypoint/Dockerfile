FROM ubuntu:22.04 AS base

# Install the required tools
RUN apt update && \
      apt install -y \
        sudo bash

# Add the two users
RUN useradd -m -s /bin/bash santa
RUN useradd -m -s /bin/bash elf

# Configure the santa user
WORKDIR /home/santa
USER santa
RUN chmod 755 .

RUN bash -c "for i in \$(seq 1 100); do echo You; done" >> naughty.txt
RUN echo FLAG-e20c835a9244d30f2cb51ca806af12d1 > good.txt
RUN chmod 600 naughty.txt good.txt

# Configure the elf user
WORKDIR /home/elf
USER elf
RUN chmod 755 .

RUN echo "Wrap the gifts by putting them in the correct folder" > job_description.txt
RUN mkdir to_wrap wrapped
RUN touch to_wrap/wooden_horse.txt
RUN touch to_wrap/gta6.txt
RUN touch to_wrap/microwave.txt
RUN touch to_wrap/dragon.txt
RUN touch to_wrap/socks.txt

# Copy the filesystem
COPY --chown=root:root ./root /
USER root

ENTRYPOINT [ "/entrypoint.sh" ]
