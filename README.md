This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## What the hell is this?
endurancevault is concept application, where Strava user could buy boosters with collectible cards and expand his collection by logging more Strava activities. 

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
- [x] rework opening to not route segment but to drawer without path, opening should one be action on form
- [x] implement rarity randomizer (so we add some modifier to algorithm and rare cards will appear more often uncommon > rare > epic > legendary)
- [x] dispalying and somehow holding last cards acquired in drawer, wiht dashboard still being most recent
- [x] prepare button for Buy & Open booster, disable when not enough coins
- [x] after opened pack we need to update frontend coins status immidiately
- [x] when opening pack with same card that we already own - adjust the opening engine to correctly adjust number of copies (do we need to know when each copy was acuqired? we can throw out numberOfCopies in that case)
- [x] adjust rarity modifiers
- [x] dump DB to local (mainly master collection)
- [x] implement quick way for cleaning ownedCards, transactions a collectedCards on user for testing
- [x] put displaying coins number and drawer to one component, so we can better control what is displayed in coins status/button - it is critical
- [x] isSynchronizing in context to show pending and disabled status also on open pack when synchronizing (solved in other way)
- [x] different accent color than purple (purple are epic cards)
- [x] show number of copies in collection page (check ownedCards for duplicate cardIds)
- [x] put info card as button modal trigger, display in My Collection and avatr in navbar, coins card should be in middle in first panel
- [x] show only owned cards in separate table in collection (should be as tab - main tab; whole collection should be next tab; from shad cn component)
- [x] find out best way to dynamically put bg to card (external source and next image, or local images and CSS bg)
- [x] country code map from DB countries and add it to card front component
- [x] button connect to Strava
- alternative - maybe best would be to have script that reads our raw json and based on id finds picture in local folder and uploads it with card to supabase, and save image url rigthaway to db; with this we could also find way how to put other mined data to DB (winned races ex.)
- [x] find some pictures for some rarity cards, think about model

## TODO

- [ ] placeholder for image and again seed and use whole DB
- [ ] card preview in collection (only owned cards!!!) (app-card-front in modal)
- [ ] rarity card specifcs - badge color, border, "last winner:"
- [ ] card back design (three shape with our accent color from video)
- [ ] implement flip card CSS
- adhere to Strava guidelines
  - [ ] footer with Powered by Strava
  - [ ] link on activities
- landing page
  - [ ] some nice design (some background effect from accent color, some AI generted image, pitch and slogan)
- [ ] history should be separate route, and it should display earnings table; History button will be under profile in info card mdoal
- [ ] activites on dashboard should defaultly display only new activites, the rest of table should be expandable (SPA approach, no scrolling allowed by default on dashboard)
- [ ] display image source, other gathered data from PCS
- [ ] mobile screen enhancments - collection and not owned card placeholders, navbar and its offset from right
- earnings
  - activity table should be substited by Earnings table, which will also list besides activites (+coins), new user bonus (+coins), spendings on boosters (-coins)
  - [ ] implement new data model and table (id, event name - enum?, coin transaction, activityId (if it is activity, link it))
  - [ ] trigger events on new activity addition, on first login, on booster purchase
  - [ ] ui desing - table rows should have distinguishable design to let user know what event it was
  - [ ] column with earnd coins per earning (badge with SVG), remove badge from country
- [ ] on activity show more info - map for ex. when clicked and row is expanded
- [ ] need activity generator for testing and test adding new activities and changing of distances and coins
- [ ] error rate limit page redirect when 429 is returned from Strava
- [ ] rethink and google how to handle situation, when user already was already gave permissions through Strava, but after token expiration still needs to be redirecte to Strava and Authorize; how to identify such user coming to our app)
- [ ] make /admin only accessible to username jozef_kov
- opening booster phase
  - [ ] core CSS desing for every card
  - [ ] initial design of the booster/chest and animation for it
  - [ ] desktop/mobile showing of the opened cards, animation for not revealed rare card
  - [ ] revealing animation for common and uncommon cards
- trading
  - [ ] reading friends from Strava and finding out which one is on EV already
  - [ ] clicking on card give option in modal to Request Trade
  - [ ] implement pending trades component on navbar
- [ ] deauthorize on logout here: POST https://www.strava.com/oauth/deauthorize
- [ ] custom 404 page (loading, error pages -> also possible from server component?); loading hopefully works after login in Strava while page is redirecting
- [ ] error management (Sentry?)
- [ ] setting up analytics (Posthog?)
- [ ] handling situations where user already own whole collection
- [ ] additional to loading.tsx add lazy loading on tables (on other components)
 

## Sources mentions
https://www.procyclingstats.com/
https://www.flaticon.com/free-icon/triathlon_15179919?term=run+bike&page=1&position=2&origin=search&related_id=15179919
