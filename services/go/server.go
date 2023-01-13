package main

import (
	"fmt"
	"log"
	"net/http"
)

type Genre struct {
	genre  string
	chance float64
}

func initialDistributionEndpoint(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/core" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method is not support", http.StatusNotFound)
		return
	}

	preferences := [1]string {"acoustic"}

	fmt.Println(handleInitialdistribution(preferences[]))
}

func server() {
	port := 9003
	portString := fmt.Sprint(":", port)

	http.HandleFunc("/core", initialDistributionEndpoint)

	fmt.Printf("Listeninig to port: %d\n", port)
	if err := http.ListenAndServe(portString, nil); err != nil {
		log.Fatal(err)
	}
}
