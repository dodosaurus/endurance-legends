This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## What the hell is this?
Dada is concept application, where Strava user could buy boosters with collectible cards and expand his collection by logging more Strava activities. 

## DONE

- [x] dashboard UI mockup (blocks from shadcn)
- [x] login page mockup
- [x] next DB planned models
- [x] authentication implementation (Strava OAuth)
- [x] session cookie is not saved on deployed version (maybe httpOnly flag on cookie?)
- [x] implement getting list of activities and displaying it on dashboard
- [x] logout button initial concept
- [x] saving activities in DB
- [x] fix bug that kms are calcualted before activities fetch - need some cascade implementation where activites are always fetched first
- [x] test when new activites are added to DB (changing timeCap from older to newer)
- [x] implement card displaying run/cycled kilometers from time of registration
- [x] add DB field to user lastActivityRefresh and display it in info panel (it could be debug panel)
- [x] implement card displaying account balance (give automatically some points on sign up) 
- [x] light yellow bg on acitvity rows that are newest and were added in last 24 hours = are the newest ("new")
  - we need to store list of ids of newest activities on user, then in frontend we can check if activity is new on each table row
  - also we need timestamp on activity when it was added to our system (to check 24 hours)
- [x] light green bg on activities that were added in last 7 days (secondary green, "added in last 7 days") - maybe not needed that much
- [x] logout button on dashboard with cookies().delete("session")
- [x] need caluclator in backend with concept formula - on syncDashboard() we need recalculate accountBalance based on new activities
- [x] mine (at least some, for testing) data for cards
- [x] prepare model of card
- [x] putting nice redirect page between callback and dashboard (loading.tsx?)
- [x] give cards rarity attributes, other special attributes (grand tour, monument...) migrate DB and insert JSON into DB
- [x] common/uncommon (WT riders), rare cards (WT stage races other than grand tours), epic cards (WT one day races), legendary (grand tours, only 3)
- [x] implement navbar with logo <-> name and avatar (we have pictures from sign up)
- [x] synchronize button for fetching newest activities (+ anti spam protection = disabling button while fetching), add icon instead
- [x] /collection page; based on owned cardIds on user, list first in some table owned cards/maybe also not owned with some grayed out rows for ex.

## TODO

- finalize prototype engine
  - [ ] prepare button for Buy & Open booster, server action behind it and rerouting to booster opening
  - [ ] /booster page; just some 3 card-like divs (shadcn card) with some data = representation of card
  - [ ] need activity generator for testing and test adding new activities and changing of distances and coins
- [ ] caching on server action (revalidatePath by tags?)
- earnings
  - activity table should be substited by Earnings table, which will also list besides activites (+coins), new user bonus (+coins), spendings on boosters (-coins)
  - and in future it can be extended, but list of activites user can see on Strava, this will be more app related dashbaord table
  - [ ] implement new data model and table (id, event name - enum?, coin transaction, activityId (if it is activity, link it))
  - [ ] trigger events on new activity addition, on first login, on booster purchase
  - [ ] ui desing - table rows should have distinguishable design to let user know what event it was
  - [ ] column with earnd coins per earning (badge with SVG), remove badge from country
  - [ ] on activity show little map/or on hover
- [ ] bug in translateActivities (maybe delete the layer) Error: activitiesFromApi.map is not a function (429 rate limit problem)
- [ ] rate limit page redirect when 429 is returned from Strava
- [ ] adding formula and recalculation of coins on fetch of activities
- [ ] rethink and google how to handle situation, when user already was already gave permissions through Strava, but after token expiration still needs to be redirecte to Strava and Authorize; how to identify such user coming to our app
- [ ] additional to loading.tsx add lazy loading on tables (on other components)
- opening booster phase (new path?)
  - [ ] initial design of the booster/chest and animation for it
  - [ ] desktop/mobile showing of the opened cards, animation for not revealed rare card
  - [ ] revealing animation for common and uncommon cards
- collection viewer (new path!)
  - [ ] first concept just list of owned cards
- [ ] deauthorize on logout here: POST https://www.strava.com/oauth/deauthorize
- [ ] custom 404 page (loading, error pages -> also possible from server component?); loading hopefully works after login in Strava while page is redirecting
- [ ] error management (Sentry?)
- [ ] setting up analytics (Posthog?)
- [ ] sometimes we get useContext bug (like some client component misconfiguration issue)
- earnings/activites table
- [ ] activites = earnings, maybe rename and after registration add also the initial gifted coins on top as item
  - [ ] green bg on activities added in last 24 hours
  - [ ] it makes sense to have instead of bg color different group section of table on top with new activites, where activities can be grouped by startDate
 

## Sources mentions
https://www.procyclingstats.com/
https://www.flaticon.com/free-icon/triathlon_15179919?term=run+bike&page=1&position=2&origin=search&related_id=15179919
