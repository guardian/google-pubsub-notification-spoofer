FROM openjdk:8u181-jre

EXPOSE 9324

#https://github.com/softwaremill/elasticmq
ADD https://s3-eu-west-1.amazonaws.com/softwaremill-public/elasticmq-server-0.14.6.jar /

ADD custom.conf /

ENTRYPOINT ["/usr/bin/java", "-Dconfig.file=custom.conf", "-jar", "/elasticmq-server-0.14.6.jar"]

