
type Swimming = "swimming";
type Football = "football";

type SwimmingAndFootball = Swimming & Football;
// never

type FavoriteSport = "swimming" | "football";
type BallSport = "football" | "baseball";

type FavoriteBallSport = FavoriteSport & BallSport;
type MaybeSport = FavoriteSport | BallSport;
// football

function printFavoriteSport(sport: FavoriteBallSport) {
  console.log(sport);
}
function printMaybeSport(sport: MaybeSport) {
  if (sport === "football") {
    console.log("football");
  } else {
    console.log("swimming");
  }
}

// ------------------------------------------------------------

interface Designer {
  name: string;
  sense: number;
}
interface Developer {
  name: string;
  skill: number;
}
type Worker = Designer & Developer;
type MaybeWrker = Designer | Developer

function printJob(person: Worker) {
  console.log(person.name);
  console.log(person.sense);
  console.log(person.skill);
}
function printJob2(person: MaybeWrker) {
  console.log(person.name);
  console.log(person.sense);
  console.log(person.skill);
}
// never






