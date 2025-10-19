const Sport = {
  Soccer: 0,
  Basketball: 1,
  Baseball: 2,
} as const;
type SportType = (typeof Sport)[keyof typeof Sport];

function getFavoriteSport(sport: Sport) {
  if (sport === Sport.Soccer) {
    return "Soccer";
  }
}
