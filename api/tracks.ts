

function genreNameDB(genre: string) {
    return genre.replace(' ', '_');
}

function genreNameUI(genre: string) {
    return genre.replace('_', ' ');
}