FROM ubuntu:latest

MAINTAINER Parth Pokar ppokar@maltem.com

RUN mkdir /opt/eth

RUN apt-get update && \
    apt-get -y install software-properties-common && \
    add-apt-repository -y ppa:ethereum/ethereum && \
    add-apt-repository -y ppa:ethereum/ethereum-dev && \
    apt-get update && \
    apt-get -y install vim ethereum solc && \
    apt-get -y install npm && \
    apt-get -y install golang && \
    apt-get -y install curl && \
    apt-get -y install git

RUN npm install n -g && \
    n latest

RUN curl -O https://dist.ipfs.io/go-ipfs/v0.4.13/go-ipfs_v0.4.13_linux-386.tar.gz
RUN tar xvfz go-ipfs_v0.4.13_linux-386.tar.gz && \
        mv go-ipfs/ipfs /usr/local/bin/ipfs

EXPOSE 4001
EXPOSE 8080
EXPOSE 8083
EXPOSE 8545

VOLUME ["/work"]

WORKDIR /work
