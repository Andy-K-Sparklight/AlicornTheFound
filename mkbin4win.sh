mv ./dist/AlicornTheFound/AlicornTheFound-win_x64.exe ./dist/AlicornTheFound/AF
strip ./dist/AlicornTheFound/AF
./bin2header -o ./dist/AF.h ./dist/AlicornTheFound/AF
./bin2header -o ./dist/WL.h ./dist/AlicornTheFound/WebView2Loader.dll
./bin2header -o ./dist/res.h ./dist/AlicornTheFound/resources.neu
mkdir -p ./dist/wrapped
gcc4win ./wrapper/wrapper.c -mwindows -I./resources/binaries/ -I./dist -O3 -o ./dist/wrapped/AlicornTheFound-win_x64.exe
strip ./dist/wrapped/AlicornTheFound-win_x64.exe
./upx -9 ./dist/wrapped/AlicornTheFound-win_x64.exe