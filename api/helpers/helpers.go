package helpers

import (
	"os"
	"strings"
)

// EnforceHTTPS is a function that enforces HTTPS on a URL

func enforceHTTPS(url string) string {
	if url[:4] != "http" {
		url = "https://" + url
	}
	return url
}

// resolveDomainError is a function that checks if the domain is valid

func resolveDomainError(url string) bool {
	if url == os.Getenv("DOMAIN") {
		return false
	}
	newURL := strings.Replace(url, "http://", "", 1)
	newURL = strings.Replace(newURL, "https://", "", 1)
	newURL = strings.Replace(newURL, "www.", "", 1)
	newURL = strings.Split(newURL, "/")[0]

	return newURL != os.Getenv("DOMAIN")
}