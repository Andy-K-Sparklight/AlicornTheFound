cd ./dist/AlicornTheFound
mv AlicornTheFound-mac_x64 AlicornTheFound-mac_x64.app
chmod +x AlicornTheFound-mac_x64.app
tar -c -f AlicornTheFound-mac_x64.tar resources.neu AlicornTheFound-mac_x64.app
gzip AlicornTheFound-mac_x64.tar
mkdir -p ../wrapped
mv AlicornTheFound-mac_x64.tar.gz ../wrapped/