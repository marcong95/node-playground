#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#define DATA_LEN 3
#define KEY_LEN 2

void PutString(unsigned char *s, int len)
{
    for (int i = 0; i < len; i++)
        printf("%02x ", s[i]);
}

void RC4(unsigned char *data, unsigned char *key, unsigned char *result)
{
    unsigned char S[256] = {};
    unsigned char temp[10] = {};

    for (int i = 0; i < 256; i++)
    {
        S[i] = (unsigned char) i;
    }

    int j = 0;
    for (int i = 0; i < 256; i++)
    {
        j = (j + S[i] + key[i % KEY_LEN]) % 256;
        temp[0] = S[i];
        S[i] = S[j];
        S[j] = temp[0];
    }
    // PutString(S, 256);
    // printf("\n");

    int t = 0, m = 0, n = 0;
    unsigned char k = 0;
    for (int i = 0; i < DATA_LEN; i++)
    {
        m = (m + 1) % 256;
        n = (n + S[m]) % 256;
        temp[1] = S[m];
        S[m] = S[n];
        S[n] = temp[1];
        t = (S[m] + S[n]) % 256;
        k = S[t];
        result[i] = k ^ data[i];
    }
}

int main(int argc, char **argv)
{
    char s[256] = {};
    unsigned char ma[256] = {0x01, 0x0a, 0x70};
    unsigned char mb[256] = {};
    unsigned char K[256] = "01";
    unsigned char mx[256] = {};

    printf("      key: ");
    PutString(K, KEY_LEN);
    printf("\n");

    RC4(ma, K, mb);
    printf("encrypted: ");
    PutString(mb, DATA_LEN);
    printf("\n");

    RC4(mb, K, mx);
    printf("decrypted: ");
    PutString(mx, DATA_LEN);
    printf("\n");
}
