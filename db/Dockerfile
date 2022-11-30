# Base image
FROM mysql:8.0
# Copy starting scripts file
COPY mysql_perms.sh /root/mysql_perms.sh

# Run necessary services
CMD ["/bin/sh", "/root/mysql_perms.sh"]
