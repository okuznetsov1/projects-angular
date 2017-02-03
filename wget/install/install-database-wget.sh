#!/bin/bash


dbuser="userangulertasks"
dbname="anguler_tasks"
dbpassword="12345"



echo -e "\n\n1. Creating database..."
mysql -e "create database IF NOT EXISTS \`$dbname\` CHARACTER SET utf8 COLLATE utf8_general_ci; grant all on \`$dbname\`.* to '$dbuser'@'localhost'; set password for '$dbuser'@'localhost' = password('$dbpassword');"

if [ $? != 0 ];
then
    echo -e "\n\nSorry, it seems some errors ocured."
else

    echo -e "DB \"$dbname\" created.\nMysql user, which can access this database:\n $dbuser\nPassword for $dbuser in mysql:\n $dbpassword"

    echo 'The database and the user was created successfully'

#    cd ../
#    cd sql
    echo -e "\n\n2. Create the table structure and data."
#    echo "Moved to the catalog: ${PWD}"
    mysql $dbname -u$dbuser -p$dbpassword < wget.sql
    echo 'The table structure and data created successfully.'
    echo -e "\n\n"

fi


