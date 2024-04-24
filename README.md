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

## TODO

- [ ] add DB field to user lastActivityRefresh and display it in info panel (it could be debug panel)
- [ ] implement card displaying account balance (give automatically some points on sign up) and needed caluclator in backend with concept formula
- [ ] need activity generator for testing and test adding new activities and changing of distances and coins
- [ ] implement navbar with logo <-> name and avatar (we have pictures from sign up) + refresh button for fetching newest activities (+ anti spam protection)
- [ ] putting nice redirect page between callback and dashboard
- DAL - data access layer
  - [ ] DB queries (internal/local data) - adding verifySession, so local session
  - [ ] Strava API (external) - getting athleteId (from local session or from context (?)) and renewal with refresh_token
- logout functionallity
  - [ ] logout button on dashboard with cookies().delete("session")
  - [ ] and also deauthorize here: POST https://www.strava.com/oauth/deauthorize
- [ ] adding formula and recalculation of coins on fetch of activities
- opening booster phase (new path?)
  - [ ] initial design of the booster/chest and animation for it
  - [ ] desktop/mobile showing of the opened cards, animation for not revealed rare card
  - [ ] revealing animation for common and uncommon cards
- collection viewer (new path!)
  - [ ] first concept just list of owned cards
- collection design
  - [ ] first some mocked cards, with mock data 
  - [ ] webscrape the initial data for cards from pro cycling stats
  - [ ] prepare first common/uncommon (WT riders), rare cards (WT stage races other than grand tours), epic cards (WT one day races), legendary (grand tours, only 3)
- [ ] test data seeder implementation (new random activity generation)
- [ ] custom 404 page (loading, error pages -> also possible from server component?)
- [ ] error management (Sentry?)
- [ ] setting up analytics (Posthog?)
 

## Open sources mentions
https://www.flaticon.com/free-icon/triathlon_15179919?term=run+bike&page=1&position=2&origin=search&related_id=15179919
