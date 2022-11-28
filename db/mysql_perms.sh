#!/bin/sh
# copy every cnf file into conf.d with default linux permissions.
cp /etc/mysql/conf.d/source/* /etc/mysql/conf.d/

/entrypoint.sh mysqld