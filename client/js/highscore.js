function updateScore() {
	if (starttime !== null)
	{
		score = (Math.round(((Date.now() - starttime) / 1000))* tickerSpeed * 2)+extraScore;
		scoreText.setText("Score: " + score);
		if (score > highscore)
		{
			highscore = score;
			highscoreText.setText("Highscore: " + highscore);
		}
	}
}