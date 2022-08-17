cd ./dist/AlicornTheFound
chmod +x AlicornTheFound-linux_x6
tar -c -f AlicornTheFound-linux_x64.tar resources.neu AlicornTheFound-linux_x64
gzip AlicornTheFound-linux_x64.tar
mkdir -p ../wrapped
mv AlicornTheFound-linux_x64.tar.gz ../wrapped/