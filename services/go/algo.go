package main

func handleInitialdistribution(preferedGenres ...string) map[string]float64 {
	genres := [126]string{"acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance", "sad", "salsa", "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", "work-out", "world-music"}
	maxChance := float64(100)
	genresLen := float64(len(genres))
	genreMap := make(map[string]float64)
	preferedGenresLength := len(preferedGenres)

	if preferedGenresLength == 0 {
		evenChance := maxChance / genresLen
		for _, value := range genres {
			genreMap[value] = float64(evenChance)
		}
	} else {
		reservedChance := float64(60)
		leftoverChance := maxChance / reservedChance
		preferedChance := maxChance / float64(preferedGenresLength)

		for _, value := range genres {
			genreMap[value] = leftoverChance / (genresLen - float64(preferedGenresLength))
		}

		for _, value := range preferedGenres {
			_, ok := genreMap[value]
			if !ok {
				continue
			}
			genreMap[value] = preferedChance
		}
	}

	return genreMap
}
