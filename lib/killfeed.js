let kills = [];
let lastShown = -1;
let lastAdded = -1;
let killsShowing = 0;
var $killFeedContainer = null;
var $killFeedElement = null;

var tagBody = "(?:[^\"'>]|\"[^\"]*\"|'[^']*')*";

var tagOrComment = new RegExp(
  "<(?:" +
    // Comment body.
    "!--(?:(?:-*[^->])*--+|-?)" +
    // Special "raw text" elements whose content should be elided.
    "|script\\b" +
    tagBody +
    ">[\\s\\S]*?</script\\s*" +
    "|style\\b" +
    tagBody +
    ">[\\s\\S]*?</style\\s*" +
    // Regular name
    "|/?[a-z]" +
    tagBody +
    ")>",
  "gi"
);
function removeTags(html) {
  var oldHtml;
  do {
    oldHtml = html;
    html = html.replace(tagOrComment, "");
  } while (html !== oldHtml);
  return html.replace(/</g, "&lt;");
}

const fakeNames = [
  "Cody",
  "Shaun Becker",
  "Catherine",
  "Bob",
  "Snowy",
  "Summer",
  "John Smith",
];
$(function () {
  $killFeedContainer = $(".kill-feed");
  $killFeedElement = $(".kill-feed > div").hide();

  window.addEventListener("message", function (event) {
    if (event.data.type === "kill") {
      let killer = removeTags(event.data.killer);
      if (killer === "")
        killer = fakeNames[Math.floor(Math.random() * fakeNames.length)];
      let victim = removeTags(event.data.victim);
      if (victim === "")
        victim = fakeNames[Math.floor(Math.random() * fakeNames.length)];
      const weapon = event.data.weapon;
      addKill(killer, victim, weapon);
    }
  });
  // $(document).on("contextmenu", function (e) {
  //     e.preventDefault();
  //   });
});

const handleKillFeed = () => {
  const killToShow = kills.find((k) => k.shown === false);
  const index = kills.indexOf(killToShow);
  if (killToShow === null || killToShow === undefined || index === -1) {
    return;
  }
  killToShow.shown = true;
  kills[index] = killToShow;
  kills.splice(index, 1);

  var $newFeedElement = $killFeedElement.clone();
  $newFeedElement
    .find(".weapons img:first-child")
    .attr("src", "./images/" + killToShow.weapon + ".png"); //drawing a weapon
  $newFeedElement.find(".killer").text(killToShow.killer); //drawing a "teammate"
  $newFeedElement.find(".victim").text(killToShow.victim); //drawing a "enemy"
  $killFeedContainer.append(
    $newFeedElement
      .show()
      .delay(2000)
      .fadeOut(1000, function () {
        //drawing a container
        $(this).remove();
      })
  );

  //kills.splice(index, 1);
  //console.log(kills.length);
  //console.log(`kill ${kills[index]?.killer ?? 'doesnt exist'} vs ${killToShow.killer}`);
};
const addKill = (k, v, w) => {
  kills.push({
    killer: k,
    victim: v,
    weapon: w,
    shown: false,
    time: Date.now(),
  });
};

let count = 0;
// let weapons = [
//   "suicide",
//   "weapon_assaultrifle",
//   "weapon_bat",
//   "weapon_combatpistol",
//   "weapon_combatmg",
//   "weapon_smg_mk2",
//   "weapon_appistol",
//   "weapon_bottle",
//   "weapon_grenade",
//   "weapon_carbinerifle",
//   "weapon_snowball",
//   "weapon_sniperrifle",
//   "weapon_raypistol",
//   "weapon_revolver_mk2",
// ];
// window.setInterval(() => {
//   let killer = removeTags(`<script>alert('Hi')</script>${count}`);
//   if (killer === "")
//     killer = fakeNames[Math.floor(Math.random() * fakeNames.length)];
//   addKill(
//     killer,
//     `victim${count}`,
//     weapons[Math.floor(Math.random() * weapons.length)]
//   );
//   count++;
// }, 800);

window.setInterval(() => {
  handleKillFeed();
}, 450);
