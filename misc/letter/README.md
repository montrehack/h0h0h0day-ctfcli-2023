To build the image:

```
docker build -t letter .
```

When running, the port 8080 is exposed from the docker.
To deploy, e.g.:

```
docker run -p 8080:8080 -it letter
```


