#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <stdlib.h>

#include "AF.h"
#include "res.h"
#ifdef WIN32
#include "aria2c.h"
#include "WL.h"
#include <direct.h>
#include <windows.h>
#else
#include <sys/types.h>
#include <sys/stat.h>
#endif

void outf(const unsigned char data[], size_t sz, char* pt) {
    FILE *f = fopen(pt, "wb");
    fwrite(data, sz, 1, f);
    fclose(f);
}

int chk() {
    FILE *f = fopen("resources.neu", "r");
    if(f == NULL) {
        return 1;
    }
    return 0;
}

int main(void) {
#ifdef WIN32
    char* root = getenv("APPDATA");
    const char s[2] = "\\";
#else
    char* root = getenv("HOME");
    const char s[2] = "/";
#endif
    chdir(root);
    mkdir(".alicorn-af");
    chdir(".alicorn-af");
    if(chk()) {
#ifdef WIN32
        outf(AF, sizeof(AF), "AF.exe");
#else
        outf(AF, sizeof(AF), "AF");
#endif
#ifdef WIN32
        outf(WebView2Loader_dll, sizeof(WebView2Loader_dll), "WebView2Loader.dll");
        outf(aria2c, sizeof(aria2c), "aria2c.exe");
#endif
        outf(resources_neu, sizeof(resources_neu), "resources.neu");
    };
#ifdef WIN32
    WinExec("AF.exe", SW_SHOW);
#else
    system("./AF");
#endif
    return 0;
}